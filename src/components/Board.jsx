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

const DIRECTION_ROTATIONS = {
  RIGHT: 0,
  DOWN: 90,
  LEFT: 180,
  UP: 270
};

/**
 * Builds continuous SVG polyline path for smooth slithering exit animation.
 */
function buildArrowSvgPath(arrow, tileSize, exitDistance = 600) {
  let vertices = arrow.vertices;
  if (!vertices || vertices.length === 0) {
    if (arrow.pieces && arrow.pieces.length > 0) {
      vertices = arrow.pieces.map(p => ({ r: p.r, c: p.c }));
    } else {
      vertices = [];
    }
  }

  if (vertices.length === 0) {
    return { pathD: '', arrowLength: 0, totalLength: 0, headX: 0, headY: 0, dir: { r: 0, c: 1 } };
  }

  const points = vertices.map(v => ({
    x: v.c * tileSize + tileSize / 2,
    y: v.r * tileSize + tileSize / 2
  }));

  let arrowLength = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    arrowLength += Math.hypot(dx, dy);
  }

  const dir = DELTA_OFFSETS[arrow.direction] || DELTA_OFFSETS.RIGHT;
  const head = points[points.length - 1];
  const exitPoint = {
    x: head.x + dir.c * exitDistance,
    y: head.y + dir.r * exitDistance
  };

  const allPoints = [...points, exitPoint];
  let pathD = `M ${allPoints[0].x} ${allPoints[0].y}`;
  for (let i = 1; i < allPoints.length; i++) {
    pathD += ` L ${allPoints[i].x} ${allPoints[i].y}`;
  }

  const totalLength = arrowLength + exitDistance;

  return {
    pathD,
    arrowLength,
    totalLength,
    headX: head.x,
    headY: head.y,
    dir
  };
}

const Board = ({ 
  data, 
  onLevelComplete, 
  onWrongMove,
  showGuides = true 
}) => {
  const levelData = data || {};
  const initialArrows = levelData.board || levelData.arrows || [];
  const [arrows, setArrows] = useState([]);
  const [flyingArrows, setFlyingArrows] = useState([]);
  const [blockedId, setBlockedId] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const [combo, setCombo] = useState(0);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const touchRef = useRef({ initialDist: null, initialScale: 1, lastTapTime: 0 });
  const comboTimerRef = useRef(null);

  const gridSize = levelData.gridSize || (typeof levelData.size === 'number' ? levelData.size : 6);
  const rows = levelData.size?.rows || gridSize;
  const cols = levelData.size?.cols || gridSize;
  const maxDim = Math.max(rows, cols);

  // Compact, snug tile size so arrows are tightly packed without large gaps
  const TILE_SIZE = Math.min(30, Math.max(24, Math.floor(220 / maxDim)));
  const BOARD_WIDTH = cols * TILE_SIZE;
  const BOARD_HEIGHT = rows * TILE_SIZE;
  const STROKE_WIDTH = 9; // Sleek, crisp vector line stroke
  const EXIT_DISTANCE = 650;

  const theme = levelData.theme || { color: '#0f172a', bg: '#f8fafc' };

  // Reset when level data changes
  useEffect(() => {
    const freshArrows = levelData.board || levelData.arrows || [];
    setArrows(freshArrows);
    setFlyingArrows([]);
    setBlockedId(null);
    setScale(1);
    setPan({ x: 0, y: 0 });
    setCombo(0);
  }, [levelData]);

  // Level completion check
  useEffect(() => {
    const totalCount = (levelData.board?.length || levelData.arrows?.length || 0);
    if (arrows.length === 0 && flyingArrows.length === 0 && totalCount > 0) {
      if (navigator.vibrate) navigator.vibrate([30, 40, 60, 40, 100]);
      const timer = setTimeout(() => {
        if (onLevelComplete) onLevelComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [arrows.length, flyingArrows.length, levelData, onLevelComplete]);

  const handleArrowClick = (arrow) => {
    // Check unobstructed path against remaining active obstacles
    const isClear = isArrowClearOnGrid(arrow, arrows, { rows, cols });

    if (isClear) {
      if (navigator.vibrate) navigator.vibrate(18);

      setCombo(c => c + 1);
      clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => setCombo(0), 2200);

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
        }, 1000);
      }

      // IMMEDIATELY remove from obstacle grid so subsequent taps NEVER falsely block
      setArrows(prev => prev.filter(a => a.id !== arrow.id));
      setFlyingArrows(prev => [...prev, arrow]);

      setTimeout(() => {
        setFlyingArrows(prev => prev.filter(a => a.id !== arrow.id));
      }, 3400);
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

      {/* Main Board Stage */}
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

          {/* In-Flight Slithering Path Animations */}
          {flyingArrows.map((arrow) => {
            const pathData = buildArrowSvgPath(arrow, TILE_SIZE, EXIT_DISTANCE);
            const rotation = DIRECTION_ROTATIONS[arrow.direction] || 0;
            const arrowColor = arrow.color || theme.color || '#0f172a';

            return (
              <React.Fragment key={`flying-group-${arrow.id}`}>
                {/* Slithering Body Path */}
                <svg
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: `${BOARD_WIDTH}px`,
                    height: `${BOARD_HEIGHT}px`,
                    overflow: 'visible',
                    pointerEvents: 'none',
                    zIndex: 25
                  }}
                >
                  <motion.path
                    d={pathData.pathD}
                    fill="none"
                    stroke={arrowColor}
                    strokeWidth={STROKE_WIDTH}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={`${pathData.arrowLength} ${pathData.totalLength * 2}`}
                    initial={{ strokeDashoffset: 0, opacity: 1 }}
                    animate={{ 
                      strokeDashoffset: -pathData.totalLength,
                      opacity: [1, 1, 1, 0.9, 0]
                    }}
                    transition={{ duration: 3.2, ease: [0.25, 0.9, 0.3, 1] }}
                  />
                </svg>

                {/* Leading Arrowhead Flying Out */}
                <motion.div
                  style={{
                    position: 'absolute',
                    left: `${pathData.headX - TILE_SIZE / 2}px`,
                    top: `${pathData.headY - TILE_SIZE / 2}px`,
                    width: `${TILE_SIZE}px`,
                    height: `${TILE_SIZE}px`,
                    pointerEvents: 'none',
                    zIndex: 30
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: pathData.dir.c * EXIT_DISTANCE,
                    y: pathData.dir.r * EXIT_DISTANCE,
                    opacity: [1, 1, 1, 0.85, 0]
                  }}
                  transition={{ duration: 3.2, ease: [0.25, 0.9, 0.3, 1] }}
                >
                  <ArrowHead
                    color={arrowColor}
                    strokeWidth={STROKE_WIDTH}
                    rotation={rotation}
                    short={false}
                  />
                </motion.div>
              </React.Fragment>
            );
          })}

          {/* Active Obstacle Arrows on Grid */}
          {arrows.map((arrow) => {
            const isBlocked = arrow.id === blockedId;
            const arrowColor = isBlocked ? '#ef4444' : (arrow.color || theme.color || '#0f172a');

            return (
              <motion.div
                key={arrow.id}
                className={`modular-arrow-container ${isBlocked ? 'arrow-blocked-shake' : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isBlocked
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
