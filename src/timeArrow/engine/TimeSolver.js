/**
 * src/timeArrow/engine/TimeSolver.js
 * Independent Forward Simulation & Raycast Solver for Time Arrow
 * (Zero dependencies on Brain Arrow)
 */

/**
 * Checks if a specific arrow has an unobstructed exit path to the grid boundary.
 * @param {Object} arrow - { id, row, col, direction }
 * @param {Array} currentArrows - Array of active arrows currently on the board
 * @returns {boolean} True if the path is 100% clear to the edge
 */
export const isArrowPathClear = (arrow, currentArrows) => {
  if (!arrow) return false;
  const { id, row, col, direction } = arrow;

  return !currentArrows.some((other) => {
    if (other.id === id) return false;

    switch (direction) {
      case 'UP':
        return other.col === col && other.row < row;
      case 'DOWN':
        return other.col === col && other.row > row;
      case 'LEFT':
        return other.row === row && other.col < col;
      case 'RIGHT':
        return other.row === row && other.col > col;
      default:
        return false;
    }
  });
};

/**
 * Returns all arrows currently on the board that can be tapped safely.
 * @param {Array} arrows 
 * @returns {Array} List of clear arrows
 */
export const getAvailableMoves = (arrows) => {
  return arrows.filter((arrow) => isArrowPathClear(arrow, arrows));
};

/**
 * Forward simulation solver to verify puzzle solvability and compute full solution sequence.
 * @param {Array} arrows - Array of arrow objects
 * @returns {Object} { isSolvable: boolean, movesToSolve: number, solution: string[], deadlocked: boolean }
 */
export const solveTimeLevel = (arrows) => {
  const remaining = [...arrows];
  const solution = [];
  let moves = 0;

  while (remaining.length > 0) {
    let moved = false;

    for (let i = 0; i < remaining.length; i++) {
      const arrow = remaining[i];
      if (isArrowPathClear(arrow, remaining)) {
        solution.push(arrow.id);
        remaining.splice(i, 1);
        moved = true;
        moves++;
        break; // Board state modified, re-evaluate from first available
      }
    }

    if (!moved) {
      // Deadlock detected
      break;
    }
  }

  return {
    isSolvable: remaining.length === 0,
    movesToSolve: moves,
    solution,
    deadlocked: remaining.length > 0,
    remainingCount: remaining.length
  };
};

export default {
  isArrowPathClear,
  getAvailableMoves,
  solveTimeLevel
};
