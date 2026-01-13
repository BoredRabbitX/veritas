export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-2">VERITAS</h1>
        <p className="text-lg text-gray-600 italic">La verità, certificata su Polkadot.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-4">Sei un Cliente?</h3>
          <p className="text-gray-500 mb-6">Scansiona il QR code che trovi sullo scontrino per lasciare una recensione verificata.</p>
          <button className="text-blue-600 font-semibold underline">Scopri come funziona</button>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-4">Sei un Esercente?</h3>
          <p className="text-gray-500 mb-6">Registra la tua attività e inizia a raccogliere feedback reali e impossibili da falsificare.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl">Registra Business</button>
        </div>
      </div>
    </div>
  );
}
