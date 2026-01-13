const contractAddress = "0x4cb4f27090ab3b07c0faadddcb8ca473db9e05f7";
const abi = [
    "function registerBusiness(string _name, string _category) external",
    "function postReview(address _business, uint8 _rating, string _content, bytes32 _receiptId, bytes _signature) external",
    "function businesses(address) view returns (string name, string category, bool isActive, uint256 reviewCount)",
    "event ReviewAdded(address indexed business, address indexed author, uint8 rating, string content, uint256 timestamp)"
];

let provider, signer, contract;

// IMMEDIATE THEME CHECK
(function initTheme() {
    const isDark = localStorage.getItem('veritas_dark') === 'true';
    if (isDark) {
        document.documentElement.classList.add('dark-mode');
    }
})();

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('veritas_dark') === 'true') {
        document.body.classList.add('dark-mode');
    }

    document.getElementById('darkModeToggle')?.addEventListener('click', () => {
        const isDarkNow = document.body.classList.toggle('dark-mode');
        document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('veritas_dark', isDarkNow);
    });
});

async function connectWallet() {
    if (window.ethereum) {
        try {
            provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = await provider.getSigner();
            contract = new ethers.Contract(contractAddress, abi, signer);
            const address = await signer.getAddress();
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = address.slice(0,6) + "..." + address.slice(-4);
            return true;
        } catch (e) {
            console.error("Connection failed", e);
            return false;
        }
    }
    alert("Please install MetaMask!");
    return false;
}
