import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import { SpeakerNotes } from './SpeakerNotes';

interface SlideProps {
  children: React.ReactNode;
  isActive: boolean;
  direction?: number;
  notes?: string[];
  detailsExpanded: boolean;
  onToggleDetails: () => void;
}

export const Slide: React.FC<SlideProps> = ({ children, isActive, direction = 1, notes, detailsExpanded, onToggleDetails }) => {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      {isActive && (
        <motion.div
          key="slide"
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 60 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 6,
              pb: notes && notes.length > 0 ? 4 : 6,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {children}
            {notes && notes.length > 0 && (
              <SpeakerNotes notes={notes} expanded={detailsExpanded} onToggle={onToggleDetails} />
            )}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
