
import React, { ReactNode } from 'react';

interface GameShellProps {
  /** The atmospheric background layer (Mist, Particles) */
  background: ReactNode;
  /** Fixed controls in top corners (Mute, Settings) */
  topNavigation: ReactNode;
  /** The main game logo and atmosphere candles */
  header: ReactNode;
  /** High visibility stats like Jackpot, Balance, Bet */
  statsDisplay: ReactNode;
  /** The core game area (Reels, Bonus Game, or Bargain Screen) */
  gameBoard: ReactNode;
  /** Primary interaction area (Spin button, Bet adjust) */
  controls: ReactNode;
  /** The narrative element at the bottom */
  oracle: ReactNode;
  /** Floating utility buttons (Paytable, Debug) */
  floatingControls: ReactNode;
  /** Modals and Popups */
  overlays: ReactNode;
  /** Dynamic styling based on game state */
  isBloodMoon: boolean;
}

export const GameShell: React.FC<GameShellProps> = ({
  background,
  topNavigation,
  header,
  statsDisplay,
  gameBoard,
  controls,
  oracle,
  floatingControls,
  overlays,
  isBloodMoon
}) => {
  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-[3000ms] ${isBloodMoon ? 'bg-[#220000]' : 'bg-[#0a0505]'}`}>
      
      {/* 1. Background Layer */}
      {background}

      {/* 2. Top Level Navigation (Fixed) */}
      <div className="z-[60] pointer-events-none">
         {/* Children should have pointer-events-auto */}
         {topNavigation}
      </div>

      {/* 3. Main Header */}
      <header className="relative z-50">
        {header}
      </header>

      {/* 4. Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-start p-4 z-20 gap-8">
        
        {/* 4a. Stats (Jackpot & Vials) */}
        <div className="w-full flex flex-col items-center gap-8">
          {statsDisplay}
        </div>

        {/* 4b. The Game Board (Reels) */}
        <div className="relative z-30">
          {gameBoard}
        </div>

        {/* 4c. Controls & Oracle */}
        <div className="w-full max-w-4xl flex flex-col items-center gap-10 z-30">
          {controls}
          {oracle}
        </div>

      </main>

      {/* 5. Floating Controls (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-[60]">
        {floatingControls}
      </div>

      {/* 6. Overlays (Modals) */}
      {overlays}

      {/* 7. Footer */}
      <footer className="p-4 text-center text-[9px] text-zinc-800 uppercase tracking-[0.8em] font-gothic z-10">
        &copy; 1887 Vampire Syndicate • Pure Souls Preferred
      </footer>
    </div>
  );
};
