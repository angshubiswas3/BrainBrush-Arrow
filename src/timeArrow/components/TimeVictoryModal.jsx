/**
 * src/timeArrow/components/TimeVictoryModal.jsx
 * Arcade Victory Modal for Time Arrow
 * (Zero dependencies on Brain Arrow)
 */

import React from 'react';
import { motion } from 'framer-motion';
import '../styles/TimeModals.css';

const TimeVictoryModal = ({
  levelNumber,
  score,
  timeRemaining,
  maxCombo,
  stars = 3,
  onNextLevel,
  onRestart,
  onMenu
}) => {
  return (
    <div className="time-modal-overlay">
      <motion.div 
        className="time-modal-card"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 350 }}
      >
        <div style={{ fontSize: '3.5rem', marginBottom: '-6px' }}>🏆</div>
        <h2 className="time-modal-title time-modal-title-victory">LEVEL CLEARED!</h2>
        <p className="time-modal-subtitle">Level {levelNumber} Completed</p>

        {/* Stars */}
        <div className="time-stars-row">
          {[1, 2, 3].map((starIdx) => (
            <span 
              key={starIdx} 
              className="time-star-item"
              style={{ 
                animationDelay: `${starIdx * 0.15}s`,
                opacity: starIdx <= stars ? 1 : 0.25
              }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="time-modal-stats-grid">
          <div className="time-modal-stat-unit">
            <span className="time-modal-stat-unit-label">Final Score</span>
            <span className="time-modal-stat-unit-value" style={{ color: '#38bdf8' }}>
              {score.toLocaleString()}
            </span>
          </div>
          <div className="time-modal-stat-unit">
            <span className="time-modal-stat-unit-label">Time Left</span>
            <span className="time-modal-stat-unit-value" style={{ color: '#4ade80' }}>
              {timeRemaining}s
            </span>
          </div>
          <div className="time-modal-stat-unit">
            <span className="time-modal-stat-unit-label">Max Combo</span>
            <span className="time-modal-stat-unit-value" style={{ color: '#facc15' }}>
              {maxCombo > 1 ? `${maxCombo}x` : '1x'}
            </span>
          </div>
          <div className="time-modal-stat-unit">
            <span className="time-modal-stat-unit-label">Time Bonus</span>
            <span className="time-modal-stat-unit-value" style={{ color: '#ec4899' }}>
              +{(timeRemaining * 40).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="time-modal-actions">
          <button className="time-modal-btn-primary" onClick={onNextLevel}>
            NEXT LEVEL ▶
          </button>
          <button className="time-modal-btn-secondary" onClick={onRestart}>
            🔄 REPLAY LEVEL
          </button>
          <button className="time-modal-btn-secondary" onClick={onMenu}>
            ☰ LEVEL SELECT
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(TimeVictoryModal);
