
import { useReducer, useRef, useCallback, useEffect } from 'react';
import { GameStatus, SlotSymbol, GameState, Relic } from '../types.ts';
import { initialState, gameReducer } from '../domain/stateReducer.ts';
import { GameEngine } from '../domain/gameEngine.ts';
import { geminiService, decodeAudioData, base64ToUint8Array } from '../services/gemini.ts';
import { soundManager } from '../services/sounds.ts';
import { ALTAR_FREQUENCY } from '../constants.tsx';

export const useSlotMachine = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const landedSymbolsRef = useRef<(SlotSymbol | null)[]>([null, null, null]);
  const spinSoundRef = useRef<{ stop: () => void } | null>(null);

  // Sync services
  useEffect(() => {
    geminiService.enabled = state.oracleEnabled;
  }, [state.oracleEnabled]);

  const playOracleVoice = useCallback(async (text: string) => {
    if (state.muted || !state.oracleEnabled) return;
    const base64 = await geminiService.generateOracleVoice(text);
    if (base64 && soundManager.context) {
      const audioBuffer = await decodeAudioData(base64ToUint8Array(base64), soundManager.context);
      const source = soundManager.context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(soundManager.context.destination);
      source.start(0);
    }
  }, [state.muted, state.oracleEnabled]);

  const handleCascade = useCallback(async (currentReels: SlotSymbol[], mult: number, accumulatedWin: number = 0) => {
    const { winners, payout, jackpotWon } = GameEngine.checkWin(currentReels);
    
    // Relic logic: Cursed Heart increases multiplier scaling
    const hasCursedHeart = state.relics.some(r => r.id === 'cursed_heart');
    const effectiveMult = hasCursedHeart ? mult * 1.5 : mult;

    if (winners.length > 0) {
      const stepWin = jackpotWon && mult === 1 
        ? Math.floor(state.jackpot) 
        : Math.floor(state.bet * payout * effectiveMult);
      
      const newTotalWin = accumulatedWin + stepWin;

      dispatch({ type: 'SET_WIN', amount: newTotalWin, indices: winners, isJackpot: jackpotWon });
      dispatch({ type: 'UPDATE_BALANCE', amount: stepWin });
      dispatch({ type: 'GAIN_XP', amount: Math.floor(stepWin / 10) + 5 });
      soundManager.play('win');

      const fortune = await geminiService.getVampireOracleFortune(stepWin, currentReels.map(r => r.name));
      dispatch({ type: 'SET_ORACLE', fortune, loading: false });
      playOracleVoice(fortune);

      await new Promise(r => setTimeout(r, 1200));
      dispatch({ type: 'SET_DISSOLVE', indices: winners });
      await new Promise(r => setTimeout(r, 600));

      const nextReels = [...currentReels];
      winners.forEach(idx => nextReels[idx] = GameEngine.getRandomSymbol());
      
      dispatch({ type: 'SET_REELS', reels: nextReels });
      dispatch({ type: 'SET_DISSOLVE', indices: [] });
      
      await handleCascade(nextReels, mult + 1, newTotalWin);

    } else {
      if (accumulatedWin > 0) {
        dispatch({ type: 'SET_STATUS', status: GameStatus.WIN });
      } else {
        // Relic logic: Bat Wing nudge chance
        const hasBatWing = state.relics.some(r => r.id === 'bat_wing');
        const nudgeChance = hasBatWing ? 0.6 : 0.4;

        if ((currentReels[0].id === currentReels[1].id || currentReels[1].id === currentReels[2].id) && Math.random() < nudgeChance) {
          dispatch({ type: 'TRIGGER_NUDGE', count: hasBatWing ? 2 : 1 });
        } else {
          // Relic logic: Blood Chalice recovery
          const chaliceCount = state.relics.filter(r => r.id === 'blood_chalice').length;
          if (chaliceCount > 0) {
            const recovery = Math.floor(state.bet * 0.05 * chaliceCount);
            dispatch({ type: 'UPDATE_BALANCE', amount: recovery });
          }

          dispatch({ type: 'SET_STATUS', status: GameStatus.LOSS });
          soundManager.play('loss');
          const fortune = await geminiService.getVampireOracleFortune(0, currentReels.map(r => r.name));
          dispatch({ type: 'SET_ORACLE', fortune, loading: false });
          playOracleVoice(fortune);
        }
      }
    }
  }, [state.bet, state.jackpot, state.relics, playOracleVoice, state.level]);

  const spin = useCallback(async () => {
    if (state.balance < state.bet || state.status === GameStatus.SPINNING) return;
    
    // Check if we should open the altar
    if (state.spinsSinceLastAltar >= ALTAR_FREQUENCY) {
      dispatch({ type: 'OPEN_ALTAR' });
      return;
    }

    dispatch({ type: 'START_SPIN' });
    landedSymbolsRef.current = [null, null, null];
    spinSoundRef.current = soundManager.play('spin', true);

    setTimeout(async () => {
      if (spinSoundRef.current) { 
        spinSoundRef.current.stop(); 
        spinSoundRef.current = null; 
      }
      dispatch({ type: 'RESOLVE_SPIN' });
      await new Promise(r => setTimeout(r, 400));
      const finalReels = landedSymbolsRef.current as SlotSymbol[];
      
      if (finalReels.every(r => r?.id === 'castle')) {
        dispatch({ type: 'SET_STATUS', status: GameStatus.BONUS });
      } else {
        await handleCascade(finalReels, 1, 0);
      }
    }, 2500);
  }, [state.balance, state.bet, state.status, state.spinsSinceLastAltar, handleCascade]);

  const stopReel = useCallback((index: number) => {
    if (state.status === GameStatus.SPINNING && !state.stoppedReels[index]) {
      dispatch({ type: 'STOP_REEL', index });
      soundManager.play('click');
    }
  }, [state.status, state.stoppedReels]);

  const registerSymbolLand = useCallback((index: number, symbol: SlotSymbol) => {
    landedSymbolsRef.current[index] = symbol;
  }, []);

  const adjustBet = useCallback((amount: number) => {
    dispatch({ type: 'ADJUST_BET', amount });
    soundManager.play('bet_adjust');
  }, []);

  const toggleMute = useCallback(() => {
    dispatch({ type: 'TOGGLE_MUTE', muted: soundManager.toggleMute() });
  }, []);

  const toggleOracle = useCallback(() => {
    dispatch({ type: 'TOGGLE_ORACLE' });
  }, []);

  const collectWin = useCallback(() => {
    dispatch({ type: 'SET_STATUS', status: GameStatus.IDLE });
  }, []);

  const enterBargain = useCallback(() => {
    dispatch({ type: 'SET_STATUS', status: GameStatus.BARGAIN });
  }, []);

  const resolveBargain = useCallback((success: boolean) => {
    const amount = success ? state.lastWin : -state.lastWin;
    dispatch({ type: 'UPDATE_BALANCE', amount });
    dispatch({ type: 'SET_STATUS', status: GameStatus.IDLE });
  }, [state.lastWin]);

  const completeBonus = useCallback((winAmount: number) => {
    dispatch({ type: 'UPDATE_BALANCE', amount: winAmount });
    dispatch({ type: 'SET_STATUS', status: GameStatus.IDLE });
  }, []);

  const handleNudge = useCallback((direction: 'up' | 'down') => {
     dispatch({ type: 'CONSUME_NUDGE', index: 0, symbol: GameEngine.getRandomSymbol() }); 
  }, []);

  const buyRelic = useCallback((relic: Relic) => {
    if (state.balance >= relic.cost && state.relics.length < 5) {
      dispatch({ type: 'ADD_RELIC', relic });
    }
  }, [state.balance, state.relics.length]);

  const closeAltar = useCallback(() => {
    dispatch({ type: 'CLOSE_ALTAR' });
  }, []);

  return {
    state,
    dispatch,
    actions: {
      spin,
      stopReel,
      registerSymbolLand,
      adjustBet,
      toggleMute,
      toggleOracle,
      collectWin,
      enterBargain,
      resolveBargain,
      completeBonus,
      handleNudge,
      buyRelic,
      closeAltar
    }
  };
};
