/**
 * VERITAS PROTOCOL - COMPONENTS.JS
 * Mobile Optimized & Full Theme Support
 */

const headerHTML = `
<style>
    #mobileMenu.active { display: flex !important; animation: slideIn 0.3s ease-out; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .nav-blur { 
        backdrop-filter: blur(12px); 
        -webkit-backdrop-filter: blur(12px); 
        background: var(--bg-main);
        opacity: 0.98;
    }
</style>

<div class="nav-container sticky top-0 z-[100] nav-blur border-b border-[var(--border)]">
    <nav class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-20">
            
            <div class="flex items-center min-w-fit">
                <a href="index.html" class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">V</div>
                    <span class="text-xl font-black tracking-tighter uppercase italic text-[var(--text-main)]">Veritas</span>
                </a>
            </div>

            <div class="flex items-center gap-2">
                
                <button onclick="window.toggleTheme()" 
                        class="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] transition-all">
                    <span id="themeIcon" style="font-size: 1.1rem;">🌙</span>
                </button>

                <button id="connectBtn" class="btn-primary text-[10px] py-2.5 px-4 rounded-xl whitespace-nowrap" onclick="connectWallet()">Connect</button>

                <button onclick="window.toggleMobileMenu()" class="md:hidden flex items-center justify-center p-2 text-[var(--text-main)]">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-16 6h16"></path></svg>
                </button>

                <div class="hidden md:flex items-center gap-6 ml-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <a href="explore.html" class="hover:text-blue-600 transition">Explore</a>
                    <a href="review.html" class="hover:text-blue-600 transition">Review</a>
                    <a href="dashboard.html" class="hover:text-blue-600 transition">Merchant</a>
                </div>
            </div>
        </div>

        <div id="mobileMenu" class="hidden flex-col gap-1 pb-6 md:hidden border-t border-[var(--border)]">
            <a href="explore.html" class="text-[11px] font-black uppercase tracking-[0.2em] py-4 px-2 border-b border-[var(--border)]">Explore Directory</a>
            <a href="review.html" class="text-[11px] font-black uppercase tracking-[0.2em] py-4 px-2 border-b border-[var(--border)]">Submit Review</a>
            <a href="dashboard.html" class="text-[11px] font-black uppercase tracking-[0.2em] py-4 px-2 border-b border-[var(--border)]">Merchant Hub</a>
            
            <div class="grid grid-cols-2 gap-2 mt-4 px-2">
                <button onclick="window.copyAddressAndGoToFaucet()" class="flex items-center justify-center gap-2 py-3 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-500 text-[9px] font-black uppercase">
                    Faucet
                </button>
                <button onclick="window.addPaseoNetwork()" class="flex items-center justify-center gap-2 py-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl text-[9px] font-black uppercase text-[var(--text-main)]">
                    Setup
                </button>
            </div>
        </div>
    </nav>
</div>`;

const footerHTML = `
<footer class="mt-auto border-t border-[var(--border)] py-10 px-6 bg-[var(--bg-main)]">
    <div class="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <div class="flex gap-6 sm:gap-12 text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">
            <a href="explore.html">Explore</a>
            <a href="review.html">Review</a>
            <a href="dashboard.html">Merchant</a>
            <a href="https://paseo.subscan.io/" target="_blank">Subscan</a>
        </div>
        <div class="text-[9px] font-bold uppercase tracking-widest opacity-20 text-center leading-loose">
            Veritas Protocol © 2026 <br class="sm:hidden"> 
            <span class="hidden sm:inline">|</span> 
            Decentralized Trust Engine on Paseo
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
