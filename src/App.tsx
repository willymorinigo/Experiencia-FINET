import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShieldCheck, Sparkles, Rocket, Briefcase, Sunrise, ArrowRight, Award, Menu as MenuIcon } from 'lucide-react';
import { LifeStageKey, Option, Scenario, GameState } from './types';
import { LIFE_STAGES, COLORS } from './constants';
import { DecisionCard } from './components/DecisionCard';
import { RetroScore } from './components/RetroScore';
import { FinetLogo } from './components/FinetLogo';
import { CommandMenu } from './components/CommandMenu';
import { GlossaryModal } from './components/GlossaryModal';
import { ParticleBackground } from './components/ParticleBackground';
import { soundEngine } from './lib/sounds';
import SCENARIOS_DATA from './data/scenarios.json';

type FlowStage = 'LANDING' | 'STAGE_SELECTION' | 'GAME' | 'FEEDBACK' | 'SUMMARY';

export default function App() {
  const [flow, setFlow] = useState<FlowStage>('LANDING');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [state, setState] = useState<GameState>({
    capital: 1000,
    calm: 1000,
    score: 0,
    currentStage: null,
    history: [],
  });
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [lastOption, setLastOption] = useState<Option | null>(null);
  const [flash, setFlash] = useState<'positive' | 'negative' | null>(null);

  const scenarios = useMemo(() => {
    if (!state.currentStage) return [];
    const stageScenarios = (SCENARIOS_DATA as Scenario[]).filter(s => s.stage === state.currentStage);
    
    // Shuffle and pick 7
    const selected = [...stageScenarios]
      .sort(() => Math.random() - 0.5)
      .slice(0, 7);

    // Shuffle options for each scenario
    return selected.map(s => ({
      ...s,
      options: [...s.options].sort(() => Math.random() - 0.5)
    }));
  }, [state.currentStage]);

  const currentScenario = scenarios[currentScenarioIndex];

  const handleStart = () => {
    setFlow('STAGE_SELECTION');
  };

  const handleStageSelect = (stage: LifeStageKey) => {
    setState(prev => ({ ...prev, currentStage: stage }));
    setFlow('GAME');
  };

  const handleDecision = (option: Option) => {
    setLastOption(option);
    
    const scoreVal = (option.impact.capital + option.impact.calm);
    const scoreGain = scoreVal * 100;
    
    if (scoreVal > 0) {
      soundEngine.playPositive();
      setFlash('positive');
    } else if (scoreVal < 0) {
      soundEngine.playNegative();
      setFlash('negative');
    }
    
    setTimeout(() => setFlash(null), 300);

    setState(prev => {
      const newCapital = Math.max(0, prev.capital + option.impact.capital * 10);
      const newCalm = Math.max(0, prev.calm + option.impact.calm * 10);
      
      return {
        ...prev,
        capital: newCapital,
        calm: newCalm,
        score: Math.max(0, prev.score + scoreGain),
        history: [...prev.history, option.id]
      };
    });
    setFlow('FEEDBACK');
  };

  const nextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setFlow('GAME');
    } else {
      setFlow('SUMMARY');
    }
  };

  const resetGame = () => {
    setState({
      capital: 1000,
      calm: 1000,
      score: 0,
      currentStage: null,
      history: [],
    });
    setCurrentScenarioIndex(0);
    setLastOption(null);
    setFlow('LANDING');
  };

  const handleNavigation = (target: 'home' | 'glossary' | 'contact') => {
    if (target === 'home') resetGame();
    if (target === 'glossary') setIsGlossaryOpen(true);
    if (target === 'contact') {
      window.open('mailto:info@finet.com', '_blank');
    }
  };

  const getAnalysis = () => {
    const { capital, calm } = state;
    const isRich = capital > 1300;
    const isBroke = capital < 800;
    const isZen = calm > 1300;
    const isStressed = calm < 800;

    if (isRich && isZen) {
      return "¡Che, impecable! Lograste la maestría: Libertad Financiera y Paz Mental. Entendiste que el dinero es un combustible para tu vida, no el motor principal. Moviste bien las fichas entre CEDEARs y Cauciones sin perder los estribos. ¡Sos un as de las sociofinanzas!";
    }
    if (isRich && isStressed) {
      return "Tus números vuelan, pero tu paz está en terapia. Acumular capital a costa de quemarte la cabeza es una deuda que vas a pagar caro. ¿Para qué querés los verdes si no podés dormir? Bajale un cambio al riesgo y priorizá tu eje.";
    }
    if (isBroke && isZen) {
      return "Tu calma es envidiable, pero ojo que con la paz sola no se pagan las expensas. Tu capital está descuidado: no dejes que el miedo te gane. Invertir es comprar tiempo para tu 'yo' del futuro. ¡Animate a mover esos ahorros!";
    }
    if (isBroke && isStressed) {
      return "Etapa picante. Te pasaron por arriba la inflación y las malas decisiones. Es momento de 'parar la pelota', ordenar los gastos y empezar de abajo con lo básico: orden y disciplina. Nadie nace sabiendo, ¡volvé a intentarlo!";
    }
    if (capital > 1000 && calm > 1000) {
      return "Buen laburo, che. Estás navegando las mareas del mercado argentino con bastante criterio. Seguí así, cuidando que cada peso que invertís no te robe el sueño.";
    }
    return "Una etapa de mucho aprendizaje. Aprendiste que cada peso que se mueve tiene un correlato en cómo te sentís. El equilibrio es una práctica diaria, seguí entrenándolo.";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#050505]">
      <ParticleBackground />
      
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] pointer-events-none ${flash === 'positive' ? 'bg-[#ECEC11]' : 'bg-red-500'}`}
          />
        )}
      </AnimatePresence>

      {/* Brand & Menu Header */}
      <header 
        style={{ height: '70px' }}
        className="fixed top-0 left-0 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/5 px-6 h-[70px] flex justify-between items-center z-[70] shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
      >
        <FinetLogo light />
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-3 hover:bg-[#ECEC11] hover:text-black rounded-xl text-white transition-all bg-white/5 border border-white/10 shadow-xl group active:scale-90 cursor-pointer"
          title="Menú"
          id="hamburger-menu-btn"
        >
          <MenuIcon size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </header>

      <CommandMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={handleNavigation}
      />
      
      <GlossaryModal 
        isOpen={isGlossaryOpen} 
        onClose={() => setIsGlossaryOpen(false)} 
      />

      {/* Stats Floating Bar */}
      {flow !== 'LANDING' && flow !== 'STAGE_SELECTION' && (
        <motion.div 
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          style={{ paddingLeft: '32px', marginLeft: '0px', marginTop: '-39px' }}
          className="fixed top-24 md:top-28 left-1/2 z-50 bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-2 md:p-3 px-6 md:px-8 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center gap-6 md:gap-12">
            <div className="flex gap-4 md:gap-8">
              <RetroScore label="CAPITAL" value={state.capital} color={COLORS.capital} />
              <RetroScore label="CALMA" value={state.calm} color={COLORS.calm} />
            </div>
            
            <div className="h-8 w-px bg-white/10 hidden md:block" />

            <div className="hidden md:flex flex-col items-start translate-y-0.5">
              <span className="text-[8px] tracking-[0.3em] font-mono font-bold text-[#ECEC11] leading-none mb-1">PUNTAJE</span>
              <span className="font-mono text-xl font-black text-white tabular-nums tracking-tight leading-none">
                {state.score.toString().padStart(6, '0')}
              </span>
            </div>

            <div className="md:hidden flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <Award className="text-[#ECEC11]" size={14} />
              <span className="font-mono text-sm font-black text-white leading-none">{state.score}</span>
            </div>
          </div>
        </motion.div>
      )}

      <main className="w-full flex items-center justify-center py-8 pt-32 md:pt-48 px-4 max-w-5xl mx-auto z-10">
        <AnimatePresence mode="wait">
          {flow === 'LANDING' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ marginTop: '-57px' }}
              className="text-center flex flex-col items-center gap-8 w-full py-12"
            >
              <div 
                style={{ width: '600px' }}
                className="space-y-6 max-w-2xl mx-auto flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ECEC11]/30 bg-[#ECEC11]/5 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ECEC11] animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#ECEC11] font-bold">PSYCHOLOGY & FINANCE</span>
                </div>
                
                <h1 className="font-display leading-tight select-none mt-2">
                  <span 
                    style={{ fontFamily: 'Georgia', fontStyle: 'italic', fontSize: '81px', lineHeight: '90px' }}
                    className="block text-white tracking-tight"
                  >
                    Experiencia
                  </span>
                  <span 
                    style={{ fontFamily: 'Arial', lineHeight: '130px', fontSize: '130px', fontWeight: 'bold', marginTop: '-14px', marginLeft: '0px' }}
                    className="block text-[#ECEC11] tracking-tighter"
                  >
                    FINET
                  </span>
                </h1>
                
                <p 
                  style={{ width: '598px', paddingRight: '16px', marginRight: '0px', marginLeft: '0px', fontSize: '17px' }}
                  className="max-w-[550px] mx-auto text-neutral-400 font-sans font-light leading-relaxed mt-2 px-4 italic"
                >
                  Abordamos las inversiones desde las emociones. Tomá decisiones conscientes para un futuro en completo equilibrio.
                </p>
              </div>

              <div className="relative group mt-4">
                <div className="absolute -inset-1.5 bg-[#ECEC11] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300" />
                <button 
                  onClick={handleStart}
                  className="relative bg-[#ECEC11] text-black px-12 py-5 rounded-full font-display font-black tracking-[0.2em] hover:scale-[1.03] transition-all duration-300 flex items-center gap-3 group text-xs md:text-sm shadow-xl cursor-pointer"
                >
                  INGRESAR <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          )}

          {flow === 'STAGE_SELECTION' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ marginTop: '-57px' }}
              className="w-full max-w-5xl py-8"
            >
              <div className="text-center mb-12 px-4 space-y-2">
                <span className="text-[10px] tracking-[0.4em] font-mono font-bold text-[#ECEC11] uppercase select-none">Configuración de Etapa</span>
                <h2 className="font-display font-black text-4xl md:text-5xl text-white tracking-tighter">Elegí tu era.</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {LIFE_STAGES.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => handleStageSelect(stage.id)}
                    className="relative bg-neutral-900/60 backdrop-blur-md p-6 rounded-3xl border border-white/5 hover:border-[#ECEC11]/30 text-left transition-all duration-300 group hover:-translate-y-1.5 w-full overflow-hidden glow-border flex flex-col justify-between min-h-[290px] cursor-pointer"
                  >
                    <div>
                      {/* Smooth background gradient flare */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ECEC11]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-[100px]" />
                      
                      <div className="w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-[#ECEC11]/90 group-hover:bg-[#ECEC11] group-hover:text-black transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(236,236,17,0.3)]">
                        {stage.icon === 'Sparkles' && <Sparkles size={20} />}
                        {stage.icon === 'Rocket' && <Rocket size={20} />}
                        {stage.icon === 'Briefcase' && <Briefcase size={20} />}
                        {stage.icon === 'Sunrise' && <Sunrise size={20} />}
                      </div>
                      
                      <h3 className="font-display font-bold text-lg mb-0.5 text-neutral-100 tracking-tight group-hover:text-white transition-colors">
                        {stage.title}
                      </h3>
                      <p className="font-mono text-[9px] tracking-widest font-bold text-[#ECEC11] py-1 select-none">
                        {stage.ageRange}
                      </p>
                    </div>

                    <p className="font-sans font-light text-[14px] text-neutral-400 group-hover:text-neutral-300 leading-relaxed transition-colors mt-4">
                      {stage.description}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {flow === 'GAME' && currentScenario && (
            <div 
              style={{ marginTop: '-57px', width: '994px', height: '630px' }}
              className="flex flex-col items-center gap-6 w-full py-8"
            >
               <div className="flex justify-between items-center w-full max-w-lg px-4 bg-white/[0.02] border border-white/5 py-4 rounded-2xl backdrop-blur-md">
                 <span className="font-mono text-[10px] font-bold text-neutral-400 tracking-wider">
                   PASO {currentScenarioIndex + 1} / {scenarios.length}
                 </span>
                 <div className="flex gap-1.5 items-center">
                    {scenarios.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === currentScenarioIndex 
                            ? 'w-6 bg-[#ECEC11]' 
                            : i < currentScenarioIndex 
                              ? 'w-2 bg-[#ECEC11]/40' 
                              : 'w-2 bg-white/10'
                        }`} 
                      />
                    ))}
                 </div>
               </div>
               <DecisionCard 
                scenario={currentScenario}
                onSelect={handleDecision}
              />
            </div>
          )}

          {flow === 'FEEDBACK' && lastOption && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ marginTop: '-57px' }}
              className="max-w-xl w-full bg-neutral-900/80 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.6)] border border-white/5 flex flex-col gap-8 text-center items-center relative overflow-hidden glow-border"
            >
              {/* Pulsing indicator line on top */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-[#ECEC11]/50 animate-pulse" />
              
              <div className="w-12 h-12 bg-[#ECEC11] text-black rounded-2xl flex items-center justify-center animate-bounce shadow-[0_4px_20px_rgba(236,236,17,0.4)]">
                <Sparkles size={22} className="stroke-[2.5]" />
              </div>

              <div className="space-y-4 relative z-10 w-full">
                <span className="font-mono text-[10px] tracking-[0.4em] font-black text-[#ECEC11]/90 uppercase block mb-1">Reflexión / Moraleja</span>
                <p className="font-serif text-[21px] md:text-[23px] leading-relaxed text-neutral-200 font-light italic px-1">
                  "{lastOption.feedback}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full relative z-10 max-w-sm">
                <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5 flex flex-col items-center gap-2">
                  <span className="font-mono text-[9px] tracking-[0.2em] font-bold text-neutral-400">IMPACTO CAPITAL</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xl md:text-2xl font-black ${lastOption.impact.capital >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {lastOption.impact.capital >= 0 ? '+' : ''}{lastOption.impact.capital * 10}
                    </span>
                    <div className={`w-2.5 h-2.5 rounded-full ${lastOption.impact.capital >= 0 ? 'bg-green-400 shadow-[0_0_12px_#4ade80]' : 'bg-red-400 shadow-[0_0_12px_#f87171]'}`} />
                  </div>
                </div>
                <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5 flex flex-col items-center gap-2">
                  <span className="font-mono text-[9px] tracking-[0.2em] font-bold text-neutral-400">IMPACTO CALMA</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xl md:text-2xl font-black ${lastOption.impact.calm >= 0 ? 'text-cyan-400' : 'text-neutral-500'}`}>
                      {lastOption.impact.calm >= 0 ? '+' : ''}{lastOption.impact.calm * 10}
                    </span>
                    <div className={`w-2.5 h-2.5 rounded-full ${lastOption.impact.calm >= 0 ? 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]' : 'bg-neutral-600 shadow-[0_0_12px_#4b5563]'}`} />
                  </div>
                </div>
              </div>

              <button 
                onClick={nextScenario}
                className="bg-white text-black hover:bg-[#ECEC11] px-10 py-4 rounded-full font-display font-black tracking-[0.2em] transition-all relative z-10 text-xs md:text-sm shadow-xl active:scale-95 cursor-pointer border border-white/10"
              >
                SIGUIENTE
              </button>
            </motion.div>
          )}

          {flow === 'SUMMARY' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '-57px' }}
              className="max-w-2xl w-full text-center space-y-10 py-6"
            >
              <div className="space-y-4">
                <span className="font-mono text-[10px] tracking-[0.4em] font-black text-[#ECEC11]/90 uppercase block select-none">Balance Completado</span>
                <h2 className="font-display font-black text-4xl md:text-5xl text-white tracking-tighter">Análisis de etapa.</h2>
                
                <div className="flex flex-col items-center gap-4 max-w-lg mx-auto bg-neutral-900/65 backdrop-blur-md p-6 md:p-8 rounded-[32px] border border-white/5 glow-border mt-6">
                   <p className="font-serif text-xl md:text-[22px] leading-relaxed text-neutral-200 italic px-2">
                     {getAnalysis()}
                   </p>
                   
                   <div className="h-px w-24 bg-[#ECEC11]/25 my-3" />
                   
                   <span className="font-mono text-[9px] tracking-[0.3em] font-bold text-neutral-400 select-none">PUNTAJE FINAL</span>
                   <span className="font-mono text-5xl md:text-6xl font-black text-[#ECEC11] tabular-nums tracking-tighter select-all">
                     {state.score.toString().padStart(6, '0')}
                   </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                <div className="bg-neutral-900/40 p-6 rounded-2xl border border-green-500/15 flex flex-col items-center gap-3 transition-colors duration-300 hover:border-green-500/30">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center shadow-md">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span className="block font-mono text-3xl font-black text-white leading-none mb-1 tabular-nums">{state.capital}</span>
                    <span className="font-mono text-[9px] tracking-[0.2em] font-bold text-green-400 uppercase select-none">Capital Acumulado</span>
                  </div>
                </div>

                <div className="bg-neutral-900/40 p-6 rounded-2xl border border-cyan-500/15 flex flex-col items-center gap-3 transition-colors duration-300 hover:border-cyan-500/30">
                   <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shadow-md">
                    <Heart size={20} />
                  </div>
                  <div>
                    <span className="block font-mono text-3xl font-black text-white leading-none mb-1 tabular-nums">{state.calm}</span>
                    <span className="font-mono text-[9px] tracking-[0.2em] font-bold text-cyan-400 uppercase select-none">Nivel de Calma</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 max-w-md mx-auto animate-fade-in">
                <button 
                  onClick={resetGame}
                  className="bg-[#ECEC11] text-black px-8 py-4 rounded-full font-display font-black tracking-widest hover:scale-[1.02] transition-all text-xs w-full cursor-pointer uppercase border border-yellow-300/40"
                >
                  Volver a Empezar
                </button>
                <button 
                  className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-display font-bold tracking-widest transition-all text-xs w-full cursor-pointer uppercase border border-white/10"
                >
                  Compartir Balance
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Grid Bg */}
      <div 
        style={{ paddingLeft: '32px', marginLeft: '0px', marginTop: '-39px' }}
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#050505]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </div>
  );
}
