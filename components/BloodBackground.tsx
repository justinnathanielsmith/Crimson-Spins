
import React from 'react';

interface BloodBackgroundProps {
  isSpinning: boolean;
}

export const BloodBackground: React.FC<BloodBackgroundProps> = ({ isSpinning }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Edge Vignette Pulse */}
      <div 
        className={`absolute inset-0 transition-all duration-500 
          ${isSpinning ? 'blood-pulse-spinning bg-red-900/40' : 'blood-pulse bg-red-950/20'}`}
        style={{
          boxShadow: isSpinning 
            ? 'inset 0 0 150px rgba(185, 28, 28, 0.6)' 
            : 'inset 0 0 100px rgba(0, 0, 0, 0.9)'
        }}
      />

      {/* Dripping Blood Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="blood-drip-item absolute top-0 bg-red-700/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 20 + 10}px`,
            '--duration': `${isSpinning ? Math.random() * 0.5 + 0.5 : Math.random() * 2 + 2}s`,
            '--delay': `${Math.random() * 5}s`,
            filter: 'blur(1px)'
          } as React.CSSProperties}
        />
      ))}

      {/* Larger Viscous Blobs */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`blob-${i}`}
          className={`absolute rounded-full transition-all duration-1000 blur-[80px]
            ${isSpinning ? 'opacity-80 scale-125' : 'opacity-20 scale-100'}`}
          style={{
            width: '40%',
            height: '40%',
            backgroundColor: 'rgba(127, 29, 29, 0.5)',
            top: i < 2 ? '-10%' : '70%',
            left: i % 2 === 0 ? '-10%' : '70%',
            animation: isSpinning ? 'blood-pulse-excited 1s infinite ease-in-out' : 'blood-pulse-idle 8s infinite ease-in-out',
            animationDelay: `${i * 0.5}s`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
