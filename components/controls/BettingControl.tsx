
import React, { useState, useEffect } from 'react';
import { BET_INCREMENT } from '../../constants.tsx';

interface BettingControlProps {
  currentBet: number;
  onAdjust: (amount: number) => void;
}

export const BettingControl: React.FC<BettingControlProps> = ({ currentBet, onAdjust }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 300);
    return () => clearTimeout(timer);
  }, [currentBet]);

  return (
    <div className="flex items-center gap-4 bg-zinc-950/80 p-3 rounded-full border border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
      {/* Decrease Bet */}
      <button 
        onClick={() => onAdjust(-BET_INCREMENT)} 
        className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-red-500 hover:border-red-900 transition-all active:scale-95 group"
      >
        <span className="text-2xl font-black group-hover:drop-shadow-[0_0_5px_red]">-</span>
      </button>

      {/* Bet Display */}
      <div className={`flex flex-col items-center px-6 min-w-[140px] transition-all duration-300 ${pulse ? 'scale-110' : 'scale-100'}`}>
         <span className={`text-[10px] uppercase tracking-[0.3em] font-gothic mb-1 transition-colors duration-300 ${pulse ? 'text-amber-400' : 'text-zinc-600'}`}>Offering</span>
         <span className={`text-2xl font-gothic font-black transition-all duration-300 ${pulse ? 'text-white drop-shadow-[0_0_15px_white]' : 'text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}>
           ${currentBet}
         </span>
      </div>

      {/* Increase Bet */}
      <button 
        onClick={() => onAdjust(BET_INCREMENT)} 
        className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-amber-500 hover:border-amber-900 transition-all active:scale-95 group"
      >
        <span className="text-2xl font-black group-hover:drop-shadow-[0_0_5px_amber]">+</span>
      </button>
    </div>
  );
};
