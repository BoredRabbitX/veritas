// Global Contract Addresses
const registryAddress = "0x8f91fb51d494b8121761e2c9fc47a400d8d93fab";
const engineAddress = "0x8f825875b9c0eb681af7b4383aa7ded7bf39f6f7";
const reviewerAddress = "0x6abed4f2cb88e2019cca0589e00a3ced212956c8";

// Paseo AssetHub Chain ID
const EXPECTED_CHAIN_ID = 420420422; 

// ABIs - Strictly aligned with V3 Modular Architecture
const abiRegistry = [
    "function businesses(address) view returns (string name, bytes32 category, bool isActive, uint32 volume)",
    "function registerBusiness(string _name, bytes32 _category) external",
    "function setAuth(address _contract, bool _status) external",
    "event BusinessRegistered(address indexed owner, string name, bytes32 category)"
];

const abiEngine = [
    "function issueReceipt(bytes32 _receiptHash) external",
    "function postReply(bytes32 _receiptId, string _content) external",
    "function merchantReplies(bytes32) view returns (string)",
    "function receiptIssuers(bytes32) view returns (address)",
    "event ReceiptIssued(address indexed merchant, bytes32 indexed receiptHash)",
    "event ReplyAdded(bytes32 indexed receiptId, string content)"
];

const abiReviewer = [
    "function submitReview(address _business, uint8 _rating, string _content, string _ipfsHash, bytes32 _receiptId) external",
    "function usedReceipts(bytes32) view returns (bool)",
    "event ReviewSubmitted(address indexed business, address indexed author, uint8 rating, string content, string ipfsHash, bytes32 receiptId)"
];

let provider, signer, regContract, engContract, revContract;

/**
 * Connects to MetaMask and initializes contract instances
 * @param {boolean} silent - If true, won't show alerts (for autoconnect)
 */
async function connectWallet(silent = false) {
    if (!window.ethereum) {
        if (!silent) alert("MetaMask not found. Please install it to use Veritas.");
        return false;
    }

    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        
        // Check Network
        const network = await provider.getNetwork();
        const chainId = Number(network.chainId); // Convert BigInt to Number

        if (chainId !== EXPECTED_CHAIN_ID) {
            if (!silent) alert(`Please switch your wallet network to Paseo AssetHub (ID: ${EXPECTED_CHAIN_ID})`);
            return false;
        }

        // Request Accounts
        const accounts = silent 
            ? await window.ethereum.request({ method: 'eth_accounts' }) 
            : await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
            signer = await provider.getSigner();
            
            // Initialize Contracts
            regContract = new ethers.Contract(registryAddress, abiRegistry, signer);
            engContract = new ethers.Contract(engineAddress, abiEngine, signer);
            revContract = new ethers.Contract(reviewerAddress, abiReviewer, signer);
            
            // UI Update
            const addr = await signer.getAddress();
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = addr.slice(0, 6) + "..." + addr.slice(-4);
            
            localStorage.setItem('veritas_autoconnect', 'true');

            // Initialize Page Logic (if defined in the current HTML file)
            if (typeof initPage === "function") {
                await initPage();
            }
            return true;
        }
    } catch (error) {
        console.error("Veritas Connection Error:", error);
    }
    return false;
}

// Auto-connect on page load
window.addEventListener('load', () => {
    if (localStorage.getItem('veritas_autoconnect') === 'true') {
        connectWallet(true);
    }
});

// Event listener for account changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', () => location.reload());
    window.ethereum.on('chainChanged', () => location.reload());
}
