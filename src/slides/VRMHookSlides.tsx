import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import SpeedIcon from '@mui/icons-material/Speed';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import LoopIcon from '@mui/icons-material/Loop';

export const VRMHookSVIDSlide: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <SettingsInputSvideoIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
            SVID — Serial Voltage Identification
          </Typography>
          <Chip label="Phase 1" size="small" sx={{ bgcolor: '#dbeafe', color: '#1d4ed8', fontWeight: 700 }} />
        </Box>
      </motion.div>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, border: '1px solid #bfdbfe', bgcolor: '#eff6ff', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <SettingsInputSvideoIcon sx={{ color: '#3b82f6' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e40af' }}>
                How SVID Works
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#475569', mb: 1.5, lineHeight: 1.7 }}>
              The CPU uses a serial bus to request its desired operating voltage from the VRM controller. This protocol replaces older parallel VID pins.
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
              Voltage requests change dynamically: higher voltage for turbo boost, lower for idle (P-states / C-states). The VRM must slew to the new voltage within microseconds.
            </Typography>
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, border: '1px solid #e2e8f0', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
              Information Available
            </Typography>
            {[
              { label: 'Requested Vcore', desc: 'Target output voltage (e.g., 0.75V)' },
              { label: 'P-state', desc: 'Performance state — determines clock + voltage' },
              { label: 'Turbo mode', desc: 'Whether turbo boost is active' },
              { label: 'Current limit', desc: 'Max current the CPU will draw (TDC/PL1)' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              >
                <Box sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'flex-start' }}>
                  <Chip
                    label={item.label}
                    size="small"
                    sx={{ fontWeight: 600, fontSize: '0.7rem', bgcolor: '#dbeafe', color: '#1d4ed8', flexShrink: 0 }}
                  />
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Paper>
        </motion.div>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Paper elevation={1} sx={{ p: 2.5, mt: 3, borderRadius: 2, bgcolor: '#fffbeb', border: '1px solid #fcd34d' }}>
          <Typography variant="body2" sx={{ color: '#92400e', fontWeight: 500, fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            P = V × I &rarr; 1.0V × 2A = 2W (per core) &nbsp;|&nbsp; D = Vout / Vin &rarr; 0.75V / 12V &asymp; 6.25% duty cycle
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export const VRMHookLoadSlide: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <LoopIcon sx={{ fontSize: 32, color: '#22c55e' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
            Load Regulation — Closed Loop Control
          </Typography>
          <Chip label="Phase 2" size="small" sx={{ bgcolor: '#dcfce7', color: '#15803d', fontWeight: 700 }} />
        </Box>
      </motion.div>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, border: '1px solid #bbf7d0', bgcolor: '#f0fdf4', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ElectricalServicesIcon sx={{ color: '#22c55e' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#15803d' }}>
                Power Delivery at Scale
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#475569', mb: 1.5, lineHeight: 1.7 }}>
              At the load, the VRM delivers regulated voltage with extreme current demands.
              Current is a factor of load — as the processor workload increases, current draw ramps up while
              the voltage must remain stable.
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
              Wait for nodal voltage going down: the feedback loop detects any Vout droop and increases duty cycle
              to compensate. P_loss = I² × R — conduction losses grow quadratically with current.
            </Typography>
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, border: '1px solid #e2e8f0', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
              Key Measurements
            </Typography>
            {[
              { label: 'Vout', value: '0.7–1.1V', desc: 'Regulated core voltage' },
              { label: 'I_DC', value: '1000A', desc: 'Continuous current (TDC)' },
              { label: 'TDC Power', value: '700W', desc: 'Thermal design current power' },
              { label: 'TDP Peak', value: '1750W', desc: 'Peak transient power' },
              { label: 'P_loss', value: 'I²×R', desc: 'Conduction loss per FET (e.g., 1Ω → 4W)' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              >
                <Box sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'center' }}>
                  <Chip
                    label={item.label}
                    size="small"
                    sx={{ fontWeight: 600, fontSize: '0.7rem', bgcolor: '#dcfce7', color: '#15803d', flexShrink: 0 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', mr: 0.5 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Paper>
        </motion.div>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Paper elevation={1} sx={{ p: 2.5, mt: 3, borderRadius: 2, bgcolor: '#fef2f2', border: '1px solid #fecaca' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <SpeedIcon sx={{ color: '#991b1b', fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ color: '#991b1b', fontWeight: 600 }}>
              Diff Amp — Error Amplifier Feedback
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#991b1b', lineHeight: 1.7 }}>
            The Error Amplifier (Diff Amp) continuously monitors Vout via the feedback divider. When load steps cause Vout to droop,
            the control loop responds within 1–10 µs to restore regulation. Multi-phase interleaving reduces ripple by a factor of N phases.
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};
