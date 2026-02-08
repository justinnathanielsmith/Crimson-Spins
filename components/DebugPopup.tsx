
import React from 'react';
import { SlotSymbol, Relic } from '../types.ts';
import { SYMBOLS, RELICS } from '../constants.tsx';

interface DebugPopupProps {
  isOpen: boolean;
  onClose: () => void;
  forcedSymbols: (SlotSymbol | null)[];
  onSetForced: (index: number, symbol: SlotSymbol | null) => void;
  onClear: () => void;
  onUpdateBalance: (amount: number) => void;
  onGainXP: (amount: number) => void;
  onAddRelic: (relic: Relic) => void;
  onOpenAltar: () => void;
}

const DebugPopup: React.FC<DebugPopupProps> = ({ 
  isOpen, 
  onClose, 
  forcedSymbols, 
  onSetForced, 
  onClear,
  onUpdateBalance,
  onGainXP,
  onAddRelic,
  onOpenAltar
}) => {
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
      <div className="bg-zinc-950 border-2 md:border-4 border-purple-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_80px_rgba(147,51,234,0.4)]">
        
        {/* Header */}
        <div className="bg-purple-950/40 p-5 flex justify-between items-center border-b border-purple-800/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔮</span>
            <div>
              <h2 className="font-gothic text-purple-200 text-xl tracking-[0.2em] uppercase font-black">Grimoire of Manipulation</h2>
              <p className="text-[9px] text-purple-500 uppercase tracking-widest font-gothic">Developer Access • Reality Warping Enabled</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-purple-800 flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-900 transition-all text-2xl">×</button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow custom-scrollbar space-y-8">
          
          {/* Section 1: Symbol Manipulation */}
          <div>
            <h3 className="font-gothic text-purple-400 text-xs uppercase tracking-[0.3em] mb-4 border-b border-purple-900/20 pb-2 flex items-center gap-2">
              <span>🎴</span> I. SEQUENCE ALTERATION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map(reelIdx => (
                <div key={reelIdx} className="bg-black/40 p-3 rounded-2xl border border-purple-900/10 flex flex-col">
                  <h4 className="text-center font-gothic text-[10px] text-purple-500 uppercase mb-3 font-bold tracking-[0.2em]">Vial {reelIdx + 1}</h4>
                  <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
                    <button
                      onClick={() => onSetForced(reelIdx, null)}
                      className={`flex-shrink-0 p-2.5 text-[10px] rounded-lg border transition-all font-bold uppercase tracking-widest ${forcedSymbols[reelIdx] === null ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-purple-900'}`}
                    >
                      Chaos (Random)
                    </button>
                    {SYMBOLS.map(symbol => (
                      <button
                        key={symbol.id}
                        onClick={() => onSetForced(reelIdx, symbol)}
                        className={`flex-shrink-0 p-2 text-[10px] rounded-lg border flex items-center gap-3 transition-all min-w-0 font-serif italic ${forcedSymbols[reelIdx]?.id === symbol.id ? 'bg-purple-900 border-purple-400 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}
                      >
                        <span className="text-lg flex-shrink-0 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]">{symbol.emoji}</span>
                        <span className="truncate">{symbol.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Temporal Rituals & Essence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-gothic text-purple-400 text-xs uppercase tracking-[0.3em] mb-4 border-b border-purple-900/20 pb-2 flex items-center gap-2">
                <span>🧪</span> II. ESSENCE INFUSION
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => onUpdateBalance(1000)} className="p-3 bg-red-950/20 border border-red-900/30 rounded-xl text-red-200 text-[10px] font-gothic uppercase tracking-widest hover:bg-red-900/40 transition-all">
                  +$1,000 Lifeblood
                </button>
                <button onClick={() => onUpdateBalance(-1000)} className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 text-[10px] font-gothic uppercase tracking-widest hover:bg-zinc-800 transition-all">
                  -$1,000 Lifeblood
                </button>
                <button onClick={() => onGainXP(50)} className="p-3 bg-purple-950/20 border border-purple-900/30 rounded-xl text-purple-200 text-[10px] font-gothic uppercase tracking-widest hover:bg-purple-900/40 transition-all">
                  +50 Corrupted XP
                </button>
                <button onClick={() => onGainXP(100)} className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl text-white text-[10px] font-gothic uppercase tracking-widest hover:bg-purple-800 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  Instant Level Up
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-gothic text-purple-400 text-xs uppercase tracking-[0.3em] mb-4 border-b border-purple-900/20 pb-2 flex items-center gap-2">
                <span>🌒</span> III. EVENT SUMMONING
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={setJackpot} className="p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-xl text-yellow-200 text-[10px] font-gothic uppercase tracking-widest hover:bg-yellow-800/40 transition-all">
                  Force Jackpot
                </button>
                <button onClick={setBonus} className="p-3 bg-blue-900/20 border border-blue-600/30 rounded-xl text-blue-200 text-[10px] font-gothic uppercase tracking-widest hover:bg-blue-800/40 transition-all">
                  Trigger Crypt Raid
                </button>
                <button onClick={onOpenAltar} className="p-3 bg-red-600 border border-red-400 rounded-xl text-white text-[10px] font-gothic uppercase tracking-widest hover:bg-red-500 transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse col-span-2">
                  Summon Blood Altar
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Unholy Artefacts */}
          <div>
            <h3 className="font-gothic text-purple-400 text-xs uppercase tracking-[0.3em] mb-4 border-b border-purple-900/20 pb-2 flex items-center gap-2">
              <span>🦴</span> IV. ARTEFACT MANIFESTATION
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {RELICS.map(relic => (
                <button 
                  key={relic.id}
                  onClick={() => onAddRelic(relic)}
                  className="p-4 bg-black/40 border border-purple-900/20 rounded-2xl flex flex-col items-center gap-2 hover:border-purple-500 hover:bg-purple-900/10 transition-all group"
                >
                  <span className="text-3xl group-hover:scale-125 transition-transform drop-shadow-[0_0_8px_rgba(147,51,234,0.3)]">{relic.emoji}</span>
                  <span className="text-[10px] text-zinc-300 font-gothic uppercase tracking-widest text-center">{relic.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-black/80 p-5 border-t border-purple-900/40 flex justify-between items-center flex-shrink-0">
          <p className="text-[10px] text-purple-900 uppercase font-black italic tracking-[0.2em]">"Reality is but a suggestion."</p>
          <button 
            onClick={onClear} 
            className="px-6 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-gothic uppercase tracking-widest text-zinc-500 hover:text-white hover:border-purple-500 transition-all"
          >
            Banish All Cheats
          </button>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #050505; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #581c87; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default DebugPopup;
