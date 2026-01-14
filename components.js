/**
 * VERITAS PROTOCOL - COMPONENTS.JS
 * Header & Social Footer (White Rabbit Edition)
 */

const headerContent = `
<div class="nav-container sticky top-0 z-[100] border-b border-[var(--border)] bg-[var(--bg-main)]">
    <nav class="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <a href="index.html" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">V</div>
            <span class="text-xl font-black italic uppercase tracking-tighter text-[var(--text-main)]">Veritas</span>
        </a>

        <div class="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest opacity-60">
            <a href="explore.html" class="hover:text-blue-600 transition">Explore</a>
            <a href="review.html" class="hover:text-blue-600 transition">Review</a>
            <a href="dashboard.html" class="hover:text-blue-600 transition">Merchant</a>
        </div>

        <div class="flex items-center gap-3">
            <button onclick="window.toggleTheme()" class="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] flex items-center justify-center transition-all">
                <span id="themeIcon">🌙</span>
            </button>
            <button id="connectBtn" class="btn-primary text-[10px] py-2.5 px-5 rounded-xl whitespace-nowrap" onclick="connectWallet()">Connect</button>
            <button onclick="window.toggleMobileMenu()" class="md:hidden p-2 text-[var(--text-main)]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-16 6h16"></path></svg>
            </button>
        </div>
    </nav>

    <div id="mobileMenu" class="hidden flex-col bg-[var(--bg-main)] border-t border-[var(--border)] md:hidden">
        <a href="explore.html" class="p-5 border-b border-[var(--border)] text-[11px] font-black uppercase tracking-widest">Explore</a>
        <a href="review.html" class="p-5 border-b border-[var(--border)] text-[11px] font-black uppercase tracking-widest">Review</a>
        <a href="dashboard.html" class="p-5 border-b border-[var(--border)] text-[11px] font-black uppercase tracking-widest">Merchant Hub</a>
        <div class="p-4 grid grid-cols-2 gap-2">
            <button onclick="window.copyAddressAndGoToFaucet()" class="py-3 bg-pink-500/10 text-pink-500 rounded-xl text-[9px] font-bold uppercase">Faucet</button>
            <button onclick="window.addPaseoNetwork()" class="py-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl text-[9px] font-bold uppercase">Setup</button>
        </div>
    </div>
</div>`;

const footerContent = `
<footer class="py-16 border-t border-[var(--border)] bg-[var(--bg-main)]">
    <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-10">
            
            <div class="flex items-center gap-4 group">
                <div class="w-12 h-12 bg-[var(--card-bg)] border border-[var(--border)] rounded-full flex items-center justify-center text-2xl grayscale group-hover:grayscale-0 transition-all duration-500">
                    🐰
                </div>
                <div>
                    <p class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 italic">The White Rabbit Bored</p>
                    <p class="text-[9px] font-bold opacity-30 uppercase tracking-widest">Veritas Protocol © 2026</p>
                </div>
            </div>

            <div class="flex flex-col items-center md:items-end gap-4">
                <p class="text-[10px] font-bold uppercase tracking-widest text-center md:text-right opacity-60 leading-relaxed">
                    For a free Web3 on <br class="md:hidden"> 
                    <span class="text-[var(--text-main)]">Polkadot Paseo Hub</span>
                </p>
                <div class="flex gap-4">
                    <button onclick="window.copyAddressAndGoToFaucet()" class="flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-lg text-pink-500 text-[9px] font-black uppercase hover:bg-pink-500/20 transition">
                        <span class="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span>
                        Get Paseo Faucet
                    </button>
                    <a href="https://paseo.subscan.io/" target="_blank" class="px-4 py-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg text-[9px] font-black uppercase opacity-60 hover:opacity-100 transition">
                        Explorer
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>`;

function renderUI() {
    const hRoot = document.getElementById('header-root');
    const fRoot = document.getElementById('footer-root');
    if (hRoot) hRoot.innerHTML = headerContent;
    if (fRoot) fRoot.innerHTML = footerContent;
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.innerText = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
    }
}

window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
};

window.addEventListener('load', renderUI);
if (document.readyState === 'complete') renderUI();

function startUI() {
    renderUI(); // La tua funzione che inietta HTML
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startUI);
} else {
    startUI();
}
