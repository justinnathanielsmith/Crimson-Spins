
import React from 'react';
import { Relic } from '../types.ts';

interface RelicInventoryProps {
  relics: Relic[];
  xp: number;
  level: number;
}

export const RelicInventory: React.FC<RelicInventoryProps> = ({ relics, xp, level }) => {
  return (
    <div className="w-full max-w-4xl flex flex-col gap-2 mt-4 px-4">
      {/* XP Bar */}
      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 relative group">
        <div 
          className="h-full bg-gradient-to-r from-red-950 via-red-600 to-red-400 shadow-[0_0_10px_red] transition-all duration-1000 ease-out"
          style={{ width: `${xp}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[7px] text-white/40 uppercase tracking-[0.4em] font-gothic opacity-0 group-hover:opacity-100 transition-opacity">
            Level {level} Ascension
          </span>
        </div>
      </div>

      {/* Relics Row */}
      <div className="flex justify-center gap-3">
        {[...Array(5)].map((_, i) => {
          const relic = relics[i];
          return (
            <div 
              key={i}
              className={`
                w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center text-xl md:text-2xl relative group transition-all
                ${relic ? 'border-red-600 bg-red-950/30 shadow-[0_0_10px_rgba(220,38,38,0.3)]' : 'border-zinc-900 bg-black/40'}
              `}
            >
              {relic ? (
                <>
                  <span className="drop-shadow-[0_0_5px_red]">{relic.emoji}</span>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 p-3 bg-zinc-950 border border-red-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100] shadow-2xl">
                    <p className="text-red-500 font-gothic text-[10px] uppercase tracking-widest mb-1">{relic.name}</p>
                    <p className="text-zinc-400 text-[9px] font-serif leading-tight italic">"{relic.description}"</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-red-900"></div>
                  </div>
                </>
              ) : (
                <span className="text-zinc-800 text-xs">♰</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
