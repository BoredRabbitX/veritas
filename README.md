# 📜 VERITAS | On-Chain Reputation Protocol
### *Authentic Reviews. Certified by Polkadot Asset Hub.*

![Polkadot](https://img.shields.io/badge/Polkadot-E2007A?style=for-the-badge&logo=polkadot&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![Network](https://img.shields.io/badge/Network-Paseo_Asset_Hub-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Veritas** is a decentralized protocol designed to eliminate fake reviews. Leveraging the power of the **Paseo Asset Hub** blockchain, every feedback is mathematically linked to a real transaction (receipt), creating an immutable trust ecosystem for both merchants and customers.

---

## 🌟 Key Features

* ✅ **Proof of Purchase**: Only users who scan a merchant-generated QR Code can leave a review.
* 🛡️ **Anti-Fraud**: Each receipt ID can only be used once (preventing spam and bulk fake reviews).
* 🌓 **Modern Interface**: Clean Google-inspired design with native **Dark Mode** support.
* ⛓️ **100% On-Chain**: Data is not stored on a private database but is public and verifiable on Polkadot.

---

## 🏗️ System Architecture

The protocol runs on a single "Hub" Smart Contract that manages multiple business entities without needing individual deployments.



1. **Merchant Registration**: Merchants register their wallet address as an official "Business".
2. **QR Generation**: A unique link is generated containing the Receipt ID.
3. **Verification**: The Smart Contract verifies the business is active and the receipt is unused.
4. **Indexing**: The frontend scans blockchain events to calculate the average rating and display history.

---

## 🛠️ Technical Details

### Smart Contract
| Parameter | Value |
| :--- | :--- |
| **Contract Address** | `0x4cb4f27090ab3b07c0faadddcb8ca473db9e05f7` |
| **Network** | Paseo Asset Hub (Polkadot Testnet) |
| **Chain ID** | `424` |
| **Explorer** | [Statescan - Paseo Asset Hub](https://paseo-asset-hub.statescan.io/) |

### Project Structure
* `/veritas/index.html`: Main search portal and landing page.
* `/veritas/dashboard.html`: Merchant control panel (Login/QR Generation).
* `/veritas/review.html`: Customer interface for submitting reviews.
* `/veritas/store.html`: Public store profile with ratings and historical comments.
* `/veritas/app.js`: Web3 logic (Ethers.js) and theme management.
* `/veritas/style.css`: Centralized Google Material Design stylesheet.

---

## 🚀 Getting Started

### 1. Requirements
* A **MetaMask** wallet configured for the Paseo Asset Hub network.
* **PAS** (Paseo) tokens from the [Official Faucet](https://faucet.polkadot.io/).

### 2. Network Configuration (Custom RPC)
* **RPC URL**: `https://paseo-asset-hub-rpc.polkadot.io`
* **Chain ID**: `424`
* **Currency Symbol**: `PAS`

### 3. Local Installation
```bash
# Clone the repository
git clone [https://github.com/your-username/veritas-protocol.git](https://github.com/your-username/veritas-protocol.git)

# Enter the directory
cd veritas

# Open index.html with a local server (e.g., VS Code Live Server)
