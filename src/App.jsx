import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import Home from './pages/Home';
import AdventureMap from './pages/AdventureMap';
import Game from './pages/Game';
import TimeArrow from './timeArrow/pages/TimeArrow';
import TimeAttack from './timeArrow/pages/TimeAttack';
import LevelEditor from './editor/LevelEditor';
import './App.css';

function App() {
  const gameState = useGameStore((state) => state.gameState);
  const goHome = useGameStore((state) => state.goHome);
  
  // Independent navigation state for Time Arrow ('SELECT' | 'PLAY' | null)
  const [timeArrowView, setTimeArrowView] = useState(null);

  // Check if Level Editor route is requested via URL (?editor=true or #editor) or state
  const [isEditorMode, setIsEditorMode] = useState(() => {
    return window.location.search.includes('editor') || window.location.hash.includes('editor');
  });

  if (isEditorMode && gameState !== 'PLAYING' && gameState !== 'VICTORY' && gameState !== 'DEFEAT') {
    return (
      <LevelEditor
        onExitEditor={() => {
          window.history.replaceState(null, '', window.location.pathname);
          setIsEditorMode(false);
        }}
      />
    );
  }

  return (
    <div className="app-root">
      {/* Return to Editor Bar during Playtest */}
      {isEditorMode && (gameState === 'PLAYING' || gameState === 'VICTORY' || gameState === 'DEFEAT') && (
        <div style={{ position: 'fixed', top: 12, left: 12, zIndex: 99999 }}>
          <button
            onClick={() => {
              goHome();
            }}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #00d2ff, #0080ff)',
              color: '#000',
              fontWeight: '800',
              fontSize: '12px',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,210,255,0.4)'
            }}
          >
            ⚡ Return to Studio Editor
          </button>
        </div>
      )}

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
