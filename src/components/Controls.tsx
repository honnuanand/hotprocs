import React from 'react';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSetSpeed: (speed: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  speed,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onReset,
  onSetSpeed,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Tooltip title="Reset">
        <IconButton onClick={onReset} size="small" sx={{ color: '#64748b' }}>
          <RestartAltIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Previous step">
        <IconButton onClick={onStepBackward} size="small" sx={{ color: '#475569' }}>
          <SkipPreviousIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
        <IconButton
          onClick={onTogglePlay}
          sx={{
            bgcolor: '#3b82f6',
            color: 'white',
            '&:hover': { bgcolor: '#2563eb' },
            width: 36,
            height: 36,
          }}
        >
          {isPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Next step">
        <IconButton onClick={onStepForward} size="small" sx={{ color: '#475569' }}>
          <SkipNextIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ButtonGroup size="small" sx={{ ml: 1 }}>
        {[0.5, 1, 2].map(s => (
          <Button
            key={s}
            onClick={() => onSetSpeed(s)}
            variant={speed === s ? 'contained' : 'outlined'}
            sx={{
              fontSize: '0.7rem',
              minWidth: 40,
              textTransform: 'none',
              ...(speed === s
                ? { bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' } }
                : { color: '#64748b', borderColor: '#cbd5e1' }),
            }}
          >
            {s}x
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
