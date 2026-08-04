import React, { useMemo } from 'react';
import { getWorldForLevel } from './worldThemes';
import './WorldDecorations.css';

const WorldDecorations = ({ nodes, mapWidth }) => {
  // Generate decorative props flanking the left and right sides of the road
  const decorItems = useMemo(() => {
    const items = [];

    nodes.forEach((node, idx) => {
      const world = getWorldForLevel(node.levelNumber);
      const decors = world.decorations || [];
      if (decors.length === 0) return;

      // Place a prop every 2-3 levels on alternating sides
      if (idx % 2 === 0) {
        const decorObj = decors[idx % decors.length];
        
        // Calculate offset to ensure props sit outside the road area
        // If node is to the right of center, place prop on far left, and vice versa
        const isNodeRight = node.x > mapWidth / 2;
        const propX = isNodeRight 
          ? Math.max(25, node.x - 145 - (idx % 3) * 15)
          : Math.min(mapWidth - 35, node.x + 145 + (idx % 3) * 15);
        
        const propY = node.y + ((idx % 4) - 2) * 16;

        items.push({
          id: `decor_${node.levelNumber}_${idx}`,
          level: node.levelNumber,
          icon: decorObj.icon,
          scale: decorObj.scale || 1,
          type: decorObj.type,
          x: propX,
          y: propY,
          swayDelay: (idx * 0.7) % 3
        });
      }

      // Add special landmark props at key milestones
      if (node.levelNumber % 10 === 0) {
        const isLeft = (node.levelNumber / 10) % 2 === 0;
        const landmarkIcon = world.id === 1 ? '⛩️' : (world.id === 2 ? '🏛️' : (world.id === 3 ? '🏔️' : (world.id === 4 ? '🐉' : '🪐')));
        items.push({
          id: `landmark_${node.levelNumber}`,
          level: node.levelNumber,
          icon: landmarkIcon,
          scale: 1.45,
          type: 'LANDMARK',
          x: isLeft ? 38 : mapWidth - 45,
          y: node.y - 30,
          swayDelay: 1.2
        });
      }
    });

    return items;
  }, [nodes, mapWidth]);

  return (
    <div className="world-decorations-layer">
      {decorItems.map((item) => (
        <div
          key={item.id}
          className={`map-decor-item decor-${item.type.toLowerCase()}`}
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            transform: `scale(${item.scale})`,
            animationDelay: `${item.swayDelay}s`
          }}
        >
          <span className="decor-icon">{item.icon}</span>
        </div>
      ))}
    </div>
  );
};

export default WorldDecorations;
