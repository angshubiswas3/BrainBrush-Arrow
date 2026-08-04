import React from 'react';

/**
 * Cross 4-way intersection piece on a 100x100 tile.
 */
const Cross = ({ color = '#0f172a', strokeWidth = 8, rotation = 0, style = {} }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="puzzle-tile-svg puzzle-piece-cross"
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
      <line 
        x1="50" 
        y1="0" 
        x2="50" 
        y2="100" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="square"
      />
    </svg>
  );
};

export default Cross;
