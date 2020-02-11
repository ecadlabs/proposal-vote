import { Tezos } from '@taquito/taquito';
import { Box, Button, Grommet, Paragraph } from 'grommet';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { addVoter, originateContract, updateStorage } from './command/commands';
import { AddVoterForm, StorageView } from './components/contract-panel';
import { TaquitoProvider } from './components/voter-panel';
import { State } from './redux/reducers';
import { Github } from 'grommet-icons'


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
            {contractAddress ? null : <Button primary label='Originate' onClick={() => { dispatch(originateContract) }} />}
            {loading ? 'loading...' : contractAddress}
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
