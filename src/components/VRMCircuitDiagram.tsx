import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import BoltIcon from '@mui/icons-material/Bolt';
import PowerIcon from '@mui/icons-material/Power';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import MemoryIcon from '@mui/icons-material/Memory';
import LoopIcon from '@mui/icons-material/Loop';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Flow, FlowStep } from '../data/types';
import { Controls } from './Controls';
import { HookCallout } from './HookCallout';
import { ProcessorStateComponent } from './ProcessorState';
import { FlowAnimationControls } from '../hooks/useFlowAnimation';

// Small SVG component icons
const InductorSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M2 12H5Q7 12 7 10Q7 8 9 8Q11 8 11 10Q11 12 13 12Q15 12 15 10Q15 8 17 8Q19 8 19 10Q19 12 21 12H22" />
  </svg>
);
const CapSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="4" x2="12" y2="9" /><line x1="6" y1="9" x2="18" y2="9" />
    <line x1="6" y1="15" x2="18" y2="15" /><line x1="12" y1="15" x2="12" y2="20" />
  </svg>
);
const MOSFETSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="12" x2="10" y2="12" /><line x1="10" y1="6" x2="10" y2="18" />
    <line x1="14" y1="6" x2="14" y2="18" /><line x1="14" y1="6" x2="20" y2="6" />
    <line x1="14" y1="12" x2="20" y2="12" /><line x1="14" y1="18" x2="20" y2="18" />
    <polygon points="16,12 14,10 14,14" fill="currentColor" />
  </svg>
);
const PWMSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="2,16 2,8 8,8 8,16 10,16 10,8 16,8 16,16 18,16 18,8 22,8" />
  </svg>
);
const FBDividerSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="2" x2="12" y2="7" />
    <rect x="8" y="7" width="8" height="4" rx="1" />
    <line x1="12" y1="11" x2="12" y2="13" />
    <rect x="8" y="13" width="8" height="4" rx="1" />
    <line x1="12" y1="17" x2="12" y2="22" />
  </svg>
);

// Circuit node definition
interface CNode {
  stepIndex: number;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
}

const nodes: CNode[] = [
  { stepIndex: 0, shortLabel: '12V Input', icon: <PowerIcon sx={{ fontSize: 18 }} />, color: '#fef3c7', borderColor: '#f59e0b' },
  { stepIndex: 1, shortLabel: 'Serial Voltage ID', icon: <SettingsInputSvideoIcon sx={{ fontSize: 18 }} />, color: '#dbeafe', borderColor: '#3b82f6' },
  { stepIndex: 2, shortLabel: 'PWM Controller', icon: <PWMSvg />, color: '#fef3c7', borderColor: '#f59e0b' },
  { stepIndex: 3, shortLabel: 'Error Amplifier', icon: <TuneIcon sx={{ fontSize: 18 }} />, color: '#fef3c7', borderColor: '#f59e0b' },
  { stepIndex: 4, shortLabel: 'Gate Driver', icon: <DeveloperBoardIcon sx={{ fontSize: 18 }} />, color: '#fef3c7', borderColor: '#f59e0b' },
  { stepIndex: 5, shortLabel: 'High-Side FET', icon: <MOSFETSvg />, color: '#fef3c7', borderColor: '#f59e0b' },
  { stepIndex: 6, shortLabel: 'Low-Side FET', icon: <MOSFETSvg />, color: '#fef3c7', borderColor: '#f59e0b' },
  { stepIndex: 7, shortLabel: 'Inductor', icon: <InductorSvg />, color: '#fef3c7', borderColor: '#f59e0b' },
  { stepIndex: 8, shortLabel: 'Capacitors', icon: <CapSvg />, color: '#fef3c7', borderColor: '#f59e0b' },
  { stepIndex: 9, shortLabel: 'CPU Load', icon: <MemoryIcon sx={{ fontSize: 18 }} />, color: '#fef2f2', borderColor: '#ef4444' },
  { stepIndex: 10, shortLabel: 'Feedback Divider', icon: <FBDividerSvg />, color: '#f0fdf4', borderColor: '#22c55e' },
  { stepIndex: 11, shortLabel: 'Closed Loop', icon: <LoopIcon sx={{ fontSize: 18 }} />, color: '#f0fdf4', borderColor: '#22c55e' },
];

