# Web3 Donation DApp

A decentralized application (DApp) for ETH donations on the Ethereum Sepolia Testnet. This project demonstrates full-stack Web3 development capabilities using React, Node.js, and Smart Contracts.

## Project Overview

This application allows users to:

1. Connect their MetaMask wallet securely
2. View real-time wallet balance and network status
3. Donate ETH to a deployed smart contract
4. View live donation statistics from the blockchain
5. See a history of recent transactions

## Technology Stack

- **Frontend:** React.js, Ethers.js v6
- **Backend:** Node.js, Express.js
- **Blockchain:** Solidity, Ethereum Sepolia Testnet
- **Styling:** Modern CSS3, CSS Grid/Flexbox (Custom Design System)

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (Node Package Manager)
- MetaMask Browser Extension

## Installation Guide

Follow these steps to set up the project locally:

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd web3_uas
   ```

2. **Install Frontend Dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

## Running the Application

You need to run both the backend server and frontend client simultaneously.

1. **Start the Backend Server**
   Open a terminal and run:

   ```bash
   cd backend
   npm start
   ```

   The server will start on `http://localhost:5000`

2. **Start the Frontend Client**
   Open a new terminal window and run:
   ```bash
   cd frontend
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

## Project Structure

```
web3_uas/
├── frontend/                 # React Frontend Application
│   ├── src/
│   │   ├── components/       # UI Components
│   │   │   ├── WalletConnect.js   # Wallet connection logic
│   │   │   ├── DonateForm.js      # Donation interface
│   │   │   ├── ContractData.js    # Smart contract interaction
│   │   │   ├── TransactionList.js # Transaction history display
│   │   │   └── BalanceDisplay.js  # Balance visualization
│   │   ├── App.js           # Main application layout
│   │   ├── App.css          # Component styling
│   │   ├── index.css        # Global design system
│   │   └── contract.js      # Contract ABI and configuration
│   └── package.json
├── backend/                  # Express Backend Server
│   ├── server.js            # API endpoints & server config
│   └── package.json
└── smart-contracts/          # Solidity Contracts
    └── DonationContract.sol # Main donation logic
```

## Smart Contract Details

- **Network:** Sepolia Testnet
- **Contract Address:** `0xC2e16AAe1BBe7b40ED2eA95025A118AbCa18486D`
- **Compiler Version:** Solidity ^0.8.0

## Troubleshooting

### MetaMask Connection Issues

- Ensure you have the MetaMask extension installed.
- Verify you are connected to the **Sepolia Testnet**.
- Refresh the page if the wallet does not connect immediately.

### Transaction Failures

- Ensure you have sufficient Sepolia ETH (including gas fees).
- You can get free test ETH from a Sepolia Faucet.
- Check the console for detailed error messages.

## License

This project is created for the Web Programming Final Exam.
All rights reserved.
