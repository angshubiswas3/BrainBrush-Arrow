import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import MapNode from '../components/MapNode';
import { WORLDS, WorldBanner, MilestoneChest, AmbientElement } from '../components/BiomeDecorations';
import { ChevronLeft, Star, Coins, Target, Award } from 'lucide-react';
import './AdventureMap.css';

const TOTAL_LEVELS = 100;
const STEP_Y = 110;
const TOTAL_HEIGHT = (TOTAL_LEVELS + 1) * STEP_Y + 120;
const MAP_WIDTH = 380;
const CENTER_X = MAP_WIDTH / 2;
const AMPLITUDE = 115;
const FREQUENCY = 0.62;

const AdventureMap = () => {
  const { 
    unlockedLevels = 1, 
    levelStars = {}, 
    stars = 0, 
    coins = 0, 
    selectLevel, 
    goHome 
  } = useGameStore();

  const scrollContainerRef = useRef(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Compute all node coordinates
  const nodes = useMemo(() => {
    const list = [];
    for (let i = 1; i <= TOTAL_LEVELS; i++) {
      const y = TOTAL_HEIGHT - (i * STEP_Y);
      const x = CENTER_X + Math.sin(i * FREQUENCY) * AMPLITUDE;
      
      let status = 'LOCKED';
      if (i < unlockedLevels) {
        status = 'COMPLETED';
      } else if (i === unlockedLevels) {
        status = 'ACTIVE';
      }

      list.push({
        levelNumber: i,
        x,
        y,
        status,
        stars: levelStars[i - 1] || 0,
        isMilestone: i % 5 === 0
      });
    }
    return list;
  }, [unlockedLevels, levelStars]);

  // Compute SVG Bezier Path strings
  const { basePathString, activePathString } = useMemo(() => {
    let fullPath = '';
    let activePath = '';

    for (let i = 0; i < nodes.length - 1; i++) {
      const curr = nodes[i];
      const next = nodes[i + 1];

      const c1x = curr.x;
      const c1y = curr.y - STEP_Y * 0.5;
      const c2x = next.x;
      const c2y = next.y + STEP_Y * 0.5;

      const segment = `M ${curr.x} ${curr.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${next.x} ${next.y} `;
      fullPath += segment;

      // Only draw active path up to unlocked levels
      if (curr.levelNumber < unlockedLevels) {
        activePath += segment;
      }
    }

    return { basePathString: fullPath, activePathString: activePath };
  }, [nodes, unlockedLevels]);

  // Auto-scroll to active level on mount
  useEffect(() => {
    const activeNode = nodes.find(n => n.status === 'ACTIVE') || nodes[0];
    if (activeNode && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetScroll = activeNode.y - container.clientHeight / 2;
      
      // Delay slightly for initial DOM render
      const timer = setTimeout(() => {
        container.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [nodes]);

  const scrollToActive = () => {
    const activeNode = nodes.find(n => n.status === 'ACTIVE') || nodes[0];
    if (activeNode && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: activeNode.y - scrollContainerRef.current.clientHeight / 2,
        behavior: 'smooth'
      });
    }
  };

  const handleLockedClick = (levelNum) => {
    setToastMessage(`🔒 Complete Level ${levelNum - 1} to unlock this stage!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="adventure-map-page">
      {/* Sticky Top Header */}
      <header className="map-top-bar">
        <button className="map-btn-back" onClick={goHome}>
          <ChevronLeft size={28} color="#0f172a" strokeWidth={2.5} />
        </button>

        <div className="map-header-title">
          <h2>Adventure Map</h2>
          <span>Stage {unlockedLevels} / 100</span>
        </div>

        <div className="map-resources">
          <div className="res-pill stars">
            <Star size={16} fill="#fbbf24" color="#f59e0b" />
            <span>{stars}</span>
          </div>
          <div className="res-pill coins">
            <Coins size={16} color="#eab308" />
            <span>{coins}</span>
          </div>
        </div>
      </header>

      {/* Interactive Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            className="map-toast"
            initial={{ y: -40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Scrollable Adventure Viewport */}
      <div className="map-scroll-viewport" ref={scrollContainerRef}>
        <div 
          className="map-canvas-container"
          style={{ height: `${TOTAL_HEIGHT}px`, width: `${MAP_WIDTH}px` }}
        >
          {/* Biome World Gradient Backgrounds */}
          <div className="map-biome-layers">
            {WORLDS.map((world, idx) => {
              const startY = TOTAL_HEIGHT - (world.endLevel * STEP_Y);
              const endY = TOTAL_HEIGHT - (world.startLevel * STEP_Y);
              const height = endY - startY + STEP_Y;

              return (
                <div 
                  key={`biome-${world.id}`} 
                  className="biome-band"
                  style={{
                    top: `${startY}px`,
                    height: `${height}px`,
                    background: world.gradient
                  }}
                >
                  <WorldBanner world={world} yPosition={20} />
                </div>
              );
            })}
          </div>

          {/* SVG Winding Road Track */}
          <svg className="map-road-svg" width={MAP_WIDTH} height={TOTAL_HEIGHT}>
            <defs>
              <linearGradient id="unlockedGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Locked Track */}
            <path 
              d={basePathString} 
              className="road-base-path" 
            />

            {/* Glowing Unlocked Progression Track */}
            <path 
              d={activePathString} 
              className="road-active-path" 
            />
          </svg>

          {/* Ambient Particles & Floating Decor */}
          {nodes.filter(n => n.levelNumber % 4 === 0).map((node, idx) => (
            <AmbientElement 
              key={`ambient-${idx}`} 
              type={idx % 2 === 0 ? 'cloud' : 'sparkle'} 
              x={node.x + (idx % 2 === 0 ? 80 : -80)} 
              y={node.y - 30} 
              delay={idx}
            />
          ))}

          {/* Level Platform Nodes */}
          {nodes.map((node) => (
            <div 
              key={`node-wrapper-${node.levelNumber}`} 
              style={{ position: 'absolute', left: `${node.x}px`, top: `${node.y}px` }}
            >
              <MapNode
                levelNumber={node.levelNumber}
                status={node.status}
                starsEarned={node.stars}
                isMilestone={node.isMilestone}
                onClick={selectLevel}
                onLockedClick={handleLockedClick}
              />
            </div>
          ))}

          {/* Milestone Treasure Chests */}
          {nodes.filter(n => n.levelNumber % 10 === 0).map((node) => (
            <MilestoneChest 
              key={`chest-${node.levelNumber}`}
              levelNumber={node.levelNumber}
              isUnlocked={node.status === 'COMPLETED'}
              x={node.x + (node.levelNumber % 20 === 0 ? 85 : -85)}
              y={node.y}
              onClaim={(lvl) => setToastMessage(`🎁 Reached Level ${lvl} milestone chest!`)}
            />
          ))}
        </div>
      </div>

      {/* Floating Center-Camera Target Button */}
      <motion.button 
        className="btn-recenter-fab"
        onClick={scrollToActive}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Jump to Current Level"
      >
        <Target size={24} color="#ffffff" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
};

export default AdventureMap;
