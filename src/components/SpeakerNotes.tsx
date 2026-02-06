import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface SpeakerNotesProps {
  notes: string[];
  expanded: boolean;
  onToggle: () => void;
}

export const SpeakerNotes: React.FC<SpeakerNotesProps> = ({ notes, expanded, onToggle }) => {
  if (!notes || notes.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        pointerEvents: 'auto',
      }}
    >
      {/* Collapsed bar */}
      <Box
        onClick={onToggle}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2.5,
          py: 0.6,
          bgcolor: expanded ? '#f8fafc' : 'rgba(248,250,252,0.9)',
          backdropFilter: expanded ? 'none' : 'blur(8px)',
          cursor: 'pointer',
          borderTop: '1px solid #e2e8f0',
          transition: 'background-color 0.2s',
          '&:hover': {
            bgcolor: '#f1f5f9',
          },
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
        <Typography
          variant="caption"
          sx={{
            color: '#94a3b8',
            fontSize: '0.7rem',
            flex: 1,
            userSelect: 'none',
          }}
        >
          Details
        </Typography>
        <IconButton size="small" sx={{ color: '#94a3b8', p: 0.25 }}>
          {expanded ? <ExpandMoreIcon sx={{ fontSize: 16 }} /> : <ExpandLessIcon sx={{ fontSize: 16 }} />}
        </IconButton>
      </Box>

      {/* Expanded panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <Box
              sx={{
                px: 3,
                py: 1.5,
                bgcolor: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                maxHeight: 160,
                overflowY: 'auto',
                '&::-webkit-scrollbar': { width: 4 },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: 2 },
              }}
            >
              {notes.map((note, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: i < notes.length - 1 ? 0.8 : 0, alignItems: 'flex-start' }}>
                  <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#cbd5e1', mt: '7px', flexShrink: 0 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      fontSize: '0.78rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {note}
                  </Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
