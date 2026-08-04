/**
 * src/timeArrow/components/TimeTile.jsx
 * 3D Candy Arrow Tile Component for Time Arrow
 * (Zero dependencies on Brain Arrow)
 */

import React from 'react';
import { motion } from 'framer-motion';
import TimeArrowPiece from './TimeArrowPiece';
import { EXIT_VARIANTS, EXIT_TRANSITION, BLOCKED_SHAKE } from '../engine/TimeAnimations';
import '../styles/TimeTile.css';

const TimeTile = ({ 
  arrow, 
  onClick, 
  isBlocked, 
  isFlying,
  tileSize = 64,
  gridSize = 4 
}) => {
  if (!arrow) {
    return <div className="time-tile-empty" />;
  }

  // Dynamic icon sizing based on tile metrics
  const iconSize = Math.max(18, Math.min(34, Math.floor(tileSize * 0.48)));
  const strokeWidth = gridSize >= 6 ? 3 : 3.8;

  const exitTarget = EXIT_VARIANTS[arrow.direction] || EXIT_VARIANTS.UP;

  return (
    <motion.div 
      className="time-tile-container"
      style={{ width: tileSize, height: tileSize }}
      onClick={() => onClick && onClick(arrow)}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={
        isFlying
          ? exitTarget
          : (isBlocked
              ? BLOCKED_SHAKE
              : { scale: 1, opacity: 1, x: 0, y: 0 }
            )
      }
      transition={isFlying ? EXIT_TRANSITION : { type: 'spring', stiffness: 420, damping: 22 }}
      whileHover={!isFlying && !isBlocked ? { scale: 1.05, y: -2 } : {}}
      whileTap={!isFlying && !isBlocked ? { scale: 0.92, y: 3 } : {}}
    >
      <div 
        className={`time-tile-block ${isBlocked ? 'time-tile-blocked' : ''}`}
        style={{
          backgroundColor: arrow.color || '#00D2D3'
        }}
      >
        <div className="time-tile-sheen" />
        <div className="time-tile-icon-wrapper">
          <TimeArrowPiece 
            direction={arrow.direction} 
            size={iconSize} 
            strokeWidth={strokeWidth}
            color="#FFFFFF"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(TimeTile);
