import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', maxWidth: 600 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          flex: 1,
          height: 4,
          borderRadius: 2,
          bgcolor: '#e2e8f0',
          '& .MuiLinearProgress-bar': {
            bgcolor: '#3b82f6',
            borderRadius: 2,
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{ color: '#64748b', fontFamily: 'var(--font-mono)', fontWeight: 500, whiteSpace: 'nowrap' }}
      >
        {current + 1} / {total}
      </Typography>
    </Box>
  );
};
