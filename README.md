# Web3 DApp UAS Pemrograman Web

Aplikasi Terdesentralisasi (DApp) untuk donasi ETH pada Jaringan Sepolia Testnet. Proyek ini mendemonstrasikan kemampuan pengembangan Web3 full-stack menggunakan React, Node.js, dan Smart Contracts.

## Ikhtisar Proyek

Aplikasi ini memungkinkan pengguna untuk:

1. Menghubungkan dompet MetaMask mereka secara aman
2. Melihat saldo dompet dan status jaringan secara real-time
3. Melakukan donasi ETH ke smart contract yang telah dideploy
4. Melihat statistik donasi langsung dari blockchain
5. Melihat riwayat transaksi terkini dari server

## Teknologi yang Digunakan

- **Frontend:** React.js, Ethers.js v6
- **Backend:** Node.js, Express.js
- **Blockchain:** Solidity, Ethereum Sepolia Testnet
- **Styling:** Modern CSS3, CSS Grid/Flexbox (Sistem Desain Kustom)

## Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:

- Node.js (v16 atau lebih baru)
- npm (Node Package Manager)
- Ekstensi Browser MetaMask

## Panduan Instalasi

Ikuti langkah-langkah berikut untuk mengatur proyek secara lokal:

1. **Clone repositori**

   ```bash
   git clone https://github.com/Faiz-abdurrachman/WEB3_UAS_PEMWEB.git
   cd web3_uas
   ```

2. **Instal Dependensi Frontend**

   ```bash
   cd frontend
   npm install
   ```

3. **Instal Dependensi Backend**
   ```bash
   cd ../backend
   npm install
   ```

## Menjalankan Aplikasi

Anda perlu menjalankan server backend dan klien frontend secara bersamaan.

1. **Jalankan Server Backend**
   Buka terminal dan jalankan:

   ```bash
   cd backend
   npm start
   ```

   Server akan berjalan di `http://localhost:5000`

2. **Jalankan Klien Frontend**
   Buka terminal baru dan jalankan:
   ```bash
   cd frontend
   npm start
   ```
   Aplikasi akan terbuka di browser Anda di `http://localhost:3000`

## Struktur Proyek

```
web3_uas/
├── frontend/                 # Aplikasi Frontend React
│   ├── src/
│   │   ├── components/       # Komponen UI
│   │   │   ├── WalletConnect.js   # Logika koneksi dompet
│   │   │   ├── DonateForm.js      # Antarmuka donasi
│   │   │   ├── ContractData.js    # Interaksi smart contract
│   │   │   ├── TransactionList.js # Tampilan riwayat transaksi
│   │   │   └── BalanceDisplay.js  # Visualisasi saldo
│   │   ├── App.js           # Tata letak aplikasi utama
│   │   ├── App.css          # Styling komponen
│   │   ├── index.css        # Sistem desain global
│   │   └── contract.js      # ABI Kontrak dan konfigurasi
│   └── package.json
├── backend/                  # Server Backend Express
│   ├── server.js            # Endpoint API & konfigurasi server
│   └── package.json
└── smart-contracts/          # Kontrak Solidity
    └── DonationContract.sol # Logika donasi utama
```

## Detail Smart Contract

- **Jaringan:** Sepolia Testnet
- **Alamat Kontrak:** `0xC2e16AAe1BBe7b40ED2eA95025A118AbCa18486D`
- **Versi Kompiler:** Solidity ^0.8.0

## Pemecahan Masalah (Troubleshooting)

### Masalah Koneksi MetaMask

- Pastikan ekstensi MetaMask sudah terinstal.
- Verifikasi bahwa Anda terhubung ke **Sepolia Testnet**.
- Refresh halaman jika dompet tidak segera terhubung.

### Kegagalan Transaksi

- Pastikan Anda memiliki cukup Sepolia ETH (termasuk biaya gas).
- Anda bisa mendapatkan tes ETH gratis dari Sepolia Faucet.
- Periksa konsol browser untuk pesan kesalahan yang lebih rinci.

## Lisensi

Proyek ini dibuat untuk Ujian Akhir Semester (UAS) Pemrograman Web.
Hak cipta dilindungi undang-undang.
