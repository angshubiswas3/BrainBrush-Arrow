/**
 * HistoryManager.js
 * Handles unlimited Undo / Redo history for the Level Editor.
 */

export class HistoryManager {
  constructor(maxHistory = 1000) {
    this.maxHistory = maxHistory;
    this.undoStack = [];
    this.redoStack = [];
  }

  /**
   * Push a deep snapshot of the editor state onto the stack.
   * @param {Object} state - { board, size, gridSize, metadata, gameType }
   */
  push(state) {
    const snapshot = JSON.stringify(state);
    // Avoid pushing duplicate identical states
    if (this.undoStack.length > 0 && this.undoStack[this.undoStack.length - 1] === snapshot) {
      return;
    }
    this.undoStack.push(snapshot);
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    // Clear redo stack on new action
    this.redoStack = [];
  }

  canUndo() {
    return this.undoStack.length > 1;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }

  undo(currentState) {
    if (!this.canUndo()) return null;
    
    // Push current snapshot to redo stack
    const currentSnapshot = JSON.stringify(currentState);
    if (this.redoStack.length === 0 || this.redoStack[this.redoStack.length - 1] !== currentSnapshot) {
      this.redoStack.push(currentSnapshot);
    }

    // Pop the current state top
    this.undoStack.pop();
    const previousSnapshot = this.undoStack[this.undoStack.length - 1];
    return JSON.parse(previousSnapshot);
  }

  redo(currentState) {
    if (!this.canRedo()) return null;
    
    const nextSnapshot = this.redoStack.pop();
    this.undoStack.push(nextSnapshot);
    return JSON.parse(nextSnapshot);
  }

  clear() {
    this.undoStack = [];
    this.redoStack = [];
  }
}

export default HistoryManager;
