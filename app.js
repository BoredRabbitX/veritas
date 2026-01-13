const contractAddress = "0x4cb4f27090ab3b07c0faadddcb8ca473db9e05f7";
const abi = [
    "function registerBusiness(string _name, string _category) external",
    "function postReview(address _business, uint8 _rating, string _ipfsContent, bytes32 _receiptId, bytes _signature) external",
    "function businesses(address) view returns (string name, string category, bool isActive, uint256 reviewCount)",
    "event ReviewAdded(address indexed business, address indexed author, uint8 rating, string content, uint256 timestamp)"
];

let provider, signer, contract;

// --- Gestione Dark Mode ---
function initDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) document.body.classList.add('dark-mode');
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// --- Web3 Logic ---
async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
        const address = await signer.getAddress();
        document.getElementById('connectBtn').innerText = address.slice(0,6) + "..." + address.slice(-4);
        return true;
    }
    return false;
}

// Inizializzazione al caricamento
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode);
});
