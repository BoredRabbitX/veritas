/**
 * VERITAS PROTOCOL - COMPONENTS.JS
 */

const headerHTML = `
<div class="nav-container sticky top-0 z-[100] border-b border-[var(--border)] bg-[var(--bg-main)]">
    <nav class="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        
        <a href="index.html" class="flex items-center gap-2 min-w-fit">
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
            <button onclick="window.copyAddressAndGoToFaucet()" class="py-3 bg-pink-500/10 text-pink-500 rounded-xl text-[9px] font-bold uppercase border border-pink-500/20">Faucet</button>
            <button onclick="window.addPaseoNetwork()" class="py-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl text-[9px] font-bold uppercase">Setup</button>
        </div>
    </div>
</div>`;

const footerHTML = `
<footer class="py-12 border-t border-[var(--border)] bg-[var(--bg-main)] text-center">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">Veritas Protocol © 2026</div>
    </div>
</footer>`;

// Iniezione sicura
function injectComponents() {
    if (!document.getElementById('veritas-header')) {
        document.body.insertAdjacentHTML('afterbegin', '<div id="veritas-header">' + headerHTML + '</div>');
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
}

window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
};

// Esegui iniezione
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
} else {
    injectComponents();
}
