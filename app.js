/** * VERITAS CORE - Beta 1.0 
 * Hybrid Reading: Public RPC + MetaMask
 **/

const registryAddress = "0xea45643b2b4bf3a5bb12588d7e9b8a147b040964";
const engineAddress = "0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81";
const reviewerAddress = "0x5c65e66016c36de0ec94fe87e3c035ead54aa9da";
const EXPECTED_CHAIN_ID = 420420422;
const PASEO_RPC = "https://pas-rpc.stakeworld.io";

let provider, signer, regContract, engContract, revContract;

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

// --- LOGICA DI INIZIALIZZAZIONE CONTRATTI ---
async function setupContracts(target) {
    regContract = new ethers.Contract(registryAddress, abiRegistry, target);
    engContract = new ethers.Contract(engineAddress, abiEngine, target);
    revContract = new ethers.Contract(reviewerAddress, abiReviewer, target);
}

// --- THEME ---
window.toggleTheme = function() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('veritas-theme', isLight ? 'light' : 'dark');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.innerText = isLight ? '☀️' : '🌙';
};

// --- WALLET ---
async function connectWallet(silent = false) {
    if (!window.ethereum) return false;
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = silent 
            ? await window.ethereum.request({ method: 'eth_accounts' }) 
            : await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
            signer = await provider.getSigner();
            await setupContracts(signer); // Passa a modalità scrittura
            
            const addr = await signer.getAddress();
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = addr.slice(0,6) + "...";
            
            localStorage.setItem('veritas_autoconnect', 'true');
            if (typeof initPage === "function") await initPage();
            return true;
        }
    } catch (e) { console.error(e); }
    return false;
}

window.addPaseoNetwork = async function() {
    const params = [{ chainId: '0x190f9636', chainName: 'Paseo AssetHub', nativeCurrency: { name: 'Paseo', symbol: 'PAS', decimals: 18 }, rpcUrls: [PASEO_RPC], blockExplorerUrls: ['https://paseo.subscan.io'] }];
    await window.ethereum.request({ method: 'wallet_addEthereumChain', params });
};

window.copyAddressAndGoToFaucet = async function() {
    if (!signer) return alert("Connect wallet first!");
    const addr = await signer.getAddress();
    await navigator.clipboard.writeText(addr);
    alert("Address copied!");
    window.open("https://faucet.polkadot.io/", "_blank");
};

// --- BOOTSTRAP ---
(async function init() {
    // 1. Tema
    if (localStorage.getItem('veritas-theme') === 'light') document.documentElement.classList.add('light');

    // 2. Fallback Sola Lettura immediato
    const publicProvider = new ethers.JsonRpcProvider(PASEO_RPC);
    await setupContracts(publicProvider);

    // 3. Gestione caricamento pagina
    window.addEventListener('load', async () => {
        // Se l'utente era già connesso, prova il ripristino
        if (localStorage.getItem('veritas_autoconnect') === 'true') {
            await connectWallet(true);
        } else {
            // Se non è connesso, carica comunque i dati tramite RPC
            if (typeof initPage === "function") await initPage();
        }
    });
})();
