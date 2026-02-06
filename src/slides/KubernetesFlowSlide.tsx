import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { kubernetesFlow } from '../data/kubernetesFlow';
import { FlowDiagram } from '../components/FlowDiagram';
import { useFlowAnimation } from '../hooks/useFlowAnimation';

export const KubernetesIntroSlide: React.FC = () => {
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
          <img
            src="https://raw.githubusercontent.com/kubernetes/kubernetes/master/logo/logo.svg"
            alt="Kubernetes"
            style={{ width: 48, height: 48 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#326ce5' }}>
            Kubernetes Flow
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Typography variant="h6" sx={{ color: '#475569', mb: 3, fontWeight: 400 }}>
          Generic Pod Creation Pipeline
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mb: 2 }}>
          10 steps from API request to running container.
          Two hook points provide early and late signals.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
          <Box sx={{ p: 2, bgcolor: '#eff6ff', borderRadius: 2, border: '1px solid #bfdbfe' }}>
            <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: '#1d4ed8', fontWeight: 600 }}>
              Hook 1: Mutating Admission Webhook
            </Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: '#f0fdf4', borderRadius: 2, border: '1px solid #bbf7d0' }}>
            <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: '#15803d', fontWeight: 600 }}>
              Hook 2: Scheduler Reserve Plugin
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export const KubernetesFlowSlide: React.FC = () => {
  const controls = useFlowAnimation(kubernetesFlow.steps);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <FlowDiagram flow={kubernetesFlow} controls={controls} />
    </Box>
  );
};
