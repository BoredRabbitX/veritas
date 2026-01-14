/** VERITAS CORE - Beta 1.0 **/
const registryAddress = "0xea45643b2b4bf3a5bb12588d7e9b8a147b040964";
const engineAddress = "0xf85ba77ea82080bb4f32d6d77bc8e65b1c81ac81";
const reviewerAddress = "0x5c65e66016c36de0ec94fe87e3c035ead54aa9da";
const EXPECTED_CHAIN_ID = 420420422;

let provider, signer, regContract, engContract, revContract;

// --- THEME ---
window.toggleTheme = function() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('veritas-theme', isLight ? 'light' : 'dark');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.innerText = isLight ? '☀️' : '🌙';
};

// --- SMART FAUCET ---
window.copyAddressAndGoToFaucet = async function() {
    if (!signer) return alert("Connect wallet first!");
    const addr = await signer.getAddress();
    await navigator.clipboard.writeText(addr);
    alert("Address copied! Paste it in the faucet.");
    window.open("https://faucet.polkadot.io/", "_blank");
};

// --- WALLET ---
async function connectWallet(silent = false) {
    if (!window.ethereum) return false;
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
            if (!silent) window.addPaseoNetwork();
            return false;
        }
        const accounts = silent ? await window.ethereum.request({ method: 'eth_accounts' }) : await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
            signer = await provider.getSigner();
            regContract = new ethers.Contract(registryAddress, [
                "function businesses(address) view returns (string name, bytes32 category, bool isActive, uint32 volume)",
                "function registerBusiness(string _name, bytes32 _category) external",
                "event BusinessRegistered(address indexed owner, string name, bytes32 category)"
            ], signer);
            engContract = new ethers.Contract(engineAddress, [
                "function issueReceipt(bytes32) external",
                "function postReply(bytes32, string) external",
                "function merchantReplies(bytes32) view returns (string)",
                "function receiptIssuers(bytes32) view returns (address)"
            ], signer);
            revContract = new ethers.Contract(reviewerAddress, [
                "function submitReview(address, uint8, string, bytes32) external",
                "event ReviewSubmitted(address indexed business, address indexed author, uint8 rating, string content, bytes32 indexed receiptId)"
            ], signer);
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = (await signer.getAddress()).slice(0,6) + "...";
            if (typeof initPage === "function") await initPage();
            return true;
        }
    } catch (e) { console.error(e); }
    return false;
}

window.addPaseoNetwork = async function() {
    const params = [{ chainId: '0x190f9636', chainName: 'Paseo AssetHub', nativeCurrency: { name: 'Paseo', symbol: 'PAS', decimals: 18 }, rpcUrls: ['https://pas-rpc.stakeworld.io'], blockExplorerUrls: ['https://paseo.subscan.io'] }];
    await window.ethereum.request({ method: 'wallet_addEthereumChain', params });
};

// Auto-init theme & wallet
(function() {
    if (localStorage.getItem('veritas-theme') === 'light') document.documentElement.classList.add('light');
    window.addEventListener('load', () => { if (localStorage.getItem('veritas_autoconnect')) connectWallet(true); });
})();
