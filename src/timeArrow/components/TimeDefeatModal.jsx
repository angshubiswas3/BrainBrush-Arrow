/**
 * src/timeArrow/components/TimeDefeatModal.jsx
 * Arcade Defeat / Time Over Modal for Time Arrow
 * (Zero dependencies on Brain Arrow)
 */

import React from 'react';
import { motion } from 'framer-motion';
import '../styles/TimeModals.css';

const TimeDefeatModal = ({
  levelNumber,
  score,
  remainingArrows,
  onRestart,
  onMenu
}) => {
  return (
    <div className="time-modal-overlay">
      <motion.div 
        className="time-modal-card time-modal-card-defeat"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 350 }}
      >
        <div style={{ fontSize: '3.5rem', marginBottom: '-6px' }}>⏰</div>
        <h2 className="time-modal-title time-modal-title-defeat">TIME'S UP!</h2>
        <p className="time-modal-subtitle">You ran out of time on Level {levelNumber}</p>

        {/* Summary Stats */}
        <div className="time-modal-stats-grid">
          <div className="time-modal-stat-unit">
            <span className="time-modal-stat-unit-label">Score</span>
            <span className="time-modal-stat-unit-value" style={{ color: '#38bdf8' }}>
              {score.toLocaleString()}
            </span>
          </div>
          <div className="time-modal-stat-unit">
            <span className="time-modal-stat-unit-label">Remaining</span>
            <span className="time-modal-stat-unit-value" style={{ color: '#f87171' }}>
              {remainingArrows} {remainingArrows === 1 ? 'arrow' : 'arrows'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="time-modal-actions">
          <button className="time-modal-btn-primary time-modal-btn-retry" onClick={onRestart}>
            🔄 TRY AGAIN
          </button>
          <button className="time-modal-btn-secondary" onClick={onMenu}>
            ☰ LEVEL SELECT
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(TimeDefeatModal);
