
import React from 'react';
import { Relic } from '../types.ts';
import { RELICS } from '../constants.tsx';

interface BloodAltarProps {
  balance: number;
  onBuy: (relic: Relic) => void;
  onClose: () => void;
  ownedRelics: Relic[];
}

const BloodAltar: React.FC<BloodAltarProps> = ({ balance, onBuy, onClose, ownedRelics }) => {
  return (
    <div className="w-full min-h-[500px] flex flex-col items-center p-6 animate-in fade-in zoom-in duration-700 bg-red-950/20 backdrop-blur-md rounded-3xl border-2 border-red-900/40">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-gothic text-red-600 red-glow mb-2 uppercase tracking-widest">The Blood Altar</h2>
        <p className="text-zinc-500 font-serif italic">Sacrifice your essence for unholy power...</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
        {RELICS.map((relic) => {
          const isOwned = ownedRelics.some(r => r.id === relic.id);
          const canAfford = balance >= relic.cost;
          
          return (
            <div 
              key={relic.id}
              className={`
                relative p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center
                ${isOwned ? 'border-zinc-800 bg-zinc-900/40 opacity-60' : 'border-red-900/40 bg-black/60 hover:border-red-500 hover:scale-105 shadow-xl'}
              `}
            >
              <span className="text-5xl mb-4 drop-shadow-[0_0_10px_red]">{relic.emoji}</span>
              <h3 className="font-gothic text-lg text-red-200 mb-1">{relic.name}</h3>
              <p className="text-[10px] text-zinc-400 mb-6 font-serif h-12">{relic.description}</p>
              
              <button
                onClick={() => onBuy(relic)}
                disabled={isOwned || !canAfford}
                className={`
                  w-full py-2 rounded-lg font-gothic text-xs uppercase tracking-widest transition-all
                  ${isOwned 
                    ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                    : !canAfford 
                      ? 'bg-red-950/20 text-red-900 border border-red-900/40 cursor-not-allowed' 
                      : 'bg-red-900 hover:bg-red-700 text-white animate-pulse-red'
                  }
                `}
              >
                {isOwned ? 'Possessed' : `$${relic.cost}`}
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={onClose}
        className="mt-12 px-10 py-3 border-2 border-red-900 text-red-500 font-gothic uppercase tracking-[0.3em] hover:bg-red-900 hover:text-white transition-all rounded-full"
      >
        Leave the Altar
      </button>
    </div>
  );
};

export default BloodAltar;
