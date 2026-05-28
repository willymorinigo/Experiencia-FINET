import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, ExternalLink } from 'lucide-react';
import { GLOSSARY } from '../constants';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-[40px] overflow-hidden flex flex-col max-h-[80vh] relative z-10"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#cc0] text-black flex items-center justify-center shadow-[0_0_20px_rgba(204,204,0,0.2)]">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="font-sans font-black text-xl text-white tracking-tighter">GLOSARIO FINANCIERO</h2>
                  <p className="text-[9px] uppercase tracking-widest text-[#cc0] font-black">Diccionario de Sociofinanzas</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {Object.entries(GLOSSARY)
                .filter(([, item]) => !item.isAlias)
                .map(([key, item]) => {
                return (
                  <div key={key} className="bg-white/5 p-4 md:p-6 rounded-3xl border border-white/5 hover:border-[#cc0]/30 transition-colors group">
                    <h3 className="font-sans font-black text-lg text-[#cc0] mb-2 tracking-tight group-hover:translate-x-1 transition-transform">
                      {item.title}
                    </h3>
                    <p className="serif font-light italic" style={{ color: '#d9dde6', fontSize: 'clamp(16px, 4vw, 19px)', lineHeight: '1.4' }}>
                      {item.definition}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-6 bg-black/30 border-t border-white/5 text-center">
              <button className="text-[10px] uppercase tracking-widest font-black text-gray-500 hover:text-white transition-colors flex items-center gap-2 mx-auto">
                ¿Falta alguna palabra? <ExternalLink size={12} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
