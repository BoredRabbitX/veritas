const headerHTML = `
<style>
    /* Animazioni e Utility */
    @keyframes pulse-pink { 0% { transform: scale(0.95); opacity: 1; } 70% { transform: scale(1.3); opacity: 0; } 100% { transform: scale(0.95); opacity: 0; } }
    .pulse-dot::after { content: ""; position: absolute; width: 100%; height: 100%; background: #ec4899; border-radius: 50%; animation: pulse-pink 2s infinite; }
    
    #mobileMenu.active { display: flex; animation: slideIn 0.3s ease-out; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

    .nav-blur { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); background: rgba(0,0,0,0.8); }
</style>

<div class="nav-container sticky top-0 z-50 nav-blur border-b border-white/5">
    <nav class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
            
            <div class="flex items-center gap-8">
                <a href="index.html" class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">V</div>
                    <span class="text-xl font-black tracking-tighter uppercase italic text-white">Veritas</span>
                </a>
                
                <div class="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/60">
                    <a href="explore.html" class="hover:text-white transition">Explore</a>
                    <a href="review.html" class="hover:text-white transition">Review</a>
                    <a href="dashboard.html" class="hover:text-white transition">Merchant Hub</a>
                </div>
            </div>

            <div class="flex items-center gap-2 sm:gap-4">
                <button onclick="window.addPaseoNetwork()" class="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest hover:text-[#f6851b] transition group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Mirror_Logo.svg" class="w-3 h-3 grayscale group-hover:grayscale-0" alt="MetaMask">
                    <span class="hidden sm:block">Setup Paseo</span>
                </button>
                
                <button id="connectBtn" class="btn-primary text-[9px] sm:text-xs py-2 px-4 sm:px-6" onclick="connectWallet()">Connect</button>

                <button onclick="toggleMobileMenu()" class="md:hidden p-2 text-white opacity-60 hover:opacity-100">
                    <svg id="menuIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
        </div>

        <div id="mobileMenu" class="hidden pb-6 pt-2 flex-col gap-4 md:hidden border-t border-white/5 mt-2">
            <a href="explore.html" class="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 py-2">Explore Directory</a>
            <a href="review.html" class="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 py-2">Submit Feedback</a>
            <a href="dashboard.html" class="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 py-2">Merchant Hub</a>
            <a href="https://faucet.polkadot.io/" target="_blank" class="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-pink-500 py-2">
                <span class="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                Get Paseo Tokens
            </a>
        </div>
    </nav>
</div>`;

const footerHTML = `
<footer class="mt-auto border-t border-white/5 bg-black py-10 px-6">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-[10px] uppercase font-bold opacity-30 tracking-[0.3em] text-white text-center md:text-left leading-relaxed">
            Veritas Protocol © 2026<br>On-Chain Trust Engine
        </div>
        <div class="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-30 text-white">
            <a href="https://paseo.subscan.io/" target="_blank">Explorer</a>
            <a href="https://faucet.polkadot.io/" target="_blank">Faucet</a>
        </div>
    </div>
</footer>`;

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('active');
}

document.body.insertAdjacentHTML('afterbegin', headerHTML);
document.body.insertAdjacentHTML('beforeend', footerHTML);
