// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * DonationContract
 * Smart contract sederhana untuk simulasi donasi
 * Digunakan untuk UAS Pemrograman Web
 */
contract DonationContract {

    // Menyimpan total donasi yang diterima
    uint public totalDonations;

    // Menyimpan jumlah donor
    uint public donorCount;

    /**
     * Fungsi donate
     * Menerima ETH dan menambahkan ke totalDonations
     */
    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        totalDonations += msg.value;
        donorCount++;
    }

    /**
     * Mengembalikan jumlah donor
     */
    function getDonorCount() public view returns (uint) {
        return donorCount;
    }
}
