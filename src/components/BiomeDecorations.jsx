import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, Trees, Mountain, Gem, Waves, Rocket, Wind, Cloud, Compass } from 'lucide-react';
import './BiomeDecorations.css';

export const WORLDS = [
  {
    id: 1,
    startLevel: 1,
    endLevel: 20,
    name: "Emerald Meadows",
    subtitle: "The Journey Begins",
    icon: <Trees size={22} color="#10b981" />,
    gradient: "linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%)",
    accentColor: "#10b981"
  },
  {
    id: 2,
    startLevel: 21,
    endLevel: 40,
    name: "Sunset Peaks",
    subtitle: "Climb the Highlands",
    icon: <Mountain size={22} color="#f97316" />,
    gradient: "linear-gradient(180deg, #ffedd5 0%, #fff7ed 100%)",
    accentColor: "#f97316"
  },
  {
    id: 3,
    startLevel: 41,
    endLevel: 60,
    name: "Crystal Sanctuary",
    subtitle: "Mystic Energies",
    icon: <Gem size={22} color="#8b5cf6" />,
    gradient: "linear-gradient(180deg, #f3e8ff 0%, #faf5ff 100%)",
    accentColor: "#8b5cf6"
  },
  {
    id: 4,
    startLevel: 61,
    endLevel: 80,
    name: "Azure Lagoon",
    subtitle: "Deep Ocean Secrets",
    icon: <Waves size={22} color="#06b6d4" />,
    gradient: "linear-gradient(180deg, #cffafe 0%, #ecfeff 100%)",
    accentColor: "#06b6d4"
  },
  {
    id: 5,
    startLevel: 81,
    endLevel: 100,
    name: "Cosmic Horizon",
    subtitle: "Infinite Reach",
    icon: <Rocket size={22} color="#3b82f6" />,
    gradient: "linear-gradient(180deg, #e0e7ff 0%, #eef2ff 100%)",
    accentColor: "#3b82f6"
  }
];

export const WorldBanner = ({ world, yPosition }) => {
  return (
    <div className="world-banner-container" style={{ top: `${yPosition}px` }}>
      <motion.div 
        className="world-banner"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="world-banner-icon">{world.icon}</div>
        <div className="world-banner-text">
          <h3>{world.name}</h3>
          <span>{world.subtitle} • Levels {world.startLevel}–{world.endLevel}</span>
        </div>
      </motion.div>
    </div>
  );
};

export const MilestoneChest = ({ levelNumber, isUnlocked, x, y, onClaim }) => {
  return (
    <motion.div 
      className={`milestone-chest-wrapper ${isUnlocked ? 'unlocked' : 'locked'}`}
      style={{ left: `${x}px`, top: `${y}px` }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      animate={{ y: [y - 4, y + 4, y - 4] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      onClick={() => onClaim && onClaim(levelNumber)}
    >
      <div className="chest-badge">
        <Gift size={24} color={isUnlocked ? "#f59e0b" : "#94a3b8"} strokeWidth={2.2} />
      </div>
      <span className="chest-label">Bonus #{levelNumber}</span>
    </motion.div>
  );
};

export const AmbientElement = ({ type, x, y, delay = 0 }) => {
  return (
    <motion.div 
      className={`ambient-elem ${type}`}
      style={{ left: `${x}px`, top: `${y}px` }}
      animate={{ 
        y: [y - 6, y + 6, y - 6],
        x: [x - 4, x + 4, x - 4]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 3 + (delay % 3), 
        delay: delay * 0.4,
        ease: "easeInOut" 
      }}
    >
      {type === 'cloud' && <Cloud size={32} color="#ffffff" fill="rgba(255,255,255,0.7)" />}
      {type === 'sparkle' && <Sparkles size={18} color="#fbbf24" />}
      {type === 'wind' && <Wind size={22} color="rgba(100,116,139,0.3)" />}
      {type === 'crystal' && <Gem size={20} color="#c084fc" />}
    </motion.div>
  );
};
