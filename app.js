/** VERITAS CORE - Beta 1.2 
 * Hybrid Reading: Official Polkadot Paseo RPC
 **/

const registryAddress = "0xea45643b2b4bf3a5bb12588d7e9b8a147b040964";
const engineAddress = "0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81";
const reviewerAddress = "0x5c65e66016c36de0ec94fe87e3c035ead54aa9da";
const EXPECTED_CHAIN_ID = 420420422;
const PASEO_RPC = "https://testnet-passet-hub-eth-rpc.polkadot.io";

let provider, signer, regContract, engContract, revContract;

const abiRegistry = ["function businesses(address) view returns (string name, bytes32 category, bool isActive, uint32 volume)","function registerBusiness(string _name, bytes32 _category) external","event BusinessRegistered(address indexed owner, string name, bytes32 category)"];
const abiEngine = ["function issueReceipt(bytes32) external","function postReply(bytes32, string) external","function merchantReplies(bytes32) view returns (string)","function receiptIssuers(bytes32) view returns (address)"];
const abiReviewer = ["function submitReview(address, uint8, string, bytes32) external","event ReviewSubmitted(address indexed business, address indexed author, uint8 rating, string content, bytes32 indexed receiptId)"];

// Inizializzazione Tema
(function() {
    if (localStorage.getItem('veritas-theme') === 'light') document.documentElement.classList.add('light');
})();

window.toggleTheme = function() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('veritas-theme', isLight ? 'light' : 'dark');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.innerText = isLight ? '☀️' : '🌙';
};

// Funzione Core per creare i contratti
function setupContracts(targetProviderOrSigner) {
    regContract = new ethers.Contract(registryAddress, abiRegistry, targetProviderOrSigner);
    engContract = new ethers.Contract(engineAddress, abiEngine, targetProviderOrSigner);
    revContract = new ethers.Contract(reviewerAddress, abiReviewer, targetProviderOrSigner);
}

// Connessione Wallet (Scrittura)
async function connectWallet(silent = false) {
    if (!window.ethereum) return false;
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = silent 
            ? await window.ethereum.request({ method: 'eth_accounts' }) 
            : await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
            signer = await provider.getSigner();
            setupContracts(signer); // Upgrade a modalità scrittura
            const addr = await signer.getAddress();
            if (document.getElementById('connectBtn')) document.getElementById('connectBtn').innerText = addr.slice(0,6) + "...";
            localStorage.setItem('veritas_autoconnect', 'true');
            if (typeof initPage === "function") initPage();
            return true;
        }
    } catch (e) { console.error("Wallet Error:", e); }
    return false;
}

// --- BOOTSTRAP RESILIENTE (Versione Finale) ---
(async function init() {
    console.log("Veritas: Booting Core...");
    
    // 1. Tema immediato
    if (localStorage.getItem('veritas-theme') === 'light') document.documentElement.classList.add('light');

    try {
        // 2. Setup Sola Lettura immediato via RPC
        const publicProvider = new ethers.JsonRpcProvider(PASEO_RPC);
        await setupContracts(publicProvider);
        console.log("Veritas: Public RPC Contracts Ready");
        
        // Lanciamo un evento globale per avvisare le pagine (es. store.html)
        window.dispatchEvent(new Event('contractsReady'));
    } catch (e) {
        console.error("Veritas: RPC Boot failed", e);
    }

    // 3. Gestione Wallet
    window.addEventListener('load', async () => {
        if (localStorage.getItem('veritas_autoconnect') === 'true' && window.ethereum) {
            await connectWallet(true);
            // Riavviamo l'evento se il wallet cambia i contratti in modalità scrittura
            window.dispatchEvent(new Event('contractsReady'));
        }
    });
})();
