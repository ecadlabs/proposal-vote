import { Tezos } from '@taquito/taquito';
import { Box, Grommet, Paragraph } from 'grommet';
import { Github } from 'grommet-icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { originateContract, updateStorage } from './command/commands';
import { OriginateForm, StorageView } from './components/contract-panel';
import { OperationProgress } from './components/progress';
import { VoterPanel } from './components/voter-panel';
import { State } from './redux/reducers';


Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet' })

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
          </Box>
          {
            contractAddress && <Box width='large' background='white' pad='medium'>
              <Paragraph>Voter panel</Paragraph>
              <VoterPanel></VoterPanel>
            </Box>
          }
        </Box>
      </header>
    </Grommet >
  );
}

export default App;
