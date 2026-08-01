import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Lock, Bell, Sparkles, Check, ChevronLeft, Calendar } from 'lucide-react';
import './DailyPuzzleModal.css';

const DailyPuzzleModal = ({ onClose }) => {
  const { dailyNotificationSubscribed, setDailyNotification } = useGameStore();
  const [isNotified, setIsNotified] = useState(dailyNotificationSubscribed || false);

  const handleNotifyClick = () => {
    setIsNotified(true);
    setDailyNotification(true);
  };

  return (
    <div className="daily-modal-backdrop">
      <motion.div 
        className="daily-modal-card"
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 22, stiffness: 300 }}
      >
        {/* Floating Ambient Sparkles */}
        <div className="sparkle-particle sp-1"><Sparkles size={16} color="#fbbf24" /></div>
        <div className="sparkle-particle sp-2"><Sparkles size={20} color="#f59e0b" /></div>
        <div className="sparkle-particle sp-3"><Sparkles size={14} color="#60a5fa" /></div>

        {/* Animated Icon Badge */}
        <motion.div 
          className="daily-lock-badge"
          animate={{ scale: [1, 1.08, 1], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="lock-inner-glow">
            <Calendar size={36} color="#f59e0b" strokeWidth={2.2} />
          </div>
          <div className="lock-mini-padlock">
            <Lock size={14} color="#ffffff" strokeWidth={3} />
          </div>
        </motion.div>

        {/* Text Content */}
        <h2 className="daily-modal-title">Daily Puzzle</h2>
        <span className="daily-modal-subtitle">A brand new challenge is coming soon!</span>

        <p className="daily-modal-desc">
          The Daily Puzzle system is currently under development. Soon you'll receive a brand-new handcrafted puzzle every day, compete on global leaderboards, earn exclusive rewards, and challenge your friends.
        </p>
        <p className="daily-modal-highlight">
          Stay tuned for the next update!
        </p>

        {/* Action Buttons */}
        <div className="daily-modal-actions">
          <motion.button 
            className={`btn-notify-me ${isNotified ? 'is-subscribed' : ''}`}
            onClick={handleNotifyClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            disabled={isNotified}
          >
            {isNotified ? (
              <>
                <Check size={20} strokeWidth={3} />
                <span>You're on the list!</span>
              </>
            ) : (
              <>
                <Bell size={20} />
                <span>Notify Me</span>
              </>
            )}
          </motion.button>

          <button className="btn-daily-back" onClick={onClose}>
            <span>Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DailyPuzzleModal;
