/**
 * VERITAS PROTOCOL - COMPONENTS.JS
 * Header & Social Footer (Minimal Architecture)
 */

const headerContent = `
<div class="nav-container sticky top-0 z-[100] border-b border-white/5 bg-[var(--bg-main)]/80 backdrop-blur-md">
    <nav class="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <a href="index.html" class="flex items-center gap-2 group">
            <div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-black transition-transform group-hover:rotate-12">V</div>
            <span class="text-sm font-black uppercase tracking-tighter text-[var(--text-main)] italic">Veritas</span>
        </a>

        <div class="hidden md:flex items-center gap-10 text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">
            <a href="explore.html" class="hover:text-blue-600 hover:opacity-100 transition">Explore</a>
            <a href="review.html" class="hover:text-blue-600 hover:opacity-100 transition">Review</a>
            <a href="dashboard.html" class="hover:text-blue-600 hover:opacity-100 transition">Merchant</a>
        </div>

        <div class="flex items-center gap-4">
            <button onclick="window.toggleTheme()" class="w-8 h-8 rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-center transition-all hover:bg-white/5">
                <span id="themeIcon" class="text-xs">🌙</span>
            </button>
            <button id="connectBtn" class="btn-primary text-[9px] py-2 px-4 rounded-lg font-black uppercase tracking-widest whitespace-nowrap transition-all" onclick="window.connectWallet()">
                Connect
            </button>
        </div>
    </nav>
</div>`;

const footerContent = `
<footer class="py-12 border-t border-white/5 bg-[var(--bg-main)]">
    <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="flex items-center gap-4 opacity-50">
                <div class="w-10 h-10 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center text-xl grayscale">🐰</div>
                <div>
                    <p class="text-[9px] font-black uppercase tracking-widest text-blue-600">The White Rabbit Bored</p>
                    <p class="text-[8px] font-bold opacity-40 uppercase tracking-tighter">Powered by Paseo AssetHub • 2026</p>
                </div>
            </div>
            <div class="flex gap-3">
                <button onclick="window.copyAddressAndGoToFaucet()" class="px-4 py-2 bg-pink-500/5 border border-pink-500/10 rounded-lg text-pink-500 text-[8px] font-bold uppercase tracking-widest hover:bg-pink-500/10 transition">Faucet</button>
                <button onclick="window.addPaseoNetwork()" class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[8px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition">Network</button>
            </div>
        </div>
    </div>
</footer>`;

/**
 * Updates the connect button UI based on window.signer status
 */
async function syncConnectButton() {
    const btn = document.getElementById('connectBtn');
    if (!btn) return;

    if (window.signer) {
        try {
            const addr = await window.signer.getAddress();
            btn.innerText = addr.slice(0, 6) + "..." + addr.slice(-4);
            btn.classList.add('border-blue-600/50', 'bg-blue-600/10');
            btn.style.boxShadow = "none";
        } catch (e) {
            btn.innerText = "Connect";
        }
    } else {
        btn.innerText = "Connect";
    }
}

function renderUI() {
    const hRoot = document.getElementById('header-root');
    const fRoot = document.getElementById('footer-root');
    
    if (hRoot) hRoot.innerHTML = headerContent;
    if (fRoot) fRoot.innerHTML = footerContent;

    // Sync theme icon
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.innerText = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
    }

    // Immediate button sync
    syncConnectButton();
}

// Initial Render
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderUI);
} else {
    renderUI();
}

// Global Event Listeners for real-time updates
window.addEventListener('contractsReady', syncConnectButton);

// Re-check theme on toggle
const originalToggleTheme = window.toggleTheme;
window.toggleTheme = function() {
    if (originalToggleTheme) originalToggleTheme();
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.innerText = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
    }
};
