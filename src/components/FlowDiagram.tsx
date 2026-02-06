import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Flow } from '../data/types';
import { StepBox } from './StepBox';
import { Connector } from './Connector';
import { HookCallout } from './HookCallout';
import { ProcessorStateComponent } from './ProcessorState';
import { Controls } from './Controls';
import { SignalBurst } from './SignalBurst';
import { FlowAnimationControls } from '../hooks/useFlowAnimation';

interface FlowDiagramProps {
  flow: Flow;
  controls: FlowAnimationControls;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ flow, controls }) => {
  const {
    currentStep,
    isPlaying,
    speed,
    processorState,
    togglePlay,
    setSpeed,
    stepForward,
    stepBackward,
    reset,
  } = controls;

  // Find the currently active hook point for callout display
  const activeHookStep = currentStep >= 0 && currentStep < flow.steps.length
    ? flow.steps[currentStep]
    : null;
  const showHookCallout = activeHookStep?.isHookPoint ?? false;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
      {/* Flow title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: flow.id === 'kubernetes' ? '#326ce5' : flow.id === 'vrm' ? '#92400e' : '#0865ad',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {flow.title}
      </Typography>

      {/* Controls */}
      <Box sx={{ mb: 2 }}>
        <Controls
          isPlaying={isPlaying}
          speed={speed}
          onTogglePlay={togglePlay}
          onStepForward={stepForward}
          onStepBackward={stepBackward}
          onReset={reset}
          onSetSpeed={setSpeed}
        />
      </Box>

      {/* Main flow area */}
      <Box sx={{
        display: 'flex',
        gap: 4,
        flex: 1,
        width: '100%',
        maxWidth: 900,
        overflow: 'hidden',
      }}>
        {/* Flow steps column */}
        <Box sx={{
          flex: 1,
          overflowY: 'auto',
          pr: 1,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: 2 },
        }}>
          <div style={{ position: 'relative' }}>
            {flow.steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div style={{ position: 'relative' }}>
                  <StepBox
                    step={step}
                    index={i}
                    isActive={i === currentStep}
                    isCompleted={i < currentStep}
                    isVisible={true}
                  />
                  {/* Signal burst on active hook point */}
                  {step.isHookPoint && i === currentStep && (
                    <SignalBurst
                      isActive={true}
                      type={step.hookType === 'phase2' ? 'targeted' : 'broadcast'}
                      color={step.hookType === 'phase2' ? '#22c55e' : '#3b82f6'}
                    />
                  )}
                </div>
                {i < flow.steps.length - 1 && (
                  <Connector
                    isVisible={true}
                    isActive={i === currentStep}
                    index={i}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </Box>

        {/* Right side: Hook callout + Processor state */}
        <Box sx={{
          width: 280,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignItems: 'center',
          pt: 2,
          flexShrink: 0,
        }}>
          <ProcessorStateComponent state={processorState} />

          {showHookCallout && activeHookStep && (
            <HookCallout step={activeHookStep} isVisible={true} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
