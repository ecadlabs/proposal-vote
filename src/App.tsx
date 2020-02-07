import { Tezos } from '@taquito/taquito';
import { Box, Button, Grommet, Paragraph } from 'grommet';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { addVoter, originateContract, updateStorage } from './command/commands';
import { AddVoterForm, StorageView } from './components/contract-panel';
import { TaquitoProvider } from './components/voter-panel';
import { State } from './redux/reducers';


Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet' })

const App = () => {
  const dispatch = useDispatch()
  const { contractAddress, loading, storage } = useSelector((state: State) => state.contract)

  useEffect(() => {
    setInterval(() => {
      dispatch(updateStorage)
    }, 2000)
  }, [dispatch])

  return (
    <Grommet plain>
      <header className="App-header">
        <Box gap='small'>
          <Box width='large' background='white' pad='medium'>
            <Paragraph>Contract panel</Paragraph>
            {contractAddress ? null : <Button primary label='Originate' onClick={() => { dispatch(originateContract) }} />}
            {loading ? 'loading...' : contractAddress}
            {storage ? <StorageView storage={storage}></StorageView> : null}
            <Paragraph>Manage</Paragraph>
            {contractAddress ? <AddVoterForm onSubmit={(address) => { dispatch(addVoter(address)) }} /> : null}
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
