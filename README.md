# 🛡️ Veritas Protocol | Beta 1.0
**The Decentralized Trust Layer for On-Chain Verified Reviews**

Veritas is a modular protocol built on **Paseo AssetHub** that mathematically links customer feedback to real on-chain transactions using cryptographic receipts.

## 🏗️ Modular Architecture (V3.5)
To overcome EVM code-size limits and ensure scalability, Veritas is split into three core modules:

1. **Veritas Registry** (`0x8f91...fb51`)
   - The "Single Source of Truth" for merchant identities.
   - Stores store names, categories, and transaction volumes.
   
2. **Veritas Engine** (`0x8f82...f6f7`)
   - Handles receipt issuance and cryptographic storage.
   - Manages on-chain **Merchant Replies** to customer reviews.

3. **Veritas Reviewer** (`0x6ab...56c8`)
   - Process consumer feedback and verifies receipt ownership.
   - Connects reviews to IPFS evidence (Phase 2).

## 🚀 Key Features (Beta 1.0)
- **Zero-Trust Reviews:** Feedback is only accepted if backed by a valid, unused receipt hash.
- **Merchant Hub:** Dedicated interface for store registration and receipt generation.
- **Merchant Engagement:** Business owners can respond directly to feedback on-chain.
- **Explore Directory:** Real-time synchronization with blockchain events to discover verified stores.



## 🛠️ Technology Stack
- **Blockchain:** Polkadot Paseo AssetHub (Chain ID: 420420422)
- **Smart Contracts:** Solidity 0.8.19
- **Frontend:** HTML5, Tailwind CSS, Ethers.js v6
- **QR Engine:** QRCode.js

## 📅 Roadmap 2026
- **Q2 (Engagement):** IPFS photo integration & automated Merchant alerts via Telegram/Discord.
- **Q3 (Governance):** Veritas DAO for dispute resolution and malicious flag handling.
- **Q4 (Scale):** Dedicated Mobile App & Cross-Chain bridges to other parachains.

---
*Created by The White Rabbit. Trust is no longer a promise, it's a mathematical certainty.*
