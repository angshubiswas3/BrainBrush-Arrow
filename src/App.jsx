import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import Home from './pages/Home';
import AdventureMap from './pages/AdventureMap';
import Game from './pages/Game';
import './App.css';

function App() {
  const gameState = useGameStore((state) => state.gameState);

  return (
    <div className="app-root">
      <AnimatePresence mode="wait">
        {gameState === 'HOME' && <Home key="home" />}
        {gameState === 'MAP' && <AdventureMap key="map" />}
        {(gameState === 'PLAYING' || gameState === 'VICTORY' || gameState === 'DEFEAT') && (
          <Game key="game" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
