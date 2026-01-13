import { useRouter } from 'next/router';
import { useState } from 'react';

export default function PostReview() {
  const router = useRouter();
  const { id: businessAddress, receipt } = router.query;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const submitToBlockchain = async () => {
    // 1. Qui chiameremmo lo Smart Contract su Asset Hub via PAPI
    // 2. Caricheremmo il commento su IPFS (opzionale per MVP)
    console.log("Invio recensione...", { businessAddress, receipt, rating, comment });
    alert("Recensione inviata su Polkadot Asset Hub!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-50 rounded-3xl shadow-lg">
      <h1 className="text-xl font-bold mb-2 text-center">Lascia la tua recensione</h1>
      <p className="text-sm text-gray-500 text-center mb-6">Certificata on-chain per {businessAddress}</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Voto (1-5)</label>
          <input 
            type="range" min="1" max="5" value={rating} 
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center font-bold text-blue-600">{rating} stelle</div>
        </div>

        <textarea 
          placeholder="Com'è stata la tua esperienza?"
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          rows={4}
          onChange={(e) => setComment(e.target.value)}
        />

        <button 
          onClick={submitToBlockchain}
          className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 shadow-md"
        >
          Pubblica su Veritas
        </button>
      </div>
    </div>
  );
}
