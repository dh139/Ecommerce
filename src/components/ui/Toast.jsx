import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function Toast() {
  const { toastMessage, setToastMessage } = useCart();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage, setToastMessage]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#121214]/90 backdrop-blur-xl text-white px-5 py-3 rounded-full shadow-2xl border border-white/10 flex items-center gap-3">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
        <button
          onClick={() => setToastMessage(null)}
          className="p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
