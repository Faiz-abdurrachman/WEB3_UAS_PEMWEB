/**
 * TransactionList.js
 * Menampilkan daftar transaksi terkini dari backend API
 */

import { useEffect, useState } from 'react';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    setLoading(true);
    setError('');

    fetch('http://localhost:5000/api/transactions')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTransactions(data.data);
        } else {
          setError('Gagal mengambil riwayat transaksi');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Tidak dapat terhubung ke server transaksi');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div>
        <h3>Transaksi Terkini</h3>
        <div className="loading-skeleton" style={{ marginBottom: '1rem' }}></div>
        <div className="loading-skeleton" style={{ marginBottom: '1rem' }}></div>
        <div className="loading-skeleton"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3>Transaksi Terkini</h3>
        <div className="status-message error">
          {error}
          <div style={{ marginTop: '1rem' }}>
            <button onClick={fetchTransactions} className="secondary">
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3>Transaksi Terkini</h3>

      {transactions.length > 0 ? (
        <div className="transaction-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Dari</th>
                <th>Ke</th>
                <th>Jumlah</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td title={tx.from}>{tx.from}</td>
                  <td title={tx.to}>{tx.to}</td>
                  <td><strong>{tx.amount}</strong></td>
                  <td>{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">💸</div>
          <p>Belum ada transaksi ditemukan</p>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
