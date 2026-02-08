
import React from 'react';
import { SYMBOLS, RELICS, ALTAR_FREQUENCY } from '../constants.tsx';

interface PaytablePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaytablePopup: React.FC<PaytablePopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-2 md:p-4 animate-in fade-in duration-300">
      <div className="bg-zinc-950 border-2 md:border-4 border-red-900 rounded-2xl md:rounded-3xl w-full max-w-3xl max-h-[95vh] overflow-hidden flex flex-col shadow-[0_0_60px_rgba(220,38,38,0.2)]">
        
        {/* Header */}
        <div className="bg-red-950/40 p-4 md:p-6 flex justify-between items-center border-b-2 border-red-900/60 flex-shrink-0">
          <div>
            <h2 className="font-gothic text-red-500 text-xl md:text-3xl tracking-[0.2em] uppercase font-black red-glow">The Sanguine Ledger</h2>
            <p className="text-[8px] md:text-[10px] text-red-900 uppercase tracking-[0.4em] font-gothic mt-1">Manual of Unholy Ascension</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-red-900 flex items-center justify-center text-red-500 hover:bg-red-900 hover:text-white transition-all text-xl md:text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 overflow-y-auto flex-grow custom-scrollbar space-y-8">
          
          {/* Section: Basic Rites */}
          <div>
            <h3 className="font-gothic text-red-400 text-xs md:text-sm uppercase tracking-widest mb-4 border-b border-red-900/20 pb-2">I. The Basic Rites</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-900/5 border border-red-900/20 rounded-xl">
                <h4 className="text-zinc-200 text-[10px] font-gothic uppercase mb-2">Payout Mechanics</h4>
                <ul className="text-zinc-400 text-[10px] space-y-1 font-serif italic">
                  <li>• <span className="text-red-500">Full Alignment (3x):</span> Awards the symbol's total multiplier.</li>
                  <li>• <span className="text-red-500">Partial Feast (2x):</span> Awards 20% of the symbol's power.</li>
                  <li>• <span className="text-red-500">Cascading Harvest:</span> Winning symbols dissolve. New symbols fall into the void, increasing the Multiplier by 1x each time.</li>
                </ul>
              </div>
              <div className="p-4 bg-red-900/5 border border-red-900/20 rounded-xl">
                <h4 className="text-zinc-200 text-[10px] font-gothic uppercase mb-2">Dark Events</h4>
                <ul className="text-zinc-400 text-[10px] space-y-1 font-serif italic">
                  <li>• <span className="text-red-500">Crypt Raid:</span> 3 Castles trigger a search for buried riches.</li>
                  <li>• <span className="text-red-500">The Nudge:</span> On narrow losses, you may be gifted the power to shift a reel.</li>
                  <li>• <span className="text-red-500">Dark Bargain:</span> Risk your current win at the Altar for double or nothing.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Ascension */}
          <div>
            <h3 className="font-gothic text-red-400 text-xs md:text-sm uppercase tracking-widest mb-4 border-b border-red-900/20 pb-2">II. Unholy Ascension (Leveling)</h3>
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <p className="text-zinc-300 text-[11px] font-serif leading-relaxed italic mb-3">
                  With every successful harvest, you gain <span className="text-red-500 font-bold tracking-widest uppercase">Corrupted Essence (XP)</span>. 
                </p>
                <ul className="text-zinc-500 text-[10px] space-y-2">
                  <li><span className="text-zinc-200 font-bold">Essence Gain:</span> Winning payouts provide Essence relative to their size.</li>
                  <li><span className="text-zinc-200 font-bold">Leveling Up:</span> Reaching 100 Essence increases your <span className="text-white">Ascension Level</span>.</li>
                  <li><span className="text-zinc-200 font-bold">Ascension Perks:</span> Higher levels improve the weight of rare symbols and increase the base value of your Jackpot.</li>
                </ul>
              </div>
              <div className="w-full md:w-48 h-2 bg-zinc-950 rounded-full border border-red-900/40 overflow-hidden">
                <div className="w-2/3 h-full bg-gradient-to-r from-red-950 to-red-500 shadow-[0_0_10px_red]"></div>
              </div>
            </div>
          </div>

          {/* Section: The Blood Altar */}
          <div>
            <h3 className="font-gothic text-red-400 text-xs md:text-sm uppercase tracking-widest mb-4 border-b border-red-900/20 pb-2">III. The Blood Altar & Relics</h3>
            <p className="text-zinc-400 text-[10px] mb-4 font-serif italic text-center">
              Every <span className="text-red-500 font-bold">{ALTAR_FREQUENCY} spins</span>, the veil thins and the **Blood Altar** appears.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {RELICS.map(relic => (
                <div key={relic.id} className="p-3 bg-black/40 border border-red-900/20 rounded-lg text-center flex flex-col items-center">
                  <span className="text-2xl mb-1">{relic.emoji}</span>
                  <span className="text-[9px] text-zinc-300 font-gothic uppercase mb-1">{relic.name}</span>
                  <p className="text-[8px] text-zinc-500 italic leading-tight">{relic.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Symbol Multipliers */}
          <div>
            <h3 className="font-gothic text-red-400 text-xs md:text-sm uppercase tracking-widest mb-4 border-b border-red-900/20 pb-2">IV. The Symbol Hierarchy</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SYMBOLS.map((symbol) => (
                <div 
                  key={symbol.id} 
                  className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all hover:bg-zinc-900
                    ${symbol.id === 'vampire' ? 'border-yellow-900/50 bg-yellow-950/10' : 'border-zinc-800 bg-zinc-900/40'}
                  `}
                >
                  <div className="text-3xl mb-2 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">{symbol.emoji}</div>
                  <h4 className={`font-gothic text-[9px] font-black tracking-widest uppercase truncate mb-1 ${symbol.id === 'vampire' ? 'text-yellow-500' : 'text-zinc-200'}`}>
                    {symbol.name}
                  </h4>
                  <span className="text-[9px] text-red-500 font-serif font-bold">
                    {symbol.id === 'vampire' ? 'THE JACKPOT' : `${symbol.multiplier}x`}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-zinc-950 p-4 md:p-6 border-t border-red-900/20 text-center flex-shrink-0">
          <p className="text-[8px] md:text-[9px] text-red-950 uppercase tracking-[0.5em] font-black">
            "Luck is for mortals. Relics are for gods."
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
