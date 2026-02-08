
import React from 'react';

interface StatusVialProps {
  label: string;
  value: number;
  currencyPrefix?: string;
  colorTheme: 'red' | 'amber';
}

export const StatusVial: React.FC<StatusVialProps> = ({ 
  label, 
  value, 
  currencyPrefix = '$', 
  colorTheme 
}) => {
  const isRed = colorTheme === 'red';
  const borderColor = isRed ? 'border-red-900/40' : 'border-amber-900/40';
  const bgColor = isRed ? 'bg-red-900/10' : 'bg-amber-900/10';
  const glowColor = isRed ? 'group-hover:bg-red-900/20' : 'group-hover:bg-amber-900/20';
  const textColor = isRed ? 'text-red-800' : 'text-amber-800';
  const valueColor = isRed ? 'text-zinc-200' : 'text-amber-100';

  return (
    <div className={`flex-1 bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-lg p-[1px] relative overflow-hidden group shadow-lg min-w-[140px]`}>
      {/* Animated Liquid Background */}
      <div className={`absolute bottom-0 left-0 right-0 h-1/2 blur-xl transition-all duration-1000 group-hover:h-3/4 ${bgColor} ${glowColor}`}></div>
      
      <div className="relative bg-zinc-950/90 rounded-lg flex flex-col items-center py-3 border-t border-zinc-800/50">
          <span className="text-[9px] uppercase text-zinc-600 tracking-[0.3em] font-gothic mb-1">{label}</span>
          <div className="flex items-baseline gap-1">
              <span className={`text-sm ${textColor}`}>{currencyPrefix}</span>
              <span className={`text-2xl md:text-3xl font-serif drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${valueColor}`}>
                {Math.floor(value).toLocaleString()}
              </span>
          </div>
      </div>
      
      {/* Corner Accents */}
      <div className={`absolute top-1 left-1 w-2 h-2 border-t border-l ${borderColor}`}></div>
      <div className={`absolute bottom-1 right-1 w-2 h-2 border-b border-r ${borderColor}`}></div>
    </div>
  );
};
