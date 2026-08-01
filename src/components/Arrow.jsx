import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import './Arrow.css';

const Arrow = ({ arrow, onClick, isBlocked, gridSize = 4 }) => {
  if (!arrow) return <div className="cell empty"></div>;

  // Dynamic icon sizing based on board density
  const getIconSize = () => {
    if (gridSize <= 3) return 36;
    if (gridSize === 4) return 32;
    if (gridSize === 5) return 26;
    if (gridSize === 6) return 22;
    if (gridSize === 7) return 18;
    return 16;
  };

  const iconSize = getIconSize();
  const strokeWidth = gridSize >= 6 ? 3 : 3.5;

  const directionIcons = {
    UP: <ArrowUp size={iconSize} strokeWidth={strokeWidth} />,
    DOWN: <ArrowDown size={iconSize} strokeWidth={strokeWidth} />,
    LEFT: <ArrowLeft size={iconSize} strokeWidth={strokeWidth} />,
    RIGHT: <ArrowRight size={iconSize} strokeWidth={strokeWidth} />,
  };

  // Flying exit animations
  const exitAnimation = {
    UP: { y: -600, scale: 0.6, opacity: 0 },
    DOWN: { y: 600, scale: 0.6, opacity: 0 },
    LEFT: { x: -600, scale: 0.6, opacity: 0 },
    RIGHT: { x: 600, scale: 0.6, opacity: 0 }
  };

  return (
    <motion.div 
      className={`cell arrow-block ${isBlocked ? 'blocked' : ''}`}
      onClick={() => onClick(arrow)}
      style={{
        backgroundColor: arrow.color || '#4ECDC4',
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.92, y: 2 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isBlocked ? 
        { 
          x: [0, -8, 8, -8, 8, 0],
          scale: [1, 1.05, 1, 1.05, 1],
          opacity: 1 
        } : 
        { scale: 1, opacity: 1, x: 0 }
      }
      transition={isBlocked ? { duration: 0.35 } : { type: 'spring', stiffness: 350, damping: 20 }}
      exit={{ ...exitAnimation[arrow.direction], transition: { duration: 0.28, ease: "easeIn" } }}
    >
      <div className="arrow-block-shine"></div>
      <div className="arrow-icon-wrapper">
        {directionIcons[arrow.direction]}
      </div>
    </motion.div>
  );
};

export default Arrow;
