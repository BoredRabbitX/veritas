const headerHTML = `
<div class="nav-container">
    <nav class="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <div class="flex items-center gap-8">
            <a href="index.html" class="flex items-center gap-2">
                <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">V</div>
                <span class="text-2xl font-black tracking-tighter uppercase italic">Veritas</span>
            </a>
            <div class="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest">
                <a href="explore.html" id="nav-explore" class="opacity-60 hover:opacity-100 transition">Explore</a>
                <a href="review.html" id="nav-review" class="opacity-60 hover:opacity-100 transition">Submit Review</a>
                <a href="dashboard.html" id="nav-dashboard" class="opacity-60 hover:opacity-100 transition">Merchant Hub</a>
            </div>
        </div>
        <button id="connectBtn" class="btn-primary text-xs py-2 px-6" onclick="connectWallet()">Connect Wallet</button>
    </nav>
</div>`;

const footerHTML = `
<footer>
    <div class="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center border-t border-white/5 gap-6">
        <div class="text-[10px] uppercase font-bold opacity-30 tracking-[0.3em]">The White Rabbit bored creation</div>
        <div class="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-30">
            <a href="#" class="hover:text-blue-600 transition">Smart Contract</a>
            <a href="#" class="hover:text-blue-600 transition">Paseo Explorer</a>
            <a href="#" class="hover:text-blue-600 transition">Documentation</a>
        </div>
        <div class="text-[10px] font-black text-blue-600 tracking-widest uppercase">Veritas Protocol © 2026</div>
    </div>
</footer>`;

function loadComponents() {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    
    // Highlight active page
    const path = window.location.pathname;
    if (path.includes("explore")) document.getElementById("nav-explore").classList.add("text-blue-600");
    if (path.includes("review")) document.getElementById("nav-review").classList.add("text-blue-600");
    if (path.includes("dashboard")) document.getElementById("nav-dashboard").classList.add("text-blue-600");
}

loadComponents();
