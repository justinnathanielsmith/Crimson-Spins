
export enum GameStatus {
  IDLE = 'IDLE',
  SPINNING = 'SPINNING',
  WIN = 'WIN',
  LOSS = 'LOSS',
  BONUS = 'BONUS',
  BARGAIN = 'BARGAIN',
  NUDGING = 'NUDGING',
  ALTAR = 'ALTAR',
  ENCOUNTER = 'ENCOUNTER'
}

export interface Relic {
  id: string;
  name: string;
  description: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'unholy';
  cost: number;
}

export interface SlotSymbol {
  id: string;
  emoji: string;
  name: string;
  multiplier: number;
  weight: number;
}

export interface GameState {
  balance: number;
  bet: number;
  jackpot: number;
  status: GameStatus;
  reels: SlotSymbol[];
  winningIndices: number[];
  lastWin: number;
  isJackpotWin: boolean;
  multiplier: number;
  oracleFortune: string;
  loadingOracle: boolean;
  oracleEnabled: boolean;
  muted: boolean;
  showParticles: boolean;
  isDissolving: number[];
  stoppedReels: boolean[];
  nudgeAvailable: number;
  // Roguelike State
  relics: Relic[];
  xp: number;
  level: number;
  spinsSinceLastAltar: number;
}

export type GameAction =
  | { type: 'START_SPIN' }
  | { type: 'RESOLVE_SPIN' }
  | { type: 'STOP_REEL'; index: number }
  | { type: 'SET_REELS'; reels: SlotSymbol[] }
  | { type: 'SET_STATUS'; status: GameStatus }
  | { type: 'UPDATE_BALANCE'; amount: number }
  | { type: 'SET_WIN'; amount: number; indices: number[]; isJackpot: boolean }
  | { type: 'SET_ORACLE'; fortune: string; loading: boolean }
  | { type: 'ADJUST_BET'; amount: number }
  | { type: 'TOGGLE_ORACLE' }
  | { type: 'TOGGLE_MUTE'; muted: boolean }
  | { type: 'SET_PARTICLES'; active: boolean }
  | { type: 'SET_DISSOLVE'; indices: number[] }
  | { type: 'TRIGGER_NUDGE'; count: number }
  | { type: 'CONSUME_NUDGE'; index: number; symbol: SlotSymbol }
  | { type: 'COLLECT_WIN' }
  | { type: 'RESET_SPIN_STATE' }
  | { type: 'ADD_RELIC'; relic: Relic }
  | { type: 'GAIN_XP'; amount: number }
  | { type: 'OPEN_ALTAR' }
  | { type: 'CLOSE_ALTAR' };
