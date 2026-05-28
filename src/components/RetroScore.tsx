import { motion } from 'motion/react';

interface RetroScoreProps {
  label: string;
  value: number;
  color: string;
}

export const RetroScore = ({ label, value, color }: RetroScoreProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] tracking-[0.3em] font-mono font-bold text-neutral-400 select-none">{label}</span>
      <div 
        className="px-4 py-2 rounded-2xl border bg-black/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-center min-w-[95px] relative overflow-hidden transition-all duration-300 hover:border-white/15"
        style={{ borderColor: `${color}25` }}
      >
        {/* Subtle accent light source on top */}
        <div 
          className="absolute top-0 inset-x-0 h-[1px] opacity-40 animate-pulse"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
        
        <motion.span 
          key={value}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-mono text-xl md:text-2xl font-black tracking-tight"
          style={{ 
            color,
            textShadow: `0 0 12px ${color}33`,
            letterSpacing: '-0.025em'
          }}
        >
          {Math.floor(value).toString().padStart(4, '0')}
        </motion.span>
      </div>
    </div>
  );
};
