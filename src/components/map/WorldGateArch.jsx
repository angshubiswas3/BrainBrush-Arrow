import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Lock } from 'lucide-react';
import './WorldGateArch.css';

const WorldGateArch = ({ targetWorld, currentWorld, isUnlocked, y, mapWidth }) => {
  return (
    <div 
      className={`world-gate-arch-container ${isUnlocked ? 'gate-unlocked' : 'gate-locked'}`}
      style={{ top: `${y - 75}px`, width: `${mapWidth}px` }}
    >
      <motion.div 
        className="gate-arch-card"
        initial={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Left Golden Pillar */}
        <div className="gate-pillar pillar-left">
          <div className="pillar-cap">🏛️</div>
          <div className="pillar-torch">🔥</div>
        </div>

        {/* Center Banner & Portal Crest */}
        <div className="gate-center-banner">
          <div className="gate-crown-badge">
            {isUnlocked ? (
              <Crown size={22} color="#f59e0b" fill="#f59e0b" />
            ) : (
              <Lock size={20} color="#94a3b8" />
            )}
          </div>

          <div className="gate-info-text">
            <div className="gate-title-row">
              <span className="gate-world-icon">{targetWorld.icon}</span>
              <span className="gate-world-name">{targetWorld.name}</span>
            </div>
            <span className="gate-status-sub">
              {isUnlocked ? '✨ REALM UNLOCKED' : `Unlock at Level ${targetWorld.start}`}
            </span>
          </div>

          <div className="gate-sparkle-spin">
            <Sparkles size={18} color="#facc15" />
          </div>
        </div>

        {/* Right Golden Pillar */}
        <div className="gate-pillar pillar-right">
          <div className="pillar-cap">🏛️</div>
          <div className="pillar-torch">🔥</div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorldGateArch;
