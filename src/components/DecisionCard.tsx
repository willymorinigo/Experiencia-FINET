import { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { Scenario, Option } from '../types';
import { GLOSSARY } from '../constants';
import { GlossaryTerm } from './GlossaryTerm';

interface DecisionCardProps {
  scenario: Scenario;
  onSelect: (option: Option) => void;
}

export const DecisionCard = ({ scenario, onSelect }: DecisionCardProps) => {
  const renderTextWithGlossary = (text: string) => {
    const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
    const regex = new RegExp(`(${terms.join('|')})`, 'g');
    
    const parts = text.split(regex);
    return parts.map((part, i) => {
      if (GLOSSARY[part]) {
        return <GlossaryTerm key={i} term={part} />;
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      style={{
        paddingRight: '45px',
        paddingLeft: '11px',
        height: '511px',
        width: '590px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '-14px',
        marginBottom: '0px',
        textAlign: 'center',
        paddingTop: '28px',
        paddingBottom: '32px',
        borderWidth: '2px'
      }}
      className="max-w-[95%] sm:max-w-xl w-full bg-neutral-900/80 backdrop-blur-xl rounded-[32px] p-6 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.6)] border border-white/5 flex flex-col gap-6 md:gap-8 relative overflow-hidden glow-border"
    >
      {/* Decorative clean matrix light guide */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ECEC11]/5 blur-[80px] pointer-events-none rounded-full" />
      
      <div className="flex flex-col gap-3 relative z-10">
        <div 
          style={{ paddingLeft: '11px' }}
          className="flex items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.4em] font-mono font-black text-[#ECEC11]/90 uppercase">
            Escenario • {scenario.id.split('_').slice(1).join(' ')}
          </span>
          <div className="h-px bg-[#ECEC11]/20 flex-1" />
        </div>
        
        <h2 
          style={{ width: '535px', paddingLeft: '10px', fontSize: '22px', fontWeight: 'bold', fontFamily: 'Arial', lineHeight: '29px' }}
          className="font-display font-bold text-xl md:text-2xl leading-snug text-neutral-50 text-left"
        >
          {renderTextWithGlossary(scenario.situation)}
        </h2>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {scenario.options.map((option, index) => {
          let btnStyle: CSSProperties = {};
          if (index === 0) btnStyle = { width: '550px' };
          else if (index === 1) btnStyle = { width: '550px' };
          else if (index === 2) btnStyle = { width: '551px' };

          return (
            <motion.button
              key={option.id}
              whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.04)' }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(option)}
              style={btnStyle}
              className="w-full text-left p-4 md:p-5 rounded-2xl border border-white/5 hover:border-[#ECEC11]/30 transition-all duration-300 group relative bg-white/[0.01]"
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/5 group-hover:bg-[#ECEC11] group-hover:text-black flex items-center justify-center text-sm font-mono font-black transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(236,236,17,0.4)]">
                  {String.fromCharCode(65 + index)}
                </span>
                <div 
                  className="font-sans text-neutral-300 text-[15px] md:text-[16px] leading-relaxed group-hover:text-white transition-colors"
                >
                  {renderTextWithGlossary(option.text)}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};
