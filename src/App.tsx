import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LockIcon from '@mui/icons-material/Lock';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Slide } from './components/Slide';
import { ProgressBar } from './components/ProgressBar';
import { useSlideNavigation } from './hooks/useSlideNavigation';
import { useKeyboardControls } from './hooks/useKeyboardControls';

import { TitleSlide } from './slides/TitleSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { ArchitectureOverview } from './slides/ArchitectureOverview';
import { KubernetesIntroSlide, KubernetesFlowSlide } from './slides/KubernetesFlowSlide';
import { K8sHookMutatingSlide, K8sHookReserveSlide } from './slides/KubernetesHookSlides';
import { KnativeIntroSlide, KnativeFlowSlide } from './slides/KnativeFlowSlide';
import { KnativeHookEarlySlide, KnativeHookLateSlide } from './slides/KnativeHookSlides';
import { TimingComparisonSlide } from './slides/TimingComparisonSlide';
import { SignalDeliverySlide } from './slides/SignalDeliverySlide';
import { SummarySlide } from './slides/SummarySlide';
import { HardwareBridgeSlide } from './slides/HardwareBridgeSlide';
import { VRMIntroSlide, VRMFlowSlide } from './slides/VRMFlowSlide';
import { VRMHookSVIDSlide, VRMHookLoadSlide } from './slides/VRMHookSlides';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    primary: {
      main: '#3b82f6',
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
});

