import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import Grid from '../components/Grid';
import VictoryModal from '../components/VictoryModal';
import DefeatModal from '../components/DefeatModal';
import { ChevronLeft, Settings, Navigation, Heart, Lightbulb, Grid3X3 } from 'lucide-react';
import './Game.css';

const Game = () => {
  const { 
    currentBoard, 
    currentLevelIndex, 
    gameState, 
    lives = 3,
    maxLives = 3,
    completeLevel, 
    nextLevel,
    loseLife,
    restartLevel,
    openMap,
    goHome
  } = useGameStore();

  if (!currentBoard) return null;

  return (
    <motion.div 
      className="game-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top Header */}
      <header className="game-header">
        <button className="btn-icon-clear" onClick={openMap}>
          <ChevronLeft size={32} color="var(--accent-blue)" strokeWidth={2.5} />
        </button>
        <div className="level-indicator">
          <h1>Level {currentLevelIndex + 1}</h1>
        </div>
        <button className="btn-icon-clear">
          <Settings size={28} color="var(--accent-blue)" strokeWidth={2.5} />
        </button>
      </header>

      {/* Sub Header (Stats) */}
      <div className="game-stats-bar">
        <div className="stat-badge">
          <Navigation size={18} fill="currentColor" strokeWidth={0} className="icon-flip" /> 
          <span>{currentBoard.arrows?.length || 0}</span>
        </div>
        
        {/* Animated Lifeline Hearts */}
        <div className="hearts-container">
          {Array.from({ length: maxLives }).map((_, i) => {
            const isAlive = i < lives;
            return (
              <motion.div
                key={`heart-${i}`}
                initial={false}
                animate={isAlive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.35 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={`heart-wrapper ${!isAlive ? 'heart-lost' : ''}`}
              >
                <Heart 
                  fill={isAlive ? "#ef4444" : "#94a3b8"} 
                  color={isAlive ? "#ef4444" : "#94a3b8"} 
                  size={26} 
                />
              </motion.div>
            );
          })}
        </div>
        
        <div className="difficulty-badge">
          {currentBoard.difficultyLabel || 'Normal'}
        </div>
      </div>
      
      {/* Main Board Area */}
      <main className="game-area">
        <Grid 
          key={`${currentBoard.id}_${currentLevelIndex}`} 
          levelData={currentBoard} 
          onLevelComplete={completeLevel}
          onWrongMove={loseLife}
        />

        {gameState === 'VICTORY' && (
          <VictoryModal onNext={nextLevel} />
        )}

        {gameState === 'DEFEAT' && (
          <DefeatModal onRetry={restartLevel} onHome={goHome} />
        )}
      </main>

      {/* Bottom Floating Action Buttons */}
      <div className="bottom-actions">
        <button className="btn-fab" title="Hint">
          <Lightbulb size={28} color="var(--accent-blue)" strokeWidth={2} />
          <div className="fab-badge">2</div>
        </button>
        <button className="btn-fab" onClick={restartLevel} title="Restart Level">
          <Grid3X3 size={28} color="var(--accent-blue)" strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  );
};

export default Game;
