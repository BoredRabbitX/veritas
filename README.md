📜 Veritas: On-Chain Verified Reviews
Veritas is a decentralized Web3 application built on Polkadot Asset Hub (Paseo Testnet). It solves the problem of fake reviews by ensuring that every feedback is linked to a verified proof of experience (a digital receipt) signed by the business owner.

🚀 The Problem & The Solution
Traditional review platforms (like TripAdvisor or Yelp) are plagued by bots and fake reviews. Veritas uses blockchain technology to create a trustless ecosystem:

Businesses generate unique, signed QR codes for their customers.

Customers scan the QR to unlock the ability to post a review.

Veracity is guaranteed: No receipt = No review.

🛠 Tech Stack
Blockchain: Polkadot Asset Hub (Paseo Testnet)

Smart Contracts: Solidity (EVM-compatible)

Frontend: HTML5, Tailwind CSS, JavaScript (ES6)

Web3 Library: Ethers.js (v6)

Contract Address: 0xb3dc45518cc51c759193da59772a407dad584852

📂 Project Structure
Plaintext

/veritas
├── index.html       # Landing page and navigation
├── dashboard.html   # Merchant portal to generate QR codes
├── review.html      # Customer portal to submit reviews
├── app.js           # Core Web3 logic and contract interaction
└── style.css        # Custom UI styling and animations
🔧 Installation & Setup
Clone the repository:

Bash

git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd veritas
Serve the files: Since this is a static site using CDN-based libraries, you don't need npm install. You can simply use a "Live Server" extension in VS Code or open index.html in your browser.

Configure MetaMask:

Network Name: Paseo Asset Hub

RPC URL: https://paseo-asset-hub-rpc.polkadot.io

Chain ID: 424

Currency Symbol: PAS

📝 How to Use
For Merchants:
Go to dashboard.html.

Connect your wallet (ensure you are on the Paseo network).

Register your business (one-time transaction).

Enter a Receipt ID and click "Generate QR".

For Customers:
Scan the QR code provided by the merchant.

You will be redirected to review.html with the business and receipt data pre-filled.

Write your review, select a rating, and click "Publish".

Confirm the transaction in MetaMask.

📜 Smart Contract Logic
The contract VeritasProtocol.sol ensures that:

Each ReceiptID can only be used once.

Only registered businesses can authorize reviews.

All data is stored immutably on the Paseo Asset Hub.

Created with ❤️ for the Polkadot Ecosystem.
