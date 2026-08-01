import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, HeartCrack } from 'lucide-react';
import './DefeatModal.css';

const DefeatModal = ({ onRetry, onHome }) => {
  return (
    <div className="defeat-modal-overlay">
      <motion.div 
        className="defeat-card"
        initial={{ scale: 0.7, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <motion.div 
          className="defeat-icon-wrapper"
          animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
        >
          <HeartCrack size={56} color="#ef4444" strokeWidth={2.5} />
        </motion.div>

        <h2>Out of Lives!</h2>
        <p className="defeat-subtitle">
          Blocked arrows cost 1 life. Think ahead before tapping!
        </p>

        <div className="defeat-actions">
          <motion.button 
            className="btn-retry"
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={22} strokeWidth={2.5} />
            <span>Try Again</span>
          </motion.button>

          <button className="btn-home-secondary" onClick={onHome}>
            <Home size={20} strokeWidth={2} />
            <span>Main Menu</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DefeatModal;
