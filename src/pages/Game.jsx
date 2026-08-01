import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import Grid from '../components/Grid';
import BrainArrowGrid from '../components/BrainArrowGrid';
import VictoryModal from '../components/VictoryModal';
import DefeatModal from '../components/DefeatModal';
import { ChevronLeft, Settings, Navigation, Heart, Clock, Zap, Lightbulb, Grid3X3 } from 'lucide-react';
import './Game.css';

const Game = () => {
  const { 
    currentBoard, 
    currentLevelIndex, 
    gameState, 
    gameType,
    gameMode,
    lives = 3,
    maxLives = 3,
    timeRemaining,
    setTimeRemaining,
    completeLevel, 
    nextLevel,
    loseLife,
    restartLevel,
    openMap,
    goHome
  } = useGameStore();

  // Time Attack Countdown Timer
  useEffect(() => {
    if (gameState !== 'PLAYING' || gameMode !== 'TIME_ATTACK' || timeRemaining === null) return;

    if (timeRemaining <= 0) {
      useGameStore.setState({ lives: 0, gameState: 'DEFEAT' });
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, gameMode, timeRemaining, setTimeRemaining]);

  if (!currentBoard) return null;

  const isLowTime = gameMode === 'TIME_ATTACK' && timeRemaining !== null && timeRemaining <= 10;

  return (
    <motion.div 
      className={`game-container ${isLowTime ? 'low-time-heartbeat-active' : ''}`}
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
          <span className="game-submode-pill">
            {gameType === 'BRAIN_ARROW' ? '🧠 Brain' : '🕒 Time'} • {gameMode === 'TIME_ATTACK' ? 'Time Attack' : (gameMode === 'CHALLENGE' ? 'Challenge' : 'Classic')}
          </span>
        </div>
        <button className="btn-icon-clear">
          <Settings size={28} color="var(--accent-blue)" strokeWidth={2.5} />
        </button>
      </header>

      {/* Sub Header (Stats + Timer + Lives) */}
      <div className="game-stats-bar">
        <div className="stat-badge">
          <Navigation size={18} fill="currentColor" strokeWidth={0} className="icon-flip" /> 
          <span>{currentBoard.arrows?.length || 0}</span>
        </div>

        {/* Time Attack Countdown Pill */}
        {gameMode === 'TIME_ATTACK' && timeRemaining !== null && (
          <motion.div 
            className={`timer-pill ${isLowTime ? 'timer-low-pulse' : ''}`}
            animate={isLowTime ? { scale: [1, 1.12, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            <Clock size={16} color={isLowTime ? "#ef4444" : "#f59e0b"} strokeWidth={2.5} />
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
                animate={isAlive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.35 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={`heart-wrapper ${!isAlive ? 'heart-lost' : ''}`}
              >
                <Heart 
                  fill={isAlive ? "#ef4444" : "#94a3b8"} 
                  color={isAlive ? "#ef4444" : "#94a3b8"} 
                  size={24} 
                />
              </motion.div>
            );
          })}
        </div>
        
        <div className="difficulty-badge">
          {currentBoard.difficultyLabel || 'Normal'}
        </div>
      </div>
      
      {/* Main Board Area (Renders Grid for Time Arrow or BrainArrowGrid for Brain Arrow) */}
      <main className="game-area">
        {gameType === 'BRAIN_ARROW' ? (
          <BrainArrowGrid 
            key={`brain_${currentBoard.id}_${currentLevelIndex}`}
            levelData={currentBoard}
            onLevelComplete={completeLevel}
            onWrongMove={loseLife}
          />
        ) : (
          <Grid 
            key={`time_${currentBoard.id}_${currentLevelIndex}`} 
            levelData={currentBoard} 
            onLevelComplete={completeLevel}
            onWrongMove={loseLife}
          />
        )}

        {gameState === 'VICTORY' && (
          <VictoryModal onNext={nextLevel} />
        )}

        {gameState === 'DEFEAT' && (
          <DefeatModal onRetry={restartLevel} onHome={openMap} />
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
