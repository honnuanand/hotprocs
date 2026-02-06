import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import BoltIcon from '@mui/icons-material/Bolt';
import { FlowStep } from '../data/types';

interface HookCalloutProps {
  step: FlowStep;
  isVisible: boolean;
}

export const HookCallout: React.FC<HookCalloutProps> = ({ step, isVisible }) => {
  const colors = {
    phase1: { bg: '#eff6ff', border: '#3b82f6', chip: '#dbeafe', chipText: '#1d4ed8', label: 'Phase 1' },
    phase2: { bg: '#f0fdf4', border: '#22c55e', chip: '#dcfce7', chipText: '#15803d', label: 'Phase 2' },
    both: { bg: '#fefce8', border: '#f59e0b', chip: '#fef3c7', chipText: '#b45309', label: 'Both' },
  };

  const style = step.hookType ? colors[step.hookType] : colors.phase1;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              border: 2,
              borderColor: style.border,
              bgcolor: style.bg,
              maxWidth: 280,
              position: 'relative',
            }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 0px ${style.border}00`,
                  `0 0 12px ${style.border}60`,
                  `0 0 0px ${style.border}00`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 8,
                pointerEvents: 'none',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <BoltIcon sx={{ color: style.border, fontSize: 18 }} />
              <Chip
                label={style.label}
                size="small"
                sx={{
                  bgcolor: style.chip,
                  color: style.chipText,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 22,
                }}
              />
            </div>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.8rem', mb: 1 }}>
              {step.hookLabel}
            </Typography>
            {step.infoAvailable && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {step.infoAvailable.map(info => (
                  <Chip
                    key={info}
                    label={info}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: '0.65rem',
                      height: 20,
                      borderColor: style.border + '60',
                      color: '#475569',
                    }}
                  />
                ))}
              </div>
            )}
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
