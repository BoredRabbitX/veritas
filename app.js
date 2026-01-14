const registryAddress = "0x8f91fb51d494b8121761e2c9fc47a400d8d93fab";
const engineAddress = "0x8f825875b9c0eb681af7b4383aa7ded7bf39f6f7";
const reviewerAddress = "0x6abed4f2cb88e2019cca0589e00a3ced212956c8";
const EXPECTED_CHAIN_ID = 420420422; 

// ABI REGISTRY: Completo di eventi per l'Explorer
const abiRegistry = [
    "function businesses(address) view returns (string name, bytes32 category, bool isActive, uint32 volume)",
    "function registerBusiness(string _name, bytes32 _category) external",
    "function setAuth(address _contract, bool _status) external",
    "function incrementVolume(address _business) external",
    "event BusinessRegistered(address indexed owner, string name, bytes32 category)"
];

// ABI ENGINE: Basato sulle funzioni di gestione ricevute e risposte
const abiEngine = [
    "function issueReceipt(bytes32 _receiptHash) external",
    "function postReply(bytes32 _receiptId, string _content) external",
    "function merchantReplies(bytes32) view returns (string)",
    "event ReceiptIssued(address indexed merchant, bytes32 indexed receiptHash)"
];

// ABI REVIEWER: Basato sulla sottomissione delle recensioni
const abiReviewer = [
    "function submitReview(address _business, uint8 _rating, string _content, string _ipfsHash, bytes32 _receiptId) external",
    "event ReviewSubmitted(address indexed business, address indexed author, uint8 rating, string content, string ipfsHash, bytes32 receiptId)"
];

let provider, signer, regContract, engContract, revContract;

async function connectWallet(silent = false) {
    if (!window.ethereum) return false;
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        
        if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
            if(!silent) alert("Switch to Paseo AssetHub!");
            return false;
        }

        const accounts = silent 
            ? await window.ethereum.request({ method: 'eth_accounts' }) 
            : await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
            signer = await provider.getSigner();
            regContract = new ethers.Contract(registryAddress, abiRegistry, signer);
            engContract = new ethers.Contract(engineAddress, abiEngine, signer);
            revContract = new ethers.Contract(reviewerAddress, abiReviewer, signer);
            
            const addr = await signer.getAddress();
            document.getElementById('connectBtn').innerText = addr.slice(0,6) + "...";
            
            if (typeof initPage === "function") await initPage();
            return true;
        }
    } catch (e) { console.error("Connection Error:", e); }
    return false;
}

window.addEventListener('load', () => connectWallet(true));
