
import React from 'react';
import { Candle } from '../../components/Candle.tsx';

interface GameHeaderProps {
  isBloodMoon: boolean;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ isBloodMoon }) => {
  return (
    <div className="pt-8 pb-6 px-4 border-b-2 border-red-900/60 bg-zinc-950/95 backdrop-blur-xl flex justify-center items-end gap-6 md:gap-16 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black opacity-50 pointer-events-none"></div>
      
      {/* Left Candle */}
      <div className="hidden md:block pb-2">
         <Candle isIntense={isBloodMoon} />
      </div>
      
      {/* Center Title */}
      <div className="flex flex-col items-center relative z-10 text-center">
          <div className={`text-[10px] md:text-xs tracking-[0.6em] uppercase font-gothic mb-2 transition-colors duration-1000 ${isBloodMoon ? 'text-red-400' : 'text-zinc-600'}`}>
            The Vampire's Curse
          </div>
          <h1 className={`text-5xl md:text-8xl font-gothic font-black leading-none tracking-tighter transition-all duration-1000 transform
            ${isBloodMoon ? 'text-red-500 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)] scale-105' : 'text-transparent bg-clip-text bg-gradient-to-b from-red-700 to-red-950 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}
          `}>
            CRIMSON<span className="hidden md:inline">&nbsp;</span><br className="md:hidden" />REELS
          </h1>
           <div className={`w-full h-[2px] mt-4 transition-all duration-1000 ${isBloodMoon ? 'bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_red]' : 'bg-gradient-to-r from-transparent via-red-900 to-transparent'}`}></div>
      </div>

      {/* Right Candle */}
      <div className="hidden md:block pb-2">
         <Candle isIntense={isBloodMoon} />
      </div>

      {/* Mobile Candles */}
      <div className="md:hidden absolute bottom-4 left-4 scale-75 opacity-60">
         <Candle isIntense={isBloodMoon} />
      </div>
      <div className="md:hidden absolute bottom-4 right-4 scale-75 opacity-60">
         <Candle isIntense={isBloodMoon} />
      </div>
    </div>
  );
};
