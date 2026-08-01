import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, Check, Gift, Crown, Trophy } from 'lucide-react';
import './MapNode.css';

const MapNode = forwardRef(({ 
  levelNumber, 
  status, 
  stars = 0, 
  milestoneType = null, 
  onNodeClick,
  x, 
  y 
}, ref) => {
  const isCompleted = status === 'COMPLETED';
  const isCurrent = status === 'CURRENT';
  const isLocked = status === 'LOCKED';

  return (
    <div 
      ref={ref}
      className={`map-node-wrapper pos-${status.toLowerCase()}`}
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {/* Current Player Avatar / Pointer Beacon */}
      {isCurrent && (
        <motion.div 
          className="player-beacon"
          initial={{ y: 0 }}
          animate={{ y: [-8, 0, -8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="beacon-tag">YOU</div>
          <div className="beacon-arrow"></div>
        </motion.div>
      )}

      {/* Milestone Reward Chests */}
      {milestoneType && (
        <motion.div 
          className={`milestone-badge milestone-${milestoneType.toLowerCase()}`}
          whileHover={{ scale: 1.15, rotate: 10 }}
          animate={isCurrent || isCompleted ? { y: [-3, 3, -3] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {milestoneType === 'CHEST_SMALL' && <Gift size={20} color="#fbbf24" />}
          {milestoneType === 'CHEST_BIG' && <Trophy size={22} color="#f59e0b" />}
          {milestoneType === 'BOSS_PORTAL' && <Crown size={24} color="#ec4899" />}
        </motion.div>
      )}

      {/* Main Circular Platform */}
      <motion.button
        className={`map-node-btn node-${status.toLowerCase()}`}
        onClick={() => onNodeClick(levelNumber, status)}
        whileHover={!isLocked ? { scale: 1.12, y: -4 } : { scale: 1.02 }}
        whileTap={!isLocked ? { scale: 0.92 } : { x: [-4, 4, -4, 4, 0] }}
        animate={isCurrent ? {
          boxShadow: [
            "0 0 0 0 rgba(245, 158, 11, 0.4)",
            "0 0 0 16px rgba(245, 158, 11, 0)",
            "0 0 0 0 rgba(245, 158, 11, 0.4)"
          ]
        } : {}}
        transition={isCurrent ? { duration: 2, repeat: Infinity } : { type: 'spring' }}
      >
        {/* Node Glow Layer */}
        <div className="node-gloss-ring"></div>

        {/* Node Content */}
        <div className="node-inner">
          {isLocked ? (
            <Lock size={22} className="lock-icon" />
          ) : (
            <span className="node-level-text">{levelNumber}</span>
          )}
        </div>

        {/* Completed Checkmark Ring */}
        {isCompleted && (
          <div className="node-check-badge">
            <Check size={12} strokeWidth={3.5} color="#ffffff" />
          </div>
        )}
      </motion.button>

      {/* Star Rating for Completed Nodes */}
      {isCompleted && (
        <div className="node-stars-row">
          {[1, 2, 3].map((starIdx) => (
            <Star 
              key={starIdx}
              size={13} 
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
