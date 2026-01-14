/** * VERITAS CORE - Beta 1.0 
 * Hybrid Provider: Public RPC for Reading + MetaMask for Writing
 **/

const registryAddress = "0xea45643b2b4bf3a5bb12588d7e9b8a147b040964";
const engineAddress = "0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81";
const reviewerAddress = "0x5c65e66016c36de0ec94fe87e3c035ead54aa9da";
const EXPECTED_CHAIN_ID = 420420422;
const PASEO_RPC = "https://pas-rpc.stakeworld.io"; // Public Node

let provider, signer, regContract, engContract, revContract;

// --- 1. ABI DEFINITIONS ---
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

// --- 2. THEME ---
window.toggleTheme = function() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('veritas-theme', isLight ? 'light' : 'dark');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.innerText = isLight ? '☀️' : '🌙';
};

// --- 3. SMART FAUCET ---
window.copyAddressAndGoToFaucet = async function() {
    if (!signer) return alert("Please connect your wallet first!");
    const addr = await signer.getAddress();
    await navigator.clipboard.writeText(addr);
    alert("Address copied! Paste it in the faucet.");
    window.open("https://faucet.polkadot.io/", "_blank");
};

// --- 4. INITIALIZATION (READ-ONLY FALLBACK) ---
async function initContracts(targetProviderOrSigner) {
    regContract = new ethers.Contract(registryAddress, abiRegistry, targetProviderOrSigner);
    engContract = new ethers.Contract(engineAddress, abiEngine, targetProviderOrSigner);
    revContract = new ethers.Contract(reviewerAddress, abiReviewer, targetProviderOrSigner);
}

// --- 5. WALLET ---
async function connectWallet(silent = false) {
    if (!window.ethereum) {
        if (!silent) alert("MetaMask not found. Initializing in read-only mode.");
        return false;
    }
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = silent 
            ? await window.ethereum.request({ method: 'eth_accounts' }) 
            : await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
            const network = await provider.getNetwork();
            if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
                if (!silent) window.addPaseoNetwork();
                return false;
            }
            signer = await provider.getSigner();
            await initContracts(signer); // Active mode
            
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = (await signer.getAddress()).slice(0,6) + "...";
            
            localStorage.setItem('veritas_autoconnect', 'true');
            if (typeof initPage === "function") await initPage();
            return true;
        }
    } catch (e) { console.error("Wallet connection error:", e); }
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

// --- 6. AUTO-INIT (Public RPC First) ---
(async function() {
    // Theme sync
    if (localStorage.getItem('veritas-theme') === 'light') document.documentElement.classList.add('light');

    // Step 1: Initialize in Read-Only mode immediately using Public RPC
    const publicProvider = new ethers.JsonRpcProvider(PASEO_RPC);
    await initContracts(publicProvider);
    console.log("Veritas: Read-only mode active (Public RPC)");

    // Step 2: Run initPage if available (even without wallet)
    window.addEventListener('load', async () => {
        if (typeof initPage === "function") await initPage();
        
        // Step 3: Check if we should try to connect wallet
        if (localStorage.getItem('veritas_autoconnect') === 'true') {
            await connectWallet(true);
        }
    });
})();
