import React from 'react';

/**
 * Terminal Dead End / Tail piece on a 100x100 tile.
 * Default (0deg): Starts with a rounded terminal cap at (38, 50) and extends to Right (100, 50).
 * Rotations: 0deg (Right), 90deg (Down), 180deg (Left), 270deg (Up).
 */
const DeadEnd = ({ color = '#0f172a', strokeWidth = 8, rotation = 0, style = {} }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="puzzle-tile-svg puzzle-piece-deadend"
      style={{ 
        width: '100%', 
        height: '100%', 
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        overflow: 'visible',
        display: 'block',
        ...style 
      }}
    >
      <line 
        x1="38" 
        y1="50" 
        x2="100" 
        y2="50" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DeadEnd;
