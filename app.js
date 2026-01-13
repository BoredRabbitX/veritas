const contractAddress = "0x7ca8b8cDdaa0381509961d042C51F52867cCfD05";
const EXPECTED_CHAIN_ID = 420420422; 

const abi = [
    "function registerBusiness(string _name, string _category) external",
    "function issueReceipt(bytes32 _receiptHash) external",
    "function postReview(address _business, string _customerName, uint8 _rating, string _content, bytes32 _receiptId) external",
    "function businesses(address) view returns (string name, string category, bool isActive)",
    "function usedReceipts(bytes32) view returns (bool)",
    "function validReceipts(bytes32) view returns (bool)",
    "event BusinessRegistered(address indexed owner, string name)",
    "event ReviewAdded(address indexed business, address indexed author, uint8 rating, string content)"
];

let provider, signer, contract;

// Funzione principale di connessione
async function connectWallet(silent = false) {
    if (!window.ethereum) {
        if(!silent) alert("MetaMask not found!");
        return false;
    }

    try {
        provider = new ethers.BrowserProvider(window.ethereum, "any");
        
        // Se silent è true, proviamo a vedere se siamo già autorizzati
        const accounts = silent 
            ? await window.ethereum.request({ method: 'eth_accounts' }) 
            : await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
            const network = await provider.getNetwork();
            if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
                if(!silent) alert(`Please switch to Paseo (Chain ID: ${EXPECTED_CHAIN_ID})`);
                return false;
            }

            signer = await provider.getSigner();
            contract = new ethers.Contract(contractAddress, abi, signer);
            
            const addr = await signer.getAddress();
            const btn = document.getElementById('connectBtn');
            if (btn) btn.innerText = addr.slice(0,6) + "...";
            
            // Salviamo lo stato per le altre pagine
            localStorage.setItem('veritas_autoconnect', 'true');
            return true;
        }
    } catch (e) {
        console.error("Connection error:", e);
    }
    return false;
}

// AUTOMATISMO: Eseguito su OGNI pagina al caricamento
(async () => {
    if (localStorage.getItem('veritas_autoconnect') === 'true') {
        // Proviamo a connetterci silenziosamente
        await connectWallet(true);
    }
})();

// Gestione cambio account o rete
if (window.ethereum) {
    window.ethereum.on('accountsChanged', () => location.reload());
    window.ethereum.on('chainChanged', () => location.reload());
}
