/** * VERITAS CORE - Beta 1.5 
 * Hybrid Engine: Official Polkadot Paseo RPC + MetaMask
 * Features: Request Caching, Circuit Breaker, XSS Protection
 **/

// --- CONFIGURATION ---
const registryAddress = "0xea45643b2b4bf3a5bb12588d7e9b8a147b040964";
const engineAddress = "0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81";
const reviewerAddress = "0x5c65e66016c36de0ec94fe87e3c035ead54aa9da";
const EXPECTED_CHAIN_ID = 420420422;
const PASEO_RPC = "https://testnet-passet-hub-eth-rpc.polkadot.io";

let provider, signer, regContract, engContract, revContract;
window.isVeritasReady = false;

// --- ABIs ---
const abiRegistry = ["function businesses(address) view returns (string name, bytes32 category, bool isActive, uint32 volume)","function registerBusiness(string _name, bytes32 _category) external","event BusinessRegistered(address indexed owner, string name, bytes32 category)"];
const abiEngine = ["function issueReceipt(bytes32) external","function postReply(bytes32, string) external","function merchantReplies(bytes32) view returns (string)","function receiptIssuers(bytes32) view returns (address)"];
const abiReviewer = ["function submitReview(address, uint8, string, bytes32) external","event ReviewSubmitted(address indexed business, address indexed author, uint8 rating, string content, bytes32 indexed receiptId)"];

// --- 1. UTILS: PERFORMANCE & SECURITY ---

// Cache per le chiamate costose (es. info merchant che non cambiano spesso)
const _cache = new Map();
const CACHE_TTL = 60000; // 1 minuto

window.getCachedData = async (key, fetchFn) => {
    const now = Date.now();
    if (_cache.has(key) && (now - _cache.get(key).ts < CACHE_TTL)) {
        return _cache.get(key).data;
    }
    const data = await fetchFn();
    _cache.set(key, { data, ts: now });
    return data;
};

// Sanitizzazione testo per prevenire XSS nelle recensioni
window.sanitize = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};

// Circuit Breaker per RPC
let rpcFailures = 0;
let isRpcSuspended = false;

// --- 2. CORE FUNCTIONS ---

function setupContracts(target) {
    regContract = new ethers.Contract(registryAddress, abiRegistry, target);
    engContract = new ethers.Contract(engineAddress, abiEngine, target);
    revContract = new ethers.Contract(reviewerAddress, abiReviewer, target);
}

window.toggleTheme = function() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('veritas-theme', isLight ? 'light' : 'dark');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.innerText = isLight ? '☀️' : '🌙';
};

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
            
            // Aggiorna UI se presente
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = addr.slice(0,6) + "...";
            
            localStorage.setItem('veritas_autoconnect', 'true');
            window.isVeritasReady = true;
            window.dispatchEvent(new Event('contractsReady'));
            return true;
        }
    } catch (e) { console.error("Wallet Connection Refused", e); }
    return false;
}

window.addPaseoNetwork = async function() {
    const params = [{ 
        chainId: '0x190f9636', 
        chainName: 'Paseo AssetHub', 
        nativeCurrency: { name: 'Paseo', symbol: 'PAS', decimals: 18 }, 
        rpcUrls: [PASEO_RPC], 
        blockExplorerUrls: ['https://paseo.subscan.io'] 
    }];
    await window.ethereum.request({ method: 'wallet_addEthereumChain', params });
};

window.copyAddressAndGoToFaucet = async function() {
    if (!signer) return alert("Connect wallet first!");
    const addr = await signer.getAddress();
    await navigator.clipboard.writeText(addr);
    alert("Address copied to clipboard!"); 
    window.open("https://faucet.polkadot.io/", "_blank");
};

// --- 3. BOOTSTRAP RESILIENTE ---

(async function init() {
    console.log("Veritas: Launching...");

    // Tema
    if (localStorage.getItem('veritas-theme') === 'light') document.documentElement.classList.add('light');

    // Inizializzazione Sola Lettura (RPC)
    try {
        if (isRpcSuspended) throw new Error("RPC Suspended");
        
        const publicProvider = new ethers.JsonRpcProvider(PASEO_RPC);
        setupContracts(publicProvider);
        
        // Segnale di pronto
        window.isVeritasReady = true;
        console.log("Veritas: Public Data Synced");
        
        // Dispatch evento con delay per garantire che i listener nelle pagine siano attivi
        setTimeout(() => window.dispatchEvent(new Event('contractsReady')), 150);

    } catch (e) {
        rpcFailures++;
        console.warn("Veritas: RPC Fallback needed", e);
        if (rpcFailures > 5) {
            isRpcSuspended = true;
            setTimeout(() => { isRpcSuspended = false; rpcFailures = 0; }, 30000);
        }
    }

    // Autoconnect se disponibile
    window.addEventListener('load', () => {
        if (localStorage.getItem('veritas_autoconnect') === 'true') {
            connectWallet(true);
        }
    });
})();
