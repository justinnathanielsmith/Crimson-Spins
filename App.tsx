
import React, { useState } from 'react';
import { GameStatus, SlotSymbol } from './types.ts';
import { useSlotMachine } from './hooks/useSlotMachine.ts';

// Components
import SlotReel from './components/SlotReel.tsx';
import VampireOracle from './components/VampireOracle.tsx';
import CryptRaidBonus from './components/CryptRaidBonus.tsx';
import DarkBargain from './components/DarkBargain.tsx';
import BloodAltar from './components/BloodAltar.tsx';
import DebugPopup from './components/DebugPopup.tsx';
import PaytablePopup from './components/PaytablePopup.tsx';
import { ParticleBurst } from './components/ParticleBurst.tsx';
import { Mist } from './components/Mist.tsx';
import { BloodBackground } from './components/BloodBackground.tsx';
import { RelicInventory } from './components/RelicInventory.tsx';

// Refactored UI Components
import { GameShell } from './components/layout/GameShell.tsx';
import { GameHeader } from './components/game/GameHeader.tsx';
import { JackpotBanner } from './components/game/JackpotBanner.tsx';
import { StatusVial } from './components/ui/StatusVial.tsx';
import { SpinButton } from './components/controls/SpinButton.tsx';
import { BettingControl } from './components/controls/BettingControl.tsx';

