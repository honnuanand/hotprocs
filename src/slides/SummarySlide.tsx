import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BoltIcon from '@mui/icons-material/Bolt';

const recommendations = [
  {
    title: 'Implement Mutating Admission Webhook',
    desc: 'Deploy a webhook that intercepts Pod CREATE requests and emits Phase 1 warming signals with pod identity.',
    platform: 'Kubernetes',
    color: '#326ce5',
  },
  {
    title: 'Build Scheduler Reserve Plugin',
    desc: 'Extend the scheduler with a Reserve plugin that sends Phase 2 targeted signals with exact node information.',
    platform: 'Kubernetes',
    color: '#326ce5',
  },
  {
    title: 'Hook ext_authz or ContextHandler',
    desc: 'Intercept at the earliest Knative ingress point to get Revision ID and begin warming before autoscaling.',
    platform: 'Knative',
    color: '#0865ad',
  },
  {
    title: 'Monitor Lead Time Gains',
    desc: 'Measure the time delta between Phase 1 signal and container start to quantify warming advantage.',
    platform: 'Both',
    color: '#64748b',
  },
];

export const SummarySlide: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 1, textAlign: 'center' }}>
          Summary & Recommendations
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mb: 4, textAlign: 'center' }}>
          Key takeaways for keeping processors hot
        </Typography>
      </motion.div>

      {/* Key insight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            border: '2px solid #f59e0b',
            bgcolor: '#fffbeb',
            textAlign: 'center',
          }}
        >
          <BoltIcon sx={{ color: '#f59e0b', fontSize: 32, mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#92400e', mb: 1 }}>
            The two-phase approach maximizes lead time
          </Typography>
          <Typography variant="body2" sx={{ color: '#78716c' }}>
            Phase 1 gives broad early warning. Phase 2 gives precise targeting.
            Together, they minimize cold-start latency by using every available millisecond.
          </Typography>
        </Paper>
      </motion.div>

      {/* Recommendations */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                px: 2.5,
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
              <CheckCircleIcon sx={{ color: '#22c55e', fontSize: 22, mt: 0.2 }} />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    {rec.title}
                  </Typography>
                  <Chip
                    label={rec.platform}
                    size="small"
                    sx={{
                      fontSize: '0.6rem',
                      height: 18,
                      bgcolor: rec.color + '15',
                      color: rec.color,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  {rec.desc}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};