// A single circuit block (Paper box)
const CBlock: React.FC<{
  node: CNode;
  step: FlowStep;
  active: boolean;
  completed: boolean;
}> = ({ node, step, active, completed }) => {
  const isHook = step.isHookPoint;
  const hcMap: Record<string, { bg: string; border: string }> = {
    phase1: { bg: '#dbeafe', border: '#3b82f6' },
    phase2: { bg: '#dcfce7', border: '#22c55e' },
  };
  const hc = isHook && step.hookType ? hcMap[step.hookType] : null;

  return (
    <Tooltip
      title={
        <div>
          <strong>{step.component}</strong><br />
          {step.description}
          {step.timing && <><br /><em>{step.timing}</em></>}
        </div>
      }
      arrow
      placement="top"
    >
      <Paper
        elevation={active ? 6 : completed ? 1 : 2}
        sx={{
          width: '100%',
          minHeight: 56,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          border: 2,
          borderColor: active
            ? (hc?.border || '#f59e0b')
            : completed ? '#cbd5e1' : (hc?.border || node.borderColor + '80'),
          bgcolor: active
            ? (hc?.bg || node.color)
            : completed ? '#f8fafc' : 'white',
          opacity: completed && !active ? 0.6 : 1,
          transition: 'all 0.3s ease',
          boxShadow: active ? `0 0 14px ${hc?.border || node.borderColor}50` : undefined,
          transform: active ? 'scale(1.05)' : 'scale(1)',
          position: 'relative',
          p: 0.75,
          cursor: 'default',
        }}
      >
        {active && isHook && (
          <motion.div
            animate={{ boxShadow: [`0 0 0px ${hc?.border}00`, `0 0 14px ${hc?.border}80`, `0 0 0px ${hc?.border}00`] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ position: 'absolute', inset: 0, borderRadius: 8, pointerEvents: 'none' }}
          />
        )}
        <Box sx={{ color: active ? (hc?.border || node.borderColor) : completed ? '#94a3b8' : '#78716c', display: 'flex', alignItems: 'center', gap: 0.3 }}>
          {node.icon}
          {isHook && <BoltIcon sx={{ fontSize: 12, color: hc?.border || '#f59e0b' }} />}
        </Box>
        <Typography variant="caption" sx={{
          fontWeight: active ? 700 : 500,
          color: active ? (hc?.border || '#92400e') : completed ? '#94a3b8' : '#475569',
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem', textAlign: 'center', lineHeight: 1.2, mt: 0.2,
        }}>
          {node.shortLabel}
        </Typography>
        <Chip label={step.stepNumber} size="small" sx={{
          position: 'absolute', top: 1, right: 1, height: 14, minWidth: 14, fontSize: '0.5rem', fontWeight: 700,
          fontFamily: 'var(--font-mono)', bgcolor: active ? (hc?.border || '#f59e0b') : '#e2e8f0',
          color: active ? 'white' : '#94a3b8', '& .MuiChip-label': { px: 0.4 },
        }} />
      </Paper>
    </Tooltip>
  );
};

// Horizontal connector arrow with flow animation
const HArrow: React.FC<{ active: boolean; current?: boolean; color?: string }> = ({ active, current, color = '#f59e0b' }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', px: 0.2 }}>
    <motion.div
      animate={current ? { x: [0, 4, 0] } : {}}
      transition={current ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <ArrowForwardIcon sx={{ fontSize: 16, color: active ? color : '#d1d5db', transition: 'color 0.3s ease' }} />
    </motion.div>
  </Box>
);

// Vertical connector arrow with flow animation
const VArrow: React.FC<{ active: boolean; current?: boolean; color?: string; direction?: 'down' | 'up' }> = ({ active, current, color = '#f59e0b', direction = 'down' }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 0.1 }}>
    <motion.div
      animate={current ? { y: direction === 'down' ? [0, 4, 0] : [0, -4, 0] } : {}}
      transition={current ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      {direction === 'down'
        ? <ArrowDownwardIcon sx={{ fontSize: 16, color: active ? color : '#d1d5db', transition: 'color 0.3s ease' }} />
        : <ArrowUpwardIcon sx={{ fontSize: 16, color: active ? color : '#d1d5db', transition: 'color 0.3s ease' }} />}
    </motion.div>
  </Box>
);

