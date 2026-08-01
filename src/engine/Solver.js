/**
 * Validates a puzzle by forward-simulating a perfect player.
 * @param {Array} arrows - The array of arrow objects on the board.
 * @returns {Object} - Result of the solve attempt.
 */
export const solveLevel = (arrows) => {
  let remaining = [...arrows];
  let moves = 0;
  
  while (remaining.length > 0) {
    let madeMove = false;
    
    // Find an arrow that can escape
    for (let i = 0; i < remaining.length; i++) {
      let arrow = remaining[i];
      let isClear = true;
      
      // Check if any other remaining arrow blocks it's path to the edge
      for (let j = 0; j < remaining.length; j++) {
        if (i === j) continue;
        let other = remaining[j];
        
        if (arrow.direction === 'UP' && other.col === arrow.col && other.row < arrow.row) isClear = false;
        if (arrow.direction === 'DOWN' && other.col === arrow.col && other.row > arrow.row) isClear = false;
        if (arrow.direction === 'LEFT' && other.row === arrow.row && other.col < arrow.col) isClear = false;
        if (arrow.direction === 'RIGHT' && other.row === arrow.row && other.col > arrow.col) isClear = false;
      }
      
      if (isClear) {
        remaining.splice(i, 1);
        madeMove = true;
        moves++;
        break; // Board state changed, restart scan
      }
    }
    
    if (!madeMove) {
      // Scanned all arrows and none can move -> DEADLOCK
      break; 
    }
  }
  
  return {
    isSolvable: remaining.length === 0,
    movesToSolve: moves,
    arrowsRemaining: remaining.length
  };
};
