import { useEffect } from 'react';

interface KeyboardControlsOptions {
  onNext: () => void;
  onPrev: () => void;
  onTogglePlay?: () => void;
}

export function useKeyboardControls({ onNext, onPrev, onTogglePlay }: KeyboardControlsOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          onPrev();
          break;
        case ' ':
          e.preventDefault();
          if (onTogglePlay) onTogglePlay();
          else onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onTogglePlay]);
}
