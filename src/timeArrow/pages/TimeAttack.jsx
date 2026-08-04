/**
 * src/timeArrow/pages/TimeAttack.jsx
 * Active Gameplay Page for Time Arrow Time Attack Mode
 * (Zero dependencies on Brain Arrow)
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimeArrowStore } from '../store/timeArrowStore';
import TimeHUD from '../components/TimeHUD';
import TimeBoard from '../components/TimeBoard';
import TimeVictoryModal from '../components/TimeVictoryModal';
import TimeDefeatModal from '../components/TimeDefeatModal';
import '../styles/TimeArrow.css';

const TimeAttack = ({ onBackToSelect }) => {
  const {
    currentBoard,
    currentLevelIndex,
    gameState,
    timeRemaining,
    maxTime,
    score,
    combo,
    maxComboInLevel,
    recentBonusText,
    soundEnabled,
    playLevel,
    decrementTimer,
    onArrowClearSuccess,
    onArrowBlocked,
    restartLevel,
    nextLevel,
    toggleSound
  } = useTimeArrowStore();

  // Initialize level if board is not yet loaded
  useEffect(() => {
    if (!currentBoard) {
      playLevel(currentLevelIndex || 0);
    }
  }, [currentBoard, currentLevelIndex, playLevel]);

  // Active 1-second countdown ticker timer
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const timer = setInterval(() => {
      decrementTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, decrementTimer]);

  const levelNumber = (currentBoard?.id) || (currentLevelIndex + 1);
  const difficulty = currentBoard?.difficulty || 'Time Attack';
  const remainingArrowsCount = currentBoard?.board?.length || 0;

  return (
    <div className="time-page-container">
      <div className="time-game-screen">
        {/* Arcade HUD */}
        <TimeHUD
          levelNumber={levelNumber}
          difficulty={difficulty}
          timeRemaining={timeRemaining}
          maxTime={maxTime}
          score={score}
          combo={combo}
          bonusText={recentBonusText}
          onBack={onBackToSelect}
          onRestart={restartLevel}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        {/* 3D Candy Interactive Grid Board */}
        {currentBoard && (
          <TimeBoard
            key={currentBoard.instanceId || `board_${currentBoard.id}`}
            boardData={currentBoard}
            onSuccessMove={onArrowClearSuccess}
            onWrongMove={onArrowBlocked}
          />
        )}
      </div>

      {/* Victory Modal */}
      <AnimatePresence>
        {gameState === 'VICTORY' && (
          <TimeVictoryModal
            levelNumber={levelNumber}
            score={score}
            timeRemaining={timeRemaining}
            maxCombo={maxComboInLevel}
            stars={timeRemaining / maxTime >= 0.45 ? 3 : (timeRemaining / maxTime >= 0.2 ? 2 : 1)}
            onNextLevel={nextLevel}
            onRestart={restartLevel}
            onMenu={onBackToSelect}
          />
        )}
      </AnimatePresence>

      {/* Defeat / Time Over Modal */}
      <AnimatePresence>
        {gameState === 'DEFEAT' && (
          <TimeDefeatModal
            levelNumber={levelNumber}
            score={score}
            remainingArrows={remainingArrowsCount}
            onRestart={restartLevel}
            onMenu={onBackToSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeAttack;
