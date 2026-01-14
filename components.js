const headerHTML = `
<style>
    @keyframes pulse-pink { 0% { transform: scale(0.95); opacity: 1; } 70% { transform: scale(1.3); opacity: 0; } 100% { transform: scale(0.95); opacity: 0; } }
    .pulse-dot { position: relative; }
    .pulse-dot::after { content: ""; position: absolute; width: 100%; height: 100%; background: #ec4899; border-radius: 50%; animation: pulse-pink 2s infinite; }
    
    /* Gestione scroll orizzontale per il menu mobile se necessario */
    .mobile-menu-scroll { -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .mobile-menu-scroll::-webkit-scrollbar { display: none; }
</style>

<div class="nav-container border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 py-3">
        <div class="flex justify-between items-center gap-2">
            <a href="index.html" class="flex items-center gap-2 shrink-0">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">V</div>
                <span class="text-xl font-black tracking-tighter uppercase italic hidden xs:block">Veritas</span>
            </a>
            
            <div class="flex items-center gap-2 sm:gap-4">
                <button onclick="window.addPaseoNetwork()" class="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-widest hover:bg-[#f6851b]/20 hover:text-[#f6851b] transition group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Mirror_Logo.svg" class="w-3 h-3 grayscale group-hover:grayscale-0" alt="MetaMask">
                    <span class="hidden xs:block">Setup Paseo</span>
                    <span class="xs:hidden">Setup</span>
                </button>
                
                <button id="connectBtn" class="btn-primary text-[9px] sm:text-xs py-2 px-4 sm:px-6 whitespace-nowrap" onclick="connectWallet()">Connect</button>
            </div>
        </div>

        <div class="flex items-center justify-between mt-4 overflow-x-auto mobile-menu-scroll gap-4 border-t border-white/5 pt-3">
            <div class="flex gap-4 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                <a href="explore.html" id="nav-explore" class="opacity-60 hover:opacity-100 transition">Explore</a>
                <a href="review.html" id="nav-review" class="opacity-60 hover:opacity-100 transition">Review</a>
                <a href="dashboard.html" id="nav-dashboard" class="opacity-60 hover:opacity-100 transition">Merchant</a>
            </div>
            
            <a href="https://faucet.polkadot.io/" target="_blank" class="flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-500 hover:bg-pink-500/20 transition whitespace-nowrap text-[9px] font-bold uppercase">
                <span class="relative flex h-1.5 w-1.5">
                    <span class="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75 animate-ping"></span>
                    <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-pink-500"></span>
                </span>
                Faucet
            </a>
        </div>
    </nav>
</div>`;

const footerHTML = `
<footer class="mt-auto border-t border-white/5 bg-black">
    <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div class="text-[9px] uppercase font-bold opacity-30 tracking-[0.2em] text-white">
            Veritas Protocol © 2026<br>
            <span class="text-[8px]">The White Rabbit bored creation</span>
        </div>
        <div class="flex gap-6 text-[9px] font-black uppercase tracking-widest opacity-30 text-white">
            <a href="https://paseo.subscan.io/" target="_blank" class="hover:text-blue-600 transition">Explorer</a>
            <a href="https://faucet.polkadot.io/" target="_blank" class="hover:text-blue-600 transition">Faucet</a>
        </div>
    </div>
</footer>`;

document.body.insertAdjacentHTML('afterbegin', headerHTML);
document.body.insertAdjacentHTML('beforeend', footerHTML);
