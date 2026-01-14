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
            <button id="connectBtn" class="btn-primary text-[10px] py-2.5 px-5 rounded-xl whitespace-nowrap" onclick="window.connectWallet()">Connect</button>
        </div>
    </nav>
</div>`;

const footerContent = `
<footer class="py-16 border-t border-[var(--border)] bg-[var(--bg-main)]">
    <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-10">
            <div class="flex items-center gap-4 group">
                <div class="w-12 h-12 bg-[var(--card-bg)] border border-[var(--border)] rounded-full flex items-center justify-center text-2xl grayscale group-hover:grayscale-0 transition-all duration-500">🐰</div>
                <div>
                    <p class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 italic">The White Rabbit Bored</p>
                    <p class="text-[9px] font-bold opacity-30 uppercase tracking-widest">Veritas Protocol © 2026</p>
                </div>
            </div>
            <div class="flex gap-4">
                <button onclick="window.copyAddressAndGoToFaucet()" class="px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-lg text-pink-500 text-[9px] font-black uppercase hover:bg-pink-500/20 transition">Get Paseo Faucet</button>
                <button onclick="window.addPaseoNetwork()" class="px-4 py-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg text-[9px] font-black uppercase opacity-60 hover:opacity-100 transition">Setup Network</button>
            </div>
        </div>
    </div>
</footer>`;

// Funzione per aggiornare il testo del bottone se il wallet è già connesso
async function syncConnectButton() {
    const btn = document.getElementById('connectBtn');
    if (!btn) return;

    if (window.signer) {
        try {
            const addr = await window.signer.getAddress();
            btn.innerText = addr.slice(0, 6) + "..." + addr.slice(-4);
        } catch (e) {
            btn.innerText = "Connect";
        }
    }
}

function renderUI() {
    const hRoot = document.getElementById('header-root');
    const fRoot = document.getElementById('footer-root');
    
    if (hRoot) {
        hRoot.innerHTML = headerContent;
    }
    if (fRoot) {
        fRoot.innerHTML = footerContent;
    }

    // Sincronizza il tema visivo
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.innerText = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
    }

    // Fondamentale: Controlla subito se siamo connessi per aggiornare il bottone appena creato
    syncConnectButton();
}

// Esegui il render
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderUI);
} else {
    renderUI();
}

// Ascolta l'evento di app.js per aggiornare il bottone in tempo reale senza refresh
window.addEventListener('contractsReady', syncConnectButton);
