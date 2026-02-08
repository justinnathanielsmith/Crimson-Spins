
import React from 'react';

interface JackpotBannerProps {
  amount: number;
}

export const JackpotBanner: React.FC<JackpotBannerProps> = ({ amount }) => {
  return (
    <div className="relative group z-30 transform transition-transform hover:scale-105 duration-700">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-red-900/30 blur-[40px] rounded-full animate-pulse"></div>
      
      <div className="relative bg-[#050202]/90 border-y-2 border-red-900/50 py-5 px-14 flex flex-col items-center backdrop-blur-sm">
          {/* Decorative Side Borders with Gradient Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black via-red-950/20 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black via-red-950/20 to-transparent"></div>
          
          {/* Top Bat Ornament */}
          <div className="absolute -top-3 text-red-900/80 text-xl opacity-80">🦇</div>

          <span className="text-[10px] md:text-xs text-red-800 uppercase tracking-[0.6em] font-gothic mb-1 relative z-10 font-bold">
              Ancient Sanguine Jackpot
          </span>
          <span className="text-5xl md:text-7xl font-gothic font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-700 to-red-950 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] relative z-10 red-glow">
              ${Math.floor(amount).toLocaleString()}
          </span>
          
          {/* Bottom Bat Ornament */}
          <div className="absolute -bottom-3 text-red-900/80 text-xl rotate-180 opacity-80">🦇</div>
      </div>
    </div>
  );
};
