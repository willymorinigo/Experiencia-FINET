export enum LifeStageKey {
  ADOLESCENCE = 'adolescence',
  YOUTH = 'youth',
  ADULTHOOD = 'adulthood',
  FULLNESS = 'fullness'
}

export interface LifeStage {
  id: LifeStageKey;
  title: string;
  ageRange: string;
  description: string;
  icon: string;
}

export interface Option {
  id: string;
  text: string;
  impact: {
    capital: number; // Financial points
    calm: number;    // Emotional points
  };
  feedback: string;
}

export interface Scenario {
  id: string;
  stage: LifeStageKey;
  situation: string;
  options: Option[];
}

export interface GameState {
  capital: number;
  calm: number;
  score: number;
  currentStage: LifeStageKey | null;
  history: string[];
}
