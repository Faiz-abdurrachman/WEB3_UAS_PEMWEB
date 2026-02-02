/**
 * App.js
 * Komponen aplikasi utama dengan struktur tata letak modern
 */

import { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import BalanceDisplay from './components/BalanceDisplay';
import TransactionList from './components/TransactionList';
import ContractData from './components/ContractData';
import DonateForm from './components/DonateForm';
import './App.css';

function App() {
  const [balance, setBalance] = useState('');
  const [account, setAccount] = useState('');

  const handleWalletConnected = (address, balanceEth) => {
    setBalance(balanceEth);
    setAccount(address);
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">Web3 DApp UAS Pemrograman Web</h1>
        <p className="app-subtitle">Aplikasi Donasi Terdesentralisasi pada Ethereum Sepolia</p>
      </header>

      <div className="app-grid">
        <div className="app-section wallet-card">
          <WalletConnect onWalletConnected={handleWalletConnected} />
        </div>

        <div className="app-section">
          <BalanceDisplay balance={balance} />
        </div>

        <div className="app-section">
          <ContractData />
        </div>
      </div>

      <div className="app-section-full">
        <DonateForm walletConnected={!!account} />
      </div>

      <div className="app-section-full">
        <TransactionList />
      </div>
    </div>
  );
}

export default App;
