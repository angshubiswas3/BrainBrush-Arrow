import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import DailyPuzzleModal from '../components/DailyPuzzleModal';
import ModeSelectModal from '../components/ModeSelectModal';
import { Sparkles, Play, Clock, Brain, Calendar, Bell, ChevronRight, Lock, Map } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { 
    coins, 
    stars, 
    setGameType, 
    setGameMode, 
    openMap,
    playLevel,
    timeArrowProgress,
    brainArrowProgress
  } = useGameStore();

  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [selectedGameForMode, setSelectedGameForMode] = useState(null); // 'TIME_ARROW' | 'BRAIN_ARROW' | null

  const handleGameCardClick = (type) => {
    setSelectedGameForMode(type);
  };

  const handleModeConfirmed = (mode) => {
    setGameType(selectedGameForMode);
    setGameMode(mode);
    setSelectedGameForMode(null);
    openMap(); // Open the corresponding Adventure Map
  };

  return (
    <div className="home-hub-root">
      {/* Top Glass Header */}
      <header className="home-top-bar">
        <div className="home-brand">
          <div className="brand-icon-wrap">
            <Sparkles size={20} color="#f59e0b" />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">BrainBrush</h1>
            <span className="brand-sub">PUZZLE PLATFORM</span>
          </div>
        </div>

        <div className="home-top-stats">
          <div className="stat-pill-gold">
            <span className="stat-icon">⭐</span>
            <span className="stat-value">{stars}</span>
          </div>
          <div className="stat-pill-gold">
            <span className="stat-icon">🪙</span>
            <span className="stat-value">{coins}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="home-hub-scroll">
        <div className="home-hub-content">
          <div className="home-hero-section">
            <span className="hero-eyebrow">CHOOSE YOUR ADVENTURE</span>
            <h2 className="hero-heading">Two Puzzle Universes</h2>
            <p className="hero-desc">Choose between fast-paced block escapes or deep zen maze logic.</p>
          </div>

          {/* Game Cards Deck */}
          <div className="game-cards-deck">
            {/* 1. Time Arrow Card */}
            <motion.div 
              className="game-hub-card time-arrow-card"
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleGameCardClick('TIME_ARROW')}
            >
              <div className="card-top-tag">
                <span className="tag-pill-fast">⚡ FAST-PACED</span>
                <span className="stage-badge">Lvl {timeArrowProgress?.unlockedLevels || 1}</span>
              </div>

              {/* Visual Mini Preview (3D Candy Blocks) */}
              <div className="card-preview-zone time-preview-zone">
                <div className="mini-block mini-coral"><span>↑</span></div>
                <div className="mini-block mini-mint"><span>→</span></div>
                <div className="mini-block mini-gold"><span>↓</span></div>
                <div className="mini-block mini-blue"><span>←</span></div>
              </div>

              <div className="card-info">
                <div className="card-title-row">
                  <Clock size={24} color="#3b82f6" />
                  <h3 className="card-title">Time Arrow</h3>
                </div>
                <p className="card-pitch">
                  Beat the timer. Clear colorful 3D blocks. Race for the high score!
                </p>

                <div className="card-footer-action">
                  <div className="modes-micro-tags">
                    <span>Classic</span> • <span>Time Attack</span> • <span>Challenge</span>
                  </div>
                  <button className="btn-card-play btn-play-blue">
                    <span>Play</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* 2. Brain Arrow Card */}
            <motion.div 
              className="game-hub-card brain-arrow-card"
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleGameCardClick('BRAIN_ARROW')}
            >
              <div className="card-top-tag">
                <span className="tag-pill-zen">🧠 STRATEGIC & ZEN</span>
                <span className="stage-badge">Lvl {brainArrowProgress?.unlockedLevels || 1}</span>
              </div>

              {/* Visual Mini Preview (Dark Winding Line Mazes on Dots) */}
              <div className="card-preview-zone brain-preview-zone">
                <div className="mini-dot-grid">
                  <span className="mini-dot"></span>
                  <span className="mini-dot"></span>
                  <span className="mini-dot"></span>
                  <span className="mini-dot"></span>
                  <span className="mini-dot"></span>
                  <span className="mini-dot"></span>
                </div>
                <svg className="mini-winding-svg" viewBox="0 0 100 40">
                  <path d="M 15 30 L 15 12 L 45 12" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <polygon points="45,7 53,12 45,17" fill="#0f172a" />

                  <path d="M 85 10 L 85 28 L 60 28" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <polygon points="60,23 52,28 60,33" fill="#0f172a" />
                </svg>
              </div>

              <div className="card-info">
                <div className="card-title-row">
                  <Brain size={24} color="#10b981" />
                  <h3 className="card-title">Brain Arrow</h3>
                </div>
                <p className="card-pitch">
                  Relax. Think. Untangle intricate winding maze lines with pure logic.
                </p>

                <div className="card-footer-action">
                  <div className="modes-micro-tags">
                    <span>Classic</span> • <span>Time Attack</span> • <span>Challenge</span>
                  </div>
                  <button className="btn-card-play btn-play-emerald">
                    <span>Play</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* 3. Daily Puzzle Card (Coming Soon) */}
            <motion.div 
              className="game-hub-card daily-puzzle-card"
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDailyOpen(true)}
            >
              <div className="card-top-tag">
                <span className="tag-pill-gold">✨ COMING SOON</span>
                <div className="mini-lock-badge">
                  <Lock size={12} color="#f59e0b" />
                </div>
              </div>

              <div className="card-preview-zone daily-preview-zone">
                <Calendar size={36} color="#f59e0b" strokeWidth={2} />
              </div>

              <div className="card-info">
                <div className="card-title-row">
                  <Calendar size={24} color="#f59e0b" />
                  <h3 className="card-title">Daily Puzzle</h3>
                </div>
                <p className="card-pitch">
                  A brand new handcrafted challenge every single day with global ranks.
                </p>

                <div className="card-footer-action">
                  <span className="daily-status-text">In Active Development</span>
                  <button className="btn-card-play btn-play-gold">
                    <Bell size={16} />
                    <span>Notify Me</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mode Select Modal */}
      <AnimatePresence>
        {selectedGameForMode && (
          <ModeSelectModal
            gameType={selectedGameForMode}
            onSelectMode={handleModeConfirmed}
            onClose={() => setSelectedGameForMode(null)}
          />
        )}
      </AnimatePresence>

      {/* Daily Puzzle Coming Soon Modal */}
      <AnimatePresence>
        {isDailyOpen && (
          <DailyPuzzleModal onClose={() => setIsDailyOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
