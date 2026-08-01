import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, Gift } from 'lucide-react';
import './Toast.css';

const Toast = ({ message, type = 'lock', isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`toast-banner toast-${type}`}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 350 }}
        >
          {type === 'lock' && <Lock size={18} className="toast-icon" />}
          {type === 'chest' && <Gift size={18} className="toast-icon" />}
          {type === 'success' && <Sparkles size={18} className="toast-icon" />}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
