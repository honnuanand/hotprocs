import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import CellTowerIcon from '@mui/icons-material/CellTower';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MemoryIcon from '@mui/icons-material/Memory';

export const SignalDeliverySlide: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 900, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 1, textAlign: 'center' }}>
          Signal Delivery Architecture
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mb: 4, textAlign: 'center' }}>
          How warming signals reach processors at each phase
        </Typography>
      </motion.div>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Phase 1: Broadcast */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ flex: '1 1 380px', maxWidth: 420 }}
        >
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, border: '2px solid #3b82f6', bgcolor: '#eff6ff' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <CellTowerIcon sx={{ color: '#3b82f6', fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1d4ed8' }}>
                Phase 1: Broadcast
              </Typography>
            </Box>

            {/* Visual: Signal radiating to multiple nodes */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              py: 3,
              borderRadius: 2,
              bgcolor: 'white',
              border: '1px solid #bfdbfe',
              mb: 2,
            }}>
              <Chip label="Hook" sx={{ bgcolor: '#3b82f6', color: 'white', fontWeight: 600 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <ArrowForwardIcon sx={{ fontSize: 14, color: '#3b82f6' }} />
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      p: 0.5,
                      px: 1,
                      bgcolor: '#f1f5f9',
                      borderRadius: 1,
                      border: '1px solid #e2e8f0',
                    }}>
                      <MemoryIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#64748b' }}>
                        Node {i}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.8rem' }}>
              All candidate nodes receive the warming signal. Processors begin pre-loading even before
              the exact node is determined. Some warming effort may be wasted on non-selected nodes.
            </Typography>
          </Paper>
        </motion.div>

        {/* Phase 2: Targeted */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ flex: '1 1 380px', maxWidth: 420 }}
        >
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, border: '2px solid #22c55e', bgcolor: '#f0fdf4' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <GpsFixedIcon sx={{ color: '#22c55e', fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#15803d' }}>
                Phase 2: Targeted
              </Typography>
            </Box>

            {/* Visual: Signal directed to specific node */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              py: 3,
              borderRadius: 2,
              bgcolor: 'white',
              border: '1px solid #bbf7d0',
              mb: 2,
            }}>
              <Chip label="Hook" sx={{ bgcolor: '#22c55e', color: 'white', fontWeight: 600 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: i === 2 ? 1 : 0.3, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.15, duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <ArrowForwardIcon sx={{ fontSize: 14, color: i === 2 ? '#22c55e' : '#e2e8f0' }} />
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      p: 0.5,
                      px: 1,
                      bgcolor: i === 2 ? '#f0fdf4' : '#f8fafc',
                      borderRadius: 1,
                      border: `1px solid ${i === 2 ? '#22c55e' : '#e2e8f0'}`,
                    }}>
                      <MemoryIcon sx={{ fontSize: 14, color: i === 2 ? '#ef4444' : '#cbd5e1' }} />
                      <Typography variant="caption" sx={{
                        fontSize: '0.65rem',
                        color: i === 2 ? '#15803d' : '#cbd5e1',
                        fontWeight: i === 2 ? 600 : 400,
                      }}>
                        Node {i} {i === 2 && '(selected)'}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.8rem' }}>
              Only the selected node receives the targeted signal. The processor completes
              its warm-up with exact workload information. No wasted effort.
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};
