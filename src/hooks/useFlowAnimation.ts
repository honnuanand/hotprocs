import { useState, useCallback, useRef, useEffect } from 'react';
import { FlowStep, ProcessorState } from '../data/types';

export interface FlowAnimationControls {
  currentStep: number;
  isPlaying: boolean;
  speed: number;
  processorState: ProcessorState;
  hooksFired: string[];
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
}

export function useFlowAnimation(steps: FlowStep[]): FlowAnimationControls {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [hooksFired, setHooksFired] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);

  const getProcessorState = useCallback((step: number): ProcessorState => {
    if (step < 0) return 'cold';
    const firedHooks = steps
      .slice(0, step + 1)
      .filter(s => s.isHookPoint)
      .map(s => s.hookType);
    if (firedHooks.includes('phase2')) return 'hot';
    if (firedHooks.includes('phase1')) return 'warming';
    return 'cold';
  }, [steps]);

  const processorState = getProcessorState(currentStep);

  const stopInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    stopInterval();
  }, [stopInterval]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const stepForward = useCallback(() => {
    setCurrentStep(prev => {
      const next = Math.min(prev + 1, steps.length - 1);
      const step = steps[next];
      if (step?.isHookPoint && step.id) {
        setHooksFired(fired => fired.includes(step.id) ? fired : [...fired, step.id]);
      }
      return next;
    });
  }, [steps]);

  const stepBackward = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, -1));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setHooksFired([]);
    stopInterval();
  }, [stopInterval]);

  useEffect(() => {
    if (isPlaying) {
      const interval = (1500 / speed);
      intervalRef.current = window.setInterval(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          if (next >= steps.length) {
            setIsPlaying(false);
            return prev;
          }
          const step = steps[next];
          if (step?.isHookPoint && step.id) {
            setHooksFired(fired => fired.includes(step.id) ? fired : [...fired, step.id]);
          }
          return next;
        });
      }, interval);
    } else {
      stopInterval();
    }
    return stopInterval;
  }, [isPlaying, speed, steps, stopInterval]);

  return {
    currentStep,
    isPlaying,
    speed,
    processorState,
    hooksFired,
    play,
    pause,
    togglePlay,
    setSpeed,
    stepForward,
    stepBackward,
    reset,
  };
}
