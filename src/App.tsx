import { Tezos } from '@taquito/taquito';
import { Box, Grommet, Paragraph, Meter } from 'grommet';
import { Github } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { addVoter, originateContract, updateStorage } from './command/commands';
import { AddVoterForm, OriginateForm, StorageView } from './components/contract-panel';
import { TaquitoProvider } from './components/voter-panel';
import { State } from './redux/reducers';


Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet' })

const OperationProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [timestamp, setTimestamp] = useState<Date | null>(null);

  useEffect(() => {
    Tezos.rpc.getBlockHeader().then(({ timestamp }) => {
      setTimestamp(new Date(timestamp))
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = (new Date().getTime()) - (timestamp?.getTime() ?? 0);
      setProgress(((diff / 1000) / 40) * 100);
    }, 1000)

    return () => clearInterval(interval)
  }, [timestamp])

  return <Meter margin={{ top: '10px' }} size='full' values={[{
    value: progress,
    label: 'Progress',
  }]}></Meter>
}

const App = () => {
  const dispatch = useDispatch()
  const { contractAddress, loading, storage } = useSelector((state: State) => state.contract)

  useEffect(() => {
    setInterval(() => {
      dispatch(updateStorage)
    }, 2000)
    dispatch(updateStorage)
  }, [dispatch])

  return (
    <Grommet plain>
      <Box style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <a href='https://github.com/ecadlabs/proposal-vote'>
          <Github color='white'></Github>
        </a>
      </Box>
      <header className="App-header">
        <Box gap='small'>
          <Box width='large' background='white' pad='medium'>
            <Paragraph>Contract panel</Paragraph>
            {contractAddress ? null : <OriginateForm onSubmit={(proposal) => { dispatch(originateContract(proposal)) }}></OriginateForm>}
            {loading ? <OperationProgress></OperationProgress> : contractAddress}
            {storage ? <StorageView storage={storage}></StorageView> : null}
            {contractAddress ? <>
              <Paragraph>Manage</Paragraph>
              <AddVoterForm onSubmit={(address) => { dispatch(addVoter(address)) }} />
            </> : null}
          </Box>
          {
            contractAddress && <Box width='large' background='white' pad='medium'>
              <Paragraph>Voter panel</Paragraph>
              <TaquitoProvider></TaquitoProvider>
            </Box>
          }
        </Box>
      </header>
    </Grommet >
  );
}

export default App;
