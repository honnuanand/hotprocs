import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SignalBurstProps {
  isActive: boolean;
  type: 'broadcast' | 'targeted';
  color?: string;
}

export const SignalBurst: React.FC<SignalBurstProps> = ({ isActive, type, color }) => {
  const burstColor = color || (type === 'broadcast' ? '#3b82f6' : '#22c55e');

  return (
    <AnimatePresence>
      {isActive && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
          {type === 'broadcast' ? (
            // Radiating circles for broadcast
            [0, 1, 2].map(i => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  ease: 'easeOut',
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: `2px solid ${burstColor}`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))
          ) : (
            // Directed beam for targeted
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 0.5] }}
              transition={{ duration: 0.8, ease: 'easeOut', repeat: Infinity, repeatDelay: 1 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 60,
                height: 3,
                background: `linear-gradient(90deg, ${burstColor}, transparent)`,
                transformOrigin: 'left center',
              }}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
};
