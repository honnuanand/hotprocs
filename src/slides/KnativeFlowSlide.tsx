import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { knativeFlow } from '../data/knativeFlow';
import { FlowDiagram } from '../components/FlowDiagram';
import { useFlowAnimation } from '../hooks/useFlowAnimation';

export const KnativeIntroSlide: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', maxWidth: 700 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          p: 2,
          px: 3,
          bgcolor: '#eff6ff',
          borderRadius: 3,
          border: '1px solid #bfdbfe',
        }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0865ad' }}>
            Knative Flow
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Typography variant="h6" sx={{ color: '#475569', mb: 3, fontWeight: 400 }}>
          Scale-from-Zero Request Pipeline
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mb: 2 }}>
          12 steps from HTTP request to running response.
          Four hook points at different stages of the lifecycle.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3, flexWrap: 'wrap' }}>
          <Box sx={{ p: 1.5, bgcolor: '#eff6ff', borderRadius: 2, border: '1px solid #bfdbfe' }}>
            <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: '#1d4ed8', fontWeight: 600 }}>
              ext_authz
            </Typography>
          </Box>
          <Box sx={{ p: 1.5, bgcolor: '#eff6ff', borderRadius: 2, border: '1px solid #bfdbfe' }}>
            <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: '#1d4ed8', fontWeight: 600 }}>
              ContextHandler
            </Typography>
          </Box>
          <Box sx={{ p: 1.5, bgcolor: '#fefce8', borderRadius: 2, border: '1px solid #fde68a' }}>
            <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: '#b45309', fontWeight: 600 }}>
              KPA Scaler
            </Typography>
          </Box>
          <Box sx={{ p: 1.5, bgcolor: '#f0fdf4', borderRadius: 2, border: '1px solid #bbf7d0' }}>
            <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: '#15803d', fontWeight: 600 }}>
              Scheduler Reserve
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export const KnativeFlowSlide: React.FC = () => {
  const controls = useFlowAnimation(knativeFlow.steps);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <FlowDiagram flow={knativeFlow} controls={controls} />
    </Box>
  );
};
