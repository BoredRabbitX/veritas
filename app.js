// NEW CONTRACT ADDRESS
const contractAddress = "0xe17041d9af0220cb6d12958a80f78cfd45cfad81";

const abi = [
    "function registerBusiness(string _name, string _category) external",
    "function postReview(address _business, uint8 _rating, string _ipfsContent, bytes32 _receiptId, bytes _signature) external",
    "function businesses(address) view returns (string name, string category, bool isActive, uint256 reviewCount)"
];

let provider, signer, contract;

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
        } catch (error) {
            console.error("Connection failed", error);
            return false;
        }
    } else {
        alert("Please install MetaMask!");
        return false;
    }
}

document.getElementById('connectBtn')?.addEventListener('click', connectWallet);
