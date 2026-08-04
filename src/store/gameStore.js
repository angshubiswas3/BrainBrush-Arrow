import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getHandcraftedLevel, ALL_HANDCRAFTED_LEVELS } from '../levels/index';

export const useGameStore = create(
  persist(
    (set, get) => ({
      // Active Game Configuration
      gameType: 'BRAIN_ARROW', // 'BRAIN_ARROW' | 'TIME_ARROW'

      // Player Progress per Game Type
      timeArrowProgress: { unlockedLevels: 1, currentLevelIndex: 0, levelStars: {}, claimedChests: {} },
      brainArrowProgress: { unlockedLevels: 1, currentLevelIndex: 0, levelStars: {}, claimedChests: {} },

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
      hintsRemaining: 2,

      // State Modifiers
      setGameType: (type) => set({ gameType: type }),
      setDailyNotification: (sub) => set({ dailyNotificationSubscribed: sub }),
      setTimeRemaining: (time) => set({ timeRemaining: time }),

      // Navigation Actions
      openMap: () => set({ gameState: 'MAP' }),
      goHome: () => set({ gameState: 'HOME', lives: 3, timeRemaining: null }),

      // Claim milestone chest reward on adventure map
      claimChestReward: (levelNum, bonusCoins = 50, bonusStars = 1) => {
        const { gameType, timeArrowProgress, brainArrowProgress, coins, stars } = get();
        const isBrain = gameType === 'BRAIN_ARROW';
        const progress = isBrain ? brainArrowProgress : timeArrowProgress;

        const updatedProgress = {
          ...progress,
          claimedChests: {
            ...(progress.claimedChests || {}),
            [levelNum]: true
          }
        };

        set({
          coins: coins + bonusCoins,
          stars: stars + bonusStars,
          [isBrain ? 'brainArrowProgress' : 'timeArrowProgress']: updatedProgress
        });
      },

      // Launch a level (Difficulty, Timer, Hearts, Hints are governed by the level data)
      playLevel: (levelIdx) => {
        const rawLevel = getHandcraftedLevel(levelIdx);
        const board = JSON.parse(JSON.stringify(rawLevel));
        board.id = `BAL${board.id || levelIdx + 1}_${Date.now()}`;

        // Automatically assign difficulty based on level ranges if not defined in level file
        let difficulty = board.difficulty;
        const lvlNum = levelIdx + 1;
        if (!difficulty) {
          if (lvlNum <= 10) difficulty = 'Easy';
          else if (lvlNum <= 30) difficulty = 'Medium';
          else if (lvlNum <= 60) difficulty = 'Hard';
          else if (lvlNum <= 90) difficulty = 'Expert';
          else difficulty = 'Master';
        }
        board.difficulty = difficulty;

        // Level-defined parameters (timer, hearts, hints)
        const initialMaxLives = board.hearts || 3;
        const initialTime = board.timer || board.timeLimit || null;
        const initialHints = board.hints !== undefined ? board.hints : 2;

        set({
          currentLevelIndex: levelIdx,
          currentBoard: board,
          gameState: 'PLAYING',
          lives: initialMaxLives,
          maxLives: initialMaxLives,
          timeRemaining: initialTime,
          hintsRemaining: initialHints
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
        const { gameType, currentLevelIndex, timeArrowProgress, brainArrowProgress, coins, stars } = get();
        const isBrain = gameType === 'BRAIN_ARROW';
        const progress = isBrain ? brainArrowProgress : timeArrowProgress;

        const earnedStars = 3;
        const coinBonus = 60;
        const newUnlocked = Math.max(progress.unlockedLevels, currentLevelIndex + 2);

        const updatedProgress = {
          ...progress,
          unlockedLevels: newUnlocked,
          levelStars: {
            ...progress.levelStars,
            [currentLevelIndex + 1]: Math.max(progress.levelStars[currentLevelIndex + 1] || 0, earnedStars)
          }
        };

        set({
          coins: coins + coinBonus,
          stars: stars + earnedStars,
          gameState: 'VICTORY',
          [isBrain ? 'brainArrowProgress' : 'timeArrowProgress']: updatedProgress
        });
      },

      nextLevel: () => {
        const nextIdx = get().currentLevelIndex + 1;
        get().playLevel(nextIdx);
      }
    }),
    {
      name: 'brainbrush-arrow-storage',
      partialize: (state) => ({
        gameType: state.gameType,
        timeArrowProgress: state.timeArrowProgress,
        brainArrowProgress: state.brainArrowProgress,
        coins: state.coins,
        stars: state.stars,
        dailyNotificationSubscribed: state.dailyNotificationSubscribed
      })
    }
  )
);