// Back arrow for feedback with flow animation
const HBackArrow: React.FC<{ active: boolean; current?: boolean; color?: string }> = ({ active, current, color = '#22c55e' }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', px: 0.2 }}>
    <motion.div
      animate={current ? { x: [0, -4, 0] } : {}}
      transition={current ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <ArrowBackIcon sx={{ fontSize: 16, color: active ? color : '#d1d5db', transition: 'color 0.3s ease' }} />
    </motion.div>
  </Box>
);

interface VRMCircuitDiagramProps {
  flow: Flow;
  controls: FlowAnimationControls;
}

export const VRMCircuitDiagram: React.FC<VRMCircuitDiagramProps> = ({ flow, controls }) => {
  const {
    currentStep, isPlaying, speed, processorState,
    togglePlay, setSpeed, stepForward, stepBackward, reset,
  } = controls;

  const activeStep = currentStep >= 0 && currentStep < flow.steps.length ? flow.steps[currentStep] : null;
  const showHookCallout = activeStep?.isHookPoint ?? false;

  const isActive = (si: number) => si === currentStep;
  const isCompleted = (si: number) => si < currentStep;
  const wireActive = (toStep: number) => currentStep >= toStep;

  const block = (idx: number) => {
    const n = nodes[idx];
    const s = flow.steps[n.stepIndex];
    return s ? <CBlock node={n} step={s} active={isActive(n.stepIndex)} completed={isCompleted(n.stepIndex)} /> : null;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#92400e', fontFamily: 'var(--font-sans)' }}>
        {flow.title}
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Controls isPlaying={isPlaying} speed={speed} onTogglePlay={togglePlay}
          onStepForward={stepForward} onStepBackward={stepBackward} onReset={reset} onSetSpeed={setSpeed} />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flex: 1, width: '100%', maxWidth: 950, overflow: 'hidden' }}>
        {/* Circuit area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5, overflow: 'auto' }}>

          {/* Section label: CONTROL PATH */}
          <Typography variant="caption" sx={{ color: '#b4530980', fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: 1, ml: 1 }}>
            CONTROL PATH
          </Typography>

          {/* Row 1: 12V → SVID → PWM → Driver → Hi-FET */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>{block(0)}</Box>
            <HArrow active={wireActive(1)} current={isActive(1)} />
            <Box sx={{ flex: 1, minWidth: 0 }}>{block(1)}</Box>
            <HArrow active={wireActive(2)} current={isActive(2)} />
            <Box sx={{ flex: 1, minWidth: 0 }}>{block(2)}</Box>
            <HArrow active={wireActive(4)} current={isActive(4)} />
            <Box sx={{ flex: 1, minWidth: 0 }}>{block(4)}</Box>
            <HArrow active={wireActive(5)} current={isActive(5)} />
            <Box sx={{ flex: 1, minWidth: 0 }}>{block(5)}</Box>
          </Box>

          {/* Down arrow from Hi-FET → Lo-FET on right side + EA in middle */}
          <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
            {/* Left spacer (cols 0-1) */}
            <Box sx={{ flex: 2, minWidth: 0 }} />
            {/* EA column: feedback arrow comes up from below */}
            <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <VArrow active={wireActive(3)} current={isActive(3)} color="#22c55e" direction="up" />
              {block(3)}
            </Box>
            {/* Spacer (col 3) */}
            <Box sx={{ flex: 1, minWidth: 0 }} />
            {/* Lo-FET column */}
            <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <VArrow active={wireActive(6)} current={isActive(6)} />
              {block(6)}
            </Box>
          </Box>

          {/* Section label: POWER STAGE → FEEDBACK */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
            <Typography variant="caption" sx={{ color: '#22c55e80', fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: 1 }}>
              FEEDBACK LOOP
            </Typography>
            <Typography variant="caption" sx={{ color: '#b4530980', fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: 1 }}>
              POWER STAGE
            </Typography>
          </Box>

          {/* Row 3: Closed Loop ← FB Div ← Caps ← Inductor (right-to-left) */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flex: 1, minWidth: 0 }} /> {/* spacer col 0 */}
            <Box sx={{ flex: 1, minWidth: 0 }}>{block(11)}</Box>
            <HBackArrow active={wireActive(11)} current={isActive(11)} />
            <Box sx={{ flex: 1, minWidth: 0 }}>{block(10)}</Box>
            <HBackArrow active={wireActive(10)} current={isActive(10)} />
            <Box sx={{ flex: 1, minWidth: 0 }}>{block(8)}</Box>
            <HBackArrow active={wireActive(8)} current={isActive(8)} />
            <Box sx={{ flex: 1, minWidth: 0 }}>{block(7)}</Box>
          </Box>

          {/* CPU Load — the load sits below with arrows from caps */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <VArrow active={wireActive(9)} current={isActive(9)} color="#ef4444" />
              <Box sx={{ width: 130 }}>{block(9)}</Box>
            </Box>
          </Box>
        </Box>

        {/* Right panel: processor state + hook callout + detail */}
        <Box sx={{ width: 230, display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center', pt: 1, flexShrink: 0 }}>
          <ProcessorStateComponent state={processorState} />
          {showHookCallout && activeStep && <HookCallout step={activeStep} isVisible={true} />}
          {activeStep && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Paper elevation={1} sx={{ p: 1.5, borderRadius: 2, bgcolor: '#fffbeb', border: '1px solid #fcd34d', maxWidth: 230 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#92400e', display: 'block', mb: 0.5, fontSize: '0.65rem' }}>
                    Step {activeStep.stepNumber}: {activeStep.component}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#78716c', lineHeight: 1.4, fontSize: '0.6rem' }}>
                    {activeStep.description.slice(0, 160)}{activeStep.description.length > 160 ? '...' : ''}
                  </Typography>
                  {activeStep.timing && (
                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontFamily: 'var(--font-mono)', color: '#b45309', fontSize: '0.55rem' }}>
                      {activeStep.timing}
                    </Typography>
                  )}
                </Paper>
              </motion.div>
            </AnimatePresence>
          )}
        </Box>
      </Box>
    </Box>
  );
};
