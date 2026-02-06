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
  { id: 'title', label: 'Title', component: TitleSlide },
  { id: 'problem', label: 'Problem', component: ProblemSlide },
  { id: 'architecture', label: 'Architecture', component: ArchitectureOverview },
  { id: 'k8s-intro', label: 'K8s Intro', component: KubernetesIntroSlide },
  { id: 'k8s-flow', label: 'K8s Flow', component: KubernetesFlowSlide },
  { id: 'k8s-hook-mutating', label: 'Mutating Webhook', component: K8sHookMutatingSlide },
  { id: 'k8s-hook-reserve', label: 'Reserve Plugin', component: K8sHookReserveSlide },
  { id: 'kn-intro', label: 'Knative Intro', component: KnativeIntroSlide },
  { id: 'kn-flow', label: 'Knative Flow', component: KnativeFlowSlide },
  { id: 'kn-hook-early', label: 'Early Hooks', component: KnativeHookEarlySlide },
  { id: 'kn-hook-late', label: 'Late Hooks', component: KnativeHookLateSlide },
  { id: 'timing', label: 'Timing', component: TimingComparisonSlide },
  { id: 'signal-delivery', label: 'Signals', component: SignalDeliverySlide },
  { id: 'summary', label: 'Summary', component: SummarySlide },
];

const PASSCODE = 'hotprocs2026';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { currentSlide, nextSlide, prevSlide, totalSlides } = useSlideNavigation(slides.length);
  const [direction, setDirection] = useState(1);

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
            <Slide key={slide.id} isActive={index === currentSlide} direction={direction}>
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
