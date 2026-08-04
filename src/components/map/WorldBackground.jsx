import React, { useMemo } from 'react';
import { WORLD_BIOMES } from './worldThemes';
import './WorldBackground.css';

const WorldBackground = ({ totalLevels, totalHeight, nodeSpacingY }) => {
  // Generate environmental world segments
  const worldSegments = useMemo(() => {
    return WORLD_BIOMES.map((world) => {
      // Calculate top and bottom Y coordinates for each world
      // Level 1 is near bottom (TOTAL_HEIGHT - 80), higher levels go upward
      const startLevelY = totalHeight - (world.start * nodeSpacingY) + 50;
      const endLevelY = Math.max(0, totalHeight - (world.end * nodeSpacingY) - 50);
      const segmentHeight = Math.abs(startLevelY - endLevelY) + nodeSpacingY;
      const topY = Math.min(startLevelY, endLevelY);

      return {
        ...world,
        topY,
        height: segmentHeight
      };
    });
  }, [totalLevels, totalHeight, nodeSpacingY]);

  return (
    <div className="world-bg-root" style={{ height: `${totalHeight}px` }}>
      {/* Dynamic World Biome Vertical Zones */}
      {worldSegments.map((seg) => (
        <div
          key={`seg-${seg.id}`}
          className={`world-biome-zone biome-${seg.id}`}
          style={{
            top: `${seg.topY}px`,
            height: `${seg.height}px`,
            background: seg.bgGradient
          }}
        >
          {/* Ambient Lighting Rays */}
          <div 
            className="biome-ambient-light" 
            style={{ background: `radial-gradient(circle at 50% 30%, ${seg.ambientLight}, transparent 70%)` }}
          />

          {/* Ambient Floating Particles */}
          <div className="biome-particles-container">
            {seg.particleType === 'LEAVES' && (
              <>
                <span className="p-leaf leaf-1">🍃</span>
                <span className="p-leaf leaf-2">🍂</span>
                <span className="p-leaf leaf-3">🍃</span>
                <span className="p-firefly firefly-1"></span>
                <span className="p-firefly firefly-2"></span>
                <span className="p-firefly firefly-3"></span>
              </>
            )}

            {seg.particleType === 'SAND_DUST' && (
              <>
                <span className="p-dust dust-1"></span>
                <span className="p-dust dust-2"></span>
                <span className="p-dust dust-3"></span>
                <span className="p-wind wind-1">💨</span>
              </>
            )}

            {seg.particleType === 'SNOWFLAKES' && (
              <>
                <span className="p-snow snow-1">❄️</span>
                <span className="p-snow snow-2">❄️</span>
                <span className="p-snow snow-3">✨</span>
                <span className="p-snow snow-4">❄️</span>
              </>
            )}

            {seg.particleType === 'LAVA_EMBERS' && (
              <>
                <span className="p-ember ember-1"></span>
                <span className="p-ember ember-2"></span>
                <span className="p-ember ember-3"></span>
                <span className="p-smoke smoke-1">💨</span>
              </>
            )}

            {seg.particleType === 'COSMIC_STARS' && (
              <>
                <span className="p-star star-1">✨</span>
                <span className="p-star star-2">⭐</span>
                <span className="p-star star-3">🌟</span>
                <span className="p-star star-4">✨</span>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Floating Global Cloud Layer */}
      <div className="global-clouds-layer">
        <div className="drift-cloud c1" style={{ top: '8%' }}>☁️</div>
        <div className="drift-cloud c2" style={{ top: '24%' }}>☁️</div>
        <div className="drift-cloud c3" style={{ top: '48%' }}>☁️</div>
        <div className="drift-cloud c4" style={{ top: '72%' }}>☁️</div>
        <div className="drift-cloud c5" style={{ top: '88%' }}>☁️</div>
      </div>
    </div>
  );
};

export default WorldBackground;
