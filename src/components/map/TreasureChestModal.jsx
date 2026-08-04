import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Coins, Star, Gift, Check, X } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import './TreasureChestModal.css';

const TreasureChestModal = ({ milestoneType, levelNumber, isClaimed, onClaim, onClose }) => {
  const [opened, setOpened] = useState(false);

  const rewards = {
    CHEST_SMALL: { coins: 50, stars: 1, title: 'Adventurer\'s Chest', icon: '🎁' },
    CHEST_BIG: { coins: 150, stars: 3, title: 'Royal Gold Treasure', icon: '👑' },
    BOSS_PORTAL: { coins: 300, stars: 5, title: 'Realm Master Trophy', icon: '🏆' }
  }[milestoneType] || { coins: 50, stars: 1, title: 'Treasure Gift', icon: '🎁' };

  const handleOpenChest = () => {
    if (isClaimed) return;
    setOpened(true);
    if (navigator.vibrate) navigator.vibrate([40, 50, 80]);
    onClaim(levelNumber, rewards.coins, rewards.stars);
  };

  return (
    <div className="chest-modal-backdrop">
      <motion.div 
        className="chest-modal-card"
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <button className="btn-close-chest" onClick={onClose}>
          <X size={20} color="#94a3b8" />
        </button>

        {/* Floating Halo Light */}
        <div className="chest-halo-glow"></div>

        {/* Chest 3D Icon */}
        <motion.div 
          className="chest-avatar-box"
          animate={!isClaimed && !opened ? { y: [-6, 6, -6], rotate: [-3, 3, -3] } : { scale: [1, 1.15, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="chest-emoji">{rewards.icon}</span>
        </motion.div>

        <h3 className="chest-modal-title">{rewards.title}</h3>
        <p className="chest-modal-sub">
          {isClaimed || opened ? 'You have claimed this milestone reward!' : `Reached Level ${levelNumber} milestone! Tap below to open.`}
        </p>

        {/* Rewards Pills */}
        <div className="chest-rewards-row">
          <div className="reward-item-pill coin-pill">
            <Coins size={22} color="#fbbf24" />
            <span>+{rewards.coins} Coins</span>
          </div>
          <div className="reward-item-pill star-pill">
            <Star size={22} color="#facc15" fill="#facc15" />
            <span>+{rewards.stars} Stars</span>
          </div>
        </div>

        {/* Claim Action Button */}
        {isClaimed || opened ? (
          <button className="btn-chest-action btn-chest-claimed" onClick={onClose}>
            <Check size={20} strokeWidth={3} />
            <span>Claimed</span>
          </button>
        ) : (
          <motion.button 
            className="btn-chest-action btn-chest-claim"
            onClick={handleOpenChest}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={20} color="#ffffff" />
            <span>OPEN CHEST!</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default TreasureChestModal;
