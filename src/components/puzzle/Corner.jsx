import React from 'react';

/**
 * Quarter-circle smooth 90deg corner bend with true circular radius (R=50).
 * Default (0deg): Connects Left (0, 50) to Top (50, 0).
 * Rotations:
 * - 0deg: Left to Top (NW)
 * - 90deg: Top to Right (NE)
 * - 180deg: Right to Bottom (SE)
 * - 270deg: Bottom to Left (SW)
 */
const Corner = ({ color = '#0f172a', strokeWidth = 8, rotation = 0, style = {} }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="puzzle-tile-svg puzzle-piece-corner"
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
      <path 
        d="M 0 50 L 50 50 L 50 0" 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Corner;
