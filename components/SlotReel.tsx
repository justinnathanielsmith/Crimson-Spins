
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SlotSymbol } from '../types.ts';
import { SYMBOLS } from '../constants.tsx';

interface SlotReelProps {
  index: number;
  isSpinning: boolean;
  targetSymbol: SlotSymbol;
  delay: number;
  highlight?: boolean;
  isDissolving?: boolean;
  isStopped?: boolean;
  onNudge?: (direction: 'up' | 'down') => void;
  canNudge?: boolean;
  onSymbolLand?: (symbol: SlotSymbol) => void;
}

const REEL_STRIP = [...SYMBOLS, ...SYMBOLS, ...SYMBOLS]; 
const SYMBOL_HEIGHT = 160; 

const SlotReel: React.FC<SlotReelProps> = ({ 
  index: reelIndex,
  isSpinning, 
  targetSymbol, 
  delay, 
  highlight = false, 
  isDissolving = false,
  isStopped = false,
  onNudge,
  canNudge = false,
  onSymbolLand
}) => {
  const [offset, setOffset] = useState(0);
  const requestRef = useRef<number>(null);
  const speedRef = useRef(0);
  const lastTimeRef = useRef<number>(0);

  const spin = useCallback((time: number) => {
    if (lastTimeRef.current !== undefined) {
      const deltaTime = time - lastTimeRef.current;
      if (speedRef.current < 3) { 
        speedRef.current += 0.08;
      }
      setOffset((prevOffset) => {
        const newOffset = prevOffset + speedRef.current * deltaTime;
        const totalHeight = REEL_STRIP.length * SYMBOL_HEIGHT;
        return newOffset % totalHeight;
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(spin);
  }, []);

  useEffect(() => {
    if (isSpinning && !isStopped) {
      speedRef.current = 0;
      lastTimeRef.current = performance.now();
      setTimeout(() => {
        requestRef.current = requestAnimationFrame(spin);
      }, delay);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      
      if (isStopped) {
        setOffset(prev => {
          // Use Math.round to find the nearest symbol index to center
          const snappedIndex = Math.round(prev / SYMBOL_HEIGHT) % REEL_STRIP.length;
          const landedSymbol = REEL_STRIP[snappedIndex];
          if (onSymbolLand) onSymbolLand(landedSymbol);
          return snappedIndex * SYMBOL_HEIGHT;
        });
      }
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isSpinning, isStopped, spin, delay, onSymbolLand]);

  const getVisibleSymbols = () => {
    // Determine the "base" symbol currently being displayed
    const baseIdx = Math.floor(offset / SYMBOL_HEIGHT);
    const symbols = [];
    // We show the symbol before, the current, and the one after
    for (let i = -1; i <= 1; i++) {
      let idx = (baseIdx + i) % REEL_STRIP.length;
      if (idx < 0) idx += REEL_STRIP.length;
      symbols.push({ symbol: REEL_STRIP[idx], pos: i });
    }
    return symbols;
  };

  const renderOffset = offset % SYMBOL_HEIGHT;
  const blurAmount = isSpinning && !isStopped ? Math.min(speedRef.current * 4, 8) : 0;

  return (
    <div className="flex flex-col items-center gap-3 relative group">
      <div className={`
        relative w-28 h-[22rem] md:w-36 md:h-[26rem] 
        bg-[#050202] rounded-t-full rounded-b-lg overflow-hidden
        border-[3px] transition-all duration-500
        ${highlight 
          ? 'border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.6)] animate-gothic-win-reel' 
          : 'border-zinc-800 shadow-[inset_0_0_40px_rgba(0,0,0,1)] border-b-zinc-900'}
      `}>

        <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_15%,rgba(0,0,0,0)_85%,rgba(0,0,0,1)_100%)]"></div>

        <div 
          className="absolute inset-0 flex flex-col items-center left-0 right-0"
          style={{ 
            transform: `translateY(calc(50% - ${SYMBOL_HEIGHT / 2}px - ${renderOffset}px))`,
            filter: `blur(${blurAmount}px)`,
            willChange: 'transform'
          }}
        >
          {getVisibleSymbols().map(({ symbol, pos }, i) => (
            <div 
              key={`${i}-${symbol.id}`}
              className={`flex flex-col items-center justify-center flex-shrink-0 w-full relative`}
              style={{ height: `${SYMBOL_HEIGHT}px` }}
            >
              <div className={`absolute w-24 h-24 rounded-full transition-all duration-500
                ${highlight && pos === 0 
                  ? 'bg-red-900/40 blur-xl scale-150 animate-pulse' 
                  : 'bg-zinc-900/20 blur-lg scale-75 opacity-0'}
              `}></div>

              <span className={`
                text-7xl md:text-8xl block transition-all duration-300 relative z-10
                ${highlight && pos === 0 
                  ? 'drop-shadow-[0_0_35px_rgba(220,38,38,1)] brightness-150 scale-125' 
                  : 'drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] opacity-90 grayscale-[0.3]'}
                ${highlight && pos === 0 && !isDissolving ? 'animate-symbol-win' : ''}
                ${isDissolving && highlight && pos === 0 ? 'animate-symbol-dissolve' : ''}
              `}>
                {symbol.emoji}
              </span>

              <div className={`
                mt-2 px-3 py-0.5 rounded-full border border-white/5 backdrop-blur-sm
                transition-all duration-300
                ${highlight && pos === 0 ? 'opacity-100 bg-red-950/60 border-red-500/30' : 'opacity-40 bg-black/40'}
              `}>
                <span className={`text-[10px] uppercase font-gothic tracking-[0.2em] font-bold
                  ${highlight && pos === 0 ? 'text-red-200 text-glow-red' : 'text-zinc-500'}
                `}>
                  {symbol.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Win Line Highlight (Horizontal Glow) */}
        {highlight && (
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent -translate-y-1/2 z-40 blur-[2px] animate-win-line pointer-events-none"></div>
        )}

        {/* Highlight indicators (Triangles) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-50 pointer-events-none">
          <div className={`w-3 h-6 bg-zinc-950 border-r-2 border-y border-zinc-700 clip-path-triangle-right shadow-[0_0_15px_black] transition-colors duration-300 ${highlight ? 'border-red-500 scale-125' : ''}`}></div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-50 pointer-events-none">
          <div className={`w-3 h-6 bg-zinc-950 border-l-2 border-y border-zinc-700 clip-path-triangle-left shadow-[0_0_15px_black] transition-colors duration-300 ${highlight ? 'border-red-500 scale-125' : ''}`}></div>
        </div>
        
        <div className="absolute inset-0 z-40 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30 pointer-events-none rounded-t-full"></div>
      </div>

      {canNudge && onNudge && (
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 animate-in slide-in-from-left-2 duration-300 z-30">
          <button 
            onClick={() => onNudge('up')}
            className="w-10 h-10 bg-gradient-to-b from-zinc-800 to-black text-red-500 rounded-full border border-zinc-700 shadow-[0_4px_6px_black] hover:border-red-500 hover:text-red-400 active:translate-y-0.5 transition-all flex items-center justify-center"
          >
            <span className="drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]">▲</span>
          </button>
          <button 
            onClick={() => onNudge('down')}
            className="w-10 h-10 bg-gradient-to-b from-zinc-800 to-black text-red-500 rounded-full border border-zinc-700 shadow-[0_4px_6px_black] hover:border-red-500 hover:text-red-400 active:translate-y-0.5 transition-all flex items-center justify-center"
          >
            <span className="drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]">▼</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SlotReel;
