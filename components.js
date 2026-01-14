const headerHTML = `
<style>
    @keyframes pulse-pink { 0% { transform: scale(0.95); opacity: 1; } 70% { transform: scale(1.3); opacity: 0; } 100% { transform: scale(0.95); opacity: 0; } }
    .pulse-dot { position: relative; }
    .pulse-dot::after { content: ""; position: absolute; width: 100%; height: 100%; background: #ec4899; border-radius: 50%; animation: pulse-pink 2s infinite; }
</style>
<div class="nav-container">
    <nav class="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <div class="flex items-center gap-8 text-white">
            <a href="index.html" class="flex items-center gap-2">
                <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">V</div>
                <span class="text-2xl font-black tracking-tighter uppercase italic">Veritas</span>
            </a>
            <div class="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest items-center">
                <a href="explore.html" id="nav-explore" class="opacity-60 hover:opacity-100 transition">Explore</a>
                <a href="review.html" id="nav-review" class="opacity-60 hover:opacity-100 transition">Submit Review</a>
                <a href="dashboard.html" id="nav-dashboard" class="opacity-60 hover:opacity-100 transition">Merchant Hub</a>
                <a href="https://faucet.polkadot.io/" target="_blank" class="flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-500 hover:bg-pink-500/20 transition">
                    <span class="relative flex h-2 w-2">
                        <span class="pulse-dot animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                    </span>
                    Faucet
                </a>
            </div>
        </div>
        
        <div class="flex items-center gap-4">
            <button onclick="window.addPaseoNetwork()" class="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#f6851b]/20 hover:text-[#f6851b] transition group">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Mirror_Logo.svg" class="w-3 h-3 grayscale group-hover:grayscale-0" alt="MetaMask">
                Setup Paseo
            </button>
            <button id="connectBtn" class="btn-primary text-xs py-2 px-6" onclick="connectWallet()">Connect Wallet</button>
        </div>
    </nav>
</div>`;

const footerHTML = `
<footer class="mt-auto">
    <div class="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center border-t border-white/5 gap-6">
        <div class="text-[10px] uppercase font-bold opacity-30 tracking-[0.3em] text-white uppercase">The White Rabbit bored creation</div>
        <div class="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-30 text-white">
            <a href="https://paseo.subscan.io/" target="_blank" class="hover:text-blue-600 transition">Paseo Explorer</a>
            <a href="https://faucet.polkadot.io/" target="_blank" class="hover:text-blue-600 transition">Faucet</a>
        </div>
        <div class="text-[10px] font-black text-blue-600 tracking-widest uppercase">Veritas Protocol © 2026</div>
    </div>
</footer>`;

document.body.insertAdjacentHTML('afterbegin', headerHTML);
document.body.insertAdjacentHTML('beforeend', footerHTML);
