import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BoltIcon from '@mui/icons-material/Bolt';

export const ArchitectureOverview: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 900, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 1, textAlign: 'center' }}>
          Two-Phase Architecture
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mb: 4, textAlign: 'center' }}>
          Hook into the request lifecycle at two critical points
        </Typography>
      </motion.div>

      <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Phase 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ flex: '1 1 350px', maxWidth: 400 }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '2px solid #3b82f6',
              bgcolor: '#eff6ff',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <BoltIcon sx={{ color: '#3b82f6' }} />
              <Chip label="Phase 1" sx={{ bgcolor: '#dbeafe', color: '#1d4ed8', fontWeight: 700 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
              Early Warning
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
              Pod identity is known, but node assignment is not. Signal is broadcast to all potential nodes.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip size="small" label="Pod name" variant="outlined" sx={{ borderColor: '#93c5fd' }} />
              <Chip size="small" label="Namespace" variant="outlined" sx={{ borderColor: '#93c5fd' }} />
              <Chip size="small" label="Labels" variant="outlined" sx={{ borderColor: '#93c5fd' }} />
              <Chip size="small" label="Images" variant="outlined" sx={{ borderColor: '#93c5fd' }} />
            </Box>
            <Box sx={{ mt: 2, p: 1.5, bgcolor: '#dbeafe', borderRadius: 2 }}>
              <Typography variant="caption" sx={{ color: '#1d4ed8', fontFamily: 'var(--font-mono)' }}>
                Signal type: Broadcast (all nodes)
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ArrowForwardIcon sx={{ fontSize: 32, color: '#94a3b8' }} />
        </motion.div>

        {/* Phase 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ flex: '1 1 350px', maxWidth: 400 }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '2px solid #22c55e',
              bgcolor: '#f0fdf4',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <BoltIcon sx={{ color: '#22c55e' }} />
              <Chip label="Phase 2" sx={{ bgcolor: '#dcfce7', color: '#15803d', fontWeight: 700 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
              Targeted Signal
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
              Both pod and node are known. Signal is directed to the specific node for precise warming.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip size="small" label="Pod name" variant="outlined" sx={{ borderColor: '#86efac' }} />
              <Chip size="small" label="Target node" variant="outlined" sx={{ borderColor: '#86efac' }} />
              <Chip size="small" label="Node IP" variant="outlined" sx={{ borderColor: '#86efac' }} />
              <Chip size="small" label="Resources" variant="outlined" sx={{ borderColor: '#86efac' }} />
            </Box>
            <Box sx={{ mt: 2, p: 1.5, bgcolor: '#dcfce7', borderRadius: 2 }}>
              <Typography variant="caption" sx={{ color: '#15803d', fontFamily: 'var(--font-mono)' }}>
                Signal type: Directed (single node)
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};
