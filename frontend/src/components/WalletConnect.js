/**
 * WalletConnect.js
 * Koneksi dompet MetaMask dengan penanganan error yang komprehensif
 */

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function WalletConnect({ onWalletConnected }) {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [networkName, setNetworkName] = useState('');

  useEffect(() => {
    checkIfWalletIsConnected();
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          const network = await provider.getNetwork();
          
          if (Number(network.chainId) !== 11155111) {
             setError('Jaringan salah terdeteksi. Mencoba beralih...');
             const switched = await switchNetwork();
             if (!switched) {
               setError('Mohon beralih ke Sepolia Testnet di MetaMask secara manual');
               return;
             }
             return;
          }

          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          await updateWalletInfo(provider, address);
        }
      } catch (err) {
        console.error('Error memeriksa koneksi dompet:', err);
      }
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount('');
      setBalance('');
      setNetworkName('');
      setError('Dompet terputus. Silakan hubungkan kembali.');
    } else {
      window.location.reload();
    }
  };

  const updateWalletInfo = async (provider, address) => {
    const balanceWei = await provider.getBalance(address);
    const balanceEth = ethers.formatEther(balanceWei);
    const network = await provider.getNetwork();
    
    setAccount(address);
    setBalance(balanceEth);
    setNetworkName(network.name === 'unknown' ? 'Sepolia' : network.name);
    onWalletConnected(address, balanceEth);
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // 11155111 (Sepolia)
      });
      return true;
    } catch (error) {
      // Kode error ini menandakan bahwa chain belum ditambahkan ke MetaMask.
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xaa36a7',
                chainName: 'Sepolia Testnet',
                nativeCurrency: {
                  name: 'SepoliaETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://sepolia.infura.io/v3/'],
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error('Gagal menambahkan Sepolia:', addError);
          return false;
        }
      }
      console.error('Gagal beralih jaringan:', error);
      return false;
    }
  };

  const connectWallet = async () => {
    setError('');
    setLoading(true);

    if (!window.ethereum) {
      setError('MetaMask tidak terinstal. Mohon instal ekstensi MetaMask.');
      setLoading(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      
      if (chainId !== 11155111) {
        setLoading(true);
        setError('Beralih ke Sepolia Testnet...');
        const switched = await switchNetwork();
        
        if (!switched) {
          setError('Mohon beralih ke Sepolia Testnet di MetaMask secara manual');
          setLoading(false);
        }
        return;
      }

      await updateWalletInfo(provider, address);
    } catch (err) {
      console.error('Error koneksi dompet:', err);
      
      if (err.code === 4001) {
        setError('Permintaan koneksi ditolak. Mohon setujui koneksi di MetaMask.');
      } else if (err.code === -32002) {
        setError('Permintaan koneksi tertunda. Mohon periksa MetaMask.');
      } else {
        setError('Gagal menghubungkan dompet. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div>
      <h3>Koneksi Dompet</h3>
      
      <button
        onClick={connectWallet}
        disabled={loading || !!account}
        className={account ? 'success' : ''}
      >
        {loading ? (
          <>
            <span className="spinner"></span> Menghubungkan...
          </>
        ) : account ? (
          'Terhubung'
        ) : (
          'Hubungkan MetaMask'
        )}
      </button>

      <div className={`wallet-status ${account ? 'connected' : 'disconnected'}`}>
        <span className="wallet-status-dot"></span>
        {account ? 'Terhubung' : 'Tidak Terhubung'}
      </div>

      {error && (
        <div className="status-message error">
          {error}
        </div>
      )}

      {account && (
        <div className="wallet-info fade-in">
          <div className="wallet-info-item">
            <span className="wallet-info-label">Jaringan</span>
            <span className="wallet-info-value">{networkName}</span>
          </div>
          <div className="wallet-info-item">
            <span className="wallet-info-label">Alamat</span>
            <span className="wallet-info-value" title={account}>
              {formatAddress(account)}
            </span>
          </div>
          <div className="wallet-info-item">
            <span className="wallet-info-label">Saldo</span>
            <span className="wallet-info-value">{parseFloat(balance).toFixed(6)} ETH</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
