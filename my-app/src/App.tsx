import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Tezos } from '@taquito/taquito'

Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/babylonnet' })

const App = () => {
  const [balance, setBalance] = useState("0")

  useEffect(() => {
    Tezos.tz.getBalance('tz1YH2LE6p7Sj16vF6irfHX92QV45XAZYHnX').then((balance) => {
      setBalance(balance.dividedBy(1000000).toString())
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. {balance}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
