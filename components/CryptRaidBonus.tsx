
import React, { useState, useEffect, useMemo } from 'react';
import { soundManager } from '../services/sounds.ts';

interface CryptRaidBonusProps {
  bet: number;
  onComplete: (winAmount: number) => void;
}

type CoffinResult = 'COIN' | 'BAT' | 'HUNTER';

interface CoffinState {
  id: number;
  revealed: boolean;
  result: CoffinResult;
  value: number; // For COINs
}

const CryptRaidBonus: React.FC<CryptRaidBonusProps> = ({ bet, onComplete }) => {
  const [coffins, setCoffins] = useState<CoffinState[]>([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Generate 5 coffins with randomized contents
    // Usually 2 coins, 2 bats, 1 hunter
    const types: CoffinResult[] = ['COIN', 'COIN', 'BAT', 'BAT', 'HUNTER'];
    const shuffled = types.sort(() => Math.random() - 0.5);
    
    const initialCoffins = shuffled.map((type, i) => ({
      id: i,
      revealed: false,
      result: type,
      value: type === 'COIN' ? (Math.floor(Math.random() * 15) + 5) * bet : 0
    }));
    
    setCoffins(initialCoffins);
    soundManager.play('bonus_start');
  }, [bet]);

  const handlePick = (id: number) => {
    if (gameOver || isExiting) return;
    
    const coffin = coffins.find(c => c.id === id);
    if (!coffin || coffin.revealed) return;

    soundManager.play('coffin_open');
    
    setCoffins(prev => prev.map(c => c.id === id ? { ...c, revealed: true } : c));

    if (coffin.result === 'COIN') {
      setTotalCoins(prev => prev + coffin.value);
    } else if (coffin.result === 'BAT') {
      setMultiplier(prev => prev + 1);
      soundManager.play('bat_swarm');
    } else if (coffin.result === 'HUNTER') {
      setGameOver(true);
      soundManager.play('hunter_found');
      
      // Auto-exit after delay
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete(totalCoins * multiplier);
        }, 1000);
      }, 2000);
    }
  };

  return (
    <div className={`w-full min-h-[500px] flex flex-col items-center justify-start p-4 md:p-6 animate-in fade-in zoom-in duration-700 ${isExiting ? 'animate-out fade-out zoom-out duration-1000' : ''}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-4xl font-gothic text-red-600 red-glow mb-2 uppercase tracking-widest">The Crypt Raid</h2>
        <div className="flex gap-4 md:gap-8 justify-center items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-gothic uppercase">Total Harvest</span>
            <span className="text-xl md:text-2xl text-yellow-500 font-bold font-serif">${totalCoins}</span>
          </div>
          <div className="text-red-900 text-2xl md:text-3xl font-bold">×</div>
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-gothic uppercase">Multiplier</span>
            <span className="text-xl md:text-2xl text-red-500 font-bold font-serif">{multiplier}x</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-6 max-w-3xl overflow-visible py-4">
        {coffins.map((coffin) => (
          <button
            key={coffin.id}
            onClick={() => handlePick(coffin.id)}
            disabled={coffin.revealed || gameOver}
            className={`
              relative w-24 h-40 md:w-28 md:h-48 bg-zinc-900 border-2 rounded-lg transition-all duration-500 group
              ${coffin.revealed ? 'border-zinc-800' : 'border-red-900 hover:border-red-500 hover:scale-105 hover:-translate-y-1'}
              ${gameOver && !coffin.revealed ? 'opacity-50 grayscale' : ''}
              shadow-[0_10px_20px_rgba(0,0,0,0.8)]
            `}
          >
            {/* Lid Detail */}
            {!coffin.revealed && (
              <div className="absolute inset-2 border border-red-950/30 flex items-center justify-center">
                <span className="text-red-900/40 text-3xl md:text-4xl group-hover:text-red-600/60 transition-colors">⚰️</span>
              </div>
            )}

            {/* Content Reveal */}
            {coffin.revealed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center animate-in zoom-in duration-500">
                {coffin.result === 'COIN' && (
                  <>
                    <span className="text-3xl md:text-4xl mb-1 md:mb-2 drop-shadow-[0_0_10px_gold]">💰</span>
                    <span className="text-[10px] md:text-xs text-yellow-500 font-bold font-serif">+${coffin.value}</span>
                  </>
                )}
                {coffin.result === 'BAT' && (
                  <>
                    <span className="text-3xl md:text-4xl mb-1 md:mb-2 drop-shadow-[0_0_10px_red] animate-bounce">🦇</span>
                    <span className="text-[10px] md:text-xs text-red-500 font-bold font-serif">+1x MULTI</span>
                  </>
                )}
                {coffin.result === 'HUNTER' && (
                  <>
                    <span className="text-4xl md:text-5xl mb-1 md:mb-2 filter drop-shadow-[0_0_15px_white]">🏹</span>
                    <span className="text-[10px] md:text-xs text-white font-bold font-gothic">THE HUNTER</span>
                  </>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 md:mt-8 text-center min-h-[24px]">
        {gameOver ? (
          <p className="text-white font-gothic animate-pulse text-lg">THE HUNTER HAS AWAKENED! ESCAPING...</p>
        ) : (
          <p className="text-zinc-600 font-serif italic text-sm">The dead do not share their riches willingly...</p>
        )}
      </div>
    </div>
  );
};

export default CryptRaidBonus;
