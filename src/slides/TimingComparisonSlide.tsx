import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import BoltIcon from '@mui/icons-material/Bolt';

interface TimelineEntry {
  label: string;
  time: string;
  timeMs: number;
  isHook?: boolean;
  hookType?: 'phase1' | 'phase2';
}

const k8sTimeline: TimelineEntry[] = [
  { label: 'API Request', time: '0ms', timeMs: 0 },
  { label: 'Auth', time: '~2ms', timeMs: 2 },
  { label: 'Mutating Webhook', time: '~8ms', timeMs: 8, isHook: true, hookType: 'phase1' },
  { label: 'Validating', time: '~20ms', timeMs: 20 },
  { label: 'etcd persist', time: '~25ms', timeMs: 25 },
  { label: 'Scheduler picks up', time: '~60ms', timeMs: 60 },
  { label: 'Filter + Score', time: '~75ms', timeMs: 75 },
  { label: 'Reserve', time: '~76ms', timeMs: 76, isHook: true, hookType: 'phase2' },
  { label: 'Bind', time: '~80ms', timeMs: 80 },
  { label: 'Container start', time: '~500ms+', timeMs: 500 },
];

const knTimeline: TimelineEntry[] = [
  { label: 'HTTP Request', time: '0ms', timeMs: 0 },
  { label: 'ext_authz', time: '~2ms', timeMs: 2, isHook: true, hookType: 'phase1' },
  { label: 'Health/Probe', time: '~3ms', timeMs: 3 },
  { label: 'ContextHandler', time: '~7ms', timeMs: 7, isHook: true, hookType: 'phase1' },
  { label: 'Metrics', time: '~8ms', timeMs: 8 },
  { label: 'Throttler', time: '~9ms', timeMs: 9 },
  { label: 'Stats via WS', time: '~10ms', timeMs: 10 },
  { label: 'Autoscaler cycle', time: '~110ms', timeMs: 110 },
  { label: 'KPA scale()', time: '~120ms', timeMs: 120, isHook: true, hookType: 'phase1' },
  { label: 'K8s Reserve', time: '~200ms', timeMs: 200, isHook: true, hookType: 'phase2' },
  { label: 'Pod starts', time: '~700ms+', timeMs: 700 },
  { label: 'Request fwd', time: '~1s+', timeMs: 1000 },
];

const TimelineBar: React.FC<{ entries: TimelineEntry[]; maxMs: number; color: string; label: string }> = ({ entries, maxMs, color, label }) => {
  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color, mb: 2 }}>
        {label}
      </Typography>
      <Box sx={{ position: 'relative', height: 60, bgcolor: '#f8fafc', borderRadius: 2, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        {entries.map((entry, i) => {
          const left = (entry.timeMs / maxMs) * 100;
          const hookColor = entry.hookType === 'phase1' ? '#3b82f6' : '#22c55e';
          return (
            <motion.div
              key={entry.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
              style={{
                position: 'absolute',
                left: `${Math.min(left, 95)}%`,
                top: entry.isHook ? 4 : 24,
                transform: 'translateX(-50%)',
                zIndex: entry.isHook ? 10 : 5,
              }}
            >
              {entry.isHook ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <BoltIcon sx={{ color: hookColor, fontSize: 16 }} />
                  <Box sx={{ width: 1, height: 12, bgcolor: hookColor }} />
                  <Chip
                    label={entry.label}
                    size="small"
                    sx={{
                      fontSize: '0.55rem',
                      height: 18,
                      bgcolor: hookColor,
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  bgcolor: '#94a3b8',
                }}
                />
              )}
            </motion.div>
          );
        })}
        {/* Time axis */}
        <Box sx={{ position: 'absolute', bottom: 2, left: 8, right: 8, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#94a3b8' }}>0ms</Typography>
          <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#94a3b8' }}>{maxMs}ms+</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export const TimingComparisonSlide: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 900, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 1, textAlign: 'center' }}>
          Timing Comparison
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mb: 4, textAlign: 'center' }}>
          When do hook points fire relative to the total request lifecycle?
        </Typography>
      </motion.div>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <TimelineBar entries={k8sTimeline} maxMs={500} color="#326ce5" label="Kubernetes Pod Creation" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <TimelineBar entries={knTimeline} maxMs={1000} color="#0865ad" label="Knative Scale-from-Zero" />
        </motion.div>
      </Box>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#3b82f6' }} />
            <Typography variant="caption" sx={{ color: '#64748b' }}>Phase 1 (Broadcast)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#22c55e' }} />
            <Typography variant="caption" sx={{ color: '#64748b' }}>Phase 2 (Targeted)</Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};
