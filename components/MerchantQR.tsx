import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function MerchantQR({ businessAddress }) {
  const [receiptId, setReceiptId] = useState('');
  const [qrValue, setQrValue] = useState('');

  const generateVoucher = async () => {
    const id = Math.random().toString(36).substring(7);
    setReceiptId(id);
    
    // Costruiamo l'URL che il cliente scansionerà
    // Include l'ID dello scontrino e l'indirizzo del negozio
    const url = `${window.location.origin}/review/${businessAddress}?receipt=${id}`;
    setQrValue(url);
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-4">Genera QR Cliente</h2>
      <button 
        onClick={generateVoucher}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Crea Nuovo Scontrino
      </button>
      
      {qrValue && (
        <div className="mt-6 flex flex-col items-center">
          <QRCode value={qrValue} size={200} />
          <p className="mt-2 text-sm text-gray-500 font-mono">ID: {receiptId}</p>
        </div>
      )}
    </div>
  );
}
