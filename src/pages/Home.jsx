import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Play, Map, ShoppingBag, Star, Coins } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { startGame, openMap, coins, stars, currentLevelIndex, unlockedLevels } = useGameStore();

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="home-stats">
        <div className="stat-pill">
          <Star size={18} fill="#fbbf24" color="#f59e0b" /> 
          <span>{stars}</span>
        </div>
        <div className="stat-pill">
          <Coins size={18} color="#eab308" /> 
          <span>{coins}</span>
        </div>
      </div>

      <motion.div 
        className="home-logo-container"
        initial={{ scale: 0.8, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <h1 className="home-logo">BrainBrush</h1>
        <h2 className="home-subtitle">ARROW</h2>
        <div className="home-stage-badge">
          Stage {unlockedLevels}
        </div>
      </motion.div>

      <div className="home-menu">
        <motion.button 
          className="btn-play"
          onClick={startGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play size={26} fill="#ffffff" strokeWidth={0} />
          <span>{currentLevelIndex === 0 ? 'PLAY' : 'CONTINUE'}</span>
        </motion.button>
        
        <div className="home-secondary-menu">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="btn-secondary"
            onClick={openMap}
          >
            <Map size={20} color="#3b82f6" />
            <span>Adventure</span>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="btn-secondary"
            onClick={openMap}
          >
            <ShoppingBag size={20} color="#3b82f6" />
            <span>Levels</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
