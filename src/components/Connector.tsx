import React from 'react';
import { motion } from 'framer-motion';

interface ConnectorProps {
  isVisible: boolean;
  isActive: boolean;
  index: number;
}

export const Connector: React.FC<ConnectorProps> = ({ isVisible, isActive, index }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: index * 0.08 + 0.04, duration: 0.2 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: 24,
        transformOrigin: 'top',
      }}
    >
      <svg width="2" height="24" viewBox="0 0 2 24">
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="24"
          stroke={isActive ? '#3b82f6' : '#cbd5e1'}
          strokeWidth="2"
          strokeDasharray="24"
          initial={{ strokeDashoffset: 24 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ delay: index * 0.08 + 0.04, duration: 0.3 }}
        />
      </svg>
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#3b82f6',
            boxShadow: '0 0 8px #3b82f680',
          }}
        />
      )}
    </motion.div>
  );
};
