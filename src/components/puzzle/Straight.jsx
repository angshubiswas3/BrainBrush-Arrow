import React from 'react';

/**
 * Straight path segment on a 100x100 tile.
 * Default (0deg): Horizontal path from (0, 50) to (100, 50).
 * Rotation: 0 (Horizontal), 90 (Vertical).
 */
const Straight = ({ color = '#0f172a', strokeWidth = 8, rotation = 0, style = {} }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="puzzle-tile-svg puzzle-piece-straight"
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
        x1="0" 
        y1="50" 
        x2="100" 
        y2="50" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="square"
      />
    </svg>
  );
};

export default Straight;
