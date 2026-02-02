/**
 * DonateForm.js
 * Formulir donasi dengan validasi dan timbal balik pengguna yang ditingkatkan
 */

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract';

function DonateForm({ walletConnected }) {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const loadWalletBalance = async () => {
      try {
        if (!window.ethereum) return;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balanceWei = await provider.getBalance(address);
        const balanceEth = parseFloat(ethers.formatEther(balanceWei));

        setWalletBalance(balanceEth);
      } catch (err) {
        console.error('Gagal mengambil saldo dompet', err);
      }
    };

    if (walletConnected) {
      loadWalletBalance();
    }
  }, [walletConnected]);

  const validateAmount = (value) => {
    setValidationError('');
    
    if (!value || value.trim() === '') {
      return 'Mohon masukkan jumlah donasi';
    }
    
    if (isNaN(value) || parseFloat(value) <= 0) {
      return 'Mohon masukkan jumlah valid lebih dari 0';
    }
    
    if (parseFloat(value) > walletBalance) {
      return 'Saldo tidak mencukupi';
    }
    
    return '';
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    
    if (value) {
      const error = validateAmount(value);
      setValidationError(error);
    } else {
      setValidationError('');
    }
  };

  const handleDonate = async () => {
    if (!window.ethereum) {
      setStatus('MetaMask tidak ditemukan');
      setStatusType('error');
      return;
    }

    const error = validateAmount(amount);
    if (error) {
      setValidationError(error);
      return;
    }

    try {
      setLoading(true);
      setStatus('Menunggu konfirmasi MetaMask...');
      setStatusType('info');

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.donate({
        value: ethers.parseEther(amount)
      });

      setStatus(`Transaksi dikirim: ${tx.hash.substring(0, 10)}... Menunggu konfirmasi...`);
      setStatusType('info');
      
      await tx.wait();

      setStatus('Donasi berhasil! Terima kasih atas kontribusi Anda.');
      setStatusType('success');
      setAmount('');
      setValidationError('');

      const address = await signer.getAddress();
      const balanceWei = await provider.getBalance(address);
      const balanceEth = parseFloat(ethers.formatEther(balanceWei));
      setWalletBalance(balanceEth);

      setTimeout(() => {
        setStatus('');
        setStatusType('');
      }, 5000);
    } catch (err) {
      console.error('Error donasi:', err);
      
      if (err.code === 4001) {
        setStatus('Transaksi ditolak oleh pengguna');
      } else if (err.code === 'INSUFFICIENT_FUNDS') {
        setStatus('Dana tidak mencukupi untuk transaksi');
      } else {
        setStatus('Transaksi gagal. Silakan coba lagi.');
      }
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  if (!walletConnected) {
    return (
      <div>
        <h3>Donasi ETH</h3>
        <div className="status-message error">
          Mohon hubungkan dompet Anda terlebih dahulu untuk melakukan donasi
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3>Donasi ETH</h3>

      <div className="donate-form">
        <div className="balance-info">
          <span className="balance-label">Saldo Tersedia</span>
          <span className="balance-amount">{walletBalance.toFixed(6)} ETH</span>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="amount">
            Jumlah Donasi (ETH)
          </label>
          <input
            id="amount"
            type="text"
            placeholder="0.00005"
            value={amount}
            onChange={handleAmountChange}
            disabled={loading}
          />
          {validationError && (
            <span className="error-text">{validationError}</span>
          )}
        </div>

        <button
          onClick={handleDonate}
          disabled={loading || !amount || !!validationError}
        >
          {loading ? (
            <>
              <span className="spinner"></span> Memproses...
            </>
          ) : (
            'Donasi Sekarang'
          )}
        </button>

        {status && (
          <div className={`status-message ${statusType} fade-in`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default DonateForm;
