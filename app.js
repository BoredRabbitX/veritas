/** * VERITAS CORE - Stable 1.0
 * Logic: Hybrid RPC (Reading) + MetaMask (Writing)
 **/

const registryAddress = "0xea45643b2b4bf3a5bb12588d7e9b8a147b040964";
const engineAddress = "0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81";
const reviewerAddress = "0x5c65e66016c36de0ec94fe87e3c035ead54aa9da";
const PASEO_RPC = "https://testnet-passet-hub-eth-rpc.polkadot.io";

let provider, signer, regContract, engContract, revContract;
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

// Utility: Sicurezza testi
window.sanitize = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};

// Utility: Configurazione contratti
function setupContracts(target) {
    regContract = new ethers.Contract(registryAddress, abiRegistry, target);
    engContract = new ethers.Contract(engineAddress, abiEngine, target);
    revContract = new ethers.Contract(reviewerAddress, abiReviewer, target);
}

// Funzione globale per connettere il wallet (chiamata dal tasto nell'header)
window.connectWallet = async function() {
    if (!window.ethereum) return alert("Please install MetaMask!");
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        setupContracts(signer);
        
        // Aggiorna il tasto nell'header (ID definito in components.js)
        const btn = document.getElementById('connectBtn');
        if (btn) btn.innerText = (await signer.getAddress()).slice(0,6) + "...";
        
        localStorage.setItem('veritas_autoconnect', 'true');
        window.isVeritasReady = true;
        window.dispatchEvent(new Event('contractsReady'));
        
        // Se la pagina ha una funzione initPage, la eseguiamo
        if (typeof initPage === "function") initPage();
    } catch (e) {
        console.error("Connection failed", e);
    }
};

// Toggle Tema (chiamata da components.js)
window.toggleTheme = function() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('veritas-theme', isLight ? 'light' : 'dark');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.innerText = isLight ? '☀️' : '🌙';
};

// BOOTSTRAP: Caricamento iniziale
window.addEventListener('load', async () => {
    // 1. Tema
    if (localStorage.getItem('veritas-theme') === 'light') document.documentElement.classList.add('light');

    // 2. Connessione RPC (Sola lettura) per far vedere subito i dati
    try {
        const pubProvider = new ethers.JsonRpcProvider(PASEO_RPC);
        setupContracts(pubProvider);
        window.isVeritasReady = true;
        console.log("Veritas: Network Connected (Read-Only)");
        
        // Avvisa la pagina che può caricare i dati
        window.dispatchEvent(new Event('contractsReady'));
        if (typeof initPage === "function") initPage();
    } catch (e) {
        console.error("RPC Connection failed", e);
    }

    // 3. Auto-connect wallet se l'utente era già loggato
    if (localStorage.getItem('veritas_autoconnect') === 'true' && window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            signer = await provider.getSigner();
            setupContracts(signer);
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = (await signer.getAddress()).slice(0,6) + "...";
            window.dispatchEvent(new Event('contractsReady'));
        }
    }
});
