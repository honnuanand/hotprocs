import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PowerIcon from '@mui/icons-material/Power';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import MemoryIcon from '@mui/icons-material/Memory';
import TuneIcon from '@mui/icons-material/Tune';
import LoopIcon from '@mui/icons-material/Loop';
import { vrmFlow } from '../data/vrmFlow';
import { VRMCircuitDiagram } from '../components/VRMCircuitDiagram';
import { useFlowAnimation } from '../hooks/useFlowAnimation';

// Inline SVG icons for electrical components
const InductorIcon = ({ color = '#d97706' }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M2 12H5Q7 12 7 10Q7 8 9 8Q11 8 11 10Q11 12 13 12Q15 12 15 10Q15 8 17 8Q19 8 19 10Q19 12 21 12H22" />
  </svg>
);
const CapacitorIcon = ({ color = '#d97706' }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
    <line x1="12" y1="4" x2="12" y2="9" /><line x1="6" y1="9" x2="18" y2="9" />
    <line x1="6" y1="15" x2="18" y2="15" /><line x1="12" y1="15" x2="12" y2="20" />
  </svg>
);
const MOSFETIcon = ({ color = '#d97706' }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <line x1="4" y1="12" x2="10" y2="12" /><line x1="10" y1="6" x2="10" y2="18" />
    <line x1="14" y1="6" x2="14" y2="18" /><line x1="14" y1="6" x2="20" y2="6" />
    <line x1="14" y1="12" x2="20" y2="12" /><line x1="14" y1="18" x2="20" y2="18" />
    <polygon points="16,12 14,10 14,14" fill={color} />
  </svg>
);
const PWMWaveIcon = ({ color = '#d97706' }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <polyline points="2,16 2,8 8,8 8,16 10,16 10,8 16,8 16,16 18,16 18,8 22,8" />
  </svg>
);
const FBDividerIcon = ({ color = '#22c55e' }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <line x1="12" y1="2" x2="12" y2="7" />
    <rect x="8" y="7" width="8" height="4" rx="1" />
    <line x1="12" y1="11" x2="12" y2="13" />
    <rect x="8" y="13" width="8" height="4" rx="1" />
    <line x1="12" y1="17" x2="12" y2="22" />
  </svg>
);

// Circuit layout: a block with icon + label
const CircuitBlock: React.FC<{
  icon: React.ReactNode;
  label: string;
  color: string;
  borderColor: string;
  delay: number;
  isHook?: boolean;
  hookColor?: string;
}> = ({ icon, label, color, borderColor, delay, isHook, hookColor }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
  >
    <Paper elevation={2} sx={{
      p: 1,
      px: 1.5,
      borderRadius: 2,
      bgcolor: color,
      border: `2px solid ${isHook ? hookColor || borderColor : borderColor}`,
      textAlign: 'center',
      width: 100,
      height: 64,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', color: isHook ? hookColor : borderColor }}>
        {icon}
      </Box>
      <Typography variant="caption" sx={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        color: '#78716c',
        fontSize: '0.55rem',
        lineHeight: 1.2,
        mt: 0.3,
      }}>
        {label}
      </Typography>
    </Paper>
  </motion.div>
);

// Animated SVG wire with arrowhead
const AnimWire: React.FC<{
  d: string;
  delay: number;
  color?: string;
  dashed?: boolean;
}> = ({ d, delay, color = '#d4a017', dashed }) => (
  <motion.path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeDasharray={dashed ? '5 3' : 'none'}
    markerEnd={color === '#22c55e' ? 'url(#introArrowFB)' : 'url(#introArrow)'}
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ delay, duration: 0.5, ease: 'easeInOut' }}
  />
);

