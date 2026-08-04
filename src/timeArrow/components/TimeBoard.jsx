/**
 * src/timeArrow/components/TimeBoard.jsx
 * Independent 3D Candy Arrow Grid Board for Time Arrow
 * (Zero dependencies on Brain Arrow)
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimeTile from './TimeTile';
import { isArrowPathClear } from '../engine/TimeSolver';
import '../styles/TimeBoard.css';

const TimeBoard = ({ 
  boardData, 
  onSuccessMove, 
  onWrongMove 
}) => {
  const data = boardData || {};
  const currentArrows = data.board || [];
  const gridSize = data.gridSize || 4;

  const [flyingIds, setFlyingIds] = useState([]);
  const [blockedId, setBlockedId] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const [floaters, setFloaters] = useState([]);

  const containerRef = useRef(null);

  // Clear animation state on new board load
  useEffect(() => {
    setFlyingIds([]);
    setBlockedId(null);
    setSparkles([]);
    setFloaters([]);
  }, [data.instanceId, data.id]);

  // Responsive tile metrics calculation
  const getBoardMetrics = (size) => {
    if (size <= 3) return { tileSize: 78, gap: 12, padding: 16 };
    if (size === 4) return { tileSize: 68, gap: 10, padding: 14 };
    if (size === 5) return { tileSize: 56, gap: 8, padding: 12 };
    if (size === 6) return { tileSize: 48, gap: 6, padding: 10 };
    if (size === 7) return { tileSize: 42, gap: 5, padding: 8 };
    return { tileSize: 36, gap: 4, padding: 8 };
  };

  const { tileSize, gap, padding } = getBoardMetrics(gridSize);

  const handleTileClick = (arrow) => {
    if (flyingIds.includes(arrow.id)) return;

    const isClear = isArrowPathClear(arrow, currentArrows);

    if (isClear) {
      // Calculate coordinates for sparkle burst
      const x = arrow.col * (tileSize + gap) + tileSize / 2 + padding;
      const y = arrow.row * (tileSize + gap) + tileSize / 2 + padding;

      const sparkId = `sp_${Date.now()}_${Math.random()}`;
      setSparkles((prev) => [...prev, { id: sparkId, x, y }]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkId));
      }, 500);

      // Trigger flying animation
      setFlyingIds((prev) => [...prev, arrow.id]);

      // Complete removal & state update after snappy flight duration
      setTimeout(() => {
        if (onSuccessMove) onSuccessMove(arrow.id);
        setFlyingIds((prev) => prev.filter((id) => id !== arrow.id));
      }, 260);
    } else {
      // Blocked move
      setBlockedId(arrow.id);
      if (onWrongMove) onWrongMove();
      setTimeout(() => setBlockedId(null), 340);
    }
  };

  // Build grid matrix
  const gridCells = [];
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const arrow = currentArrows.find((a) => a.row === r && a.col === c);
      const isFlying = arrow && flyingIds.includes(arrow.id);
      const isBlocked = arrow && blockedId === arrow.id;

      gridCells.push(
        <TimeTile
          key={`cell_${r}_${c}_${arrow ? arrow.id : 'empty'}`}
          arrow={arrow}
          onClick={handleTileClick}
          isBlocked={isBlocked}
          isFlying={isFlying}
          tileSize={tileSize}
          gridSize={gridSize}
        />
      );
    }
  }

  return (
    <div className="time-board-stage" ref={containerRef}>
      <motion.div 
        className="time-board-frame"
        style={{
          padding: `${padding}px`
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 25 }}
      >
        <div 
          className="time-board-grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, ${tileSize}px)`,
            gridTemplateRows: `repeat(${gridSize}, ${tileSize}px)`,
            gap: `${gap}px`
          }}
        >
          {gridCells}
        </div>

        {/* Sparkle Burst Effects */}
        {sparkles.map((s) => (
          <div 
            key={s.id} 
            className="time-sparkle-burst"
            style={{ left: s.x, top: s.y }}
          >
            <span className="time-sparkle-star">✨</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default React.memo(TimeBoard);
