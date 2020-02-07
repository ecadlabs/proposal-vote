import { localForger } from "@taquito/local-forging";
import { InMemorySigner } from "@taquito/signer";
import { Forger, RpcForger, Signer, TezosOperationError, TezosToolkit } from "@taquito/taquito";
import { TezBridgeSigner } from "@taquito/tezbridge-signer";
import { Box, Button, FormField, Select, List } from "grommet";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../redux/reducers";

const fromCamelToSentence = (text: string) => {
    var result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

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

export const TaquitoProvider: React.FC = () => {
    const [signer, setSigner] = useState('in-memory');
    const [forger, setForger] = useState('rpc');
    const taquito = createTaquito(signer, forger)

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
    const [receipt, setReceipt] = useState<Partial<{ opHash: string, consumedGas: string, fee: number, storage: string }> | null>({ opHash: 'test' })
    const { contractAddress } = useSelector((state: State) => state.contract)

    const vote = async (vote: 1 | 2 | 3) => {
        try {
            setError('')
            setVoting(true);
            const contract = await taquito.contract.at(contractAddress!);
            const op = await contract.methods.vote(vote).send()
            setReceipt({
                opHash: op.hash
            })
            await op.confirmation();
            setReceipt({
                opHash: op.hash,
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
    }

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
        <Box gap='xsmall'>
            <Button label='Vote yay' primary disabled={voting} onClick={() => vote(1)} />
            <Button label='Vote nay' primary disabled={voting} onClick={() => vote(2)} />
            <Button label='Pass' primary disabled={voting} onClick={() => vote(3)} />
        </Box>
        <br></br>
        <List
            primaryKey="key"
            secondaryKey="value"
            data={Object.keys(receipt ?? {}).map((x) => ({ key: fromCamelToSentence(x), value: (receipt as any)?.[x] }))}
        />
    </>
}