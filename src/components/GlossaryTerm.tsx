import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GLOSSARY } from '../constants';
import { HelpCircle } from 'lucide-react';

interface GlossaryTermProps {
  term: string;
}

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term }) => {
  const [isOpen, setIsOpen] = useState(false);
  const entry = GLOSSARY[term];

  if (!entry) return <span>{term}</span>;

  return (
    <span 
      className={`relative inline-block ${isOpen ? 'z-[100]' : 'z-auto'}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="cursor-help border-b-2 border-[#cc0]/50 hover:border-[#cc0] transition-colors font-bold text-white px-0.5">
        {term}
      </span>
      
      <AnimatePresence>
        {isOpen && (
            <motion.span
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-[999] bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 bg-[#1A1A1A] border border-[#cc0]/30 p-5 rounded-2xl shadow-2xl backdrop-blur-md block pointer-events-auto"
            >
              <span className="flex items-center gap-2 mb-3 text-[#cc0] border-b border-white/10 pb-2">
              <HelpCircle size={14} />
              <span className="font-sans font-black text-[12px] uppercase tracking-wider">{entry.title}</span>
            </span>
            <span className="font-sans text-[13px] text-gray-100 leading-relaxed font-medium tracking-normal block">
              {entry.definition}
            </span>
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#1A1A1A] block" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
