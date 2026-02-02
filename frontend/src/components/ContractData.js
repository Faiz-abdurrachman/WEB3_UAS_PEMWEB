/**
 * ContractData.js
 * Komponen untuk menampilkan statistik smart contract
 */

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract';

function ContractData() {
  const [donorCount, setDonorCount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadContractData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Gunakan RPC yang konsisten dan andal untuk membaca data
      const provider = new ethers.JsonRpcProvider(
        'https://sepolia.infura.io/v3/84842078b09946638c03157f83405213'
      );

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      const count = await contract.getDonorCount();
      setDonorCount(count.toString());
    } catch (err) {
      console.error('Error data kontrak:', err);
      setError('Gagal memuat data smart contract');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContractData();
    // Refresh data setiap 30 detik
    const interval = setInterval(loadContractData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !donorCount) {
    return (
      <div className="card">
        <h3>Data Smart Contract</h3>
        <div className="loading-skeleton"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Data Smart Contract</h3>

      {error ? (
        <div className="text-center">
          <p className="error-text">{error}</p>
          <button onClick={loadContractData} className="secondary">
            Coba Lagi
          </button>
        </div>
      ) : (
        <div className="contract-stats">
          <div className="stat-card">
            <div className="stat-label">Total Donor</div>
            <div className="stat-value">{donorCount}</div>
            <p className="text-muted">Tercatat di Sepolia Testnet</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContractData;
