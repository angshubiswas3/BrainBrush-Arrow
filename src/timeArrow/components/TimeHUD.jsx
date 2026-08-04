/**
 * src/timeArrow/components/TimeHUD.jsx
 * Arcade Head-Up Display for Time Arrow
 * (Zero dependencies on Brain Arrow)
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/TimeHUD.css';

const TimeHUD = ({
  levelNumber,
  difficulty,
  timeRemaining,
  maxTime,
  score,
  combo,
  bonusText,
  onBack,
  onRestart,
  soundEnabled,
  onToggleSound
}) => {
  const isWarning = timeRemaining <= 8;

  return (
    <div className="time-hud-container">
      {/* Top Header Bar */}
      <div className="time-hud-topbar">
        <button 
          className="time-hud-btn" 
          onClick={onBack}
          aria-label="Back to level select"
          title="Level Select"
        >
          ←
        </button>

        <div className="time-hud-title-badge">
          <span className="time-hud-level-num">Level {levelNumber}</span>
          <span className="time-hud-difficulty-tag">{difficulty || 'Time Attack'}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="time-hud-btn" 
            onClick={onToggleSound}
            aria-label="Toggle sound"
            title="Sound"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button 
            className="time-hud-btn" 
            onClick={onRestart}
            aria-label="Restart level"
            title="Restart"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Stats & Countdown Strip */}
      <div className="time-hud-stats-strip">
        <div className="time-hud-stat-box">
          <span className="time-hud-stat-label">Score</span>
          <span className="time-hud-stat-value">{score.toLocaleString()}</span>
        </div>

        {/* Center Countdown Pill */}
        <div className="time-hud-timer-pill">
          <AnimatePresence>
            {bonusText && (
              <motion.div 
                className="time-bonus-bubble"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -8, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
              >
                {bonusText}
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`time-hud-timer-badge ${isWarning ? 'time-hud-timer-warning' : ''}`}>
            <span>⏱️</span>
            <span>{timeRemaining}s</span>
          </div>
        </div>

        <div className="time-hud-stat-box">
          <span className="time-hud-stat-label">Combo</span>
          <span className="time-hud-stat-value" style={{ color: combo > 1 ? '#facc15' : '#f1f5f9' }}>
            {combo > 1 ? `${combo}x` : '-'}
          </span>
        </div>
      </div>

      {/* Combo Multiplier Alert */}
      {combo >= 2 && (
        <motion.div 
          className="time-combo-banner"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <span>🔥</span>
          <span>{combo >= 4 ? `MEGA COMBO ${combo}X!` : `SPEED COMBO ${combo}X!`}</span>
        </motion.div>
      )}
    </div>
  );
};

export default React.memo(TimeHUD);
