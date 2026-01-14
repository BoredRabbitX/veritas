/**
 * VERITAS PROTOCOL - COMPONENTS.JS (FIXED THEME BUTTON)
 */

const headerHTML = `
<style>
    @keyframes pulse-pink { 0% { transform: scale(0.95); opacity: 1; } 70% { transform: scale(1.3); opacity: 0; } 100% { transform: scale(0.95); opacity: 0; } }
    #mobileMenu.active { display: flex !important; animation: slideIn 0.3s ease-out; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    
    /* Forza visibilità icone */
    #themeIcon { font-size: 1.2rem; display: inline-block; line-height: 1; }
    
    /* Colore di sfondo della nav basato sulle variabili CSS */
    .nav-blur { 
        backdrop-filter: blur(12px); 
        -webkit-backdrop-filter: blur(12px); 
        background: var(--bg-dark); 
        border-bottom: 1px solid var(--border);
    }
</style>

<div class="nav-container sticky top-0 z-[100] nav-blur">
    <nav class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
            
            <div class="flex items-center gap-4 sm:gap-8">
                <a href="index.html" class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">V</div>
                    <span class="text-xl font-black tracking-tighter uppercase italic text-[var(--text-main)]">Veritas</span>
                </a>
                
                <div class="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <a href="explore.html" class="hover:text-blue-600 transition">Explore</a>
                    <a href="review.html" class="hover:text-blue-600 transition">Review</a>
                    <a href="dashboard.html" class="hover:text-blue-600 transition">Merchant</a>
                </div>
            </div>

            <div class="flex items-center gap-2 sm:gap-3">
                
                <button onclick="window.toggleTheme()" 
                        class="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/10 hover:bg-blue-600/20 transition-all duration-300" 
                        title="Toggle Light/Dark">
                    <span id="themeIcon">🌙</span>
                </button>

                <button onclick="window.copyAddressAndGoToFaucet()" class="hidden sm:flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-500 hover:bg-pink-500/20 transition text-[9px] font-bold uppercase">
                    Faucet
                </button>

                <button onclick="window.addPaseoNetwork()" class="hidden xs:flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest hover:text-[#f6851b] transition">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Mirror_Logo.svg" class="w-3 h-3 grayscale group-hover:grayscale-0" alt="MetaMask">
                    <span>Setup</span>
                </button>
                
                <button id="connectBtn" class="btn-primary text-[9px] py-2 px-4 whitespace-nowrap" onclick="connectWallet()">Connect</button>

                <button onclick="window.toggleMobileMenu()" class="md:hidden flex items-center justify-center p-2 opacity-60 hover:opacity-100">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-16 6h16"></path></svg>
                </button>
            </div>
        </div>

        <div id="mobileMenu" class="hidden flex-col gap-1 py-4 md:hidden border-t border-white/10">
            <a href="explore.html" class="text-[11px] font-black uppercase tracking-[0.2em] py-3 px-2">Explore Directory</a>
            <a href="review.html" class="text-[11px] font-black uppercase tracking-[0.2em] py-3 px-2">Submit Review</a>
            <a href="dashboard.html" class="text-[11px] font-black uppercase tracking-[0.2em] py-3 px-2">Merchant Hub</a>
            <button onclick="window.copyAddressAndGoToFaucet()" class="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-pink-500 py-3 px-2">
                Copy Address & Get PAS
            </button>
        </div>
    </nav>
</div>`;

const headerHTML = `
<nav class="sticky top-0 z-[100] border-b border-[var(--border)] bg-[var(--bg-main)] opacity-95 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <a href="index.html" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">V</div>
            <span class="text-xl font-black italic uppercase tracking-tighter">Veritas</span>
        </a>
        <div class="flex items-center gap-3">
            <button onclick="window.toggleTheme()" class="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center bg-[var(--card-bg)]">
                <span id="themeIcon">${document.documentElement.classList.contains('light') ? '☀️' : '🌙'}</span>
            </button>
            <button onclick="window.copyAddressAndGoToFaucet()" class="hidden sm:block px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full text-[9px] font-bold uppercase border border-pink-500/20">Faucet</button>
            <button id="connectBtn" class="btn-primary text-[10px] py-2 px-4 rounded-xl" onclick="connectWallet()">Connect</button>
        </div>
    </div>
</nav>`;

const footerHTML = `<footer class="p-12 border-t border-[var(--border)] text-[10px] font-bold uppercase opacity-30 text-center">Veritas Protocol © 2026</footer>`;
document.body.insertAdjacentHTML('afterbegin', headerHTML);
document.body.insertAdjacentHTML('beforeend', footerHTML);
