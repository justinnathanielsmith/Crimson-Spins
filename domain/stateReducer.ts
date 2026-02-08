
import { GameState, GameAction, GameStatus } from '../types.ts';
import { SYMBOLS, INITIAL_BALANCE, MIN_BET, REEL_COUNT, INITIAL_JACKPOT } from '../constants.tsx';
import { GameEngine } from './gameEngine.ts';
import { soundManager } from '../services/sounds.ts';

export const initialState: GameState = {
  balance: INITIAL_BALANCE,
  bet: MIN_BET,
  jackpot: INITIAL_JACKPOT,
  status: GameStatus.IDLE,
  reels: Array(REEL_COUNT).fill(SYMBOLS[SYMBOLS.length - 1]),
  winningIndices: [],
  lastWin: 0,
  isJackpotWin: false,
  multiplier: 1,
  oracleFortune: "",
  loadingOracle: false,
  oracleEnabled: false,
  muted: soundManager.muted,
  showParticles: false,
  isDissolving: [],
  stoppedReels: [false, false, false],
  nudgeAvailable: 0,
  relics: [],
  xp: 0,
  level: 1,
  spinsSinceLastAltar: 0,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_SPIN':
      return {
        ...state,
        status: GameStatus.SPINNING,
        balance: state.balance - state.bet,
        jackpot: state.jackpot + GameEngine.calculateJackpotContribution(state.bet),
        stoppedReels: [false, false, false],
        winningIndices: [],
        multiplier: 1,
        lastWin: 0,
        isJackpotWin: false,
        oracleFortune: "",
        loadingOracle: true,
        showParticles: false,
        isDissolving: [],
        spinsSinceLastAltar: state.spinsSinceLastAltar + 1,
      };
    case 'RESOLVE_SPIN':
      return { ...state, stoppedReels: [true, true, true] };
    case 'STOP_REEL':
      const newStopped = [...state.stoppedReels];
      newStopped[action.index] = true;
      return { ...state, stoppedReels: newStopped };
    case 'SET_REELS':
      return { ...state, reels: action.reels };
    case 'SET_WIN':
      return { 
        ...state, 
        lastWin: action.amount, 
        winningIndices: action.indices, 
        isJackpotWin: action.isJackpot,
        status: GameStatus.WIN,
        showParticles: true
      };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'UPDATE_BALANCE':
      return { ...state, balance: state.balance + action.amount };
    case 'SET_ORACLE':
      return { ...state, oracleFortune: action.fortune, loadingOracle: action.loading };
    case 'ADJUST_BET':
      const newBet = Math.max(MIN_BET, state.bet + action.amount);
      return { ...state, bet: newBet };
    case 'TOGGLE_ORACLE':
      return { ...state, oracleEnabled: !state.oracleEnabled };
    case 'TOGGLE_MUTE':
      return { ...state, muted: action.muted };
    case 'SET_PARTICLES':
      return { ...state, showParticles: action.active };
    case 'TRIGGER_NUDGE':
      return { ...state, status: GameStatus.NUDGING, nudgeAvailable: action.count, loadingOracle: false };
    case 'CONSUME_NUDGE':
      const nudgedReels = [...state.reels];
      nudgedReels[action.index] = action.symbol;
      return { ...state, reels: nudgedReels, nudgeAvailable: state.nudgeAvailable - 1 };
    case 'COLLECT_WIN':
      return { ...state, status: GameStatus.IDLE };
    case 'SET_DISSOLVE':
      return { ...state, isDissolving: action.indices };
    case 'ADD_RELIC':
      return { 
        ...state, 
        relics: [...state.relics, action.relic].slice(0, 5),
        balance: state.balance - action.relic.cost 
      };
    case 'GAIN_XP':
      let newXp = state.xp + action.amount;
      let newLevel = state.level;
      if (newXp >= 100) {
        newXp -= 100;
        newLevel += 1;
      }
      return { ...state, xp: newXp, level: newLevel };
    case 'OPEN_ALTAR':
      return { ...state, status: GameStatus.ALTAR, spinsSinceLastAltar: 0 };
    case 'CLOSE_ALTAR':
      return { ...state, status: GameStatus.IDLE };
    default:
      return state;
  }
}
