/** * VERITAS CORE - Beta 1.6 
 * Hybrid Engine: RPC + MetaMask 
 **/

const registryAddress = "0xea45643b2b4bf3a5bb12588d7e9b8a147b040964";
const engineAddress = "0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81";
const reviewerAddress = "0x5c65e66016c36de0ec94fe87e3c035ead54aa9da";
const EXPECTED_CHAIN_ID = 420420422;
const PASEO_RPC = "https://testnet-passet-hub-eth-rpc.polkadot.io";

let provider, signer, regContract, engContract, revContract;
window.isVeritasReady = false;

const abiRegistry = ["function businesses(address) view returns (string name, bytes32 category, bool isActive, uint32 volume)","function registerBusiness(string _name, bytes32 _category) external","event BusinessRegistered(address indexed owner, string name, bytes32 category)"];
const abiEngine = ["function issueReceipt(bytes32) external","function postReply(bytes32, string) external","function merchantReplies(bytes32) view returns (string)","function receiptIssuers(bytes32) view returns (address)"];
const abiReviewer = ["function submitReview(address, uint8, string, bytes32) external","event ReviewSubmitted(address indexed business, address indexed author, uint8 rating, string content, bytes32 indexed receiptId)"];

// --- UTILS ---
window.sanitize = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};

function setupContracts(target) {
    regContract = new ethers.Contract(registryAddress, abiRegistry, target);
    engContract = new ethers.Contract(engineAddress, abiEngine, target);
    revContract = new ethers.Contract(reviewerAddress, abiReviewer, target);
}

// --- CORE ---
async function connectWallet(silent = false) {
    if (!window.ethereum) return false;
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = silent 
            ? await window.ethereum.request({ method: 'eth_accounts' }) 
            : await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
            signer = await provider.getSigner();
            setupContracts(signer);
            const addr = await signer.getAddress();
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = addr.slice(0,6) + "...";
            
            localStorage.setItem('veritas_autoconnect', 'true');
            window.isVeritasReady = true;
            window.dispatchEvent(new Event('contractsReady'));
            return true;
        }
    } catch (e) { console.error("Wallet Error", e); }
    return false;
}

// --- BOOTSTRAP ---
async function startVeritas() {
    console.log("Veritas: Booting...");
    
    // Tema
    if (localStorage.getItem('veritas-theme') === 'light') document.documentElement.classList.add('light');

    // 1. Setup RPC Immediato
    try {
        const publicProvider = new ethers.JsonRpcProvider(PASEO_RPC);
        setupContracts(publicProvider);
        window.isVeritasReady = true;
        console.log("Veritas: Public RPC Ready");
        
        // Lanciamo l'evento per le pagine
        window.dispatchEvent(new Event('contractsReady'));
    } catch (e) { console.error("RPC Error", e); }

    // 2. Tenta Autoconnect
    if (localStorage.getItem('veritas_autoconnect') === 'true') {
        await connectWallet(true);
    }
}

// Avviamo tutto quando il DOM è pronto
window.addEventListener('load', startVeritas);

// Theme Toggle
window.toggleTheme = function() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('veritas-theme', isLight ? 'light' : 'dark');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.innerText = isLight ? '☀️' : '🌙';
};
