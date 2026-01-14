/**
 * VERITAS PROTOCOL - COMPONENTS.JS
 * Shared UI Layout & Navigation
 */

const headerHTML = `
<style>
    @keyframes pulse-pink { 0% { transform: scale(0.95); opacity: 1; } 70% { transform: scale(1.3); opacity: 0; } 100% { transform: scale(0.95); opacity: 0; } }
    .pulse-dot::after { content: ""; position: absolute; width: 100%; height: 100%; background: #ec4899; border-radius: 50%; animation: pulse-pink 2s infinite; }
    #mobileMenu.active { display: flex !important; animation: slideIn 0.3s ease-out; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .nav-blur { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); background: var(--bg-dark); opacity: 0.98; }
</style>

<div class="nav-container sticky top-0 z-[100] nav-blur border-b border-white/10">
    <nav class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
            
            <div class="flex items-center gap-8">
                <a href="index.html" class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">V</div>
                    <span class="text-xl font-black tracking-tighter uppercase italic">Veritas</span>
                </a>
                
                <div class="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <a href="explore.html" class="hover:text-blue-600 transition">Explore</a>
                    <a href="review.html" class="hover:text-blue-600 transition">Review</a>
                    <a href="dashboard.html" class="hover:text-blue-600 transition">Merchant</a>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <button onclick="window.toggleTheme()" class="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/20 transition flex items-center justify-center min-w-[40px]">
                    <span id="themeIcon">🌙</span>
                </button>

                <button onclick="window.addPaseoNetwork()" class="hidden xs:flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest hover:text-[#f6851b] transition group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Mirror_Logo.svg" class="w-3 h-3 grayscale group-hover:grayscale-0" alt="MetaMask">
                    <span>Setup</span>
                </button>
                
                <button id="connectBtn" class="btn-primary text-[9px] py-2 px-4 whitespace-nowrap" onclick="connectWallet()">Connect</button>

                <button onclick="window.toggleMobileMenu()" class="md:hidden flex items-center justify-center p-2 opacity-60 hover:opacity-100 ml-1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-16 6h16"></path></svg>
                </button>
            </div>
        </div>

        <div id="mobileMenu" class="hidden flex-col gap-1 py-4 md:hidden border-t border-white/10">
            <a href="explore.html" class="text-[11px] font-black uppercase tracking-[0.2em] py-3 px-2">Explore Directory</a>
            <a href="review.html" class="text-[11px] font-black uppercase tracking-[0.2em] py-3 px-2">Submit Review</a>
            <a href="dashboard.html" class="text-[11px] font-black uppercase tracking-[0.2em] py-3 px-2">Merchant Hub</a>
            <a href="https://faucet.polkadot.io/" target="_blank" class="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-pink-500 py-3 px-2">
                <span class="relative flex h-2 w-2"><span class="animate-ping absolute h-full w-full rounded-full bg-pink-500 opacity-75"></span><span class="relative h-2 w-2 bg-pink-500 rounded-full"></span></span>
                Faucet
            </a>
        </div>
    </nav>
</div>`;

const footerHTML = `
<footer class="mt-auto border-t border-white/5 py-12 px-6">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-widest opacity-30">
        <div>Veritas Protocol © 2026</div>
        <div class="flex gap-8">
            <a href="https://paseo.subscan.io/" target="_blank">Explorer</a>
            <a href="https://faucet.polkadot.io/" target="_blank">Faucet</a>
        </div>
    </div>
</footer>`;

window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('active');
};

document.body.insertAdjacentHTML('afterbegin', headerHTML);
document.body.insertAdjacentHTML('beforeend', footerHTML);
