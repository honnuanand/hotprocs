import React from 'react';
import { motion } from 'framer-motion';

interface DataPacketProps {
  currentStep: number;
  totalSteps: number;
  isHookPoint: boolean;
}

export const DataPacket: React.FC<DataPacketProps> = ({ currentStep, totalSteps, isHookPoint }) => {
  if (currentStep < 0) return null;

  const progress = currentStep / Math.max(totalSteps - 1, 1);

  return (
    <motion.div
      animate={{
        top: `${progress * 100}%`,
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        left: -16,
        width: 12,
        height: 12,
        borderRadius: '50%',
        zIndex: 10,
      }}
    >
      <motion.div
        animate={{
          backgroundColor: isHookPoint ? '#f59e0b' : '#3b82f6',
          boxShadow: isHookPoint
            ? '0 0 16px #f59e0b80, 0 0 32px #f59e0b40'
            : '0 0 12px #3b82f680',
          scale: isHookPoint ? [1, 1.4, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
        }}
      />
    </motion.div>
  );
};
