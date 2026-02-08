
import React from 'react';
import { SYMBOLS } from '../constants.tsx';

interface PaytablePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaytablePopup: React.FC<PaytablePopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-2 md:p-4 animate-in fade-in duration-300">
      <div className="bg-zinc-950 border-2 md:border-4 border-red-900 rounded-2xl md:rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col shadow-[0_0_60px_rgba(220,38,38,0.2)]">
        
        {/* Header */}
        <div className="bg-red-950/40 p-4 md:p-6 flex justify-between items-center border-b-2 border-red-900/60 flex-shrink-0">
          <div>
            <h2 className="font-gothic text-red-500 text-xl md:text-3xl tracking-[0.2em] uppercase font-black red-glow">The Sanguine Ledger</h2>
            <p className="text-[8px] md:text-[10px] text-red-900 uppercase tracking-[0.4em] font-gothic mt-1">Combination Payouts & Dark Rites</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-red-900 flex items-center justify-center text-red-500 hover:bg-red-900 hover:text-white transition-all text-xl md:text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 overflow-y-auto flex-grow custom-scrollbar">
          
          <div className="mb-6 md:mb-8 p-3 md:p-4 bg-red-900/10 border border-red-900/30 rounded-xl">
            <h3 className="font-gothic text-red-400 text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 border-b border-red-900/20 pb-2">Ancient Rules</h3>
            <ul className="text-zinc-400 text-[10px] md:text-xs space-y-1 md:space-y-2 font-serif italic">
              <li>• <span className="text-red-500">3-of-a-Kind:</span> Full multiplier applied to your Offering.</li>
              <li>• <span className="text-red-500">2-of-a-Kind:</span> (Left or Right) Awards 20% of the symbol's power.</li>
              <li>• <span className="text-red-500">The Dark Keep:</span> 3 Castles trigger the <span className="text-white">Crypt Raid Bonus</span>.</li>
              <li>• <span className="text-red-500">Cascades:</span> Winning symbols dissolve; new ones fall. Multiplier increases with each harvest!</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {SYMBOLS.map((symbol) => (
              <div 
                key={symbol.id} 
                className={`p-3 md:p-4 rounded-xl md:rounded-2xl border flex items-center gap-3 md:gap-4 transition-all hover:bg-zinc-900
                  ${symbol.id === 'vampire' ? 'border-yellow-900/50 bg-yellow-950/10' : 'border-zinc-800 bg-zinc-900/40'}
                `}
              >
                <div className="text-4xl md:text-5xl drop-shadow-[0_0_10px_rgba(0,0,0,1)]">{symbol.emoji}</div>
                <div className="flex-grow min-w-0">
                  <h4 className={`font-gothic text-xs md:text-sm font-black tracking-widest uppercase truncate ${symbol.id === 'vampire' ? 'text-yellow-500' : 'text-zinc-200'}`}>
                    {symbol.name}
                  </h4>
                  <div className="flex flex-col mt-1">
                    <span className="text-[10px] md:text-xs text-zinc-500 font-serif">
                      3x: <span className={symbol.id === 'vampire' ? 'text-yellow-400 font-bold' : 'text-red-500'}>
                        {symbol.id === 'vampire' ? 'THE JACKPOT' : `${symbol.multiplier}x`}
                      </span>
                    </span>
                    <span className="text-[9px] md:text-[10px] text-zinc-600 font-serif">
                      2x: {Math.floor(symbol.multiplier * 0.2)}x
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-950 p-4 md:p-6 border-t border-red-900/20 text-center flex-shrink-0">
          <p className="text-[8px] md:text-[9px] text-red-950 uppercase tracking-[0.5em] font-black">
            "Your soul is the only currency that truly matters."
          </p>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #050505; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #450a0a; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default PaytablePopup;