export const VRMIntroSlide: React.FC = () => {
  // Layout:
  //
  //   [12V] → [SVID] → [PWM Ctrl] ——→ [Driver] → [Hi/Lo FET]
  //                        ↑                            |
  //                      [EA]                      [Inductor]
  //                        ↑                            |
  //                     [Loop] ← [FB Div] ← [Caps] ← [CPU Load]
  //
  // Grid: 5 cols x 3 rows, 100px cells, blocks 80x64

  const CW = 130; // cell width
  const CH = 90;  // cell height
  const BW = 100; // block width
  const BH = 64;  // block height

  // Block positions (col, row) → pixel left/top
  const pos = (col: number, row: number) => ({
    left: col * CW + (CW - BW) / 2,
    top: row * CH + (CH - BH) / 2,
  });

  // Center of a block at (col, row)
  const cx = (col: number) => col * CW + CW / 2;
  const cy = (row: number) => row * CH + CH / 2;

  // Edge points for wires
  const right = (col: number, row: number) => ({ x: col * CW + (CW + BW) / 2, y: cy(row) });
  const left = (col: number, row: number) => ({ x: col * CW + (CW - BW) / 2, y: cy(row) });
  const bottom = (col: number, row: number) => ({ x: cx(col), y: row * CH + (CH + BH) / 2 });
  const top = (col: number, row: number) => ({ x: cx(col), y: row * CH + (CH - BH) / 2 });

  const svgW = 5 * CW;
  const svgH = 3 * CH;

  return (
    <Box sx={{ textAlign: 'center', maxWidth: 950 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#92400e', mb: 0.5 }}>
          Hardware: VRM Flow
        </Typography>
        <Typography variant="body1" sx={{ color: '#475569', mb: 2, fontWeight: 400 }}>
          Voltage Regulator Module — Multi-Phase Buck Converter
        </Typography>
      </motion.div>

      {/* Circuit diagram */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Box sx={{ position: 'relative', width: svgW, height: svgH, mx: 'auto', mb: 3 }}>
          {/* SVG wires */}
          <svg width={svgW} height={svgH} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <defs>
              <marker id="introArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#d4a017" />
              </marker>
              <marker id="introArrowFB" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
              </marker>
            </defs>

            {/* Row 0: 12V → SVID → PWM → Driver → FETs */}
            <AnimWire d={`M${right(0,0).x} ${right(0,0).y} L${left(1,0).x} ${left(1,0).y}`} delay={0.5} />
            <AnimWire d={`M${right(1,0).x} ${right(1,0).y} L${left(2,0).x} ${left(2,0).y}`} delay={0.65} />
            <AnimWire d={`M${right(2,0).x} ${right(2,0).y} L${left(3,0).x} ${left(3,0).y}`} delay={0.8} />
            <AnimWire d={`M${right(3,0).x} ${right(3,0).y} L${left(4,0).x} ${left(4,0).y}`} delay={0.95} />

            {/* Right column: FETs → Inductor → CPU Load (going down) */}
            <AnimWire d={`M${bottom(4,0).x} ${bottom(4,0).y} L${top(4,1).x} ${top(4,1).y}`} delay={1.1} />
            <AnimWire d={`M${bottom(4,1).x} ${bottom(4,1).y} L${top(4,2).x} ${top(4,2).y}`} delay={1.25} />

            {/* Bottom row: CPU Load → Caps → FB Div (going left) */}
            <AnimWire d={`M${left(4,2).x} ${left(4,2).y} L${right(3,2).x} ${right(3,2).y}`} delay={1.4} color="#22c55e" />
            <AnimWire d={`M${left(3,2).x} ${left(3,2).y} L${right(2,2).x} ${right(2,2).y}`} delay={1.55} color="#22c55e" />

            {/* FB return: FB Div → Loop → EA → PWM (going up-left) */}
            <AnimWire d={`M${top(2,2).x} ${top(2,2).y} L${bottom(2,1).x} ${bottom(2,1).y}`} delay={1.7} color="#22c55e" />
            <AnimWire d={`M${top(2,1).x} ${top(2,1).y} L${bottom(2,0).x} ${bottom(2,0).y}`} delay={1.85} color="#22c55e" dashed />
          </svg>

          {/* Row 0: Control + forward path */}
          <Box sx={{ position: 'absolute', ...pos(0, 0) }}>
            <CircuitBlock icon={<PowerIcon sx={{ fontSize: 22 }} />} label="12V Input" color="#fef3c7" borderColor="#f59e0b" delay={0.4} />
          </Box>
          <Box sx={{ position: 'absolute', ...pos(1, 0) }}>
            <CircuitBlock icon={<SettingsInputSvideoIcon sx={{ fontSize: 22 }} />} label="Serial Voltage ID" color="#dbeafe" borderColor="#3b82f6" delay={0.5} isHook hookColor="#3b82f6" />
          </Box>
          <Box sx={{ position: 'absolute', ...pos(2, 0) }}>
            <CircuitBlock icon={<PWMWaveIcon />} label="PWM Controller" color="#fef3c7" borderColor="#f59e0b" delay={0.6} />
          </Box>
          <Box sx={{ position: 'absolute', ...pos(3, 0) }}>
            <CircuitBlock icon={<DeveloperBoardIcon sx={{ fontSize: 22 }} />} label="Gate Driver" color="#fef3c7" borderColor="#f59e0b" delay={0.7} />
          </Box>
          <Box sx={{ position: 'absolute', ...pos(4, 0) }}>
            <CircuitBlock icon={<MOSFETIcon />} label="MOSFETs" color="#fef3c7" borderColor="#f59e0b" delay={0.8} />
          </Box>

          {/* Right column: power stage */}
          <Box sx={{ position: 'absolute', ...pos(4, 1) }}>
            <CircuitBlock icon={<InductorIcon />} label="Inductor" color="#fef3c7" borderColor="#f59e0b" delay={1.0} />
          </Box>
          <Box sx={{ position: 'absolute', ...pos(4, 2) }}>
            <CircuitBlock icon={<MemoryIcon sx={{ fontSize: 22 }} />} label="CPU Load" color="#fef2f2" borderColor="#ef4444" delay={1.15} isHook hookColor="#ef4444" />
          </Box>

          {/* Bottom row: output + feedback return */}
          <Box sx={{ position: 'absolute', ...pos(3, 2) }}>
            <CircuitBlock icon={<CapacitorIcon color="#22c55e" />} label="Capacitors" color="#f0fdf4" borderColor="#22c55e" delay={1.3} />
          </Box>
          <Box sx={{ position: 'absolute', ...pos(2, 2) }}>
            <CircuitBlock icon={<FBDividerIcon />} label="Feedback Divider" color="#f0fdf4" borderColor="#22c55e" delay={1.45} />
          </Box>

          {/* Middle row: feedback components */}
          <Box sx={{ position: 'absolute', ...pos(2, 1) }}>
            <CircuitBlock icon={<TuneIcon sx={{ fontSize: 22 }} />} label="Error Amplifier" color="#f0fdf4" borderColor="#22c55e" delay={1.6} />
          </Box>

          {/* Section labels */}
          <Typography variant="caption" sx={{
            position: 'absolute', top: -16, left: CW * 1.5,
            color: '#b45309', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: 1,
          }}>
            CONTROL PATH
          </Typography>
          <Typography variant="caption" sx={{
            position: 'absolute', top: CH * 0.3, right: -60,
            color: '#b45309', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: 1,
            transform: 'rotate(90deg)', transformOrigin: 'center center',
          }}>
            POWER STAGE
          </Typography>
          <Typography variant="caption" sx={{
            position: 'absolute', top: CH * 3 + 2, left: CW * 2,
            color: '#16a34a', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: 1,
          }}>
            FEEDBACK LOOP
          </Typography>
        </Box>
      </motion.div>

      {/* Legend + Specs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 1, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Abbreviation legend */}
          <Box sx={{ textAlign: 'left', p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', fontSize: '0.6rem', display: 'block', mb: 0.5, letterSpacing: 0.5 }}>
              LEGEND
            </Typography>
            {[
              { abbr: 'SVID', full: 'Serial Voltage Identification' },
              { abbr: 'PWM', full: 'Pulse Width Modulation' },
              { abbr: 'MOSFET', full: 'Metal-Oxide-Semiconductor Field-Effect Transistor' },
              { abbr: 'TDP', full: 'Thermal Design Power' },
              { abbr: 'TDC', full: 'Thermal Design Current' },
            ].map(item => (
              <Typography key={item.abbr} variant="caption" sx={{ color: '#78716c', fontSize: '0.55rem', display: 'block', lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>
                <strong style={{ color: '#475569' }}>{item.abbr}</strong> — {item.full}
              </Typography>
            ))}
          </Box>

          {/* Specs */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {[
              { label: 'Vin', value: '12V', color: '#3b82f6' },
              { label: 'Vout', value: '0.7–1.1V', color: '#22c55e' },
              { label: 'I_DC', value: '1000A', color: '#f97316' },
              { label: 'TDP', value: '1750W', color: '#ef4444' },
            ].map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.1 + i * 0.1, duration: 0.3 }}
              >
                <Box sx={{
                  textAlign: 'center', p: 1, px: 2,
                  bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0',
                }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>
                    {spec.label}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: spec.color, fontFamily: 'var(--font-mono)', lineHeight: 1.2 }}>
                    {spec.value}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export const VRMFlowSlide: React.FC = () => {
  const controls = useFlowAnimation(vrmFlow.steps);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <VRMCircuitDiagram flow={vrmFlow} controls={controls} />
    </Box>
  );
};
