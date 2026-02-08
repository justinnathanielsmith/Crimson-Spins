
import React from 'react';

interface VampireOracleProps {
  fortune: string;
  loading: boolean;
  enabled: boolean;
}

const VampireOracle: React.FC<VampireOracleProps> = ({ fortune, loading, enabled }) => {
  return (
    <div className={`mt-12 w-full max-w-xl mx-auto relative group transition-opacity duration-1000 ${enabled ? 'opacity-100' : 'opacity-70'}`}>
      {/* Gothic Decorative "Ironwork" Corners */}
      <div className={`absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 rounded-tl-sm z-30 pointer-events-none transition-colors ${enabled ? 'border-red-900/80' : 'border-zinc-800'}`}></div>
      <div className={`absolute -top-3 -right-3 w-8 h-8 border-t-4 border-right-4 rounded-tr-sm z-30 pointer-events-none transition-colors ${enabled ? 'border-red-900/80' : 'border-zinc-800'}`} style={{ borderRightWidth: '4px' }}></div>
      <div className={`absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 rounded-bl-sm z-30 pointer-events-none transition-colors ${enabled ? 'border-red-900/80' : 'border-zinc-800'}`}></div>
      <div className={`absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-right-4 rounded-br-sm z-30 pointer-events-none transition-colors ${enabled ? 'border-red-900/80' : 'border-zinc-800'}`} style={{ borderRightWidth: '4px' }}></div>

      {/* Main Container */}
      <div className={`p-8 bg-zinc-950 border-2 rounded-2xl relative overflow-hidden transition-all duration-700 shadow-2xl ${enabled ? 'animate-oracle-pulse border-red-900' : 'border-zinc-900'}`}>
        
        {/* Smoke Wisps Background */}
        <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-30 transition-opacity ${enabled ? 'opacity-30' : 'opacity-5'}`}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="smoke-wisp absolute bg-red-900/20 blur-[20px] rounded-full"
              style={{
                width: `${Math.random() * 60 + 40}px`,
                height: `${Math.random() * 30 + 20}px`,
                bottom: '10px',
                left: `${Math.random() * 80 + 10}%`,
                '--duration': `${Math.random() * 2 + 3}s`,
                '--delay': `${Math.random() * 5}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Header Decor */}
        <div className="flex flex-col items-center mb-4 relative z-10">
          <div className="flex items-center gap-4 mb-1">
             <span className={`text-2xl transition-colors ${enabled ? 'text-red-900/40' : 'text-zinc-800'}`}>♰</span>
             <h3 className={`font-gothic text-xl tracking-[0.25em] uppercase font-bold text-center transition-all duration-1000 ${enabled ? 'text-red-700 red-glow' : 'text-zinc-600'}`}>
              The Vampire Oracle
             </h3>
             <span className={`text-2xl transition-colors ${enabled ? 'text-red-900/40' : 'text-zinc-800'}`}>♰</span>
          </div>
          <div className={`w-48 h-[1px] transition-all duration-1000 ${enabled ? 'bg-gradient-to-r from-transparent via-red-900 to-transparent' : 'bg-zinc-800'}`}></div>
        </div>

        {/* Content Area */}
        <div className="min-h-[100px] flex items-center justify-center relative z-10">
          {loading && enabled ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex space-x-3">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce shadow-[0_0_10px_red]"></div>
                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-.3s] shadow-[0_0_10px_red]"></div>
                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-.5s] shadow-[0_0_10px_red]"></div>
              </div>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-gothic">Summoning Insight...</span>
            </div>
          ) : (
            <div className="relative group/text">
              <p className={`italic text-center font-serif text-xl leading-relaxed px-6 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] transition-colors duration-1000 ${enabled ? 'text-zinc-300' : 'text-zinc-600'}`}>
                "{fortune || (enabled ? "Peer into the abyss..." : "The Oracle slumbers. Awaken it to hear your dark destiny.")}"
              </p>
              {/* Subtle underline flare on reveal */}
              {enabled && <div className="mt-4 w-full h-[1px] bg-red-900/20 scale-x-0 group-hover/text:scale-x-100 transition-transform duration-1000"></div>}
            </div>
          )}
        </div>

        {/* Bottom Sigil Decor */}
        <div className={`absolute -bottom-4 -left-4 w-16 h-16 opacity-5 pointer-events-none rotate-45 select-none transition-opacity ${enabled ? 'opacity-5' : 'opacity-0'}`}>
           <span className="text-6xl text-white">🦇</span>
        </div>
        <div className={`absolute -bottom-4 -right-4 w-16 h-16 opacity-5 pointer-events-none -rotate-45 select-none transition-opacity ${enabled ? 'opacity-5' : 'opacity-0'}`}>
           <span className="text-6xl text-white">🦇</span>
        </div>

        {/* Subtle Inner Glow */}
        <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none transition-all duration-1000 ${enabled ? 'from-red-900/5 to-transparent' : 'from-transparent'}`}></div>
      </div>
    </div>
  );
};

export default VampireOracle;
