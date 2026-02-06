import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import BoltIcon from '@mui/icons-material/Bolt';
import CellTowerIcon from '@mui/icons-material/CellTower';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

export const K8sHookMutatingSlide: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <BoltIcon sx={{ color: '#3b82f6', fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
            Mutating Admission Webhook
          </Typography>
          <Chip label="Step 3" sx={{ bgcolor: '#dbeafe', color: '#1d4ed8', fontWeight: 600 }} />
        </Box>
      </motion.div>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ flex: '1 1 300px' }}
        >
          <Paper elevation={1} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
              What happens here
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.8 }}>
              The API Server calls all configured mutating admission webhooks in sequence.
              Each webhook can modify the Pod spec before it's persisted. This is the first
              point where we have access to the Pod's identity: name, namespace, labels,
              and container images.
            </Typography>
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ flex: '1 1 300px' }}
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
              <CellTowerIcon sx={{ color: '#3b82f6' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1d4ed8' }}>
                Phase 1 Signal
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
              Broadcast to all candidate nodes. We know WHAT will run, but not WHERE.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {['Pod name', 'Namespace', 'Labels', 'Annotations', 'Container images'].map(item => (
                <Chip
                  key={item}
                  label={item}
                  size="small"
                  sx={{ bgcolor: '#dbeafe', color: '#1d4ed8', fontSize: '0.7rem' }}
                />
              ))}
            </Box>
            <Box sx={{ mt: 2, p: 1.5, borderRadius: 2, bgcolor: '#dbeafe' }}>
              <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: '#1d4ed8' }}>
                Node: Unknown (broadcast to all)
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};

export const K8sHookReserveSlide: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <BoltIcon sx={{ color: '#22c55e', fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
            Scheduler Reserve Plugin
          </Typography>
          <Chip label="Step 8" sx={{ bgcolor: '#dcfce7', color: '#15803d', fontWeight: 600 }} />
        </Box>
      </motion.div>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ flex: '1 1 300px' }}
        >
          <Paper elevation={1} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
              What happens here
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.8 }}>
              After the scheduler completes filtering and scoring, it selects the best
              node and calls the Reserve plugin. This is the earliest point where both
              the Pod identity AND the exact target node are known. The node's resources
              are reserved for this Pod.
            </Typography>
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ flex: '1 1 300px' }}
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
              <GpsFixedIcon sx={{ color: '#22c55e' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#15803d' }}>
                Phase 2 Signal
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
              Targeted to the specific node. We now know both WHAT and WHERE.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {['Pod name', 'Namespace', 'Target node', 'Node IP', 'Node resources'].map(item => (
                <Chip
                  key={item}
                  label={item}
                  size="small"
                  sx={{ bgcolor: '#dcfce7', color: '#15803d', fontSize: '0.7rem' }}
                />
              ))}
            </Box>
            <Box sx={{ mt: 2, p: 1.5, borderRadius: 2, bgcolor: '#dcfce7' }}>
              <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: '#15803d' }}>
                Node: Exact target (directed signal)
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};
