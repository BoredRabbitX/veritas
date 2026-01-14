/** * VERITAS CORE - Stable 1.2 (English Edition)
 * Hybrid Engine: RPC (Reading) + MetaMask (Writing)
 * Optimized for Global Exposure
 **/

const registryAddress = "0xea45643b2b4bf3a5bb12588d7e9b8a147b040964";
const engineAddress = "0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81";
const reviewerAddress = "0x5c65e66016c36de0ec94fe87e3c035ead54aa9da";
const PASEO_RPC = "https://testnet-passet-hub-eth-rpc.polkadot.io";

// Esponiamo i contratti globalmente su window
window.regContract = null;
window.engContract = null;
window.revContract = null;
window.signer = null;
window.isVeritasReady = false;

const abiRegistry = [
    "function businesses(address) view returns (string name, bytes32 category, bool isActive, uint32 volume)",
    "function registerBusiness(string _name, bytes32 _category) external",
    "event BusinessRegistered(address indexed owner, string name, bytes32 category)"
];
const abiEngine = [
    "function issueReceipt(bytes32) external",
    "function postReply(bytes32, string) external",
    "function merchantReplies(bytes32) view returns (string)",
    "function receiptIssuers(bytes32) view returns (address)"
];
const abiReviewer = [
    "function submitReview(address, uint8, string, bytes32) external",
    "event ReviewSubmitted(address indexed business, address indexed author, uint8 rating, string content, bytes32 indexed receiptId)"
];

window.sanitize = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};

// Funzione di setup che assegna tutto a window
function setupContracts(target) {
    window.regContract = new ethers.Contract(registryAddress, abiRegistry, target);
    window.engContract = new ethers.Contract(engineAddress, abiEngine, target);
    window.revContract = new ethers.Contract(reviewerAddress, abiReviewer, target);
    console.log("Contracts linked to:", target.constructor.name);
}

window.connectWallet = async function() {
    if (!window.ethereum) return alert("Please install MetaMask!");
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        window.signer = await provider.getSigner();
        
        setupContracts(window.signer);
        
        const addr = await window.signer.getAddress();
        const btn = document.getElementById('connectBtn');
        if (btn) btn.innerText = addr.slice(0,6) + "...";
        
        localStorage.setItem('veritas_autoconnect', 'true');
        window.isVeritasReady = true;
        
        // Lanciamo l'evento che sblocca Dashboard e Review
        window.dispatchEvent(new Event('contractsReady'));
        
        if (typeof initPage === "function") initPage();
    } catch (e) { console.error("Connection failed", e); }
};

window.toggleTheme = function() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('veritas-theme', isLight ? 'light' : 'dark');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.innerText = isLight ? '☀️' : '🌙';
};

window.addPaseoNetwork = async function() {
    if(!window.ethereum) return;
    const params = [{ 
        chainId: '0x190f9636', 
        chainName: 'Paseo AssetHub', 
        nativeCurrency: { name: 'Paseo', symbol: 'PAS', decimals: 18 }, 
        rpcUrls: [PASEO_RPC], 
        blockExplorerUrls: ['https://paseo.subscan.io'] 
    }];
    try {
        await window.ethereum.request({ method: 'wallet_addEthereumChain', params });
    } catch (e) { console.error("Failed to add network", e); }
};

window.copyAddressAndGoToFaucet = async function() {
    if (!window.signer) return alert("Connect wallet first!");
    const addr = await window.signer.getAddress();
    await navigator.clipboard.writeText(addr);
    alert("Address copied! Opening Faucet..."); 
    window.open("https://faucet.polkadot.io/", "_blank");
};

// --- LOGICA DI CARICAMENTO AUTOMATICO ---
window.addEventListener('load', async () => {
    // 1. Tema
    if (localStorage.getItem('veritas-theme') === 'light') document.documentElement.classList.add('light');

    // 2. Inizializzazione Pubblica (Sola Lettura via RPC)
    try {
        const pubProvider = new ethers.JsonRpcProvider(PASEO_RPC);
        setupContracts(pubProvider);
        window.isVeritasReady = true;
        window.dispatchEvent(new Event('contractsReady'));
    } catch (e) { console.error("RPC Error", e); }

    // 3. Auto-Connessione MetaMask (Scrittura)
    if (localStorage.getItem('veritas_autoconnect') === 'true' && window.ethereum) {
        try {
            const browserProvider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                window.signer = await browserProvider.getSigner();
                setupContracts(window.signer);
                
                const addr = await window.signer.getAddress();
                const btn = document.getElementById('connectBtn');
                if (btn) btn.innerText = addr.slice(0,6) + "...";
                
                window.dispatchEvent(new Event('contractsReady'));
                if (typeof initPage === "function") initPage();
            }
        } catch (e) { console.error("Autoconnect failed", e); }
    }
});
