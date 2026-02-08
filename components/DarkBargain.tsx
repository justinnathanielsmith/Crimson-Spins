
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/gemini.ts';
import { soundManager } from '../services/sounds.ts';

interface DarkBargainProps {
  amount: number;
  onResult: (success: boolean) => void;
}

const DarkBargain: React.FC<DarkBargainProps> = ({ amount, onResult }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [choosing, setChoosing] = useState(false);

  useEffect(() => {
    const init = async () => {
      const text = await geminiService.getBargainPrompt(amount);
      setPrompt(text);
      setLoading(false);
    };
    init();
  }, [amount]);

  const handleChoice = async (choice: 'left' | 'right') => {
    if (choosing) return;
    setChoosing(true);
    soundManager.play('coffin_open');
    
    // 50/50 chance
    const success = Math.random() > 0.5;
    
    // Small delay for drama
    setTimeout(() => {
      onResult(success);
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl bg-black/60 border-2 border-red-900 rounded-3xl p-8 backdrop-blur-xl animate-in fade-in zoom-in duration-500 shadow-[0_0_100px_rgba(153,27,27,0.4)]">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-gothic text-red-600 mb-2 red-glow tracking-tighter">THE DARK BARGAIN</h2>
        <p className="text-zinc-400 text-sm uppercase tracking-[0.3em] font-gothic">Risk {amount} for {amount * 2} Souls</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[150px]">
           <div className="w-12 h-12 border-4 border-red-900 border-t-red-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-zinc-200 italic text-lg text-center mb-10 px-4 min-h-[60px]">
            "{prompt}"
          </p>

          <div className="flex gap-12 md:gap-24 items-center justify-center w-full">
            <button
              onClick={() => handleChoice('left')}
              disabled={choosing}
              className={`group flex flex-col items-center gap-4 transition-all hover:scale-110 disabled:opacity-50`}
            >
              <div className="relative">
                 <span className="text-7xl drop-shadow-[0_0_10px_rgba(220,38,38,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(220,38,38,1)] transition-all">🍷</span>
                 <div className="absolute -inset-2 bg-red-600/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[10px] text-red-900 font-gothic uppercase tracking-[0.2em] group-hover:text-red-500 transition-colors">Sanguine</span>
            </button>

            <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-red-950 to-transparent"></div>

            <button
              onClick={() => handleChoice('right')}
              disabled={choosing}
              className={`group flex flex-col items-center gap-4 transition-all hover:scale-110 disabled:opacity-50`}
            >
              <div className="relative">
                 <span className="text-7xl drop-shadow-[0_0_10px_rgba(0,0,0,1)] group-hover:drop-shadow-[0_0_20px_rgba(153,27,27,0.8)] transition-all">🍷</span>
                 <div className="absolute -inset-2 bg-zinc-900/50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[10px] text-red-950 font-gothic uppercase tracking-[0.2em] group-hover:text-red-700 transition-colors">Shadow</span>
            </button>
          </div>
        </div>
      )}

      <div className="mt-12 w-full h-[2px] bg-gradient-to-r from-transparent via-red-900 to-transparent"></div>
    </div>
  );
};

export default DarkBargain;
