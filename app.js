const registryAddress = "0x8f91fb51d494b8121761e2c9fc47a400d8d93fab";
const engineAddress = "0x8f825875b9c0eb681af7b4383aa7ded7bf39f6f7";
const reviewerAddress = "0x6abed4f2cb88e2019cca0589e00a3ced212956c8";

const EXPECTED_CHAIN_ID = 420420422; 

const abiRegistry = [
    "function businesses(address) view returns (string name, bytes32 category, bool isActive, uint32 volume)",
    "function registerBusiness(string _name, bytes32 _category) external",
    "event BusinessRegistered(address indexed owner, string name, bytes32 category)"
];

const abiEngine = [
    "function issueReceipt(bytes32 _receiptHash) external",
    "function postReply(bytes32 _receiptId, string _content) external",
    "function merchantReplies(bytes32) view returns (string)",
    "function receiptIssuers(bytes32) view returns (address)",
    "event ReceiptIssued(address indexed merchant, bytes32 indexed receiptHash)"
];

const abiReviewer = [
    "function submitReview(address _business, uint8 _rating, string _content, string _ipfsHash, bytes32 _receiptId) external",
    "function usedReceipts(bytes32) view returns (bool)",
    "event ReviewSubmitted(address indexed business, address indexed author, uint8 rating, string content, string ipfsHash, bytes32 receiptId)"
];

let provider, signer, regContract, engContract, revContract;

async function connectWallet(silent = false) {
    if (!window.ethereum) return false;
    try {
        provider = new ethers.BrowserProvider(window.ethereum, "any");
        const accounts = silent ? await window.ethereum.request({ method: 'eth_accounts' }) : await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
            const network = await provider.getNetwork();
            if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
                if(!silent) alert(`Switch to Paseo AssetHub (${EXPECTED_CHAIN_ID})`);
                return false;
            }

            signer = await provider.getSigner();
            regContract = new ethers.Contract(registryAddress, abiRegistry, signer);
            engContract = new ethers.Contract(engineAddress, abiEngine, signer);
            revContract = new ethers.Contract(reviewerAddress, abiReviewer, signer);
            
            const addr = await signer.getAddress();
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = addr.slice(0,6) + "...";
            localStorage.setItem('veritas_autoconnect', 'true');
            if (typeof initPage === "function") initPage();
            return true;
        }
    } catch (e) { console.error(e); }
    return false;
}

window.addEventListener('load', () => {
    if (localStorage.getItem('veritas_autoconnect') === 'true') connectWallet(true);
});
