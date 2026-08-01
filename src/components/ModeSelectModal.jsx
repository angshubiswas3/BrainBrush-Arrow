import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Zap, Sparkles, X, ChevronRight } from 'lucide-react';
import './ModeSelectModal.css';

const ModeSelectModal = ({ gameType, onSelectMode, onClose }) => {
  const isTimeArrow = gameType === 'TIME_ARROW';

  const modes = [
    {
      id: 'CLASSIC',
      title: 'Classic Mode',
      tagline: isTimeArrow ? 'Casual solving, no timer pressure' : 'Relaxing & pure strategic zen',
      icon: <Play size={24} color="#10b981" fill="#10b981" />,
      badge: 'Beginner Friendly',
      accentColor: '#10b981'
    },
    {
      id: 'TIME_ATTACK',
      title: 'Time Attack',
      tagline: isTimeArrow ? 'Race against the clock, beat the timer!' : 'Fast-paced maze runs with tension',
      icon: <Clock size={24} color="#f59e0b" />,
      badge: 'Adrenaline Rush',
      accentColor: '#f59e0b'
    },
    {
      id: 'CHALLENGE',
      title: 'Challenge Mode',
      tagline: isTimeArrow ? '1 mistake limit, maximum rewards!' : 'Extreme complexity & 1-life rule',
      icon: <Zap size={24} color="#ec4899" fill="#ec4899" />,
      badge: 'Hardcore',
      accentColor: '#ec4899'
    }
  ];

  return (
    <div className="mode-modal-backdrop">
      <motion.div 
        className="mode-modal-card"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 22, stiffness: 300 }}
      >
        {/* Header */}
        <div className="mode-modal-header">
          <div className="mode-header-title">
            <span className="mode-game-tag">
              {isTimeArrow ? '🕒 TIME ARROW' : '🧠 BRAIN ARROW'}
            </span>
            <h2>Select Game Mode</h2>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={20} color="#64748b" />
          </button>
        </div>

        {/* Mode Cards List */}
        <div className="mode-cards-list">
          {modes.map((m) => (
            <motion.button
              key={m.id}
              className="mode-choice-card"
              onClick={() => onSelectMode(m.id)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="mode-icon-box" style={{ background: `${m.accentColor}18` }}>
                {m.icon}
              </div>

              <div className="mode-info">
                <div className="mode-title-row">
                  <span className="mode-name">{m.title}</span>
                  <span className="mode-badge" style={{ color: m.accentColor, borderColor: `${m.accentColor}40` }}>
                    {m.badge}
                  </span>
                </div>
                <p className="mode-tagline">{m.tagline}</p>
              </div>

              <ChevronRight size={20} color="#94a3b8" className="mode-arrow-chevron" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ModeSelectModal;
