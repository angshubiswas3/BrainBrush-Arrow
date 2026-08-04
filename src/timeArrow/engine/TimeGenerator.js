/**
 * src/timeArrow/engine/TimeGenerator.js
 * Solvability-Guaranteed Reverse Slider Generator for Time Arrow
 * (Zero dependencies on Brain Arrow)
 */

import { solveTimeLevel } from './TimeSolver';

export const TIME_CANDY_COLORS = [
  '#FF5E7E', // Neon Bubblegum Pink
  '#00D2D3', // Electric Cyan
  '#FECA57', // Radiant Mango Gold
  '#5F27CD', // Deep Purple Candy
  '#FF9F43', // Juicy Orange
  '#10AC84', // Mint Emerald
  '#54A0FF', // Sky Marine
  '#EE5253', // Crimson Coral
  '#A3E635', // Electric Lime
  '#48DBFB', // Ice Spark Blue
  '#9B59B6', // Amethyst Violet
  '#1DD1A1'  // Wild Seafoam
];

const DIRECTIONS = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

/**
 * Returns grid size, density, and countdown time based on level number
 * @param {number} levelIndex (0-based or 1-based)
 */
export const getTimeDifficultyConfig = (levelIndex) => {
  const levelNum = typeof levelIndex === 'number' ? Math.max(1, levelIndex + 1) : 1;

  if (levelNum <= 5) {
    return { gridSize: 3, density: 0.55, difficulty: 'Easy', timeLimit: 25 };
  } else if (levelNum <= 15) {
    return { gridSize: 4, density: 0.65, difficulty: 'Easy', timeLimit: 35 };
  } else if (levelNum <= 35) {
    return { gridSize: 5, density: 0.72, difficulty: 'Medium', timeLimit: 45 };
  } else if (levelNum <= 65) {
    return { gridSize: 6, density: 0.78, difficulty: 'Hard', timeLimit: 55 };
  } else if (levelNum <= 85) {
    return { gridSize: 7, density: 0.82, difficulty: 'Expert', timeLimit: 70 };
  } else {
    return { gridSize: 8, density: 0.85, difficulty: 'Master', timeLimit: 85 };
  }
};

/**
 * Procedurally generates a solvable Time Arrow level using reverse engineering.
 * Used for dynamic endless replay if needed.
 */
export const generateTimeArrowLevel = (levelIndex) => {
  const levelNum = typeof levelIndex === 'number' ? Math.max(1, levelIndex + 1) : 1;
  const config = getTimeDifficultyConfig(levelIndex);
  const { gridSize, density, difficulty, timeLimit } = config;

  const totalCells = gridSize * gridSize;
  let targetArrows = Math.max(3, Math.floor(totalCells * density));
  if (targetArrows > totalCells - 1) targetArrows = totalCells - 1;

  let bestArrows = null;
  let bestSolution = null;

  for (let loop = 0; loop < 50; loop++) {
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
    const arrows = [];
    let idCounter = 1;

    let attempts = 0;
    while (arrows.length < targetArrows && attempts++ < 600) {
      const r = Math.floor(Math.random() * gridSize);
      const c = Math.floor(Math.random() * gridSize);

      if (grid[r][c] !== null) continue;

      const dirs = [...DIRECTIONS].sort(() => Math.random() - 0.5);

      for (const dir of dirs) {
        let canSlideIn = true;
        if (dir === 'UP') {
          for (let i = 0; i < r; i++) {
            if (grid[i][c] !== null) { canSlideIn = false; break; }
          }
        } else if (dir === 'DOWN') {
          for (let i = r + 1; i < gridSize; i++) {
            if (grid[i][c] !== null) { canSlideIn = false; break; }
          }
        } else if (dir === 'LEFT') {
          for (let j = 0; j < c; j++) {
            if (grid[r][j] !== null) { canSlideIn = false; break; }
          }
        } else if (dir === 'RIGHT') {
          for (let j = c + 1; j < gridSize; j++) {
            if (grid[r][j] !== null) { canSlideIn = false; break; }
          }
        }

        if (canSlideIn) {
          const color = TIME_CANDY_COLORS[(arrows.length + levelNum) % TIME_CANDY_COLORS.length];
          const arrowObj = {
            id: `t${idCounter++}`,
            row: r,
            col: c,
            direction: dir,
            color
          };
          grid[r][c] = arrowObj.id;
          arrows.push(arrowObj);
          break;
        }
      }
    }

    if (arrows.length >= Math.min(3, targetArrows - 1)) {
      const res = solveTimeLevel(arrows);
      if (res.isSolvable) {
        bestArrows = arrows;
        bestSolution = res.solution;
        break;
      }
    }
  }

  // Guaranteed fallback
  if (!bestArrows || bestArrows.length === 0) {
    bestArrows = [
      { id: 't1', row: 0, col: 1, direction: 'UP', color: TIME_CANDY_COLORS[0] },
      { id: 't2', row: 1, col: 1, direction: 'RIGHT', color: TIME_CANDY_COLORS[1] },
      { id: 't3', row: 1, col: 0, direction: 'LEFT', color: TIME_CANDY_COLORS[2] },
      { id: 't4', row: 2, col: 1, direction: 'DOWN', color: TIME_CANDY_COLORS[3] }
    ];
    bestSolution = ['t1', 't2', 't3', 't4'];
  }

  return {
    id: levelNum,
    name: `Level ${levelNum}`,
    difficulty,
    gridSize,
    timeLimit,
    moves: bestArrows.length,
    board: bestArrows,
    solution: bestSolution
  };
};

export default {
  TIME_CANDY_COLORS,
  getTimeDifficultyConfig,
  generateTimeArrowLevel
};
