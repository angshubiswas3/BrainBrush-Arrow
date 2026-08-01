import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { validHandcraftedLevels as levels } from '../levels/levels';
import { generateLevel } from '../engine/LevelGenerator';

export const useGameStore = create(
  persist(
    (set, get) => ({
      // Player Progress
      currentLevelIndex: 0,
      coins: 0,
      stars: 0,
      unlockedLevels: 1,

      // Game State
      gameState: 'HOME', // HOME, PLAYING, VICTORY, DEFEAT
      currentBoard: null,
      lives: 3,
      maxLives: 3,

      // Actions
      startGame: () => {
        const idx = get().currentLevelIndex;
        let board;
        
        // Load handcrafted or generate procedural
        if (idx < levels.length) {
          // Deep clone to prevent mutating the template
          board = JSON.parse(JSON.stringify(levels[idx]));
          board.id = `level_${idx}_${Date.now()}`;
        } else {
          board = generateLevel(idx);
        }

        set({ gameState: 'PLAYING', currentBoard: board, lives: 3 });
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
        set({ lives: 3, gameState: 'PLAYING' });
        get().startGame();
      },

      completeLevel: () => {
        set((state) => ({
          gameState: 'VICTORY',
          coins: state.coins + 50,
          stars: state.stars + 3,
        }));
      },

      nextLevel: () => {
        set((state) => {
          const nextIdx = state.currentLevelIndex + 1;
          return {
            currentLevelIndex: nextIdx,
            unlockedLevels: Math.max(state.unlockedLevels, nextIdx + 1),
            gameState: 'PLAYING',
            lives: 3,
          };
        });
        
        get().startGame();
      },
      
      goHome: () => set({ gameState: 'HOME', lives: 3 }),

      resetProgress: () => set({ currentLevelIndex: 0, coins: 0, stars: 0, unlockedLevels: 1, gameState: 'HOME', lives: 3 })
    }),
    {
      name: 'brainbrush-storage',
      partialize: (state) => ({ 
        currentLevelIndex: state.currentLevelIndex,
        coins: state.coins,
        stars: state.stars,
        unlockedLevels: state.unlockedLevels 
      }),
    }
  )
);
