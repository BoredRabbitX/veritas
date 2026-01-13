# 📜 VERITAS | On-Chain Reputation Protocol
### *Verified Reviews Powered by Polkadot Asset Hub*

![Polkadot](https://img.shields.io/badge/Polkadot-E2007A?style=for-the-badge&logo=polkadot&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![Paseo](https://img.shields.io/badge/Network-Paseo_Asset_Hub-blueviolet?style=for-the-badge)

**Veritas** is a decentralized application (dApp) designed to eliminate fake reviews. By leveraging the **Asset Hub system parachain**, Veritas ensures that every feedback is mathematically linked to a real transaction, creating an immutable trail of trust.

---

## 🏗 System Architecture

The protocol operates on a "Proof of Purchase" mechanism:
1. **Merchant** signs a unique Receipt ID off-chain.
2. **Customer** receives a QR code containing the signature.
3. **Smart Contract** verifies the signature and the Receipt ID uniqueness.
4. **Blockchain** stores the review permanently.



---

## ⛓️ On-Chain Identity & Deployment

The core logic is deployed on the **Paseo Asset Hub (EVM layer)**.

| Parameter | Value |
| :--- | :--- |
| **Contract Address** | `0xb3dc45518cc51c759193da59772a407dad584852` |
| **Network** | Paseo Asset Hub (Testnet) |
| **Chain ID** | `424` |
| **Currency** | `PAS` (Paseo Token) |
| **Explorer** | [Statescan - Paseo Asset Hub](https://paseo-asset-hub.statescan.io/) |

---

## 🚀 Live Demo & Folder Structure

The project is hosted in the `/veritas` directory for easy access via GitHub Pages.

```text
/veritas
├── index.html       # Entry point: Hero section & Navigation
├── dashboard.html   # Business portal: QR Generation logic
├── review.html      # User portal: Signature verification & Transaction UI
├── app.js           # Ethers.js v6 implementation & ABI Bridge
└── style.css        # Web3-optimized UI/UX components
🛠️ How to Test
1. Configure your Wallet
Add the Paseo Asset Hub network to MetaMask:

RPC: https://paseo-asset-hub-rpc.polkadot.io

Chain ID: 424

Symbol: PAS

2. Get Test Tokens
Visit the Paseo Faucet to receive free PAS tokens to cover gas fees.

3. Run Locally
git clone [https://github.com/YOUR_USER/YOUR_REPO.git](https://github.com/YOUR_USER/YOUR_REPO.git)
# Open /veritas/index.html in any modern browser

🔐 Security Features
Anti-Replay: Each ReceiptID is hashed and mapped. Once a review is posted, the ID is "burned" on-chain.

Merchant Auth: Only signatures from the registered business address can authorize a review entry.

Privacy: Reviews are linked to the transaction, but user personal data remains off-chain.

🗺️ Roadmap
[x] Smart Contract Deployment on Paseo

[x] MVP Web Interface

[ ] IPFS Integration for high-resolution images

[ ] Native Polkadot Identity (People Chain) integration

[ ] Rewards system using native Assets on Asset Hub

Developed for the Polkadot Web3 Ecosystem.
