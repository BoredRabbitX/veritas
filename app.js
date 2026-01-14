// Indirizzi Nuovi Contratti
const registryAddress = "0xea45643b2b4bf3a5bb12588d7e9b8a147b040964";
const engineAddress = "0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81";
const reviewerAddress = "0x5c65e66016c36de0ec94fe87e3c035ead54aa9da";

const EXPECTED_CHAIN_ID = 420420422; 

// ABI Registry: Gestione identità e autorizzazioni
const abiRegistry = [
    "function businesses(address) view returns (string name, bytes32 category, bool isActive, uint32 volume)",
    "function registerBusiness(string _name, bytes32 _category) external",
    "function setAuth(address _contract, bool _status) external",
    "event BusinessRegistered(address indexed owner, string name, bytes32 category)",
    "event VolumeUpdated(address indexed business, uint32 newVolume)"
];

// ABI Engine: Gestione ricevute (QR) e risposte del merchant
const abiEngine = [
    "function issueReceipt(bytes32 _receiptHash) external",
    "function postReply(bytes32 _receiptId, string _content) external",
    "function merchantReplies(bytes32) view returns (string)",
    "function receiptIssuers(bytes32) view returns (address)",
    "event ReceiptIssued(address indexed merchant, bytes32 indexed receiptHash)",
    "event ReplyPosted(bytes32 indexed receiptId, string content)"
];

// ABI Reviewer: Validazione e sottomissione recensioni
const abiReviewer = [
    "function submitReview(address _business, uint8 _rating, string _content, bytes32 _receiptId) external",
    "function usedReceipts(bytes32) view returns (bool)",
    "event ReviewSubmitted(address indexed business, address indexed author, uint8 rating, string content, bytes32 indexed receiptId)"
];

let provider, signer, regContract, engContract, revContract;

async function connectWallet(silent = false) {
    if (!window.ethereum) {
        if (!silent) alert("MetaMask not found!");
        return false;
    }

    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        
        // Verifica Chain ID (converte BigInt di ethers v6 in Number)
        if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
            if (!silent) alert(`Switch to Paseo AssetHub (ID: ${EXPECTED_CHAIN_ID})`);
            return false;
        }

        const accounts = silent 
            ? await window.ethereum.request({ method: 'eth_accounts' }) 
            : await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
            signer = await provider.getSigner();
            
            // Inizializzazione istanze contratti
            regContract = new ethers.Contract(registryAddress, abiRegistry, signer);
            engContract = new ethers.Contract(engineAddress, abiEngine, signer);
            revContract = new ethers.Contract(reviewerAddress, abiReviewer, signer);
            
            const addr = await signer.getAddress();
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = addr.slice(0, 6) + "..." + addr.slice(-4);
            
            localStorage.setItem('veritas_autoconnect', 'true');

            // Inizializza la logica specifica della pagina
            if (typeof initPage === "function") {
                await initPage();
            }
            return true;
        }
    } catch (e) {
        console.error("Connection error:", e);
    }
    return false;
}

window.addEventListener('load', () => {
    if (localStorage.getItem('veritas_autoconnect') === 'true') {
        connectWallet(true);
    }
});
