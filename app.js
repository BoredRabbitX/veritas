const registryAddress = "0xea45643b2b4bf3a5bb12588d7e9b8a147b040964";
const engineAddress = "0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81";
const reviewerAddress = "0x5c65e66016c36de0ec94fe87e3c035ead54aa9da";
const EXPECTED_CHAIN_ID = 420420422; 

// ABI (Mantieni quelli del messaggio precedente...)
const abiRegistry = ["function businesses(address) view returns (string name, bytes32 category, bool isActive, uint32 volume)", "function registerBusiness(string _name, bytes32 _category) external", "function setAuth(address _contract, bool _status) external", "event BusinessRegistered(address indexed owner, string name, bytes32 category)", "event VolumeUpdated(address indexed business, uint32 newVolume)"];
const abiEngine = ["function issueReceipt(bytes32 _receiptHash) external", "function postReply(bytes32 _receiptId, string _content) external", "function merchantReplies(bytes32) view returns (string)", "function receiptIssuers(bytes32) view returns (address)", "event ReceiptIssued(address indexed merchant, bytes32 indexed receiptHash)", "event ReplyPosted(bytes32 indexed receiptId, string content)"];
const abiReviewer = ["function submitReview(address _business, uint8 _rating, string _content, bytes32 _receiptId) external", "function usedReceipts(bytes32) view returns (bool)", "event ReviewSubmitted(address indexed business, address indexed author, uint8 rating, string content, bytes32 indexed receiptId)"];

let provider, signer, regContract, engContract, revContract;

// FUNZIONE SETUP RETE (Dichiarata globale per components.js)
window.addPaseoNetwork = async function() {
    if (!window.ethereum) return alert("Please install MetaMask!");
    
    const params = {
        chainId: '0x190f9636', // 420420422
        chainName: 'Paseo AssetHub',
        nativeCurrency: { name: 'PAS', symbol: 'PAS', decimals: 18 },
        rpcUrls: ['https://pas-rpc.stakeworld.io'],
        blockExplorerUrls: ['https://paseo.subscan.io']
    };

    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [params],
        });
    } catch (e) {
        console.error("Setup network error", e);
    }
};

async function connectWallet(silent = false) {
    if (!window.ethereum) return false;
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
            if (!silent) alert(`Switch to Paseo AssetHub (ID: ${EXPECTED_CHAIN_ID})`);
            return false;
        }
        const accounts = silent ? await window.ethereum.request({ method: 'eth_accounts' }) : await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
            signer = await provider.getSigner();
            regContract = new ethers.Contract(registryAddress, abiRegistry, signer);
            engContract = new ethers.Contract(engineAddress, abiEngine, signer);
            revContract = new ethers.Contract(reviewerAddress, abiReviewer, signer);
            const addr = await signer.getAddress();
            if (document.getElementById('connectBtn')) document.getElementById('connectBtn').innerText = addr.slice(0, 6) + "...";
            localStorage.setItem('veritas_autoconnect', 'true');
            if (typeof initPage === "function") await initPage();
            return true;
        }
    } catch (e) { console.error(e); }
    return false;
}

window.addEventListener('load', () => {
    if (localStorage.getItem('veritas_autoconnect') === 'true') connectWallet(true);
});