export const App: React.FC = () => {
  const { state, actions, dispatch } = useSlotMachine();
  const [debugOpen, setDebugOpen] = useState(false);
  const [paytableOpen, setPaytableOpen] = useState(false);
  const [forcedSymbols, setForcedSymbols] = useState<(SlotSymbol | null)[]>([null, null, null]);

  const isSpinning = state.status === GameStatus.SPINNING;
  const isBloodMoon = state.multiplier > 1 || 
    [GameStatus.BONUS, GameStatus.BARGAIN, GameStatus.NUDGING, GameStatus.ALTAR].includes(state.status);

  const backgroundSlot = (
    <>
      <Mist isBloodMoon={isBloodMoon} />
      <BloodBackground isSpinning={isSpinning} />
    </>
  );

  const topNavSlot = (
    <>
      <div className="fixed top-4 left-4 pointer-events-auto">
         <button 
           onClick={actions.toggleMute} 
           className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full border border-red-900/30 flex items-center justify-center text-xl hover:bg-red-900/40 hover:border-red-500 transition-all shadow-lg group"
         >
           <span>{state.muted ? "🔇" : "🔊"}</span>
         </button>
      </div>
      <div className="fixed top-4 right-4 pointer-events-auto">
         <button 
           onClick={actions.toggleOracle} 
           className={`w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full border flex items-center justify-center text-xl transition-all shadow-lg group
             ${state.oracleEnabled ? 'border-red-500 bg-red-900/20 text-white shadow-[0_0_10px_red]' : 'border-red-900/30 text-zinc-500 hover:bg-red-900/40'}
           `}
         >
           <span className={state.oracleEnabled ? '' : 'grayscale'}>👁️</span>
         </button>
      </div>
    </>
  );

  const headerSlot = <GameHeader isBloodMoon={isBloodMoon} />;

  const statsSlot = (
    <>
      <JackpotBanner amount={state.jackpot} />
      <div className="flex justify-center gap-4 md:gap-8 w-full max-w-2xl px-2 relative z-30">
        <StatusVial label="Lifeblood" value={state.balance} colorTheme="red" />
        <StatusVial label="Offering" value={state.bet} colorTheme="amber" />
      </div>
      <RelicInventory relics={state.relics} xp={state.xp} level={state.level} />
    </>
  );

  const gameBoardSlot = (
    <div className="relative p-10 bg-zinc-950 border-[10px] border-red-950 rounded-[3rem] shadow-2xl">
      <ParticleBurst active={state.showParticles} />
      
      {state.status === GameStatus.BONUS ? (
        <CryptRaidBonus bet={state.bet} onComplete={actions.completeBonus} />
      ) : state.status === GameStatus.BARGAIN ? (
        <DarkBargain amount={state.lastWin} onResult={actions.resolveBargain} />
      ) : state.status === GameStatus.ALTAR ? (
        <BloodAltar 
          balance={state.balance} 
          ownedRelics={state.relics} 
          onBuy={actions.buyRelic} 
          onClose={actions.closeAltar} 
        />
      ) : (
        <div className="flex gap-6 md:gap-12 reel-container">
          {state.reels.map((symbol, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <SlotReel 
                index={idx}
                isSpinning={state.status === GameStatus.SPINNING} 
                targetSymbol={symbol} 
                delay={idx * 300} 
                highlight={state.winningIndices.includes(idx)} 
                isStopped={state.stoppedReels[idx]}
                isDissolving={state.isDissolving.includes(idx)}
                canNudge={state.status === GameStatus.NUDGING && state.nudgeAvailable > 0}
                onNudge={actions.handleNudge}
                onSymbolLand={(s) => actions.registerSymbolLand(idx, forcedSymbols[idx] || s)}
              />
              {state.status === GameStatus.SPINNING && !state.stoppedReels[idx] && (
                <button 
                  onClick={() => actions.stopReel(idx)} 
                  className="py-2 bg-red-900 hover:bg-red-700 border-2 border-red-500 rounded-lg text-xs font-black uppercase transition-colors animate-pulse-red shadow-lg"
                >
                  Stop
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const controlsSlot = (
    <div className="w-full max-w-4xl flex flex-col items-center gap-10 z-30">
      {![GameStatus.BONUS, GameStatus.BARGAIN, GameStatus.ALTAR].includes(state.status) && (
        <>
          {state.status !== GameStatus.SPINNING && state.status !== GameStatus.NUDGING && (
            <BettingControl currentBet={state.bet} onAdjust={actions.adjustBet} />
          )}

          {state.status === GameStatus.WIN && state.lastWin > 0 ? (
            <div className="flex gap-6 animate-in slide-in-from-bottom-4 pt-4">
              <button 
                onClick={actions.collectWin} 
                className="px-8 py-3 bg-zinc-900 text-zinc-400 font-gothic font-bold uppercase tracking-widest rounded-lg border border-zinc-700 hover:bg-zinc-800 hover:text-white transition-all shadow-lg"
              >
                Collect
              </button>
              <button 
                onClick={actions.enterBargain} 
                className="px-8 py-3 bg-red-950 text-red-200 font-gothic font-bold uppercase tracking-widest rounded-lg border border-red-800 hover:bg-red-900 hover:text-white transition-all red-glow shadow-lg"
              >
                Dark Bargain
              </button>
            </div>
          ) : (
            <SpinButton 
              onClick={actions.spin} 
              disabled={state.status === GameStatus.SPINNING || state.balance < state.bet}
              isSpinning={state.status === GameStatus.SPINNING}
            />
          )}
        </>
      )}
    </div>
  );

  const oracleSlotComponent = (
    <VampireOracle 
      fortune={state.oracleFortune} 
      loading={state.loadingOracle} 
      enabled={state.oracleEnabled} 
    />
  );

  const floatingControlsSlot = (
    <div className="flex flex-col gap-3">
      <button 
        onClick={() => setPaytableOpen(true)}
        className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full border border-red-900/30 flex items-center justify-center text-xl hover:bg-red-900/40 hover:border-red-500 transition-all shadow-lg group"
      >
        <span>📜</span>
      </button>
      <button 
        onClick={() => setDebugOpen(true)}
        className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full border border-purple-900/30 flex items-center justify-center text-xl hover:bg-purple-900/40 hover:border-purple-500 transition-all shadow-lg group"
      >
        <span>🛠️</span>
      </button>
    </div>
  );

  const overlaysSlot = (
    <>
      <PaytablePopup isOpen={paytableOpen} onClose={() => setPaytableOpen(false)} />
      <DebugPopup 
        isOpen={debugOpen} 
        onClose={() => setDebugOpen(false)} 
        forcedSymbols={forcedSymbols}
        onSetForced={(idx, symbol) => {
          const next = [...forcedSymbols];
          next[idx] = symbol;
          setForcedSymbols(next);
        }}
        onClear={() => setForcedSymbols([null, null, null])}
        onUpdateBalance={(amt) => dispatch({ type: 'UPDATE_BALANCE', amount: amt })}
        onGainXP={(amt) => dispatch({ type: 'GAIN_XP', amount: amt })}
        onAddRelic={actions.buyRelic}
        onOpenAltar={actions.spin} // Since actions.spin checks for Altar when frequency is met, we'll manually open it below:
      />
    </>
  );

  return (
    <GameShell
      isBloodMoon={isBloodMoon}
      background={backgroundSlot}
      topNavigation={topNavSlot}
      header={headerSlot}
      statsDisplay={statsSlot}
      gameBoard={gameBoardSlot}
      controls={controlsSlot}
      oracle={oracleSlotComponent}
      floatingControls={floatingControlsSlot}
      overlays={overlaysSlot}
    />
  );
};
