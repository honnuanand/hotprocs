import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MemoryIcon from '@mui/icons-material/Memory';
import BoltIcon from '@mui/icons-material/Bolt';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

export const HardwareBridgeSlide: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', maxWidth: 750 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
          But What Keeps the Processor Physically Hot?
        </Typography>
        <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 400, mb: 4 }}>
          From software warming signals to the hardware that delivers power
        </Typography>
      </motion.div>

      {/* Software layer */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Paper elevation={2} sx={{
          p: 2.5, mb: 1, borderRadius: 2,
          border: '1px solid #bfdbfe', bgcolor: '#eff6ff',
          display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center',
        }}>
          <MemoryIcon sx={{ color: '#3b82f6', fontSize: 28 }} />
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e40af' }}>
              Software Layer: K8s / Knative Warming Signals
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Admission webhooks, scheduler plugins, Knative hooks trigger early processor warming
            </Typography>
          </Box>
        </Paper>
      </motion.div>

      {/* Arrow connector */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{ transformOrigin: 'top' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 1 }}>
          <Box sx={{ width: 2, height: 30, bgcolor: '#94a3b8' }} />
          <ArrowDownwardIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
        </Box>
      </motion.div>

      {/* Processor / die */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Paper elevation={4} sx={{
          p: 2.5, mb: 1, borderRadius: 2,
          border: '2px solid #f97316', bgcolor: '#fff7ed',
          display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center',
        }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <DeveloperBoardIcon sx={{ color: '#ea580c', fontSize: 36 }} />
          </motion.div>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#c2410c' }}>
              Processor Die — The Load
            </Typography>
            <Typography variant="caption" sx={{ color: '#78716c' }}>
              Demands 0.7–1.1V at up to 1000A. Current is a factor of load.
            </Typography>
          </Box>
        </Paper>
      </motion.div>

      {/* Arrow connector */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        style={{ transformOrigin: 'top' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 1 }}>
          <Box sx={{ width: 2, height: 30, bgcolor: '#94a3b8' }} />
          <ArrowDownwardIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
        </Box>
      </motion.div>

      {/* Hardware VRM layer */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Paper elevation={3} sx={{
          p: 2.5, mb: 3, borderRadius: 2,
          border: '2px solid #fcd34d', bgcolor: '#fef3c7',
          display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center',
        }}>
          <BoltIcon sx={{ color: '#d97706', fontSize: 32 }} />
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400e' }}>
              Hardware Layer: VRM — Voltage Regulator Module
            </Typography>
            <Typography variant="caption" sx={{ color: '#78716c' }}>
              Multi-phase buck converter: 12V → 0.75V. PWM controller, gate drivers, power stages, inductors, capacitors.
            </Typography>
          </Box>
        </Paper>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <Typography variant="body2" sx={{ color: '#64748b', fontStyle: 'italic' }}>
          The software signals tell the system <strong>when</strong> to warm up.
          The VRM determines <strong>how</strong> power physically reaches the processor.
        </Typography>
      </motion.div>
    </Box>
  );
};
