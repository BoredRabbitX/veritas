const headerHTML = `
<style>
    @keyframes pulse-pink { 0% { transform: scale(0.95); opacity: 1; } 70% { transform: scale(1.3); opacity: 0; } 100% { transform: scale(0.95); opacity: 0; } }
    .pulse-dot::after { content: ""; position: absolute; width: 100%; height: 100%; background: #ec4899; border-radius: 50%; animation: pulse-pink 2s infinite; }
    
    /* Stato del menu mobile */
    #mobileMenu.active { display: flex !important; animation: slideIn 0.3s ease-out; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

    .nav-blur { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); background: rgba(0,0,0,0.9); }
</style>

<div class="nav-container sticky top-0 z-[100] nav-blur border-b border-white/10">
    <nav class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
            
            <div class="flex items-center gap-8">
                <a href="index.html" class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">V</div>
                    <span class="text-xl font-black tracking-tighter uppercase italic text-white">Veritas</span>
                </a>
                
                <div class="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/50">
                    <a href="explore.html" class="hover:text-blue-500 transition">Explore</a>
                    <a href="review.html" class="hover:text-blue-500 transition">Review</a>
                    <a href="dashboard.html" class="hover:text-blue-500 transition">Merchant</a>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <button onclick="window.addPaseoNetwork()" class="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest hover:text-[#f6851b] transition group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Mirror_Logo.svg" class="w-3 h-3 grayscale group-hover:grayscale-0" alt="MetaMask">
                    <span class="hidden xs:block">Setup</span>
                </button>
                
                <button id="connectBtn" class="btn-primary text-[9px] py-2 px-4" onclick="connectWallet()">Connect</button>

                <button onclick="toggleMobileMenu()" class="md:hidden flex items-center justify-center p-2 text-white ml-1 bg-white/5 rounded-lg border border-white/10" aria-label="Menu">
                    <svg id="menuIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-16 6h16"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div id="mobileMenu" class="hidden flex-col gap-1 py-4 md:hidden border-t border-white/10">
            <a href="explore.html" class="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-blue-500 py-3 px-2 transition">Explore Directory</a>
            <a href="review.html" class="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-blue-500 py-3 px-2 transition">Submit Review</a>
            <a href="dashboard.html" class="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-blue-500 py-3 px-2 transition">Merchant Hub</a>
            <div class="h-[1px] bg-white/5 my-2"></div>
            <a href="https://faucet.polkadot.io/" target="_blank" class="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-pink-500 py-3 px-2">
                <span class="relative flex h-2 w-2">
                    <span class="absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75 animate-ping"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                </span>
                Get Paseo Tokens
            </a>
        </div>
    </nav>
</div>`;

const footerHTML = `
<footer class="mt-auto border-t border-white/5 bg-black py-12 px-6">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="text-center md:text-left">
            <div class="text-[10px] uppercase font-bold opacity-30 tracking-[0.3em] text-white mb-2">Veritas Protocol © 2026</div>
            <div class="text-[8px] uppercase font-bold opacity-20 tracking-widest text-white">The White Rabbit bored creation</div>
        </div>
        <div class="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-30 text-white">
            <a href="https://paseo.subscan.io/" target="_blank" class="hover:text-blue-500 transition">Explorer</a>
            <a href="https://faucet.polkadot.io/" target="_blank" class="hover:text-pink-500 transition">Faucet</a>
        </div>
    </div>
</footer>`;

// Funzione Global per il Toggle
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobileMenu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('active');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('active');
    }
};

document.body.insertAdjacentHTML('afterbegin', headerHTML);
document.body.insertAdjacentHTML('beforeend', footerHTML);
