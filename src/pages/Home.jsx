import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import './Home.css';

const Home = () => {
  const { startGame, coins, stars, currentLevelIndex } = useGameStore();

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="home-stats">
        <div className="stat-pill">
          <span className="icon">⭐</span> {stars}
        </div>
        <div className="stat-pill">
          <span className="icon">🪙</span> {coins}
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
      </motion.div>

      <div className="home-menu">
        <motion.button 
          className="btn-play"
          onClick={startGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentLevelIndex === 0 ? 'PLAY' : 'CONTINUE'}
        </motion.button>
        
        <div className="home-secondary-menu">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary">Adventure</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary">Shop</motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
