const contractAddress = "0x5860842523425f8ba94f56eba115492265792935";
const abi = [
    "function registerBusiness(string _name, string _category) external",
    "function postReview(address _business, string _customerName, uint8 _rating, string _content, bytes32 _receiptId) external",
    "function businesses(address) view returns (string name, string category, bool isActive)",
    "function usedReceipts(bytes32) view returns (bool)",
    "event ReviewAdded(address indexed business, address indexed author, string customerName, uint8 rating, string content, uint256 timestamp)"
];

let provider, signer, contract;

async function connectWallet(silent = false) {
    if (!window.ethereum) return false;
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await (silent ? 
            window.ethereum.request({ method: 'eth_accounts' }) : 
            window.ethereum.request({ method: 'eth_requestAccounts' }));

        if (accounts.length > 0) {
            signer = await provider.getSigner();
            contract = new ethers.Contract(contractAddress, abi, signer);
            const addr = await signer.getAddress();
            localStorage.setItem('veritas_connected', 'true');
            const btn = document.getElementById('connectBtn');
            if(btn) btn.innerText = addr.slice(0,6) + "..." + addr.slice(-4);
            return true;
        }
    } catch (e) { console.error(e); }
    return false;
}

window.addEventListener('load', async () => {
    if (localStorage.getItem('veritas_dark') === 'true') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    }
    if (localStorage.getItem('veritas_connected') === 'true') await connectWallet(true);
});

document.getElementById('darkModeToggle')?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('veritas_dark', isDark);
});
