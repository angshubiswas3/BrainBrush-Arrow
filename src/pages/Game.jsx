import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import Board from '../components/Board';
import VictoryModal from '../components/VictoryModal';
import DefeatModal from '../components/DefeatModal';
import { ChevronLeft, Settings, Navigation, Heart, Clock, Lightbulb, RotateCcw, Map } from 'lucide-react';
import './Game.css';

const Game = () => {
  const { 
    currentBoard, 
    currentLevelIndex, 
    gameState, 
    lives = 3,
    maxLives = 3,
    hintsRemaining = 2,
    timeRemaining,
    setTimeRemaining,
    completeLevel, 
    nextLevel,
    loseLife,
    restartLevel,
    openMap
  } = useGameStore();

  // Per-level Countdown Timer (if configured in this level file)
  useEffect(() => {
    if (gameState !== 'PLAYING' || timeRemaining === null || timeRemaining === undefined) return;

    if (timeRemaining <= 0) {
      useGameStore.setState({ lives: 0, gameState: 'DEFEAT' });
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeRemaining, setTimeRemaining]);

  if (!currentBoard) return null;

  const isLowTime = timeRemaining !== null && timeRemaining !== undefined && timeRemaining <= 10;
  const difficulty = currentBoard.difficulty || 'Easy';

  return (
    <motion.div 
      className={`game-container ${isLowTime ? 'low-time-heartbeat-active' : ''}`}
      style={{ background: '#ffffff' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top Floating Header */}
      <header className="game-header">
        <button className="btn-icon-pill" onClick={openMap} title="Level Map">
          <ChevronLeft size={26} color="#0f172a" strokeWidth={2.8} />
        </button>
        
        <div className="level-indicator-card">
          <span className="level-title-label">Level {currentLevelIndex + 1}</span>
          <span className="game-submode-tag">
            {difficulty}
          </span>
        </div>

        <button className="btn-icon-pill" title="Settings">
          <Settings size={22} color="#0f172a" strokeWidth={2.5} />
        </button>
      </header>

      {/* Sub Header (Stats + Timer + Lifeline Hearts) */}
      <div className="game-stats-bar">
        <div className="stat-chip">
          <Navigation size={17} fill="#0f172a" strokeWidth={0} className="icon-flip" /> 
          <span>{currentBoard.arrows?.length || 0}</span>
        </div>

        {/* Level Timer Pill (Shown only when level has timer configured) */}
        {timeRemaining !== null && timeRemaining !== undefined && (
          <motion.div 
            className={`timer-pill ${isLowTime ? 'timer-low-pulse' : ''}`}
            animate={isLowTime ? { scale: [1, 1.12, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            <Clock size={16} color={isLowTime ? "#ef4444" : "#d97706"} strokeWidth={2.5} />
            <span className="timer-number">{timeRemaining}s</span>
          </motion.div>
        )}
        
        {/* Animated Lifeline Hearts */}
        <div className="hearts-container">
          {Array.from({ length: maxLives }).map((_, i) => {
            const isAlive = i < lives;
            return (
              <motion.div
                key={`heart-${i}`}
                initial={false}
                animate={isAlive ? { scale: 1, opacity: 1 } : { scale: 0.75, opacity: 0.3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={`heart-wrapper ${!isAlive ? 'heart-lost' : ''}`}
              >
                <Heart 
                  fill={isAlive ? "#ef4444" : "#cbd5e1"} 
                  color={isAlive ? "#ef4444" : "#94a3b8"} 
                  size={24} 
                />
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Modular SVG Board Area */}
      <main className="game-area">
        <Board 
          key={`board_${currentBoard.id}_${currentLevelIndex}`}
          data={currentBoard}
          onLevelComplete={completeLevel}
          onWrongMove={loseLife}
        />

        {gameState === 'VICTORY' && (
          <VictoryModal onNext={nextLevel} />
        )}

        {gameState === 'DEFEAT' && (
          <DefeatModal onRetry={restartLevel} onHome={openMap} />
        )}
      </main>

      {/* Bottom Floating Power-Up Dock */}
      <div className="bottom-actions-dock">
        <button className="btn-dock-item" title="Hint">
          <Lightbulb size={24} color="#0f172a" strokeWidth={2.5} />
          <div className="dock-badge">{hintsRemaining}</div>
        </button>
        <button className="btn-dock-item" onClick={restartLevel} title="Restart Level">
          <RotateCcw size={22} color="#0f172a" strokeWidth={2.5} />
        </button>
        <button className="btn-dock-item" onClick={openMap} title="Adventure Map">
          <Map size={22} color="#0f172a" strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
};

export default Game;
