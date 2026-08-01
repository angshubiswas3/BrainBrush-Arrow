import { solveLevel } from './Solver';

const DIRECTIONS = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

// Modern vibrant & pastel game tile palette
export const TILE_COLORS = [
  '#FF6B6B', // Coral Red
  '#4ECDC4', // Vibrant Teal
  '#FFD166', // Sunny Gold
  '#6C5CE7', // Royal Lavender / Purple
  '#FFA07A', // Warm Peach
  '#00B894', // Mint Emerald
  '#0984E3', // Sky Blue
  '#FD79A8', // Bubblegum Pink
  '#E17055', // Terracotta Orange
  '#74B9FF', // Soft Ice Blue
];

/**
 * Calculates grid size and arrow density based on levelIndex
 */
export const getLevelDifficulty = (levelIndex) => {
  if (levelIndex <= 2) {
    return { size: 3, density: 0.5, label: 'Easy' };
  } else if (levelIndex <= 5) {
    return { size: 4, density: 0.7, label: 'Normal' };
  } else if (levelIndex <= 10) {
    return { size: 5, density: 0.75, label: 'Medium' };
  } else if (levelIndex <= 18) {
    return { size: 5, density: 0.85, label: 'Hard' };
  } else if (levelIndex <= 30) {
    return { size: 6, density: 0.85, label: 'Expert' };
  } else if (levelIndex <= 50) {
    return { size: 7, density: 0.88, label: 'Master' };
  } else {
    return { size: 8, density: 0.90, label: 'Brain Killer' };
  }
};

/**
 * Generates a guaranteed-solvable puzzle using Reverse-Engineering with high density.
 */
export const generateLevel = (levelIndex) => {
  const { size, density, label } = getLevelDifficulty(levelIndex);
  
  const totalCells = size * size;
  let targetArrows = Math.max(3, Math.floor(totalCells * density));
  // Leave at least 1-2 empty cells on massive boards for breathing room
  if (targetArrows > totalCells - 1) targetArrows = totalCells - 1;

  let puzzle;
  let isValid = false;
  let maxLoopAttempts = 0;

  while (!isValid && maxLoopAttempts < 50) {
    maxLoopAttempts++;
    const board = Array(size).fill(null).map(() => Array(size).fill(null));
    const arrows = [];
    
    // We attempt to place arrows using reverse-engineering
    let attempts = 0;
    while (arrows.length < targetArrows && attempts < 800) {
      attempts++;
      
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      
      if (board[r][c] !== null) continue;

      // Randomize direction
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      
      // REVERSE ENGINEERING:
      // Arrow pointing DIR must slide in from opposite direction
      let canSlideIn = true;
      if (dir === 'UP') {
        for (let i = 0; i < r; i++) {
          if (board[i][c] !== null) { canSlideIn = false; break; }
        }
      } else if (dir === 'DOWN') {
        for (let i = r + 1; i < size; i++) {
          if (board[i][c] !== null) { canSlideIn = false; break; }
        }
      } else if (dir === 'LEFT') {
        for (let j = 0; j < c; j++) {
          if (board[r][j] !== null) { canSlideIn = false; break; }
        }
      } else if (dir === 'RIGHT') {
        for (let j = c + 1; j < size; j++) {
          if (board[r][j] !== null) { canSlideIn = false; break; }
        }
      }

      if (canSlideIn) {
        // Pick a color distinct from immediate neighbours if possible
        const color = TILE_COLORS[arrows.length % TILE_COLORS.length];
        
        const arrow = {
          id: `arrow_${levelIndex}_${arrows.length}`,
          row: r,
          col: c,
          direction: dir,
          color: color
        };
        
        board[r][c] = arrow;
        arrows.push(arrow);
      }
    }

    puzzle = {
      id: `procedural_${levelIndex}_${Date.now()}_${maxLoopAttempts}`,
      size: size,
      arrows: arrows,
      difficultyLabel: label,
      isProcedural: true
    };

    // Forward simulation solver verify
    const result = solveLevel(puzzle.arrows);
    if (result.isSolvable && puzzle.arrows.length >= Math.min(3, targetArrows - 2)) {
      isValid = true;
    }
  }

  return puzzle;
};

export const runGeneratorTest = () => {
  console.log("🚀 STARTING DENSE PUZZLE GENERATOR TEST (1000 LEVELS) 🚀");
  let solvableCount = 0;
  let failedCount = 0;
  let totalMoves = 0;

  for (let i = 0; i < 1000; i++) {
    const puzzle = generateLevel(i + 1);
    const result = solveLevel(puzzle.arrows);
    
    if (result.isSolvable) {
      solvableCount++;
      totalMoves += result.movesToSolve;
    } else {
      failedCount++;
      console.error(`🚨 DEADLOCK DETECTED at level ${i + 1}:`, puzzle);
    }
  }

  console.log("==========================================");
  console.log(`TOTAL TESTED: 1000`);
  console.log(`TOTAL SOLVABLE: ${solvableCount}`);
  console.log(`TOTAL FAILED: ${failedCount}`);
  console.log(`AVERAGE MOVES: ${(totalMoves / 1000).toFixed(1)}`);
  console.log("==========================================");
};
