
import { SlotSymbol, Relic } from './types.ts';

export const SYMBOLS: SlotSymbol[] = [
  { id: 'vampire', emoji: '🧛', name: 'The Count', multiplier: 200, weight: 1 },
  { id: 'bat', emoji: '🦇', name: 'Night Stalker', multiplier: 100, weight: 3 },
  { id: 'coffin', emoji: '⚰️', name: 'Eternal Rest', multiplier: 50, weight: 6 },
  { id: 'blood', emoji: '🩸', name: 'Fresh Blood', multiplier: 30, weight: 10 },
  { id: 'chalice', emoji: '🍷', name: 'Cursed Wine', multiplier: 20, weight: 15 },
  { id: 'castle', emoji: '🏰', name: 'Dark Keep', multiplier: 10, weight: 20 },
  { id: 'candle', emoji: '🕯️', name: 'Soul Fire', multiplier: 5, weight: 25 },
  { id: 'rose', emoji: '🥀', name: 'Withered Rose', multiplier: 2, weight: 35 },
];

export const RELICS: Relic[] = [
  { 
    id: 'bat_wing', 
    name: 'Bat Wing', 
    emoji: '🦇', 
    description: '+15% chance to free-nudge on loss', 
    rarity: 'common', 
    cost: 150 
  },
  { 
    id: 'cursed_heart', 
    name: 'Cursed Heart', 
    emoji: '🖤', 
    description: 'Cascade multiplier increases by +0.5x', 
    rarity: 'rare', 
    cost: 400 
  },
  { 
    id: 'silver_stake', 
    name: 'Silver Stake', 
    emoji: '🗡️', 
    description: 'Hunters in Crypt Raid give 2x coins instead of ending run', 
    rarity: 'unholy', 
    cost: 800 
  },
  { 
    id: 'blood_chalice', 
    name: 'Blood Chalice', 
    emoji: '🏆', 
    description: 'Recover 5% of your bet on every loss', 
    rarity: 'common', 
    cost: 200 
  },
];

export const INITIAL_BALANCE = 1000;
export const BET_INCREMENT = 10;
export const MIN_BET = 10;
export const MAX_BET = 1000;
export const REEL_COUNT = 3;
export const SYMBOLS_PER_REEL = 20;
export const ALTAR_FREQUENCY = 10; // Every 10 spins

export const INITIAL_JACKPOT = 5000;
export const JACKPOT_CONTRIBUTION_PERCENT = 0.02;
