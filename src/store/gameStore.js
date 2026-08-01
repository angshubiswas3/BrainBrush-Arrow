import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { validHandcraftedLevels as levels } from '../levels/levels';
import { generateLevel } from '../engine/LevelGenerator';

export const useGameStore = create(
  persist(
    (set, get) => ({
      // Player Progress
      currentLevelIndex: 0,
      coins: 200,
      stars: 0,
      unlockedLevels: 1,
      levelStars: {}, // { [levelIndex]: starsEarned }

      // Game State: HOME, MAP, PLAYING, VICTORY, DEFEAT
      gameState: 'HOME',
      currentBoard: null,
      lives: 3,
      maxLives: 3,

      // Navigation Actions
      openMap: () => set({ gameState: 'MAP' }),
      goHome: () => set({ gameState: 'HOME', lives: 3 }),

      // Start or Select Specific Level
      selectLevel: (idx) => {
        let board;
        if (idx < levels.length) {
          board = JSON.parse(JSON.stringify(levels[idx]));
          board.id = `level_${idx}_${Date.now()}`;
        } else {
          board = generateLevel(idx);
        }

        set({ 
          currentLevelIndex: idx, 
          gameState: 'PLAYING', 
          currentBoard: board, 
          lives: 3 
        });
      },

      startGame: () => {
        const idx = get().currentLevelIndex;
        get().selectLevel(idx);
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
        get().selectLevel(idx);
      },

      completeLevel: () => {
        const { currentLevelIndex, lives, levelStars, stars, coins, unlockedLevels } = get();
        
        // Calculate stars based on remaining lives
        const starsEarned = Math.max(1, lives);
        const previousStars = levelStars[currentLevelIndex] || 0;
        const newStarsTotal = stars + Math.max(0, starsEarned - previousStars);

        const updatedLevelStars = {
          ...levelStars,
          [currentLevelIndex]: Math.max(previousStars, starsEarned)
        };

        const nextUnlocked = Math.max(unlockedLevels, currentLevelIndex + 2);

        set({
          gameState: 'VICTORY',
          coins: coins + 50,
          stars: newStarsTotal,
          levelStars: updatedLevelStars,
          unlockedLevels: nextUnlocked
        });
      },

      nextLevel: () => {
        const nextIdx = get().currentLevelIndex + 1;
        get().selectLevel(nextIdx);
      },

      resetProgress: () => set({ 
        currentLevelIndex: 0, 
        coins: 200, 
        stars: 0, 
        unlockedLevels: 1, 
        levelStars: {}, 
        gameState: 'HOME', 
        lives: 3 
      })
    }),
    {
      name: 'brainbrush-storage-v2',
      partialize: (state) => ({ 
        currentLevelIndex: state.currentLevelIndex,
        coins: state.coins,
        stars: state.stars,
        unlockedLevels: state.unlockedLevels,
        levelStars: state.levelStars
      }),
    }
  )
);