const slides = [
  {
    id: 'title',
    label: 'Title',
    component: TitleSlide,
    notes: [
      'Cold start latency remains one of the most significant challenges in cloud-native computing. Processors sit idle until workloads arrive, adding seconds to request latency.',
      'This presentation explores a pre-emptive approach: delivering warming signals to processors before workloads are scheduled, using hook points in the Kubernetes and Knative request lifecycles.',
      'The analysis spans the full stack — from software orchestration layers down to the hardware voltage regulation that physically delivers power to the processor die.',
    ],
  },
  {
    id: 'problem',
    label: 'Problem',
    component: ProblemSlide,
    notes: [
      'Three distinct failure modes emerge in current architectures: idle processors at request arrival, signals that arrive too late in the scheduling pipeline, and unused time between pod creation and container initialization.',
      'Cold start latency is the dominant contributor to tail latency in scale-from-zero scenarios, directly impacting end-user experience.',
      'The interval between pod request and container readiness spans hundreds of milliseconds — sufficient time for cache pre-warming, JIT compilation, and connection pool initialization if signaled early enough.',
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    component: ArchitectureOverview,
    notes: [
      'The two-phase architecture exploits two distinct points in the scheduling lifecycle. Phase 1 fires when the workload identity is known but node assignment is not yet determined.',
      'Phase 1 operates as a broadcast — all candidate nodes receive the signal. This trades some redundant work for maximum lead time.',
      'Phase 2 fires after node selection, enabling a directed signal to the exact target node with full pod and node context.',
      'The fundamental trade-off: Phase 1 provides breadth (early, imprecise), Phase 2 provides depth (later, exact). Combined, they maximize the available warming window.',
    ],
  },
  {
    id: 'k8s-intro',
    label: 'K8s Intro',
    component: KubernetesIntroSlide,
    notes: [
      'The standard Kubernetes pod creation pipeline consists of 10 steps from API request to running container.',
      'Two natural hook points exist within this pipeline: the Mutating Admission Webhook at step 3, and the Scheduler Reserve Plugin at step 8.',
      'Approximately 70ms elapses between these two hook points — this interval defines the K8s warming window.',
    ],
  },
  {
    id: 'k8s-flow',
    label: 'K8s Flow',
    component: KubernetesFlowSlide,
    notes: [
      'The flow visualization tracks processor state progression from cold through warming to hot across all 10 pipeline steps.',
      'Steps 1-2 handle authentication and authorization at the API server, completing in approximately 2ms.',
      'Step 3 (Mutating Webhook) serves as the Phase 1 hook point, firing at ~8ms with pod identity available for workload prediction.',
      'Steps 4-7 encompass validation, etcd persistence, and scheduler node selection via filtering and scoring algorithms.',
      'Step 8 (Reserve Plugin) serves as the Phase 2 hook point at ~76ms, when the target node is determined and resources are reserved.',
      'Steps 9-10 complete the binding and initiate container startup — by this point, pre-warming should already be in progress.',
    ],
  },
  {
    id: 'k8s-hook-mutating',
    label: 'Mutating Webhook',
    component: K8sHookMutatingSlide,
    notes: [
      'The Mutating Admission Webhook represents the earliest point in the K8s pipeline where pod identity is accessible.',
      'Available metadata at this stage includes pod name, namespace, labels, annotations, and container images — sufficient to predict workload characteristics.',
      'The signal must be broadcast since the scheduler has not yet executed; the target node remains unknown.',
      'A webhook server intercepts CREATE pod requests, extracts identity metadata, and publishes Phase 1 warming events to all candidate nodes.',
    ],
  },
  {
    id: 'k8s-hook-reserve',
    label: 'Reserve Plugin',
    component: K8sHookReserveSlide,
    notes: [
      'The Reserve extension point executes after the scheduler completes filtering and scoring, once the optimal node has been selected.',
      'At this stage, both pod identity and target node are resolved, enabling precise, directed warming signals.',
      'The Reserve plugin atomically locks resources on the selected node for the incoming pod, preceding the final bind operation.',
      'Implementation requires a scheduler plugin conforming to the Reserve extension point interface, emitting Phase 2 signals with full node context.',
    ],
  },
  {
    id: 'kn-intro',
    label: 'Knative Intro',
    component: KnativeIntroSlide,
    notes: [
      'The Knative scale-from-zero pipeline comprises 12 steps from initial HTTP request to served response.',
      'Four hook points are available: ext_authz filter, ContextHandler, KPA Scaler, and Scheduler Reserve.',
      'In the Knative path, the incoming request is queued in the Activator while the system scales up — latency directly impacts the waiting client.',
    ],
  },
  {
    id: 'kn-flow',
    label: 'Knative Flow',
    component: KnativeFlowSlide,
    notes: [
      'The Knative flow traces a scale-from-zero request through all 12 stages of the serving pipeline.',
      'The ext_authz filter at step 2 fires at ~2ms, representing the earliest available hook point in the Knative path.',
      'The ContextHandler at step 4 resolves the full Revision configuration at ~7ms, providing container and scaling metadata.',
      'The autoscaler reconciliation cycle at step 8 introduces approximately 100ms of latency — the largest single time gap in the pipeline.',
      'KPA scale at step 9 triggers pod creation, transitioning into the standard K8s scheduling path.',
      'Total cold start latency from request to response ranges from 700ms to over 1 second. Pre-warming reclaims a portion of this interval.',
    ],
  },
  {
    id: 'kn-hook-early',
    label: 'Early Hooks',
    component: KnativeHookEarlySlide,
    notes: [
      'The ext_authz filter operates at the Envoy proxy layer, intercepting requests before they reach the Knative Activator — the earliest possible interception point.',
      'At this stage, the Revision ID is extracted from the Host header. This identifier alone is sufficient to initiate warming for the expected workload.',
      'The ContextHandler at step 4 resolves the full Revision object, exposing replica count, container configuration, and deployment name.',
      'Both hooks operate in Phase 1 scope: the workload identity is known, but the hosting node has not been determined.',
    ],
  },
  {
    id: 'kn-hook-late',
    label: 'Late Hooks',
    component: KnativeHookLateSlide,
    notes: [
      'The KPA Reconciler at step 9 patches the Deployment to scale from 0 to N replicas, initiating the K8s pod creation pipeline.',
      'This functions as a Late Phase 1 hook: the deployment identity and desired replica count are known, but node assignment is pending.',
      'The Scheduler Reserve at step 10 provides the Phase 2 signal: pod-to-node assignment is finalized.',
      'The total interval from ext_authz (2ms) to Reserve (~200ms) provides approximately 200ms of available pre-warming lead time.',
    ],
  },
  {
    id: 'timing',
    label: 'Timing',
    component: TimingComparisonSlide,
    notes: [
      'The timeline comparison illustrates hook point firing times relative to total lifecycle duration.',
      'In Kubernetes: Phase 1 fires at ~8ms, Phase 2 at ~76ms, yielding a 68ms warming window before container start at ~500ms+.',
      'In Knative: the earliest hook fires at ~2ms, Phase 2 at ~200ms, yielding a 198ms warming window within a 700ms-1s+ total lifecycle.',
      'Hook points consistently fire within the first 10-20% of the total timeline. The remaining 80-90% is consumed by container initialization and startup.',
    ],
  },
  {
    id: 'signal-delivery',
    label: 'Signals',
    component: SignalDeliverySlide,
    notes: [
      'Two complementary delivery mechanisms are employed: Phase 1 broadcast and Phase 2 targeted signaling.',
      'Broadcast delivery reaches all candidate nodes simultaneously. Redundant warming on non-selected nodes is the cost of maximum lead time.',
      'Targeted delivery reaches only the selected node. Warming effort is precise but available lead time is reduced since scheduling has completed.',
      'Phase 1 warming typically covers container image pre-loading and CPU cache warming. Phase 2 enables precise memory allocation and resource reservation.',
    ],
  },
  {
    id: 'summary',
    label: 'Summary',
    component: SummarySlide,
    notes: [
      'Four implementation priorities: deploy a mutating admission webhook, build a scheduler reserve plugin, integrate Knative ext_authz hooks, and instrument lead time measurements.',
      'The two-phase pattern is platform-agnostic — applicable across Kubernetes, Knative, and other orchestration frameworks.',
      'The software layer determines when warming occurs. The hardware layer — specifically the VRM — determines how power is physically delivered to the processor die.',
    ],
  },
  {
    id: 'hw-bridge',
    label: 'Hardware Bridge',
    component: HardwareBridgeSlide,
    notes: [
      'The transition from software to hardware addresses the physical mechanism behind processor warming.',
      'The processor die operates as the electrical load, demanding 0.7-1.1V at currents up to 1000A — an extreme current density requirement.',
      'The Voltage Regulator Module (VRM) performs the DC-DC conversion from the 12V PSU rail down to the sub-1V levels required by the processor.',
      'Software warming signals determine timing. The VRM circuit determines the physical power delivery path to the die.',
    ],
  },
  {
    id: 'vrm-intro',
    label: 'VRM Intro',
    component: VRMIntroSlide,
    notes: [
      'The VRM circuit topology implements a multi-phase synchronous buck converter.',
      'The forward power path flows left-to-right: 12V input through the SVID interface, PWM controller, gate driver, and MOSFET power stage.',
      'Power is delivered downward through the output inductor to the CPU load.',
      'The feedback loop returns along the bottom path: output capacitors provide voltage smoothing, the resistive divider samples Vout, and the error amplifier adjusts PWM duty cycle to maintain regulation.',
      'Operating specifications: 12V to 0.7-1.1V conversion at 1000A continuous current draw. Peak thermal design power (TDP) rated at 1750W.',
    ],
  },
  {
    id: 'vrm-flow',
    label: 'VRM Flow',
    component: VRMFlowSlide,
    notes: [
      'The VRM flow traces power delivery from the 12V input rail through each conversion stage to the processor load.',
      'Step 2 (SVID) functions as the Phase 1 analog: the CPU communicates its required operating voltage to the VRM controller before power delivery begins.',
      'Steps 3-9 comprise the power conversion chain: PWM signal generation, gate drive amplification, high-frequency MOSFET switching, inductor-based ripple filtering, and capacitive output smoothing.',
      'Step 10 (CPU Load) represents the Phase 2 analog: the load draws current and the closed-loop feedback regulation engages.',
      'Steps 11-12 complete the control loop: the feedback divider samples output voltage and the error amplifier corrects for any deviation from the target.',
    ],
  },
  {
    id: 'vrm-hook-svid',
    label: 'SVID Hook',
    component: VRMHookSVIDSlide,
    notes: [
      'SVID (Serial Voltage Identification) is the serial bus protocol through which the CPU requests its target operating voltage from the VRM controller.',
      'This represents Phase 1 in the hardware domain: the VRM has received the voltage target but has not yet begun power delivery.',
      'Voltage slew rate requirements are on the order of microseconds. The duty cycle formula D = Vout/Vin illustrates the conversion ratio: 0.75V/12V yields only 6.25% on-time per switching cycle.',
      'Dynamic voltage scaling is driven by P-state and C-state transitions. Turbo boost operation demands both elevated voltage and increased current capacity.',
    ],
  },
  {
    id: 'vrm-hook-load',
    label: 'Load Regulation',
    component: VRMHookLoadSlide,
    notes: [
      'Load regulation represents Phase 2: the closed-loop feedback system actively maintains output voltage stability under varying load conditions.',
      'The error amplifier (differential amplifier) continuously compares the sampled output voltage against the reference. Output voltage droop triggers an immediate increase in duty cycle to restore regulation.',
      'Steady-state power delivery operates at TDC = 700W (continuous). Transient peak power during turbo operation reaches TDP = 1750W.',
      'Conduction losses follow P_loss = I²R — losses scale quadratically with current. At 1000A, even milliohm-level parasitic resistance produces significant power dissipation.',
      'Multi-phase interleaving across 12-16+ phases in modern VRM designs reduces output voltage ripple by a factor of N and distributes thermal load across the PCB.',
    ],
  },
];

const PASSCODE = 'hotprocs2026';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { currentSlide, nextSlide, prevSlide, totalSlides } = useSlideNavigation(slides.length);
  const [direction, setDirection] = useState(1);
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const handleLogin = () => {
    if (password === PASSCODE) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleNext = () => {
    setDirection(1);
    nextSlide();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevSlide();
  };

  useKeyboardControls({
    onNext: handleNext,
    onPrev: handlePrev,
  });

  if (!authenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f8fafc',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 5,
              borderRadius: 3,
              textAlign: 'center',
              maxWidth: 380,
              width: '100%',
            }}
          >
            <LockIcon sx={{ fontSize: 40, color: '#94a3b8', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
              Enter Passcode
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
              This presentation is password-protected.
            </Typography>
            <TextField
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
              placeholder="Passcode"
              fullWidth
              size="small"
              error={error}
              helperText={error ? 'Incorrect passcode' : ' '}
              autoFocus
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleLogin}
              fullWidth
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Enter
            </Button>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#f8fafc',
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        {/* Main slide area */}
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {slides.map((slide, index) => (
            <Slide key={slide.id} isActive={index === currentSlide} direction={direction} notes={slide.notes} detailsExpanded={detailsExpanded} onToggleDetails={() => setDetailsExpanded(prev => !prev)}>
              <slide.component />
            </Slide>
          ))}
        </Box>

        {/* Bottom bar: navigation + progress */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 1.5,
            bgcolor: 'white',
            borderTop: '1px solid #e2e8f0',
            gap: 2,
          }}
        >
          {/* Left: slide label */}
          <Typography
            variant="caption"
            sx={{
              color: '#94a3b8',
              fontFamily: 'var(--font-mono)',
              minWidth: 120,
              fontSize: '0.7rem',
            }}
          >
            {slides[currentSlide].label}
          </Typography>

          {/* Center: progress bar */}
          <Box sx={{ flex: 1, maxWidth: 500 }}>
            <ProgressBar current={currentSlide} total={totalSlides} />
          </Box>

          {/* Right: nav buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handlePrev}
              disabled={currentSlide === 0}
              size="small"
              sx={{ color: '#475569' }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              disabled={currentSlide === totalSlides - 1}
              size="small"
              sx={{ color: '#475569' }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
