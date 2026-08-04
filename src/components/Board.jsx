import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Straight, Corner, TJunction, Cross, DeadEnd, ArrowHead } from './puzzle';
import { isArrowClearOnGrid } from '../levels/levelBuilder';
import './Board.css';

const PIECE_COMPONENTS = {
  STRAIGHT: Straight,
  CORNER: Corner,
  T_JUNCTION: TJunction,
  CROSS: Cross,
  DEAD_END: DeadEnd,
  ARROW_HEAD: ArrowHead
};

const DELTA_OFFSETS = {
  UP: { r: -1, c: 0 },
  DOWN: { r: 1, c: 0 },
  LEFT: { r: 0, c: -1 },
  RIGHT: { r: 0, c: 1 }
};

const Board = ({ 
  data, 
  onLevelComplete, 
  onWrongMove,
  showGuides = true 
}) => {
  const levelData = data || {};
  const initialArrows = levelData.board || levelData.arrows || [];
  const [arrows, setArrows] = useState(initialArrows);
  const [blockedId, setBlockedId] = useState(null);
  const [flyingIds, setFlyingIds] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [combo, setCombo] = useState(0);

  // Zoom and Pan Controls
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const touchRef = useRef({ initialDist: null, initialScale: 1, lastTapTime: 0 });
  const comboTimerRef = useRef(null);

  const gridSize = levelData.gridSize || (typeof levelData.size === 'number' ? levelData.size : 6);
  const rows = levelData.size?.rows || gridSize;
  const cols = levelData.size?.cols || gridSize;
  const maxDim = Math.max(rows, cols);

  // Compact, sleek tile size (e.g. 36px to 52px)
  const TILE_SIZE = Math.min(52, Math.max(34, Math.floor(250 / maxDim)));
  const BOARD_WIDTH = cols * TILE_SIZE;
  const BOARD_HEIGHT = rows * TILE_SIZE;
  const STROKE_WIDTH = 8; // Sleek, modern vector line stroke
  const EXIT_DISTANCE = 600;

  const theme = levelData.theme || { color: '#0f172a', bg: '#f8fafc' };

  // Reset when level data changes
  useEffect(() => {
    const freshArrows = levelData.board || levelData.arrows || [];
    setArrows(freshArrows);
    setFlyingIds([]);
    setBlockedId(null);
    setScale(1);
    setPan({ x: 0, y: 0 });
    setCombo(0);
  }, [levelData]);

  // Level completion check
  useEffect(() => {
    const totalCount = (levelData.board?.length || levelData.arrows?.length || 0);
    if (arrows.length === 0 && totalCount > 0 && flyingIds.length === 0) {
      if (navigator.vibrate) navigator.vibrate([30, 40, 60, 40, 100]);
      const timer = setTimeout(() => {
        if (onLevelComplete) onLevelComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [arrows.length, levelData, flyingIds.length, onLevelComplete]);

  const handleArrowClick = (arrow) => {
    if (flyingIds.includes(arrow.id)) return;

    const isClear = isArrowClearOnGrid(arrow, arrows, { rows, cols });

    if (isClear) {
      if (navigator.vibrate) navigator.vibrate(18);

      setCombo(c => c + 1);
      clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => setCombo(0), 1800);

      // Find arrow head tile for sparkle burst
      const headPiece = arrow.pieces.find(p => p.type === 'ARROW_HEAD') || arrow.pieces[arrow.pieces.length - 1];
      if (headPiece) {
        const sparkleX = headPiece.c * TILE_SIZE + TILE_SIZE / 2;
        const sparkleY = headPiece.r * TILE_SIZE + TILE_SIZE / 2;
        const newSparkle = {
          id: `spark_${Date.now()}_${Math.random()}`,
          x: sparkleX,
          y: sparkleY
        };
        setSparkles(prev => [...prev, newSparkle]);
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 600);
      }

      setFlyingIds(prev => [...prev, arrow.id]);

      setTimeout(() => {
        setArrows(prev => prev.filter(a => a.id !== arrow.id));
        setFlyingIds(prev => prev.filter(id => id !== arrow.id));
      }, 420);
    } else {
      if (navigator.vibrate) navigator.vibrate([35, 25, 35]);
      setBlockedId(arrow.id);
      setCombo(0);
      if (onWrongMove) onWrongMove();
      setTimeout(() => setBlockedId(null), 360);
    }
  };

  // Pinch to Zoom
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchRef.current.initialDist = dist;
      touchRef.current.initialScale = scale;
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - touchRef.current.lastTapTime < 300) {
        setScale(s => (s > 1.15 ? 1 : 1.75));
        setPan({ x: 0, y: 0 });
      }
      touchRef.current.lastTapTime = now;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchRef.current.initialDist) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchRef.current.initialDist;
      const newScale = Math.min(3.0, Math.max(0.7, touchRef.current.initialScale * factor));
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    touchRef.current.initialDist = null;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale(s => Math.min(3.0, s + 0.15));
    } else {
      setScale(s => Math.max(0.7, s - 0.15));
    }
  };

  return (
    <div 
      className="modular-board-wrapper"
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Combo Badge Floating FX */}
      <AnimatePresence>
        {combo > 1 && (
          <div className="board-combo-wrapper">
            <motion.div
              className="board-combo-badge"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              🔥 {combo}x COMBO!
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Board Stage (Direct Artwork Render - No Card/Box) */}
      <div 
        className="modular-board-stage"
        style={{
          width: `${BOARD_WIDTH}px`,
          height: `${BOARD_HEIGHT}px`
        }}
      >
        <motion.div 
          className="modular-board-grid"
          animate={{ scale, x: pan.x, y: pan.y }}
          drag={scale > 1.05}
          dragConstraints={containerRef}
          dragElastic={0.12}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          style={{
            width: `${BOARD_WIDTH}px`,
            height: `${BOARD_HEIGHT}px`,
            display: 'grid',
            gridTemplateRows: `repeat(${rows}, ${TILE_SIZE}px)`,
            gridTemplateColumns: `repeat(${cols}, ${TILE_SIZE}px)`
          }}
        >
          {/* Background Guide Dot Matrix */}
          {showGuides && Array.from({ length: rows }).map((_, r) => (
            Array.from({ length: cols }).map((_, c) => (
              <div 
                key={`guide-tile-${r}-${c}`}
                className="guide-dot-tile"
                style={{
                  gridRow: r + 1,
                  gridColumn: c + 1,
                  width: `${TILE_SIZE}px`,
                  height: `${TILE_SIZE}px`
                }}
              >
                <span className="guide-matrix-dot" />
              </div>
            ))
          ))}

          {/* Modular SVG Puzzle Arrows */}
          {arrows.map((arrow) => {
            const isBlocked = arrow.id === blockedId;
            const isFlying = flyingIds.includes(arrow.id);
            const delta = DELTA_OFFSETS[arrow.direction] || DELTA_OFFSETS.RIGHT;

            const exitDeltaX = delta.c * EXIT_DISTANCE;
            const exitDeltaY = delta.r * EXIT_DISTANCE;

            const arrowColor = isBlocked ? '#ef4444' : (arrow.color || theme.color || '#0f172a');

            return (
              <motion.div
                key={arrow.id}
                className={`modular-arrow-container ${isBlocked ? 'arrow-blocked-shake' : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isFlying
                    ? {
                        x: exitDeltaX,
                        y: exitDeltaY,
                        opacity: [1, 1, 0],
                        transition: { duration: 0.42, ease: [0.32, 0, 0.24, 1] }
                      }
                    : (isBlocked
                        ? {
                            x: [-6, 6, -6, 6, 0],
                            opacity: 1,
                            transition: { duration: 0.35 }
                          }
                        : {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 0.2 }
                          }
                      )
                }
              >
                {arrow.pieces.map((piece, pIdx) => {
                  const PieceComponent = PIECE_COMPONENTS[piece.type] || Straight;
                  return (
                    <div
                      key={`piece-${arrow.id}-${pIdx}`}
                      className="modular-piece-tile"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArrowClick(arrow);
                      }}
                      style={{
                        position: 'absolute',
                        left: `${piece.c * TILE_SIZE}px`,
                        top: `${piece.r * TILE_SIZE}px`,
                        width: `${TILE_SIZE}px`,
                        height: `${TILE_SIZE}px`
                      }}
                    >
                      <PieceComponent
                        color={arrowColor}
                        strokeWidth={STROKE_WIDTH}
                        rotation={piece.rotation || 0}
                        short={piece.short || false}
                      />
                    </div>
                  );
                })}
              </motion.div>
            );
          })}

          {/* Sparkles Burst */}
          <AnimatePresence>
            {sparkles.map((sp) => (
              <motion.div
                key={sp.id}
                className="board-sparkle-burst"
                style={{ left: sp.x, top: sp.y }}
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2.4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="sparkle-ring-fx" />
                <span className="sparkle-star-icon">✨</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Board;
