import React from 'react';

/**
 * Symmetrical, Sleek Vector ArrowHead Tile Component.
 * Rotations:
 * - 0deg: Exits RIGHT
 * - 90deg: Exits DOWN
 * - 180deg: Exits LEFT
 * - 270deg: Exits UP
 */
const ArrowHead = ({ 
  color = '#0f172a', 
  strokeWidth = 8, 
  rotation = 0, 
  short = false,
  style = {} 
}) => {
  const stemStartX = short ? 40 : 0;

  return (
    <svg 
      viewBox="0 0 100 100" 
      className="puzzle-tile-svg puzzle-piece-arrowhead"
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
      {/* Seamless Inbound Stem Segment */}
      <line 
        x1={stemStartX} 
        y1="50" 
        x2="56" 
        y2="50" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap={short ? "round" : "square"}
      />

      {/* Symmetrical, Sleek Sharp Arrowhead Polygon */}
      <polygon 
        points="74,50 46,34 52,50 46,66" 
        fill={color} 
        stroke={color}
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowHead;
