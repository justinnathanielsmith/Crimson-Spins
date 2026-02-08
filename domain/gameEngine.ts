
import { SlotSymbol, GameStatus } from '../types.ts';
import { SYMBOLS, JACKPOT_CONTRIBUTION_PERCENT } from '../constants.tsx';

/**
 * GameEngine handles the core rules and logic of the slot machine.
 * This class follows the Single Responsibility Principle by only managing game mechanics.
 */
export class GameEngine {
  static getRandomSymbol(): SlotSymbol {
    const totalWeight = SYMBOLS.reduce((acc, s) => acc + s.weight, 0);
    let random = Math.random() * totalWeight;
    for (const s of SYMBOLS) {
      if (random < s.weight) return s;
      random -= s.weight;
    }
    return SYMBOLS[SYMBOLS.length - 1];
  }

  static checkWin(reels: SlotSymbol[]) {
    let winners: number[] = [];
    let payout = 0;
    let jackpotWon = false;
    
    // Check for 3 of a kind
    const allSame = reels.every(r => r.id === reels[0].id);
    
    if (allSame) {
      winners = [0, 1, 2];
      payout = reels[0].multiplier;
      if (reels[0].id === 'vampire') jackpotWon = true;
    } 
    // Check for 2 of a kind (Left pair)
    else if (reels[0].id === reels[1].id) {
      winners = [0, 1];
      payout = Math.floor(reels[0].multiplier * 0.2);
    } 
    // Check for 2 of a kind (Right pair)
    else if (reels[1].id === reels[2].id) {
      winners = [1, 2];
      payout = Math.floor(reels[1].multiplier * 0.2);
    }

    return { winners, payout, jackpotWon };
  }

  static calculateJackpotContribution(bet: number): number {
    return bet * JACKPOT_CONTRIBUTION_PERCENT;
  }
}
