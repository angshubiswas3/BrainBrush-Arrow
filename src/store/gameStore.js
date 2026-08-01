import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { validHandcraftedLevels as levels } from '../levels/levels';
import { generateLevel } from '../engine/LevelGenerator';
import { generateBrainArrowLevel } from '../engine/BrainArrowGenerator';

export const useGameStore = create(
  persist(
    (set, get) => ({
      // Active Game Configuration
      gameType: 'TIME_ARROW', // 'TIME_ARROW' | 'BRAIN_ARROW'
      gameMode: 'CLASSIC',    // 'CLASSIC' | 'TIME_ATTACK' | 'CHALLENGE'

      // Player Progress per Game Type
      timeArrowProgress: { unlockedLevels: 1, currentLevelIndex: 0, levelStars: {} },
      brainArrowProgress: { unlockedLevels: 1, currentLevelIndex: 0, levelStars: {} },

      coins: 100,
      stars: 0,
      dailyNotificationSubscribed: false,

      // Active Game State
      gameState: 'HOME', // 'HOME' | 'MAP' | 'PLAYING' | 'VICTORY' | 'DEFEAT'
      currentBoard: null,
      currentLevelIndex: 0,
      lives: 3,
      maxLives: 3,
      timeRemaining: null,

      // State Modifiers
      setGameType: (type) => set({ gameType: type }),
      setGameMode: (mode) => set({ gameMode: mode }),
      setDailyNotification: (sub) => set({ dailyNotificationSubscribed: sub }),
      setTimeRemaining: (time) => set({ timeRemaining: time }),

      // Navigation Actions
      openMap: () => set({ gameState: 'MAP' }),
      goHome: () => set({ gameState: 'HOME', lives: 3, timeRemaining: null }),

      // Launch a level
      playLevel: (levelIdx) => {
        const { gameType, gameMode } = get();
        let board;

        if (gameType === 'BRAIN_ARROW') {
          board = generateBrainArrowLevel(levelIdx);
        } else {
          // TIME_ARROW
          if (levelIdx < levels.length) {
            board = JSON.parse(JSON.stringify(levels[levelIdx]));
            board.id = `level_${levelIdx}_${Date.now()}`;
          } else {
            board = generateLevel(levelIdx);
          }
        }

        // Set life and timer rules based on mode
        const initialMaxLives = gameMode === 'CHALLENGE' ? 1 : 3;
        const initialTime = gameMode === 'TIME_ATTACK' ? (board.timeLimit || 60) : null;

        set({
          currentLevelIndex: levelIdx,
          currentBoard: board,
          gameState: 'PLAYING',
          lives: initialMaxLives,
          maxLives: initialMaxLives,
          timeRemaining: initialTime
        });
      },

      startGame: () => {
        const { gameType, timeArrowProgress, brainArrowProgress } = get();
        const progress = gameType === 'BRAIN_ARROW' ? brainArrowProgress : timeArrowProgress;
        const targetIdx = progress.unlockedLevels - 1;
        get().playLevel(targetIdx);
      },

      loseLife: () => {
        const currentLives = get().lives;
        if (currentLives <= 1) {
          set({ lives: 0, gameState: 'DEFEAT' });
        } else {
          set({ lives: currentLives - 1 });
        }
      },

      restartLevel: () => {
        const idx = get().currentLevelIndex;
        get().playLevel(idx);
      },

      completeLevel: () => {
        const { gameType, gameMode, currentLevelIndex, timeArrowProgress, brainArrowProgress, coins, stars } = get();
        const isBrain = gameType === 'BRAIN_ARROW';
        const progress = isBrain ? brainArrowProgress : timeArrowProgress;

        const earnedStars = 3;
        const coinBonus = gameMode === 'CHALLENGE' ? 100 : (gameMode === 'TIME_ATTACK' ? 75 : 50);
        const newUnlocked = Math.max(progress.unlockedLevels, currentLevelIndex + 2);

        const updatedProgress = {
          ...progress,
          unlockedLevels: newUnlocked,
          levelStars: {
            ...progress.levelStars,
            [currentLevelIndex]: Math.max(progress.levelStars[currentLevelIndex] || 0, earnedStars)
          }
        };

        set({
          gameState: 'VICTORY',
          coins: coins + coinBonus,
          stars: stars + earnedStars,
          [isBrain ? 'brainArrowProgress' : 'timeArrowProgress']: updatedProgress
        });
      },

      nextLevel: () => {
        const nextIdx = get().currentLevelIndex + 1;
        get().playLevel(nextIdx);
      },

      resetProgress: () => set({ 
        timeArrowProgress: { unlockedLevels: 1, currentLevelIndex: 0, levelStars: {} },
        brainArrowProgress: { unlockedLevels: 1, currentLevelIndex: 0, levelStars: {} },
        coins: 100, 
        stars: 0, 
        gameState: 'HOME', 
        lives: 3 
      })
    }),
    {
      name: 'brainbrush-storage-v2',
      partialize: (state) => ({ 
        gameType: state.gameType,
        gameMode: state.gameMode,
        timeArrowProgress: state.timeArrowProgress,
        brainArrowProgress: state.brainArrowProgress,
        coins: state.coins,
        stars: state.stars,
        dailyNotificationSubscribed: state.dailyNotificationSubscribed
      }),
    }
  )
);
