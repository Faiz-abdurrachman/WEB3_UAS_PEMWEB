/**
 * server.js
 * Backend API for Web3 DApp UAS
 * Provides transaction history data and API endpoints
 */

const express = require('express');
const cors = require('cors');

// Initialize Express application
const app = express();
const PORT = 5000;

// Middleware Configuration
// Enable CORS for frontend communication
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

/**
 * Transaction Data Interface
 * @typedef {Object} Transaction
 * @property {number} id - Unique identifier
 * @property {string} from - Sender address
 * @property {string} to - Recipient address
 * @property {string} amount - Transaction amount in ETH
 * @property {string} timestamp - Date of transaction
 */

/**
 * Mock Data: Transaction History
 * Simulates blockchain transaction records
 * @type {Transaction[]}
 */
const dummyTransactions = [
  {
    id: 1,
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0xC2e16AAe1BBe7b40ED2eA95025A118AbCa18486D",
    amount: "0.5 ETH",
    timestamp: "2025-01-12"
  },
  {
    id: 2,
    from: "0x123f681646d4a755815f9cb19e1acc8565a0c2ac",
    to: "0xC2e16AAe1BBe7b40ED2eA95025A118AbCa18486D",
    amount: "1.2 ETH",
    timestamp: "2025-01-11"
  },
  {
    id: 3,
    from: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
    to: "0xC2e16AAe1BBe7b40ED2eA95025A118AbCa18486D",
    amount: "0.05 ETH",
    timestamp: "2025-01-10"
  },
  {
    id: 4,
    from: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    to: "0xC2e16AAe1BBe7b40ED2eA95025A118AbCa18486D",
    amount: "2.0 ETH",
    timestamp: "2025-01-08"
  }
];

/**
 * Health Check Endpoint
 * GET /
 * Verifies that the server is running correctly
 */
app.get('/', (req, res) => {
  res.status(200).send('Backend API is running. Access /api/transactions for data.');
});

/**
 * Get Transactions Endpoint
 * GET /api/transactions
 * Returns list of recent transactions
 */
app.get('/api/transactions', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: dummyTransactions.length,
      data: dummyTransactions,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
});

/**
 * Start Server
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
