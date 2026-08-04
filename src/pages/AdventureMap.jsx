import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import MapNode from '../components/MapNode';
import WorldBackground from '../components/map/WorldBackground';
import WorldDecorations from '../components/map/WorldDecorations';
import WorldGateArch from '../components/map/WorldGateArch';
import TreasureChestModal from '../components/map/TreasureChestModal';
import { WORLD_BIOMES, getWorldForLevel } from '../components/map/worldThemes';
import Toast from '../components/Toast';
import { ChevronLeft, Star, Coins, Play, Sparkles, Navigation, Heart } from 'lucide-react';
import './AdventureMap.css';

const AdventureMap = () => {
  const { 
    gameType,
    timeArrowProgress,
    brainArrowProgress,
    coins, 
    stars, 
    lives = 3,
    playLevel, 
    claimChestReward,
    goHome 
  } = useGameStore();

  const progress = gameType === 'BRAIN_ARROW' ? brainArrowProgress : timeArrowProgress;
  const unlockedLevels = progress?.unlockedLevels || 1;
  const levelStars = progress?.levelStars || {};
  const claimedChests = progress?.claimedChests || {};

  const scrollContainerRef = useRef(null);
  const nodeRefs = useRef({});
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'lock' });
  const [activeChestModal, setActiveChestModal] = useState(null);

  // Map Geometry Configuration (Centered S-Curve Road for 100 Handcrafted Levels)
  const totalLevels = Math.max(100, unlockedLevels + 5);
  const NODE_SPACING_Y = 120;
  const MAP_WIDTH = 420;
  const TOTAL_HEIGHT = totalLevels * NODE_SPACING_Y + 280;

  // Calculate Node Positions with Centered Organic S-Curve
  const nodes = [];
  for (let i = 1; i <= totalLevels; i++) {
    const y = TOTAL_HEIGHT - (i * NODE_SPACING_Y) - 90;
    // S-curve centered around MAP_WIDTH / 2
    const curveOffset = Math.sin((i - 1) * 0.72) * (MAP_WIDTH * 0.28) + Math.cos((i - 1) * 0.36) * (MAP_WIDTH * 0.05);
    const x = (MAP_WIDTH / 2) + curveOffset;

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
      milestoneType,
      isClaimed: !!claimedChests[i]
    });
  }

  // Camera positioning: Keep active level around 35-40% from the bottom of viewport
  const scrollToCurrentLevel = (smooth = true) => {
    const currentNodeEl = nodeRefs.current[unlockedLevels];
    const scrollContainer = scrollContainerRef.current;
    if (currentNodeEl && scrollContainer) {
      const containerHeight = scrollContainer.clientHeight;
      const targetY = currentNodeEl.offsetTop - containerHeight * 0.62;
      scrollContainer.scrollTo({
        top: targetY,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCurrentLevel(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [unlockedLevels]);

  const handleNodeClick = (levelNumber, status) => {
    if (status === 'LOCKED') {
      showToast(`Complete Level ${levelNumber - 1} to unlock this realm!`, 'lock');
    } else {
      playLevel(levelNumber - 1);
    }
  };

  const handleChestClick = (milestoneType, levelNumber, isClaimed) => {
    setActiveChestModal({ milestoneType, levelNumber, isClaimed });
  };

  const handleClaimChest = (levelNumber, bonusCoins, bonusStars) => {
    claimChestReward(levelNumber, bonusCoins, bonusStars);
    showToast(`Claimed +${bonusCoins} 🪙 and +${bonusStars} ⭐!`, 'star');
  };

  const showToast = (message, type = 'lock') => {
    setToast({ isVisible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 2500);
  };

  // Smooth SVG Bezier Path Generator for the Center Road
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

  const allPathD = buildSvgPath(nodes);
  const unlockedNodes = nodes.filter(n => n.levelNumber <= unlockedLevels);
  const unlockedPathD = buildSvgPath(unlockedNodes);

  const currentWorld = getWorldForLevel(unlockedLevels);

  return (
    <div className="adventure-map-root">
      {/* Top Glassmorphic Floating HUD */}
      <header className="map-hud-header">
        <button className="map-hud-btn" onClick={goHome} title="Home Hub">
          <ChevronLeft size={28} color="#ffffff" strokeWidth={2.8} />
        </button>

        {/* Center World Biome Badge */}
        <div className="map-world-banner">
          <span className="world-icon">{currentWorld.icon}</span>
          <div className="world-text">
            <span className="world-title">{currentWorld.name}</span>
            <span className="world-subtitle">
              Level {unlockedLevels} • {gameType === 'BRAIN_ARROW' ? '🧠 Zen Logic' : '⚡ Fast Reflexes'}
            </span>
          </div>
        </div>

        {/* Player Wallets (Stars, Coins, Lives) */}
        <div className="map-wallets">
          <div className="wallet-pill">
            <Heart size={16} fill="#ef4444" color="#ef4444" />
            <span>{lives}</span>
          </div>
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

      {/* Main Scrollable Adventure Viewport */}
      <div className="map-scroll-viewport" ref={scrollContainerRef}>
        <div 
          className="map-canvas-container" 
          style={{ height: `${TOTAL_HEIGHT}px`, width: `${MAP_WIDTH}px` }}
        >
          {/* Layer 1: Environmental World Biomes & Ambient Particles */}
          <WorldBackground 
            totalLevels={totalLevels} 
            totalHeight={TOTAL_HEIGHT} 
            nodeSpacingY={NODE_SPACING_Y} 
          />

          {/* Layer 2: Data-Driven Environmental Props */}
          <WorldDecorations nodes={nodes} mapWidth={MAP_WIDTH} />

          {/* Layer 3: Grand Milestone World Gate Arches */}
          {[25, 50, 75, 100].map((gatewayLevel) => {
            if (gatewayLevel > totalLevels) return null;
            const node = nodes.find(n => n.levelNumber === gatewayLevel);
            if (!node) return null;
            const targetWorld = WORLD_BIOMES.find(w => w.start === gatewayLevel + 1);
            if (!targetWorld) return null;

            return (
              <WorldGateArch 
                key={`gate-${gatewayLevel}`}
                targetWorld={targetWorld}
                currentWorld={currentWorld}
                isUnlocked={unlockedLevels > gatewayLevel}
                y={node.y}
                mapWidth={MAP_WIDTH}
              />
            );
          })}

          {/* Layer 4: Multi-Layered Polished SVG Center Pathway */}
          <svg className="map-svg-roads" width={MAP_WIDTH} height={TOTAL_HEIGHT}>
            <defs>
              <linearGradient id="roadBaseGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#2d6a4f" />
                <stop offset="25%" stopColor="#b45309" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="75%" stopColor="#be123c" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>

              <linearGradient id="roadProgressionGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              <filter id="roadDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Path 1: Ground Ambient Soft Shadow */}
            <path
              d={allPathD}
              fill="none"
              stroke="rgba(0, 0, 0, 0.45)"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Path 2: Outer Cobblestone / Curb Border */}
            <path
              d={allPathD}
              fill="none"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Path 3: Main Dynamic Biome Road Bed */}
            <path
              d={allPathD}
              className="road-main-bed"
              fill="none"
              stroke="url(#roadBaseGrad)"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Path 4: Stepping Stones & Dash Markers */}
            <path
              d={allPathD}
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="6"
              strokeDasharray="14 18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Path 5: Active Golden Progression Beam */}
            {unlockedPathD && (
              <>
                <path
                  d={unlockedPathD}
                  fill="none"
                  stroke="url(#roadProgressionGrad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#roadDropShadow)"
                />
                <path
                  d={unlockedPathD}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}
          </svg>

          {/* Layer 5: 3D Interactive Level Nodes */}
          {nodes.map((node) => (
            <MapNode
              key={`node-${node.levelNumber}`}
              ref={(el) => (nodeRefs.current[node.levelNumber] = el)}
              levelNumber={node.levelNumber}
              status={node.status}
              stars={node.stars}
              milestoneType={node.milestoneType}
              isClaimed={node.isClaimed}
              x={node.x}
              y={node.y}
              onNodeClick={handleNodeClick}
              onChestClick={handleChestClick}
            />
          ))}
        </div>
      </div>

      {/* Floating Focus Jump Button */}
      <button 
        className="btn-focus-current"
        onClick={() => scrollToCurrentLevel(true)}
        title="Focus Current Level"
      >
        <Navigation size={20} color="#ffffff" className="focus-icon-tilt" />
      </button>

      {/* Floating Bottom Quick Play Button */}
      <div className="map-bottom-bar">
        <motion.button 
          className="btn-quick-play-hero"
          onClick={() => playLevel(unlockedLevels - 1)}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Play size={26} fill="#ffffff" strokeWidth={0} />
          <span>PLAY LEVEL {unlockedLevels}</span>
        </motion.button>
      </div>

      {/* Interactive Milestone Chest Claim Modal */}
      <AnimatePresence>
        {activeChestModal && (
          <TreasureChestModal
            milestoneType={activeChestModal.milestoneType}
            levelNumber={activeChestModal.levelNumber}
            isClaimed={activeChestModal.isClaimed}
            onClaim={handleClaimChest}
            onClose={() => setActiveChestModal(null)}
          />
        )}
      </AnimatePresence>

      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
      />
    </div>
  );
};

export default AdventureMap;
