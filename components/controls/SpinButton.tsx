
import React from 'react';

interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSpinning: boolean;
}

export const SpinButton: React.FC<SpinButtonProps> = ({ onClick, disabled, isSpinning }) => {
  return (
    <div className="relative group scale-100 hover:scale-105 active:scale-95 transition-transform duration-300">
        {/* Glow behind */}
        <div className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-500 ${isSpinning ? 'bg-zinc-800 opacity-20' : 'bg-red-600 opacity-40 group-hover:opacity-60 animate-pulse-red'}`}></div>
        
        <button
          onClick={onClick}
          disabled={disabled}
          className={`
            relative w-40 h-40 rounded-full border-4 shadow-[inset_0_5px_20px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.8)]
            flex flex-col items-center justify-center gap-1 transition-all duration-500
            ${disabled
                ? 'bg-zinc-900 border-zinc-700 grayscale cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-br from-red-900 via-black to-red-950 border-red-800 hover:border-red-500 cursor-pointer'
            }
          `}
        >
           {/* Inner Ring Texture */}
           <div className="absolute inset-2 rounded-full border border-dashed border-white/10 opacity-50 animate-[spin_10s_linear_infinite]"></div>
           
           {/* Label */}
           <span className={`font-gothic text-3xl font-black tracking-widest uppercase z-10 
             ${isSpinning ? 'text-zinc-600' : 'text-red-100 text-glow-red'}
           `}>
             {isSpinning ? '...' : 'SPIN'}
           </span>
           
           {/* Sub-label */}
           <span className={`text-[9px] uppercase tracking-[0.4em] z-10 ${isSpinning ? 'text-zinc-700' : 'text-red-500/80'}`}>
             {isSpinning ? 'Fate Seals' : 'Summon'}
           </span>
        </button>
    </div>
  );
};
