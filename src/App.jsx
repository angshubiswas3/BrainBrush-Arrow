import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import Home from './pages/Home';
import AdventureMap from './pages/AdventureMap';
import Game from './pages/Game';
import TimeArrow from './timeArrow/pages/TimeArrow';
import TimeAttack from './timeArrow/pages/TimeAttack';
import './App.css';

function App() {
  const gameState = useGameStore((state) => state.gameState);
  
  // Independent navigation state for Time Arrow ('SELECT' | 'PLAY' | null)
  const [timeArrowView, setTimeArrowView] = useState(null);

  return (
    <div className="app-root">
      <AnimatePresence mode="wait">
        {/* Independent Time Arrow Routes */}
        {timeArrowView === 'SELECT' && (
          <TimeArrow 
            key="time-arrow-select"
            onSelectLevel={() => setTimeArrowView('PLAY')}
            onBackHome={() => setTimeArrowView(null)}
          />
        )}

        {timeArrowView === 'PLAY' && (
          <TimeAttack 
            key="time-arrow-play"
            onBackToSelect={() => setTimeArrowView('SELECT')}
          />
        )}

        {/* Brain Arrow & Studio Hub Routes */}
        {!timeArrowView && gameState === 'HOME' && (
          <Home 
            key="home" 
            onOpenTimeArrow={() => setTimeArrowView('SELECT')}
          />
        )}

        {!timeArrowView && gameState === 'MAP' && (
          <AdventureMap key="map" />
        )}

        {!timeArrowView && (gameState === 'PLAYING' || gameState === 'VICTORY' || gameState === 'DEFEAT') && (
          <Game key="game" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
