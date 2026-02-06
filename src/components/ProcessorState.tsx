import React from 'react';
import { motion } from 'framer-motion';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MemoryIcon from '@mui/icons-material/Memory';
import type { ProcessorState as ProcessorStateType } from '../data/types';

interface ProcessorStateProps {
  state: ProcessorStateType;
}

const stateConfig = {
  cold: {
    color: '#94a3b8',
    bg: '#f1f5f9',
    border: '#cbd5e1',
    label: 'COLD',
    sublabel: 'Idle / Not Ready',
    pulseSpeed: 3,
    glowIntensity: 0,
  },
  warming: {
    color: '#f97316',
    bg: '#fff7ed',
    border: '#fb923c',
    label: 'WARMING',
    sublabel: 'Phase 1 Signal Received',
    pulseSpeed: 1.5,
    glowIntensity: 0.4,
  },
  hot: {
    color: '#ef4444',
    bg: '#fef2f2',
    border: '#f87171',
    label: 'HOT',
    sublabel: 'Phase 2 — Ready',
    pulseSpeed: 0.6,
    glowIntensity: 0.7,
  },
};

export const ProcessorStateComponent: React.FC<ProcessorStateProps> = ({ state }) => {
  const config = stateConfig[state];

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: 2,
        borderColor: config.border,
        bgcolor: config.bg,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        width: 160,
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            `0 0 0px ${config.color}00`,
            `0 0 ${config.glowIntensity * 30}px ${config.color}60`,
            `0 0 0px ${config.color}00`,
          ],
        }}
        transition={{ duration: config.pulseSpeed, repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 12,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: config.pulseSpeed, repeat: Infinity }}
      >
        <MemoryIcon sx={{ fontSize: 48, color: config.color, mb: 1 }} />
      </motion.div>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: config.color, fontFamily: 'var(--font-mono)', letterSpacing: 2 }}>
        {config.label}
      </Typography>
      <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 0.5 }}>
        {config.sublabel}
      </Typography>

      {/* Temperature gauge */}
      <div style={{ marginTop: 12, height: 6, borderRadius: 3, background: '#e2e8f0', overflow: 'hidden' }}>
        <motion.div
          animate={{
            width: state === 'cold' ? '10%' : state === 'warming' ? '55%' : '95%',
            backgroundColor: config.color,
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ height: '100%', borderRadius: 3 }}
        />
      </div>
    </Paper>
  );
};
