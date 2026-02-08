
import React from 'react';

interface MistProps {
  isBloodMoon?: boolean;
}

export const Mist: React.FC<MistProps> = ({ isBloodMoon = false }) => {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-[3000ms] ${isBloodMoon ? 'opacity-60 bg-red-950/20' : 'opacity-40'}`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="mist absolute blur-[80px] rounded-full transition-colors duration-[2000ms]"
          style={{
            width: `${Math.random() * 40 + 40}%`,
            height: `${Math.random() * 30 + 30}%`,
            top: `${Math.random() * 80}%`,
            left: '-50%',
            backgroundColor: isBloodMoon ? 'rgba(153, 27, 27, 0.4)' : 'rgba(255, 255, 255, 0.1)',
            '--duration': `${Math.random() * 15 + 25}s`,
            '--delay': `-${Math.random() * 20}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
