import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Link from 'next/link';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-20">
      <h1 className="text-6xl font-black text-blue-600 mb-4">Veritas</h1>
      <p className="text-xl text-gray-600 mb-12">Recensioni on-chain su Paseo</p>

      {!isConnected ? (
        <button 
          onClick={() => connect()}
          className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-700 transition"
        >
          Connetti Wallet per Iniziare
        </button>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
          {/* Sezione Negoziante */}
          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 text-center">
            <h2 className="text-2xl font-bold mb-4">Gestisci Attività</h2>
            <p className="text-gray-500 mb-6">Sei il proprietario? Genera QR per i tuoi clienti.</p>
            <Link href="/dashboard" className="block bg-slate-900 text-white py-3 rounded-xl hover:opacity-90">
              Vai alla Dashboard
            </Link>
          </div>

          {/* Sezione Cliente */}
          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 text-center">
            <h2 className="text-2xl font-bold mb-4">Lascia Recensione</h2>
            <p className="text-gray-500 mb-6">Hai uno scontrino con QR? Carica la tua prova on-chain.</p>
            <p className="text-sm font-mono text-blue-500">{address.slice(0,6)}...{address.slice(-4)}</p>
          </div>
        </div>
      )}
      
      <footer className="mt-20 text-gray-400 text-sm">
        Contract: <span className="font-mono">{CONTRACT_ADDRESS}</span>
      </footer>
    </div>
  );
}
