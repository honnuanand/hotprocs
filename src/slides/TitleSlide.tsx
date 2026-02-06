import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MemoryIcon from '@mui/icons-material/Memory';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export const TitleSlide: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', maxWidth: 800 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 4 }}>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <MemoryIcon sx={{ fontSize: 64, color: '#3b82f6' }} />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <WhatshotIcon sx={{ fontSize: 48, color: '#ef4444' }} />
          </motion.div>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: '#0f172a',
            mb: 2,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Keeping Processors{' '}
          <span style={{
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Hot
          </span>
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 400, mb: 4 }}>
          Early signals for processor warming in Kubernetes and Knative
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Typography variant="body2" sx={{ color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
          A two-phase architecture for minimizing cold-start latency
        </Typography>
      </motion.div>
    </Box>
  );
};
