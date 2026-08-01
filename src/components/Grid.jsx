import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Arrow from './Arrow';
import './Grid.css';

const Grid = ({ levelData, onLevelComplete, onWrongMove }) => {
  const [arrows, setArrows] = useState(levelData.arrows);
  const [blockedId, setBlockedId] = useState(null);

  // Check for level completion
  useEffect(() => {
    if (arrows.length === 0) {
      const timer = setTimeout(() => {
        onLevelComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [arrows.length, onLevelComplete]);

  const checkPathClear = (arrow, currentArrows) => {
    const { row, col, direction } = arrow;
    return !currentArrows.some(other => {
      if (other.id === arrow.id) return false;
      switch (direction) {
        case 'UP': return other.col === col && other.row < row;
        case 'DOWN': return other.col === col && other.row > row;
        case 'LEFT': return other.row === row && other.col < col;
        case 'RIGHT': return other.row === row && other.col > col;
        default: return false;
      }
    });
  };

  const handleArrowClick = (arrow) => {
    const isClear = checkPathClear(arrow, arrows);

    if (isClear) {
      // Remove arrow with flight animation
      setArrows(prev => prev.filter(a => a.id !== arrow.id));
    } else {
      setBlockedId(arrow.id);
      if (onWrongMove) onWrongMove();
      setTimeout(() => setBlockedId(null), 350); 
    }
  };

  const size = levelData.size || 4;
  
  // Calculate dynamic cell size & gap to fit any mobile viewport perfectly
  const getCellMetrics = (gridSize) => {
    if (gridSize <= 3) return { cellSize: 78, gap: 12, radius: 18 };
    if (gridSize === 4) return { cellSize: 68, gap: 10, radius: 16 };
    if (gridSize === 5) return { cellSize: 56, gap: 8, radius: 14 };
    if (gridSize === 6) return { cellSize: 48, gap: 6, radius: 12 };
    if (gridSize === 7) return { cellSize: 42, gap: 5, radius: 10 };
    return { cellSize: 37, gap: 4, radius: 8 };
  };

  const { cellSize, gap } = getCellMetrics(size);

  const gridCells = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const arrow = arrows.find(a => a.row === r && a.col === c);
      const isBlocked = arrow && arrow.id === blockedId;

      gridCells.push(
        <div 
          key={`cell-${r}-${c}`} 
          className="grid-cell-container"
          style={{ width: cellSize, height: cellSize }}
        >
          <AnimatePresence mode="wait">
            {arrow && (
              <Arrow 
                key={arrow.id}
                arrow={arrow} 
                isBlocked={isBlocked}
                gridSize={size}
                onClick={handleArrowClick} 
              />
            )}
          </AnimatePresence>
          {!arrow && <div className="cell empty"></div>}
        </div>
      );
    }
  }

  return (
    <motion.div 
      className="grid-board-wrapper"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div 
        className="grid-board"
        style={{ 
          gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
          gap: `${gap}px`,
          padding: `${Math.max(12, gap * 1.5)}px`
        }}
      >
        {gridCells}
      </div>
    </motion.div>
  );
};

export default Grid;
