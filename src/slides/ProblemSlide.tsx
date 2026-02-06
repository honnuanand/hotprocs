import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const problems = [
  {
    icon: <AcUnitIcon sx={{ fontSize: 32, color: '#3b82f6' }} />,
    title: 'Cold Start Latency',
    desc: 'Processors are idle when workloads arrive. Initialization adds seconds to request latency.',
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 32, color: '#f97316' }} />,
    title: 'Late Signals',
    desc: 'By the time we know a workload is scheduled, the user is already waiting. We need earlier hooks.',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 32, color: '#22c55e' }} />,
    title: 'Wasted Lead Time',
    desc: 'Time passes between pod creation and container start. That time could be used for pre-warming.',
  },
];

export const ProblemSlide: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 1, textAlign: 'center' }}>
          The Problem
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mb: 4, textAlign: 'center' }}>
          Why do we need early signals for processor warming?
        </Typography>
      </motion.div>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 3,
              }}
            >
              <Box sx={{ p: 1, borderRadius: 2, bgcolor: '#f8fafc' }}>
                {p.icon}
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                  {p.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  {p.desc}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};
