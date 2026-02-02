/**
 * BalanceDisplay.js
 * Menampilkan saldo dompet saat ini dalam kartu yang tertata
 */

function BalanceDisplay({ balance }) {
  if (!balance) {
    return (
      <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h3>Saldo Dompet</h3>
        <p className="text-muted">Hubungkan dompet untuk melihat saldo</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ height: '100%' }}>
      <h3>Saldo Dompet</h3>
      
      <div className="text-center" style={{ padding: '1rem 0' }}>
        <div className="stat-value">{parseFloat(balance).toFixed(4)}</div>
        <div className="text-secondary" style={{ marginTop: '0.5rem', fontWeight: '500' }}>ETH</div>
      </div>

      <div className="status-message info" style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
        Gunakan Sepolia Faucet untuk mendapatkan tes ETH gratis
      </div>
    </div>
  );
}

export default BalanceDisplay;
