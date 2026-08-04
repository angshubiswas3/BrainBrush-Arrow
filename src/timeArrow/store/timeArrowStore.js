/**
 * src/timeArrow/store/timeArrowStore.js
 * Independent Zustand Store for Time Arrow
 * Dedicated local storage persistence under 'time-arrow-storage'
 * (Zero dependencies on Brain Arrow)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTimeArrowLevel, ALL_TIME_ARROW_LEVELS } from '../levels/index';
import { generateTimeArrowLevel } from '../engine/TimeGenerator';
import { triggerHaptics } from '../engine/TimeAnimations';

export const useTimeArrowStore = create(
  persist(
    (set, get) => ({
      // Progress & Records
      unlockedLevels: 1,
      currentLevelIndex: 0,
      score: 0,
      highScore: 0,
      stars: 0,
      levelStars: {},
      bestComboRecord: 0,

      // Settings
      soundEnabled: true,
      hapticsEnabled: true,

      // Active Play State
      gameState: 'PLAYING', // 'PLAYING' | 'VICTORY' | 'DEFEAT' | 'PAUSED'
      currentBoard: null,
      timeRemaining: 30,
      maxTime: 30,
      combo: 0,
      maxComboInLevel: 0,
      recentBonusText: null,

      // Actions
      playLevel: (levelIndex) => {
        const idx = typeof levelIndex === 'number' ? levelIndex : 0;
        let rawLevel = null;

        if (typeof getTimeArrowLevel === 'function') {
          rawLevel = getTimeArrowLevel(idx);
        }

        if (!rawLevel) {
          rawLevel = generateTimeArrowLevel(idx);
        }

        const board = JSON.parse(JSON.stringify(rawLevel));
        board.instanceId = `TAL_${board.id || idx + 1}_${Date.now()}`;
        const timeLimit = board.timeLimit || 30;

        set({
          currentLevelIndex: idx,
          currentBoard: board,
          timeRemaining: timeLimit,
          maxTime: timeLimit,
          gameState: 'PLAYING',
          combo: 0,
          maxComboInLevel: 0,
          recentBonusText: null
        });
      },

      decrementTimer: () => {
        const { gameState, timeRemaining } = get();
        if (gameState !== 'PLAYING') return;

        if (timeRemaining <= 1) {
          triggerHaptics('DEFEAT');
          set({ timeRemaining: 0, gameState: 'DEFEAT' });
        } else {
          set({ timeRemaining: timeRemaining - 1 });
        }
      },

      addTimeBonus: (bonusSeconds) => {
        const { timeRemaining, maxTime } = get();
        const newTime = Math.min(maxTime + 15, timeRemaining + bonusSeconds);
        set({ 
          timeRemaining: newTime,
          recentBonusText: `+${bonusSeconds}s`
        });

        setTimeout(() => {
          set((state) => state.recentBonusText === `+${bonusSeconds}s` ? { recentBonusText: null } : {});
        }, 900);
      },

      onArrowClearSuccess: (arrowId) => {
        const { currentBoard, combo, maxComboInLevel, score, hapticsEnabled } = get();
        if (!currentBoard) return;

        if (hapticsEnabled) triggerHaptics('CLEAR');

        const newCombo = combo + 1;
        const newMaxCombo = Math.max(maxComboInLevel, newCombo);
        const comboMultiplier = Math.min(5, Math.max(1, Math.floor(newCombo / 2) + 1));
        const pointGain = 100 * comboMultiplier;

        // Give time bonus on consecutive combos
        if (newCombo >= 3 && newCombo % 2 === 1) {
          if (hapticsEnabled) triggerHaptics('COMBO');
          get().addTimeBonus(2);
        }

        const remainingArrows = (currentBoard.board || []).filter((a) => a.id !== arrowId);
        const updatedBoard = { ...currentBoard, board: remainingArrows };

        set({
          currentBoard: updatedBoard,
          combo: newCombo,
          maxComboInLevel: newMaxCombo,
          score: score + pointGain
        });

        // Check level clear
        if (remainingArrows.length === 0) {
          setTimeout(() => {
            get().completeLevel();
          }, 350);
        }
      },

      onArrowBlocked: () => {
        const { hapticsEnabled } = get();
        if (hapticsEnabled) triggerHaptics('BLOCKED');
        set({ combo: 0 });
      },

      completeLevel: () => {
        const { 
          currentLevelIndex, 
          timeRemaining, 
          maxTime, 
          score, 
          highScore, 
          unlockedLevels, 
          levelStars, 
          stars, 
          hapticsEnabled,
          maxComboInLevel,
          bestComboRecord
        } = get();

        if (hapticsEnabled) triggerHaptics('VICTORY');

        // Star calculation: 3 stars if >= 40% time left, 2 stars if >= 15%, 1 star otherwise
        const timeRatio = maxTime > 0 ? timeRemaining / maxTime : 0.5;
        let earnedStars = 1;
        if (timeRatio >= 0.45) earnedStars = 3;
        else if (timeRatio >= 0.20) earnedStars = 2;

        const timeBonusPoints = Math.max(0, timeRemaining * 40);
        const finalScore = score + timeBonusPoints;
        const newHighScore = Math.max(highScore, finalScore);
        const nextUnlocked = Math.max(unlockedLevels, currentLevelIndex + 2);

        const prevStarsForLevel = levelStars[currentLevelIndex + 1] || 0;
        const starDifference = Math.max(0, earnedStars - prevStarsForLevel);

        set({
          gameState: 'VICTORY',
          score: finalScore,
          highScore: newHighScore,
          unlockedLevels: nextUnlocked,
          stars: stars + starDifference,
          bestComboRecord: Math.max(bestComboRecord, maxComboInLevel),
          levelStars: {
            ...levelStars,
            [currentLevelIndex + 1]: Math.max(prevStarsForLevel, earnedStars)
          }
        });
      },

      restartLevel: () => {
        const idx = get().currentLevelIndex;
        get().playLevel(idx);
      },

      nextLevel: () => {
        const nextIdx = get().currentLevelIndex + 1;
        get().playLevel(nextIdx);
      },

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleHaptics: () => set((s) => ({ hapticsEnabled: !s.hapticsEnabled }))
    }),
    {
      name: 'time-arrow-storage',
      partialize: (state) => ({
        unlockedLevels: state.unlockedLevels,
        highScore: state.highScore,
        stars: state.stars,
        levelStars: state.levelStars,
        bestComboRecord: state.bestComboRecord,
        soundEnabled: state.soundEnabled,
        hapticsEnabled: state.hapticsEnabled
      })
    }
  )
);

export default useTimeArrowStore;
