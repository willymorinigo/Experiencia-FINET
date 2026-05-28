import React from 'react';

interface FinetLogoProps {
  className?: string;
  light?: boolean;
}

export const FinetLogo: React.FC<FinetLogoProps> = ({ className = '', light = false }) => {
  return (
    <div className={`flex items-center gap-2 px-1 py-1.5 rounded-xl ${className}`}>
      <div className="bg-[#ECEC11] w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 shadow-[0_0_20px_rgba(236,236,17,0.3)] border border-yellow-300/40">
        <span className="text-black font-display font-black text-2xl tracking-tighter leading-none select-none">F</span>
      </div>
      <span 
        className={`font-display font-bold tracking-[0.25em] text-lg leading-none select-none ${
          light ? 'text-white' : 'text-neutral-900'
        }`}
      >
        FINET
      </span>
    </div>
  );
};
