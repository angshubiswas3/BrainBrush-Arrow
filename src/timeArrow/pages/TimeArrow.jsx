/**
 * src/timeArrow/pages/TimeArrow.jsx
 * Independent Level Selection & Arcade Hub for Time Arrow
 * (Zero dependencies on Brain Arrow)
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTimeArrowStore } from '../store/timeArrowStore';
import { ALL_TIME_ARROW_LEVELS } from '../levels/index';
import '../styles/TimeArrow.css';

const TIERS = [
  { id: 'ALL', label: 'All 100', start: 1, end: 100 },
  { id: 'EASY', label: 'Easy (1-15)', start: 1, end: 15 },
  { id: 'MEDIUM', label: 'Medium (16-35)', start: 16, end: 35 },
  { id: 'HARD', label: 'Hard (36-65)', start: 36, end: 65 },
  { id: 'EXPERT', label: 'Expert (66-85)', start: 66, end: 85 },
  { id: 'MASTER', label: 'Master (86-100)', start: 86, end: 100 }
];

const TimeArrow = ({ onSelectLevel, onBackHome }) => {
  const { 
    unlockedLevels, 
    stars, 
    highScore, 
    levelStars, 
    playLevel, 
    bestComboRecord 
  } = useTimeArrowStore();

  const [activeTier, setActiveTier] = useState('ALL');

  const currentTierObj = TIERS.find((t) => t.id === activeTier) || TIERS[0];
  const totalLevelsCount = ALL_TIME_ARROW_LEVELS?.length || 100;

  // Filter levels based on selected tier
  const levelNumbers = [];
  for (let i = currentTierObj.start; i <= Math.min(currentTierObj.end, totalLevelsCount); i++) {
    levelNumbers.push(i);
  }

  const handleLevelClick = (levelNum) => {
    if (levelNum > unlockedLevels) return;
    playLevel(levelNum - 1);
    if (onSelectLevel) {
      onSelectLevel(levelNum - 1);
    }
  };

  const handleQuickPlay = () => {
    const targetLevel = Math.min(unlockedLevels, totalLevelsCount);
    handleLevelClick(targetLevel);
  };

  return (
    <div className="time-page-container">
      {/* Header Bar */}
      <div className="time-select-header">
        <div className="time-select-toprow">
          <button className="time-back-btn" onClick={onBackHome}>
            ← Hub
          </button>

          <div className="time-stats-pill-group">
            <div className="time-stat-badge" title="Total Stars">
              <span>⭐</span>
              <span>{stars}</span>
            </div>
            <div className="time-stat-badge" title="High Score">
              <span>🏆</span>
              <span>{highScore.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Hero Branding */}
        <div className="time-select-hero">
          <motion.h1 
            className="time-select-title"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            ⚡ TIME ARROW
          </motion.h1>
          <p className="time-select-subtitle">
            100 Handcrafted Time Attack Stages • Beat the Clock!
          </p>
        </div>

        {/* Quick Play Banner */}
        <motion.button
          className="time-modal-btn-primary"
          style={{ marginTop: '8px' }}
          onClick={handleQuickPlay}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          PLAY LEVEL {Math.min(unlockedLevels, totalLevelsCount)} ▶
        </motion.button>

        {/* Tier Tabs */}
        <div className="time-tier-tabs">
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              className={`time-tier-tab ${activeTier === tier.id ? 'active' : ''}`}
              onClick={() => setActiveTier(tier.id)}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>

      {/* 100 Levels Grid */}
      <div className="time-levels-grid">
        {levelNumbers.map((num) => {
          const isUnlocked = num <= unlockedLevels;
          const starsForThisLevel = levelStars[num] || 0;

          return (
            <motion.div
              key={`tal_lvl_${num}`}
              className={`time-level-card ${!isUnlocked ? 'locked' : ''}`}
              onClick={() => handleLevelClick(num)}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: (num % 20) * 0.015 }}
            >
              {isUnlocked ? (
                <>
                  <span className="time-level-card-number">{num}</span>
                  <div className="time-level-card-stars">
                    {[1, 2, 3].map((s) => (
                      <span 
                        key={s} 
                        className="time-card-star"
                        style={{ opacity: s <= starsForThisLevel ? 1 : 0.25 }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <span className="time-level-lock-icon">🔒</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeArrow;
