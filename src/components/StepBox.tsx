import React from 'react';
import { motion } from 'framer-motion';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import BoltIcon from '@mui/icons-material/Bolt';
import { FlowStep } from '../data/types';

interface StepBoxProps {
  step: FlowStep;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  isVisible: boolean;
}

const stepVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  }),
};

export const StepBox: React.FC<StepBoxProps> = ({ step, index, isActive, isCompleted, isVisible }) => {
  if (!isVisible) return null;

  const hookColors = {
    phase1: { bg: '#eff6ff', border: '#3b82f6', text: '#1d4ed8' },
    phase2: { bg: '#f0fdf4', border: '#22c55e', text: '#15803d' },
    both: { bg: '#fefce8', border: '#f59e0b', text: '#b45309' },
  };

  const hookStyle = step.isHookPoint && step.hookType ? hookColors[step.hookType] : null;

  return (
    <Tooltip
      title={
        <div>
          <strong>{step.component}</strong>
          <br />
          {step.description}
          {step.timing && (
            <>
              <br />
              <em>Timing: {step.timing}</em>
            </>
          )}
          {step.infoAvailable && (
            <>
              <br />
              <strong>Available info:</strong> {step.infoAvailable.join(', ')}
            </>
          )}
        </div>
      }
      arrow
      placement="right"
    >
      <motion.div
        custom={index}
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%' }}
      >
        <Paper
          elevation={isActive ? 6 : isCompleted ? 1 : 2}
          sx={{
            p: 1.5,
            px: 2,
            borderRadius: 2,
            border: 2,
            borderColor: isActive
              ? (hookStyle?.border || '#3b82f6')
              : isCompleted
              ? '#cbd5e1'
              : hookStyle?.border || '#e2e8f0',
            bgcolor: isActive
              ? (hookStyle?.bg || '#eff6ff')
              : isCompleted
              ? '#f8fafc'
              : 'white',
            transition: 'all 0.3s ease',
            position: 'relative',
            opacity: isCompleted && !isActive ? 0.7 : 1,
            transform: isActive ? 'scale(1.02)' : 'scale(1)',
            boxShadow: isActive
              ? `0 0 20px ${hookStyle?.border || '#3b82f6'}40`
              : undefined,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Chip
              label={step.stepNumber}
              size="small"
              sx={{
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                bgcolor: isActive
                  ? (hookStyle?.border || '#3b82f6')
                  : '#e2e8f0',
                color: isActive ? 'white' : '#475569',
                fontSize: '0.75rem',
                height: 24,
                minWidth: 24,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? (hookStyle?.text || '#1e40af')
                  : isCompleted
                  ? '#94a3b8'
                  : '#1e293b',
                fontSize: '0.8rem',
                lineHeight: 1.3,
                flex: 1,
              }}
            >
              {step.label}
            </Typography>
            {step.isHookPoint && (
              <BoltIcon
                sx={{
                  color: hookStyle?.border || '#f59e0b',
                  fontSize: 20,
                  animation: isActive ? 'pulse 1s ease-in-out infinite' : undefined,
                }}
              />
            )}
          </div>
          {isActive && step.timing && (
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'block',
                color: '#64748b',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
              }}
            >
              {step.timing}
            </Typography>
          )}
        </Paper>
      </motion.div>
    </Tooltip>
  );
};
