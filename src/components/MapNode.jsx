import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, Check, Gift, Crown, Trophy, Sparkles } from 'lucide-react';
import './MapNode.css';

const MapNode = forwardRef(({ 
  levelNumber, 
  status, 
  stars = 0, 
  milestoneType = null, 
  isClaimed = false,
  onNodeClick,
  onChestClick,
  x, 
  y 
}, ref) => {
  const isCompleted = status === 'COMPLETED';
  const isCurrent = status === 'CURRENT';
  const isLocked = status === 'LOCKED';

  const handleMilestoneTap = (e) => {
    e.stopPropagation();
    if (onChestClick && (isCompleted || isCurrent)) {
      onChestClick(milestoneType, levelNumber, isClaimed);
    } else {
      onNodeClick(levelNumber, status);
    }
  };

  return (
    <div 
      ref={ref}
      className={`map-node-wrapper pos-${status.toLowerCase()}`}
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {/* Current Player Avatar / Pointer Beacon ("YOU ARE HERE") */}
      {isCurrent && (
        <motion.div 
          className="player-beacon"
          initial={{ y: 0 }}
          animate={{ y: [-10, 0, -10] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="beacon-avatar-wrap">
            <span className="beacon-emoji">🤠</span>
            <div className="beacon-tag">YOU</div>
          </div>
          <div className="beacon-arrow"></div>
        </motion.div>
      )}

      {/* Milestone Reward Chests on Roadside */}
      {milestoneType && (
        <motion.div 
          className={`milestone-badge milestone-${milestoneType.toLowerCase()} ${isClaimed ? 'milestone-claimed' : ''}`}
          onClick={handleMilestoneTap}
          whileHover={{ scale: 1.2, rotate: 8 }}
          whileTap={{ scale: 0.9 }}
          animate={!isClaimed && (isCurrent || isCompleted) ? { y: [-4, 4, -4], rotate: [-4, 4, -4] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {milestoneType === 'CHEST_SMALL' && <Gift size={22} color="#f59e0b" />}
          {milestoneType === 'CHEST_BIG' && <Trophy size={24} color="#f59e0b" />}
          {milestoneType === 'BOSS_PORTAL' && <Crown size={26} color="#ec4899" />}

          {isClaimed ? (
            <div className="milestone-check-dot">
              <Check size={10} strokeWidth={4} color="#ffffff" />
            </div>
          ) : (
            (isCompleted || isCurrent) && (
              <div className="milestone-claim-pulse">
                <Sparkles size={12} color="#ffffff" />
              </div>
            )
          )}
        </motion.div>
      )}

      {/* Main 3D Tactile Circular Platform Button */}
      <motion.button
        className={`map-node-btn node-${status.toLowerCase()}`}
        onClick={() => onNodeClick(levelNumber, status)}
        whileHover={!isLocked ? { scale: 1.12, y: -4 } : { scale: 1.02 }}
        whileTap={!isLocked ? { scale: 0.92 } : { x: [-4, 4, -4, 4, 0] }}
        animate={isCurrent ? {
          boxShadow: [
            "0 12px 0 #b45309, 0 16px 30px rgba(245, 158, 11, 0.45), 0 0 0 0 rgba(245, 158, 11, 0.6)",
            "0 12px 0 #b45309, 0 16px 30px rgba(245, 158, 11, 0.45), 0 0 0 20px rgba(245, 158, 11, 0)",
            "0 12px 0 #b45309, 0 16px 30px rgba(245, 158, 11, 0.45), 0 0 0 0 rgba(245, 158, 11, 0.6)"
          ]
        } : {}}
        transition={isCurrent ? { duration: 2, repeat: Infinity } : { type: 'spring' }}
      >
        {/* Top Gloss Arc Highlight */}
        <div className="node-gloss-ring"></div>

        {/* Center Node Level Number or Lock */}
        <div className="node-inner">
          {isLocked ? (
            <Lock size={22} className="lock-icon" />
          ) : (
            <span className="node-level-text">{levelNumber}</span>
          )}
        </div>

        {/* Completed Checkmark Badge */}
        {isCompleted && (
          <div className="node-check-badge">
            <Check size={13} strokeWidth={4} color="#ffffff" />
          </div>
        )}
      </motion.button>

      {/* 3 Golden Stars for Completed Nodes */}
      {isCompleted && (
        <div className="node-stars-row">
          {[1, 2, 3].map((starIdx) => (
            <Star 
              key={starIdx}
              size={14} 
              fill={starIdx <= (stars || 3) ? "#facc15" : "#64748b"}
              color={starIdx <= (stars || 3) ? "#facc15" : "#64748b"}
              className="node-star"
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default MapNode;
