import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import MapNode from '../components/MapNode';
import Toast from '../components/Toast';
import { ChevronLeft, Star, Coins, Play, Sparkles } from 'lucide-react';
import './AdventureMap.css';

// Thematic World Biomes
const WORLDS = [
  { id: 1, name: 'Emerald Forest', start: 1, end: 25, icon: '🌿' },
  { id: 2, name: 'Crystal Peaks', start: 26, end: 50, icon: '❄️' },
  { id: 3, name: 'Sunset Oasis', start: 51, end: 75, icon: '🏜️' },
  { id: 4, name: 'Cyber Nexus', start: 76, end: 100, icon: '⚡' },
  { id: 5, name: 'Starlight Cosmos', start: 101, end: 999, icon: '🌌' }
];

const AdventureMap = () => {
  const { 
    gameType,
    timeArrowProgress,
    brainArrowProgress,
    coins, 
    stars, 
    playLevel, 
    goHome 
  } = useGameStore();

  const progress = gameType === 'BRAIN_ARROW' ? brainArrowProgress : timeArrowProgress;
  const unlockedLevels = progress?.unlockedLevels || 1;
  const levelStars = progress?.levelStars || {};

  const scrollContainerRef = useRef(null);
  const nodeRefs = useRef({});
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'lock' });

  // Map Geometry Configuration
  const totalLevels = Math.max(50, unlockedLevels + 10);
  const NODE_SPACING_Y = 110;
  const MAP_WIDTH = 380;
  const TOTAL_HEIGHT = totalLevels * NODE_SPACING_Y + 240;

  // Calculate Node Positions (Sine-wave S-curve)
  const nodes = [];
  for (let i = 1; i <= totalLevels; i++) {
    const y = TOTAL_HEIGHT - (i * NODE_SPACING_Y) - 80;
    const x = MAP_WIDTH / 2 + Math.sin((i - 1) * 0.85) * (MAP_WIDTH * 0.32);

    let status = 'LOCKED';
    if (i < unlockedLevels) status = 'COMPLETED';
    else if (i === unlockedLevels) status = 'CURRENT';

    let milestoneType = null;
    if (i % 25 === 0) milestoneType = 'BOSS_PORTAL';
    else if (i % 10 === 0) milestoneType = 'CHEST_BIG';
    else if (i % 5 === 0) milestoneType = 'CHEST_SMALL';

    nodes.push({
      levelNumber: i,
      x,
      y,
      status,
      stars: levelStars[i - 1] || (status === 'COMPLETED' ? 3 : 0),
      milestoneType
    });
  }

  // Auto-scroll to Current Level
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentNodeEl = nodeRefs.current[unlockedLevels];
      if (currentNodeEl) {
        currentNodeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [unlockedLevels]);

  const handleNodeClick = (levelNumber, status) => {
    if (status === 'LOCKED') {
      showToast(`Complete Level ${levelNumber - 1} to unlock this stage!`, 'lock');
    } else {
      playLevel(levelNumber - 1);
    }
  };

  const showToast = (message, type = 'lock') => {
    setToast({ isVisible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 2500);
  };

  const buildSvgPath = (nodeList) => {
    if (nodeList.length < 2) return '';
    let path = `M ${nodeList[0].x} ${nodeList[0].y}`;
    for (let i = 0; i < nodeList.length - 1; i++) {
      const p1 = nodeList[i];
      const p2 = nodeList[i + 1];
      const midY = (p1.y + p2.y) / 2;
      path += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const unlockedNodes = nodes.filter(n => n.levelNumber <= unlockedLevels);
  const lockedNodes = nodes.filter(n => n.levelNumber >= unlockedLevels);

  const unlockedPathD = buildSvgPath(unlockedNodes);
  const lockedPathD = buildSvgPath(lockedNodes);

  const currentWorld = WORLDS.find(w => unlockedLevels >= w.start && unlockedLevels <= w.end) || WORLDS[0];

  return (
    <div className="adventure-map-root">
      {/* Top Floating HUD */}
      <header className="map-hud-header">
        <button className="map-hud-btn" onClick={goHome}>
          <ChevronLeft size={28} color="#ffffff" strokeWidth={2.5} />
        </button>

        <div className="map-world-banner">
          <span className="world-icon">{currentWorld.icon}</span>
          <div className="world-text">
            <span className="world-title">
              {gameType === 'BRAIN_ARROW' ? '🧠 Brain ' : '🕒 Time '} {currentWorld.name}
            </span>
            <span className="world-subtitle">Level {unlockedLevels}</span>
          </div>
        </div>

        <div className="map-wallets">
          <div className="wallet-pill">
            <Star size={16} fill="#facc15" color="#facc15" />
            <span>{stars}</span>
          </div>
          <div className="wallet-pill">
            <Coins size={16} color="#fbbf24" />
            <span>{coins}</span>
          </div>
        </div>
      </header>

      {/* Main Scrollable Adventure Path */}
      <div className="map-scroll-viewport" ref={scrollContainerRef}>
        <div 
          className="map-canvas-container" 
          style={{ height: `${TOTAL_HEIGHT}px`, width: `${MAP_WIDTH}px` }}
        >
          {/* Animated Background Environmental Decor */}
          <div className="map-decorations-layer">
            {[25, 50, 75, 100].map((gatewayLevel) => {
              if (gatewayLevel > totalLevels) return null;
              const node = nodes.find(n => n.levelNumber === gatewayLevel);
              if (!node) return null;
              const targetWorld = WORLDS.find(w => w.start === gatewayLevel + 1);

              return (
                <div 
                  key={`gateway-${gatewayLevel}`} 
                  className="world-gateway-arch"
                  style={{ top: `${node.y - 65}px` }}
                >
                  <div className="gateway-ribbon">
                    <Sparkles size={16} color="#facc15" />
                    <span>Next: {targetWorld?.name || 'New Realm'}</span>
                  </div>
                </div>
              );
            })}

            <div className="floating-cloud cloud-1" style={{ top: '15%' }}>☁️</div>
            <div className="floating-cloud cloud-2" style={{ top: '45%' }}>☁️</div>
            <div className="floating-cloud cloud-3" style={{ top: '75%' }}>☁️</div>
            <div className="floating-island island-1" style={{ top: '30%' }}>🏝️</div>
            <div className="floating-island island-2" style={{ top: '60%' }}>🎈</div>
          </div>

          {/* SVG Road Paths */}
          <svg className="map-svg-roads" width={MAP_WIDTH} height={TOTAL_HEIGHT}>
            <defs>
              <linearGradient id="unlockedPathGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {lockedPathD && (
              <path
                d={lockedPathD}
                className="road-locked"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="10"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />
            )}

            {unlockedPathD && (
              <>
                <path
                  d={unlockedPathD}
                  className="road-unlocked-glow"
                  fill="none"
                  stroke="url(#unlockedPathGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  filter="url(#pathGlow)"
                />
                <path
                  d={unlockedPathD}
                  className="road-unlocked-core"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>

          {/* Interactive Level Nodes */}
          {nodes.map((node) => (
            <MapNode
              key={`node-${node.levelNumber}`}
              ref={(el) => (nodeRefs.current[node.levelNumber] = el)}
              levelNumber={node.levelNumber}
              status={node.status}
              stars={node.stars}
              milestoneType={node.milestoneType}
              x={node.x}
              y={node.y}
              onNodeClick={handleNodeClick}
            />
          ))}
        </div>
      </div>

      {/* Floating Quick Play Button */}
      <div className="map-bottom-bar">
        <motion.button 
          className="btn-quick-play"
          onClick={() => playLevel(unlockedLevels - 1)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Play size={24} fill="#ffffff" strokeWidth={0} />
          <span>PLAY LEVEL {unlockedLevels}</span>
        </motion.button>
      </div>

      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
      />
    </div>
  );
};

export default AdventureMap;
