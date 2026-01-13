const contractAddress = "0x7ca8b8cDdaa0381509961d042C51F52867cCfD05";
const EXPECTED_CHAIN_ID = 420420422; 

const abi = [
    "function registerBusiness(string _name, string _category) external",
    "function issueReceipt(bytes32 _receiptHash) external",
    "function postReview(address _business, string _customerName, uint8 _rating, string _content, bytes32 _receiptId) external",
    "function businesses(address) view returns (string name, string category, bool isActive)",
    "function usedReceipts(bytes32) view returns (bool)",
    "function validReceipts(bytes32) view returns (bool)",
    "event ReviewAdded(address indexed business, address indexed author, uint8 rating, string content)"
];

let provider, signer, contract;

async function connectWallet(silent = false) {
    if (!window.ethereum) return false;
    try {
        // Forza il provider a riconoscere il cambio rete dinamico
        provider = new ethers.BrowserProvider(window.ethereum, "any");
        const network = await provider.getNetwork();
        
        if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
            if(!silent) alert(`Attenzione: Passa alla rete Paseo (Chain ID: ${EXPECTED_CHAIN_ID}) in MetaMask.`);
            return false;
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
            signer = await provider.getSigner();
            contract = new ethers.Contract(contractAddress, abi, signer);
            const addr = await signer.getAddress();
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = addr.slice(0,6) + "..." + addr.slice(-4);
            localStorage.setItem('veritas_connected', 'true');
            return true;
        }
    } catch (e) { console.error("Connessione fallita", e); }
    return false;
}

window.addEventListener('load', async () => {
    if (localStorage.getItem('veritas_dark') === 'true') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    }
    if (localStorage.getItem('veritas_connected') === 'true') await connectWallet(true);
});
