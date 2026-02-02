/**
 * server.js
 * Backend API untuk UAS Pemrograman Web
 * Menggunakan Node.js + Express.js
 */

// Import library Express untuk membuat server
const express = require('express');

// Import CORS agar frontend (React) bisa mengakses backend
const cors = require('cors');

// Inisialisasi aplikasi Express
const app = express();

// Mengaktifkan CORS
app.use(cors());

// Middleware untuk parsing JSON dari request body
app.use(express.json());

/**
 * Dummy transaction data
 * Data ini digunakan untuk simulasi transaksi blockchain
 */
const dummyTransactions = [
  {
    id: 1,
    from: "0x123...",
    to: "0x456...",
    amount: "0.5 ETH",
    timestamp: "2025-01-12"
  },
  {
    id: 2,
    from: "0x789...",
    to: "0xabc...",
    amount: "1.2 ETH",
    timestamp: "2025-01-11"
  }
];

/**
 * Root endpoint (opsional)
 * Digunakan untuk memastikan backend berjalan dengan baik
 */
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

/**
 * RESTful API endpoint
 * Method  : GET
 * Endpoint: /api/transactions
 * Fungsi  : Mengirimkan data transaksi dummy dalam format JSON
 */
app.get('/api/transactions', (req, res) => {
  res.json({
    success: true,
    data: dummyTransactions
  });
});

/**
 * Menentukan port server
 */
const PORT = 5000;

/**
 * Menjalankan server Express
 */
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
