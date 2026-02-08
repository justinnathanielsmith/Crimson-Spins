
import React from 'react';
import { SlotSymbol } from '../types.ts';
import { SYMBOLS } from '../constants.tsx';

interface DebugPopupProps {
  isOpen: boolean;
  onClose: () => void;
  forcedSymbols: (SlotSymbol | null)[];
  onSetForced: (index: number, symbol: SlotSymbol | null) => void;
  onClear: () => void;
}

const DebugPopup: React.FC<DebugPopupProps> = ({ isOpen, onClose, forcedSymbols, onSetForced, onClear }) => {
  if (!isOpen) return null;

  const setBonus = () => {
    const castle = SYMBOLS.find(s => s.id === 'castle') || null;
    [0, 1, 2].forEach(i => onSetForced(i, castle));
  };

  const setJackpot = () => {
    const vampire = SYMBOLS.find(s => s.id === 'vampire') || null;
    [0, 1, 2].forEach(i => onSetForced(i, vampire));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 md:p-4 animate-in fade-in duration-300">
      <div className="bg-zinc-900 border-2 md:border-4 border-purple-900 rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(147,51,234,0.3)]">
        {/* Header */}
        <div className="bg-purple-950 p-4 flex justify-between items-center border-b border-purple-800 flex-shrink-0">
          <h2 className="font-gothic text-purple-200 text-lg md:text-xl tracking-widest uppercase">Grimoire of Manipulation</h2>
          <button onClick={onClose} className="text-purple-400 hover:text-white text-2xl">×</button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto flex-grow custom-scrollbar">
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
            {[0, 1, 2].map(reelIdx => (
              <div key={reelIdx} className="flex flex-col gap-2 min-w-0">
                <h3 className="text-center font-gothic text-[10px] md:text-xs text-purple-400 uppercase mb-1">Reel {reelIdx + 1}</h3>
                <div className="flex flex-col gap-1 max-h-[30vh] md:max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                  <button
                    onClick={() => onSetForced(reelIdx, null)}
                    className={`p-2 text-[10px] rounded border transition-all truncate ${forcedSymbols[reelIdx] === null ? 'bg-purple-600 border-purple-400 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:border-purple-900'}`}
                  >
                    RANDOM
                  </button>
                  {SYMBOLS.map(symbol => (
                    <button
                      key={symbol.id}
                      onClick={() => onSetForced(reelIdx, symbol)}
                      className={`p-1.5 md:p-2 text-xs rounded border flex items-center gap-1.5 md:gap-2 transition-all min-w-0 ${forcedSymbols[reelIdx]?.id === symbol.id ? 'bg-purple-900 border-purple-400 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'}`}
                    >
                      <span className="flex-shrink-0">{symbol.emoji}</span>
                      <span className="text-[9px] md:text-[10px] truncate">{symbol.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 justify-center border-t border-purple-900/30 pt-6">
            <button onClick={setBonus} className="px-3 md:px-4 py-2 bg-purple-800 hover:bg-purple-700 rounded-md text-[10px] font-gothic tracking-widest text-white shadow-lg transition-colors">
              🧙 TRIGGER BONUS
            </button>
            <button onClick={setJackpot} className="px-3 md:px-4 py-2 bg-yellow-900 hover:bg-yellow-800 rounded-md text-[10px] font-gothic tracking-widest text-white shadow-lg transition-colors">
              🧛 FORCE JACKPOT
            </button>
            <button onClick={onClear} className="px-3 md:px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-[10px] font-gothic tracking-widest text-zinc-400 border border-zinc-700 transition-colors">
              🧹 CLEAR ALL
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-950 p-3 md:p-4 text-center flex-shrink-0">
          <p className="text-[9px] md:text-[10px] text-purple-900 uppercase font-serif italic">Changes persist until manually cleared or used in a spin.</p>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #09090b; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #581c87; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default DebugPopup;
