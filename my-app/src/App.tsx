import { localForger } from '@taquito/local-forging';
import { InMemorySigner } from '@taquito/signer';
import { Forger, RpcForger, Signer, Tezos, TezosOperationError, TezosToolkit } from '@taquito/taquito';
import { TezBridgeSigner } from '@taquito/tezbridge-signer';
import { Box, Button, FormField, Grommet, Meter, Paragraph, Select, Text, List } from 'grommet';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContractLoadingAction, createNewContractAction, createUpdateStorageAction } from './actions';
import './App.css';
import { code, storage } from './code';
import { State } from './reducers';
import BigNumber from 'bignumber.js';


Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet' })

const createTaquito = (signerType: string, forgerType: string) => {
  const taquito = new TezosToolkit()
  let signer: Signer = new InMemorySigner('edsk4TjJWEszkHKono7XMnepVqwi37FrpbVt1KCsifJeAGimxheShG')
  let forger: Forger = taquito.getFactory(RpcForger)();
  if (signerType === 'tezbridge') {
    signer = new TezBridgeSigner()
  }

  if (forgerType === 'local') {
    forger = localForger
  }

  taquito.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet', signer, forger })
  return taquito
}

const originateContract = async (dispatch: any) => {
  dispatch(createContractLoadingAction())
  const faucetKey = {
    "mnemonic": [
      "satisfy",
      "survey",
      "game",
      "thunder",
      "leaf",
      "rack",
      "adult",
      "fan",
      "stage",
      "choose",
      "pear",
      "swarm",
      "spoil",
      "pupil",
      "because"
    ],
    "secret": "6dc25203599c04aa76e765ab33ff552cff3ae684",
    "amount": "25456890835",
    "pkh": "tz1YsT2ZzRPq66uTT1W9zLmeZF6GZJMmTDwM",
    "password": "JVxRfxU6SD",
    "email": "bplytowq.nrcqojoz@tezos.example.org"
  }
  await Tezos.importKey(faucetKey.email, faucetKey.password, faucetKey.mnemonic.join(" "), faucetKey.secret)
  const op = await Tezos.contract.originate({
    code: code,
    init: storage(faucetKey.pkh)
  })
  const contract = await op.contract();

  dispatch(createNewContractAction(contract.address))
  dispatch(updateStorage)
}

const updateStorage = async (dispatch: any, getState: () => State) => {
  const contract = getState()?.contract?.contractAddress;

  if (contract) {
    const storage = await (await Tezos.contract.at(contract)).storage()
    return dispatch(createUpdateStorageAction(storage))
  }
}

export const TaquitoProvider: React.FC = () => {
  const [signer, setSigner] = useState('in-memory');
  const [forger, setForger] = useState('rpc');


  let taquito = createTaquito(signer, forger)
  useEffect(() => {
    taquito = createTaquito(signer, forger)
  }, [signer])

  return <>
    <Box direction='row' gap='small'>
      <Box>
        <FormField name="signer" label="Signer" />
        <Select
          size='small'
          options={['tezbridge', 'remote', 'in-memory']}
          value={signer}
          onChange={({ option }) => setSigner(option)}
        />
      </Box>
      <Box>
        <FormField name="Forger" label="Forger" />
        <Select
          size='small'
          options={['local', 'rpc']}
          value={forger}
          onChange={({ option }) => setForger(option)}
        />
      </Box>
    </Box>
    <br></br>
    <InteractionPane taquito={taquito}></InteractionPane>
  </>
}

