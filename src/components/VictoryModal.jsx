import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Map, ArrowRight } from 'lucide-react';
import './VictoryModal.css';

const VictoryModal = ({ onNext }) => {
  const coins = useGameStore(state => state.coins);
  const stars = useGameStore(state => state.stars);
  const openMap = useGameStore(state => state.openMap);

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
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <h2>Stage Cleared!</h2>
        
        <div className="victory-stars">
          <motion.span initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15, type: "spring" }}>⭐</motion.span>
          <motion.span initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.3, type: "spring" }}>⭐</motion.span>
          <motion.span initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.45, type: "spring" }}>⭐</motion.span>
        </div>

        <div className="victory-rewards">
          <div className="reward">
            <span>🪙</span> +50
          </div>
          <div className="reward">
            <span>⭐</span> +3
          </div>
        </div>

        <div className="victory-actions-stack">
          <motion.button 
            className="btn-primary-victory" 
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Next Level</span>
            <ArrowRight size={20} />
          </motion.button>

          <button className="btn-secondary-map" onClick={openMap}>
            <Map size={18} />
            <span>Adventure Map</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VictoryModal;
