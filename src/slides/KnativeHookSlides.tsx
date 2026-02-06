import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import BoltIcon from '@mui/icons-material/Bolt';

const earlyHooks = [
  {
    step: 2,
    name: 'Envoy ext_authz',
    phase: 'Phase 1 (Earliest)',
    color: '#3b82f6',
    bg: '#eff6ff',
    chipBg: '#dbeafe',
    desc: 'The ext_authz filter intercepts requests before they reach the Activator. The Revision ID is extracted from the Host header, making this the earliest possible hook point in the Knative flow.',
    info: ['Revision ID', 'Host header', 'Request path', 'HTTP method'],
  },
  {
    step: 4,
    name: 'ContextHandler',
    phase: 'Phase 1',
    color: '#3b82f6',
    bg: '#eff6ff',
    chipBg: '#dbeafe',
    desc: 'The ContextHandler resolves the Revision object and retrieves the full configuration. At this point, the replica count and container configuration are known.',
    info: ['Revision object', 'Replica count', 'Container config', 'Deployment name'],
  },
];

const lateHooks = [
  {
    step: 9,
    name: 'KPA Reconciler',
    phase: 'Late Phase 1',
    color: '#f59e0b',
    bg: '#fefce8',
    chipBg: '#fef3c7',
    desc: 'The KPA Reconciler patches the Deployment to scale from 0 to N. This triggers the Pod creation pipeline in Kubernetes. The deployment identity is known.',
    info: ['Deployment name', 'Desired replicas', 'Pod template'],
  },
  {
    step: 10,
    name: 'Scheduler Reserve',
    phase: 'Phase 2',
    color: '#22c55e',
    bg: '#f0fdf4',
    chipBg: '#dcfce7',
    desc: 'The Kubernetes scheduler assigns the Pod to a specific node. Both the Pod identity and the exact node are now known — this is the Phase 2 targeted signal.',
    info: ['Pod name', 'Target node', 'Node IP', 'All pod metadata'],
  },
];

export const KnativeHookEarlySlide: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 850, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <BoltIcon sx={{ color: '#3b82f6', fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
            Knative Early Hooks
          </Typography>
        </Box>
      </motion.div>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {earlyHooks.map((hook, i) => (
          <motion.div
            key={hook.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.5 }}
          >
            <Paper
              elevation={2}
              sx={{ p: 3, borderRadius: 3, border: `2px solid ${hook.color}`, bgcolor: hook.bg }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Chip label={`Step ${hook.step}`} size="small" sx={{ bgcolor: hook.chipBg, color: hook.color, fontWeight: 700 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                  {hook.name}
                </Typography>
                <Chip label={hook.phase} size="small" variant="outlined" sx={{ borderColor: hook.color, color: hook.color }} />
              </Box>
              <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
                {hook.desc}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {hook.info.map(item => (
                  <Chip key={item} label={item} size="small" sx={{ bgcolor: hook.chipBg, color: hook.color, fontSize: '0.7rem' }} />
                ))}
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export const KnativeHookLateSlide: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 850, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <BoltIcon sx={{ color: '#22c55e', fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
            Knative Late Hooks
          </Typography>
        </Box>
      </motion.div>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {lateHooks.map((hook, i) => (
          <motion.div
            key={hook.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.5 }}
          >
            <Paper
              elevation={2}
              sx={{ p: 3, borderRadius: 3, border: `2px solid ${hook.color}`, bgcolor: hook.bg }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Chip label={`Step ${hook.step}`} size="small" sx={{ bgcolor: hook.chipBg, color: hook.color, fontWeight: 700 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                  {hook.name}
                </Typography>
                <Chip label={hook.phase} size="small" variant="outlined" sx={{ borderColor: hook.color, color: hook.color }} />
              </Box>
              <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
                {hook.desc}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {hook.info.map(item => (
                  <Chip key={item} label={item} size="small" sx={{ bgcolor: hook.chipBg, color: hook.color, fontSize: '0.7rem' }} />
                ))}
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};