export const InteractionPane: React.FC<{ taquito: TezosToolkit }> = ({ taquito }) => {
  const [pkh, setPKH] = useState();
  const [balance, setBalance] = useState();
  const [error, setError] = useState();
  const [voting, setVoting] = useState(false);
  const [receipt, setReceipt] = useState<{ consumedGas: string, fee: number, storage: string } | null>(null)
  const { contractAddress } = useSelector((state: State) => state.contract)
  useEffect(() => {
    const cleanUp: Array<() => void> = [];
    taquito.signer.publicKeyHash().then((pkh) => {
      setPKH(pkh);
      const interval = setInterval(() => {
        taquito.tz.getBalance(pkh).then(setBalance)
      }, 2000)
      taquito.tz.getBalance(pkh).then(setBalance)

      cleanUp.push(() => clearInterval(interval))
    })

    return () => cleanUp.forEach((x) => x())
  }, [taquito])

  return <>
    {error ? <Box margin={{ bottom: 'small' }} background='status-critical' pad='small'>
      {error}
    </Box> : null}
    <div>{pkh}, balance {balance?.toString() ?? 0}</div>
    <br></br>
    <Box>
      <Button label='Vote yay' primary disabled={voting} onClick={async () => {
        try {
          setError('')
          setVoting(true);
          const contract = await taquito.contract.at(contractAddress!);
          const op = await contract.methods.vote(1).send()
          await op.confirmation();
          setReceipt({
            consumedGas: op.consumedGas,
            fee: op.fee,
            storage: op.storageDiff
          })
        }
        catch (ex) {
          if (ex instanceof TezosOperationError) {
            setError(ex.id)
          } else {
            setError('Unknown error')
          }
        }
        finally {
          setVoting(false)
        }
      }} />

    </Box>
    {
      receipt ? <div>
        <p>Consummed gas: {receipt.consumedGas}</p>
        <p>Fee: {receipt.fee}</p>
        <p>Storage: {receipt.storage}</p>
      </div> : null
    }
  </>
}

export const VoteMeter: React.FC<{ label: string, value: number }> = ({ label, value }) => {
  return <Box gap='small' justify='between' direction='row'>
    <Text>{label}</Text>
    <Meter
      values={[{
        value: value,
        label: label,
      }]}
      aria-label="meter"
    />
  </Box>
}
export const StorageView: React.FC<{ storage: State['contract']['storage'] }> = ({ storage }) => {
  const votesLeft = Object.keys(storage?.voters ?? []).map((x) => storage?.voters[x]);
  const votesDone = Object.keys(storage?.votes ?? []).map((x) => (storage?.votes as any)[x]);
  const total = [...votesLeft, ...votesDone].reduce((prev: BigNumber, current: BigNumber) => prev.plus(current), new BigNumber(0))

  const toPercent = (bigNum: BigNumber) => {
    return bigNum.dividedBy(total).multipliedBy(100).toNumber()
  }

  return <div>
    <Box>
      <p>Details</p>
      <List
        primaryKey="key"
        secondaryKey="value"
        data={[
          { key: 'Proposal', value: storage?.proposal },
          { key: 'enddate', value: storage?.enddate },
        ]}
      />
    </Box>
    <br></br>
    <Box gap='small'>
      <VoteMeter label='Yay' value={toPercent(storage?.votes[1]!)}></VoteMeter>
      <VoteMeter label='Nay' value={toPercent(storage?.votes[2]!)}></VoteMeter>
      <VoteMeter label='Pass' value={toPercent(storage?.votes[3]!)}></VoteMeter>
    </Box>
    <br></br>
    {Object.keys(storage?.voters ?? []).length !== 0 &&
      <Box>
        <p>Votes</p>
        <List
          primaryKey="key"
          secondaryKey="value"
          data={Object.keys(storage?.voters ?? []).map((x) => ({ key: x, value: storage?.voters[x].toString() }))}
        />
      </Box>}
  </div>
}

const App = () => {
  const dispatch = useDispatch()
  const [balance, setBalance] = useState("0")
  const { contractAddress, loading, storage } = useSelector((state: State) => state.contract)

  useEffect(() => {
    setInterval(() => {
      dispatch(updateStorage)
    }, 2000)

    Tezos.tz.getBalance('tz1YH2LE6p7Sj16vF6irfHX92QV45XAZYHnX').then((balance) => {
      setBalance(balance.dividedBy(1000000).toString())
    })
  }, [])

  return (
    <Grommet plain>
      <header className="App-header">
        <Box gap='small'>
          <Box width='large' background='white' pad='medium'>
            <Paragraph>Contract panel</Paragraph>
            {contractAddress ? null : <Button primary label='Originate' onClick={() => { dispatch(originateContract) }} />}
            {loading ? 'loading...' : contractAddress}
            {storage ? <StorageView storage={storage}></StorageView> : null}
          </Box>
          <Box width='large' background='white' pad='medium'>
            <Paragraph>Voter panel</Paragraph>
            <TaquitoProvider></TaquitoProvider>
          </Box>
        </Box>
      </header>
    </Grommet>
  );
}

export default App;
