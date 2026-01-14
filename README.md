# 🛡️ Veritas Protocol | Beta 1.1
**The Decentralized Trust Layer for On-Chain Verified Reviews**

Veritas is a high-performance modular protocol built on **Paseo AssetHub**. It eliminates "fake reviews" by mathematically linking customer feedback to unique, on-chain cryptographic receipts.



## 🏗️ Protocol Architecture (V3.7)
To ensure maximum efficiency and bypass EVM limits, Veritas utilizes a **Tri-Modular System**:

1. **Veritas Registry** (`0xea45643b2b4bf3a5bb12588d7e9b8a147b040964`)
   - The identity layer for merchants. Stores metadata, categories, and business status.
   
2. **Veritas Engine** (`0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81`)
   - The logic core. Manages **Human-Readable Receipt Codes** (`VER-XXXX`) and stores **Merchant Replies** permanently on-chain.

3. **Veritas Reviewer** (`0x5c65e66016c36de0ec94fe87e3c035ead54aa9da`)
   - The validation gate. Cross-checks Receipt IDs with Issuer addresses before committing reviews to the ledger.

## 💎 Key Features (Beta 1.1)
- **Minimalist UI/UX:** A professional, "Tech-Slate" design focused on clarity and data density.
- **Hybrid RPC Engine:** Blazing fast load times using dedicated RPC for reading and MetaMask for writing transactions.
- **Human-Readable Receipts:** Friendly `VER-XXXX-XXXX` codes instead of raw 66-character hashes.
- **Verified Merchant Identity:** Real-time auto-detection of store names during the review process via blockchain query.
- **On-Chain Engagement:** Business owners can respond directly to customer feedback, creating a transparent loop.

## 🛠️ Technology Stack
- **Network:** Polkadot Paseo AssetHub (Chain ID: `0x190f9636`)
- **Language:** Solidity 0.8.20 (Optimized for AssetHub)
- **Frontend:** HTML5 / Tailwind CSS (Custom Minimalist Theme)
- **Web3:** Ethers.js v6.7
- **Security:** Sanitized DOM injection & On-chain validation gates

## 🚀 Quick Start
1. **Network:** Connect to **Paseo AssetHub** using the "Setup Network" button in the footer.
2. **Faucet:** Get test tokens (`PAS`) via the built-in Faucet link.
3. **Usage:** - **Merchants:** Register your store in the **Merchant Hub** to issue receipts.
   - **Users:** Paste a valid receipt code in the **Review** page to unlock the feedback form.

## 📅 Roadmap 2026
- **Q2 (Engagement):** IPFS storage for photo evidence & automated Telegram alerts for new reviews.
- **Q3 (Governance):** Introduction of the $VER token for community-led dispute resolution.
- **Q4 (Expansion):** Cross-chain review portability via Polkadot XCM.

---
*Developed by The White Rabbit. Trust is no longer a promise, it's a mathematical certainty.*
