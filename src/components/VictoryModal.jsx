import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import './VictoryModal.css';

const VictoryModal = ({ onNext }) => {
  const coins = useGameStore(state => state.coins);
  const stars = useGameStore(state => state.stars);

  return (
    <motion.div 
      className="victory-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="victory-modal"
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.6 }}
      >
        <h2>Level Cleared!</h2>
        
        <div className="victory-stars">
          <motion.span initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: "spring" }}>⭐</motion.span>
          <motion.span initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.4, type: "spring" }}>⭐</motion.span>
          <motion.span initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.6, type: "spring" }}>⭐</motion.span>
        </div>

        <div className="victory-rewards">
          <div className="reward">
            <span>🪙</span> +50
          </div>
          <div className="reward">
            <span>⭐</span> +3
          </div>
        </div>

        <motion.button 
          className="btn-primary" 
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next Level
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default VictoryModal;
