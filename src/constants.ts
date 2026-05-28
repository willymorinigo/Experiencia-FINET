import { LifeStage, LifeStageKey } from './types';

export const LIFE_STAGES: LifeStage[] = [
  {
    id: LifeStageKey.ADOLESCENCE,
    title: 'Nivel 1: Gamer & Tech',
    ageRange: 'Objetivo: Play5 / PC Gamer',
    description: 'Tus primeras decisiones. El objetivo es equipar tu rincón sin quemar todo el capital en el intento.',
    icon: 'Sparkles',
  },
  {
    id: LifeStageKey.YOUTH,
    title: 'Nivel 2: Despegue',
    ageRange: 'Objetivo: Auto o Hogar',
    description: 'La independencia real. Empezás a manejar montos más grandes y decisiones que impactan tu futuro cercano.',
    icon: 'Rocket',
  },
  {
    id: LifeStageKey.ADULTHOOD,
    title: 'Nivel 3: Legado',
    ageRange: 'Objetivo: Viaje o Retiro',
    description: 'Consolidación. Tu dinero ya debería trabajar para vos mientras pensás en experiencias y seguridad.',
    icon: 'Briefcase',
  },
  {
    id: LifeStageKey.FULLNESS,
    title: 'Nivel 4: Libertad',
    ageRange: 'Objetivo: Libertad Financiera',
    description: 'El juego final. Cuando tus ingresos pasivos cubren tu vida y la calma es eterna.',
    icon: 'Sunrise',
  },
];

export const COLORS = {
  bg: '#0A0A0A',
  surface: '#1A1A1A',
  ink: '#FFFFFF',
  primary: '#CCCC00', // #cc0
  secondary: '#222222',
  accent: '#CCCC00',
  capital: '#00FF41', // Matrix Green
  calm: '#00F0FF',    // Cyber Blue
};

export const GLOSSARY: Record<string, { title: string, definition: string, isAlias?: boolean }> = {
  'Money Market': {
    title: "Money Market",
    definition: "Es el motor detrás de las 'cuentas remuneradas' de billeteras como Mercado Pago, Personal Pay o Naranja X. Es un fondo que invierte en instrumentos de muy corto plazo para que tu plata rinda día a día con riesgo mínimo y disponibilidad inmediata."
  },
  'FCI': {
    title: "Fondo Común de Inversión",
    definition: "Una billetera colectiva donde profesionales mueven el dinero por vos para que rinda sin que tengas que ser un experto."
  },
  'CEDEARs': {
    title: "CEDEARs",
    definition: "Certificados de Depósito Argentinos. Títulos que representan acciones de empresas globales (como Google, Apple o Amazon) que podés comprar en pesos desde Argentina para dolarizar tus ahorros."
  },
  'CEDEAR': {
    title: "CEDEARs",
    definition: "Certificados de Depósito Argentinos. Títulos que representan acciones de empresas globales (como Google, Apple o Amazon) que podés comprar en pesos desde Argentina para dolarizar tus ahorros.",
    isAlias: true
  },
  'ONs': {
    title: "Obligaciones Negociables",
    definition: "Préstamos que le hacés a empresas grandes a cambio de un interés (cupón), generalmente en dólares. Es deuda privada de alta calidad."
  },
  'Caución': {
    title: "Caución Bursátil",
    definition: "El 'plazo fijo' de la bolsa. Le prestás plata a otro inversor por pocos días con garantía de sus activos. Es la opción más segura para excedentes de muy corto plazo."
  },
  'Cauciones': {
    title: "Caución Bursátil",
    definition: "El 'plazo fijo' de la bolsa. Le prestás plata a otro inversor por pocos días con garantía de sus activos. Es la opción más segura para excedentes de muy corto plazo.",
    isAlias: true
  },
  'Bonos': {
    title: "Bonos",
    definition: "Títulos de deuda emitidos por el Estado. Al comprarlos, le prestás plata al gobierno a cambio de una tasa de interés y la devolución del capital en el futuro."
  },
  'Acciones': {
    title: "Acciones",
    definition: "Convertirse en dueño de una parte de una empresa. Si a la empresa le va bien, tu parte vale más. Ofrecen altos rendimientos potenciales a largo plazo pero con mayor riesgo."
  },
  'Dólar MEP': {
    title: "Dólar MEP",
    definition: "Forma legal de comprar dólares a través del mercado de bonos. Te permite dolarizarte sin límites comprando un activo en pesos y vendiéndolo en su versión en dólares."
  },
  'Letras': {
    title: "Letras (LECAPs)",
    definition: "Instrumentos de deuda del Estado de corto plazo que pagan una tasa fija. Ideales para ganarle a la inflación en plazos menores a un año."
  },
  'Cripto': {
    title: "Criptomonedas",
    definition: "Activos digitales descentralizados. Van desde Stablecoins (que siguen al dólar) hasta activos volátiles como Bitcoin. Ofrecen gran flexibilidad pero requieren precaución."
  },
  'Inflación': {
    title: "Inflación",
    definition: "El aumento generalizado de los precios que hace que tu dinero pierda poder de compra. Invertir es la única forma de defenderse de ella."
  },
  'Plazo Fijo': {
    title: "Plazo Fijo",
    definition: "Depósito bancario por un tiempo determinado a una tasa fija. Es simple, pero a veces su rendimiento es menor a la inflación en contextos de alta volatilidad."
  },
  'Interés Compuesto': {
    title: "Interés Compuesto",
    definition: "El efecto de reinvertir las ganancias para que generen más ganancias. Es 'dinero sobre dinero' y es la clave para crear riqueza a largo plazo."
  },
  'Fondo de Reserva': {
    title: "Fondo de Reserva",
    definition: "Un colchón de dinero (idealmente 3 a 6 meses de gastos) guardado para emergencias. Es tu seguro de paz mental para no tener que malvender inversiones ante un imprevisto."
  }
};
