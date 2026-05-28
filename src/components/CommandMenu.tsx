import { motion, AnimatePresence } from 'motion/react';
import { X, Home, BookOpen, MessageSquare, Terminal, ArrowRight } from 'lucide-react';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (target: 'home' | 'glossary' | 'contact') => void;
}

export function CommandMenu({ isOpen, onClose, onNavigate }: CommandMenuProps) {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Volver al Inicio', desc: 'Reiniciar la experiencia' },
    { id: 'glossary', icon: BookOpen, label: 'Glosario', desc: 'Entender términos financieros' },
    { id: 'contact', icon: MessageSquare, label: 'Contactarnos', desc: 'Hablemos de sociofinanzas' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-end p-4 md:p-8"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="w-full max-w-sm bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden relative z-10 p-4"
          >
            <div className="flex justify-between items-center mb-6 p-4">
              <div className="flex items-center gap-2 text-[#ECEC11]">
                <Terminal size={18} />
                <span className="text-[10px] font-mono font-bold tracking-[0.3em]">MENÚ PRINCIPAL</span>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-white/5 rounded-full text-white transition-colors cursor-pointer"
                id="close-menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id as any);
                    onClose();
                  }}
                  className="w-full text-left p-5 rounded-[24px] hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group flex items-center justify-between cursor-pointer"
                  id={`menu-item-${item.id}`}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#ECEC11] group-hover:text-black transition-all">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-white tracking-tight">{item.label}</h3>
                      <p className="text-[10px] text-gray-500 tracking-wider font-bold font-mono">{item.desc}</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-gray-700 group-hover:text-[#ECEC11] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white/[0.02] rounded-[24px] text-center border border-white/5">
              <p className="serif text-xs text-gray-400 italic mb-4">"El dinero es una emoción cuantificada."</p>
              <div className="flex justify-center gap-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#ECEC11] animate-pulse" />
                 <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                 <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
