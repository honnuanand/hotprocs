export interface FlowStep {
  id: string;
  stepNumber: number;
  label: string;
  component: string;
  description: string;
  isHookPoint: boolean;
  hookType?: 'phase1' | 'phase2' | 'both';
  hookLabel?: string;
  infoAvailable?: string[];
  timing?: string;
}

export interface Flow {
  id: 'kubernetes' | 'knative';
  title: string;
  steps: FlowStep[];
}

export interface FlowAnimationState {
  currentStep: number;
  isPlaying: boolean;
  speed: number;
  packetPosition: number;
  processorState: 'cold' | 'warming' | 'hot';
  elapsedTime: number;
  hooksFired: string[];
}

export type ProcessorState = 'cold' | 'warming' | 'hot';
