
import React from 'react';

interface CandleProps {
  className?: string;
  isIntense?: boolean;
}

export const Candle: React.FC<CandleProps> = ({ className, isIntense = false }) => {
  return (
    <div className={`relative flex flex-col items-center transition-transform duration-500 ${isIntense ? 'scale-110' : ''} ${className}`}>
      {/* Flame */}
      <div className={`absolute -top-6 w-4 h-7 rounded-full z-10 transition-all duration-300
        ${isIntense 
          ? 'flicker-intense bg-gradient-to-t from-red-800 via-red-500 to-white blur-[1px]' 
          : 'flicker bg-gradient-to-t from-orange-600 via-yellow-400 to-amber-100 blur-[2px]'}`}>
      </div>
      {/* Wick */}
      <div className="w-0.5 h-2 bg-zinc-900 mb-[-2px] z-20"></div>
      {/* Wax Body */}
      <div className={`w-4 h-16 rounded-sm relative overflow-hidden shadow-inner transition-colors duration-1000 ${isIntense ? 'bg-red-200' : 'bg-zinc-300'}`}>
        <div className="absolute top-0 w-full h-1 bg-zinc-400 opacity-50"></div>
        {/* Drips */}
        <div className="absolute top-2 left-0 w-1 h-4 bg-zinc-100 rounded-full opacity-60"></div>
        <div className="absolute top-4 right-1 w-1 h-6 bg-zinc-100 rounded-full opacity-60"></div>
      </div>
      {/* Base */}
      <div className="w-8 h-1.5 bg-zinc-800 rounded-full -mt-0.5 shadow-lg"></div>
    </div>
  );
};
