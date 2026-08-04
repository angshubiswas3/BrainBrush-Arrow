import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import DailyPuzzleModal from '../components/DailyPuzzleModal';
import { Sparkles, Play, Clock, Brain, Calendar, Bell, ChevronRight, Lock, Trophy, Flame } from 'lucide-react';
import './Home.css';

const Home = ({ onOpenTimeArrow }) => {
  const { 
    coins, 
    stars, 
    setGameType, 
    openMap,
    timeArrowProgress,
    brainArrowProgress
  } = useGameStore();

  const [isDailyOpen, setIsDailyOpen] = useState(false);

  const handlePlayBrainArrow = () => {
    setGameType('BRAIN_ARROW');
    openMap();
  };

  const handlePlayTimeArrow = () => {
    if (onOpenTimeArrow) {
      onOpenTimeArrow();
    }
  };

  return (
    <div className="home-hub-root">
      {/* Top Glass Floating Header */}
      <header className="home-top-bar">
        <div className="home-brand">
          <div className="brand-icon-wrap">
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">BrainBrush</h1>
            <span className="brand-sub">STUDIO GAMES</span>
          </div>
        </div>

        <div className="home-top-stats">
          <div className="stat-pill stat-streak">
            <Flame size={16} color="#ea580c" fill="#ea580c" />
            <span className="stat-value">3</span>
          </div>
          <div className="stat-pill stat-stars">
            <span className="stat-emoji">⭐</span>
            <span className="stat-value">{stars}</span>
          </div>
          <div className="stat-pill stat-coins">
            <span className="stat-emoji">🪙</span>
            <span className="stat-value">{coins}</span>
          </div>
        </div>
      </header>

      {/* Main Content Scroll Area */}
      <div className="home-hub-scroll">
        <div className="home-hub-content">
          
          {/* Hero Welcome Banner */}
          <div className="home-hero-section">
            <span className="hero-eyebrow">CHOOSE YOUR ADVENTURE</span>
            <h2 className="hero-heading">Select Puzzle Universe</h2>
          </div>

          {/* Dribbble Bento Game Cards Deck */}
          <div className="game-cards-deck">
            
            {/* 1. BRAIN ARROW CARD (FLAGSHIP - FIRST) */}
            <motion.div 
              className="game-hub-card brain-arrow-card"
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlayBrainArrow}
            >
              <div className="card-top-tag">
                <span className="tag-pill-dark">🧠 ZEN LOGIC</span>
                <span className="stage-badge stage-badge-dark">
                  Level {brainArrowProgress?.unlockedLevels || 1} • 100 Levels
                </span>
              </div>

              {/* Vector Maze Lines Preview */}
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
                  <path d="M 15 30 L 15 12 L 45 12" fill="none" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                  <polygon points="45,6 55,12 45,18" fill="#059669" />

                  <path d="M 85 10 L 85 28 L 60 28" fill="none" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                  <polygon points="60,22 50,28 60,34" fill="#059669" />
                </svg>
              </div>

              <div className="card-info">
                <div className="card-title-row">
                  <Brain size={28} color="#0f172a" strokeWidth={2.5} />
                  <h3 className="card-title">Brain Arrow</h3>
                </div>

                <div className="card-footer-action">
                  <span className="card-sub-badge">Handcrafted Mazes</span>
                  <button className="btn-card-play btn-play-dark" onClick={(e) => { e.stopPropagation(); handlePlayBrainArrow(); }}>
                    <span>PLAY</span>
                    <ChevronRight size={22} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* 2. TIME ARROW CARD (SECOND) */}
            <motion.div 
              className="game-hub-card time-arrow-card"
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlayTimeArrow}
            >
              <div className="card-top-tag">
                <span className="tag-pill-lime">⚡ TIME ATTACK</span>
                <span className="stage-badge">
                  Level {timeArrowProgress?.unlockedLevels || 1} • 100 Levels
                </span>
              </div>

              {/* 3D Candy Block Preview */}
              <div className="card-preview-zone time-preview-zone">
                <div className="mini-block mini-coral"><span>↑</span></div>
                <div className="mini-block mini-mint"><span>→</span></div>
                <div className="mini-block mini-gold"><span>↓</span></div>
                <div className="mini-block mini-sky"><span>←</span></div>
              </div>

              <div className="card-info">
                <div className="card-title-row">
                  <Clock size={28} color="#ffffff" strokeWidth={2.5} />
                  <h3 className="card-title">Time Arrow</h3>
                </div>

                <div className="card-footer-action">
                  <span className="card-sub-badge card-sub-badge-light">Fast Arcade Speed</span>
                  <button className="btn-card-play btn-play-white" onClick={(e) => { e.stopPropagation(); handlePlayTimeArrow(); }}>
                    <span>PLAY</span>
                    <ChevronRight size={22} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* 3. DAILY QUEST CARD (THIRD) */}
            <motion.div 
              className="game-hub-card daily-puzzle-card"
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDailyOpen(true)}
            >
              <div className="card-top-tag">
                <span className="tag-pill-gold">✨ DAILY QUEST</span>
                <div className="mini-lock-badge">
                  <Lock size={13} color="#d97706" />
                </div>
              </div>

              <div className="card-preview-zone daily-preview-zone">
                <div className="daily-calendar-icon-wrap">
                  <Calendar size={36} color="#f59e0b" strokeWidth={2.2} />
                </div>
              </div>

              <div className="card-info">
                <div className="card-title-row">
                  <Trophy size={24} color="#f59e0b" strokeWidth={2.5} />
                  <h3 className="card-title">Daily Challenge</h3>
                </div>

                <div className="card-footer-action">
                  <span className="daily-status-text">Coming Soon</span>
                  <button className="btn-card-play btn-play-gold" onClick={(e) => { e.stopPropagation(); setIsDailyOpen(true); }}>
                    <Bell size={18} />
                    <span>Notify Me</span>
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

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
