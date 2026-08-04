/**
 * src/timeArrow/components/TimeArrowPiece.jsx
 * Directional Arrow Icon Vector Component for Time Arrow
 * (Zero dependencies on Brain Arrow)
 */

import React from 'react';

const ARROW_PATHS = {
  UP: "M12 19V5M12 5L5 12M12 5L19 12",
  DOWN: "M12 5V19M12 19L5 12M12 19L19 12",
  LEFT: "M19 12H5M5 12L12 19M5 12L12 5",
  RIGHT: "M5 12H19M19 12L12 5M19 12L12 19"
};

const TimeArrowPiece = ({ direction = 'UP', size = 28, strokeWidth = 3.5, color = '#FFFFFF' }) => {
  const pathData = ARROW_PATHS[direction] || ARROW_PATHS.UP;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <path 
        d={pathData} 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

export default React.memo(TimeArrowPiece);
