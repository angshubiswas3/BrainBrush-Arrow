import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, Check, Sparkles, ChevronDown } from 'lucide-react';
import './MapNode.css';

const MapNode = ({ 
  levelNumber, 
  status, // 'COMPLETED', 'ACTIVE', 'LOCKED'
  starsEarned = 0, 
  isMilestone = false,
  onClick,
  onLockedClick 
}) => {
  const isCompleted = status === 'COMPLETED';
  const isActive = status === 'ACTIVE';
  const isLocked = status === 'LOCKED';

  const handleClick = () => {
    if (isLocked) {
      if (onLockedClick) onLockedClick(levelNumber);
    } else {
      if (onClick) onClick(levelNumber - 1); // 0-indexed
    }
  };

  return (
    <div className={`map-node-wrapper ${status.toLowerCase()} ${isMilestone ? 'milestone' : ''}`}>
      {/* Active Pointer Arrow */}
      {isActive && (
        <motion.div 
          className="active-pointer"
          animate={{ y: [-6, 2, -6] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          <div className="pointer-tag">PLAY</div>
          <ChevronDown size={22} color="#f59e0b" strokeWidth={3} />
        </motion.div>
      )}

      {/* Main Node Platform */}
      <motion.button
        className="map-node-button"
        onClick={handleClick}
        whileHover={!isLocked ? { scale: 1.1, y: -4 } : { scale: 1.02 }}
        whileTap={!isLocked ? { scale: 0.92 } : { x: [-4, 4, -4, 4, 0] }}
        animate={isActive ? { 
          boxShadow: [
            "0 10px 25px rgba(245, 158, 11, 0.4), 0 0 0 4px rgba(251, 191, 36, 0.5)",
            "0 15px 35px rgba(245, 158, 11, 0.7), 0 0 0 8px rgba(251, 191, 36, 0.2)",
            "0 10px 25px rgba(245, 158, 11, 0.4), 0 0 0 4px rgba(251, 191, 36, 0.5)"
          ]
        } : {}}
        transition={isActive ? { repeat: Infinity, duration: 2 } : {}}
      >
        <div className="node-gloss"></div>

        {/* Content Inside Platform */}
        {isLocked ? (
          <div className="locked-content">
            <Lock size={20} color="#94a3b8" strokeWidth={2.5} />
            <span className="node-level-text locked">{levelNumber}</span>
          </div>
        ) : (
          <div className="active-content">
            <span className="node-level-text">{levelNumber}</span>
          </div>
        )}

        {/* Completed Check Badge */}
        {isCompleted && (
          <div className="completed-check-badge">
            <Check size={14} color="#ffffff" strokeWidth={3.5} />
          </div>
        )}

        {/* Milestone Sparkle Icon */}
        {isMilestone && !isLocked && (
          <div className="milestone-sparkle">
            <Sparkles size={16} color="#fbbf24" />
          </div>
        )}
      </motion.button>

      {/* Star Trio for Completed Levels */}
      {isCompleted && (
        <div className="node-stars-row">
          {[1, 2, 3].map((starNum) => {
            const isStarActive = starNum <= starsEarned;
            return (
              <motion.div 
                key={`star-${starNum}`}
                className="mini-star"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * starNum }}
              >
                <Star 
                  size={14} 
                  fill={isStarActive ? "#fbbf24" : "#cbd5e1"} 
                  color={isStarActive ? "#f59e0b" : "#94a3b8"} 
                  strokeWidth={2}
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MapNode;
