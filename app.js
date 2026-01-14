// Indirizzi Contratti Veritas Beta 1.0
const registryAddress = "0xea45643b2b4bf3a5bb12588d7e9b8a147b040964";
const engineAddress = "0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81";
const reviewerAddress = "0x5c65e66016c36de0ec94fe87e3c035ead54aa9da";

// Parametri Rete Paseo AssetHub
const EXPECTED_CHAIN_ID = 420420422; 
const PASEO_RPC = 'https://pas-rpc.stakeworld.io';
const PASEO_EXPLORER = 'https://paseo.subscan.io';

// ABI Registry: Gestione Business e Volumi
const abiRegistry = [
    "function businesses(address) view returns (string name, bytes32 category, bool isActive, uint32 volume)",
    "function registerBusiness(string _name, bytes32 _category) external",
    "function setAuth(address _contract, bool _status) external",
    "event BusinessRegistered(address indexed owner, string name, bytes32 category)",
    "event VolumeUpdated(address indexed business, uint32 newVolume)"
];

// ABI Engine: Gestione Ricevute e Risposte Merchant
const abiEngine = [
    "function issueReceipt(bytes32 _receiptHash) external",
    "function postReply(bytes32 _receiptId, string _content) external",
    "function merchantReplies(bytes32) view returns (string)",
    "function receiptIssuers(bytes32) view returns (address)",
    "event ReceiptIssued(address indexed merchant, bytes32 indexed receiptHash)",
    "event ReplyPosted(bytes32 indexed receiptId, string content)"
];

// ABI Reviewer: Sottomissione Recensioni
const abiReviewer = [
    "function submitReview(address _business, uint8 _rating, string _content, bytes32 _receiptId) external",
    "function usedReceipts(bytes32) view returns (bool)",
    "event ReviewSubmitted(address indexed business, address indexed author, uint8 rating, string content, bytes32 indexed receiptId)"
];

let provider, signer, regContract, engContract, revContract;

/**
 * Aggiunge o switcha alla rete Paseo AssetHub su MetaMask
 */
async function addPaseoNetwork() {
    if (!window.ethereum) return alert("Install MetaMask!");
    
    const params = {
        chainId: '0x190f9636', // 420420422 in hex
        chainName: 'Paseo AssetHub',
        nativeCurrency: { name: 'PAS', symbol: 'PAS', decimals: 18 },
        rpcUrls: [PASEO_RPC],
        blockExplorerUrls: [PASEO_EXPLORER]
    };

    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [params],
        });
    } catch (e) {
        console.error("Error adding network:", e);
    }
}

/**
 * Connessione Wallet e inizializzazione contratti
 */
async function connectWallet(silent = false) {
    if (!window.ethereum) return false;

    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        
        // Controllo Chain ID (ethers v6 usa BigInt)
        if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
            if (!silent) alert(`Switch to Paseo AssetHub (ID: ${EXPECTED_CHAIN_ID})`);
            return false;
        }

        const accounts = silent 
            ? await window.ethereum.request({ method: 'eth_accounts' }) 
            : await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
            signer = await provider.getSigner();
            
            // Inizializzazione Contratti
            regContract = new ethers.Contract(registryAddress, abiRegistry, signer);
            engContract = new ethers.Contract(engineAddress, abiEngine, signer);
            revContract = new ethers.Contract(reviewerAddress, abiReviewer, signer);
            
            const addr = await signer.getAddress();
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = addr.slice(0, 6) + "..." + addr.slice(-4);
            
            localStorage.setItem('veritas_autoconnect', 'true');

            // Avvia la logica specifica della pagina HTML corrente
            if (typeof initPage === "function") await initPage();
            return true;
        }
    } catch (e) {
        console.error("Connection error:", e);
    }
    return false;
}

// Auto-connessione al caricamento
window.addEventListener('load', () => {
    if (localStorage.getItem('veritas_autoconnect') === 'true') {
        connectWallet(true);
    }
});

// Listener per cambio account o rete
if (window.ethereum) {
    window.ethereum.on('accountsChanged', () => location.reload());
    window.ethereum.on('chainChanged', () => location.reload());
}
