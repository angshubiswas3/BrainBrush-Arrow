import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isCellInMask } from '../engine/shapeMasks';
import { MECHANIC_TYPES, handleMechanicsOnArrowRemoved } from '../engine/specialMechanics';
import './BrainArrowGrid.css';

const DELTAS = {
  UP: { r: -1, c: 0, angle: -90 },
  DOWN: { r: 1, c: 0, angle: 90 },
  LEFT: { r: 0, c: -1, angle: 180 },
  RIGHT: { r: 0, c: 1, angle: 0 }
};

/**
 * Builds continuous, rounded Bézier fillet paths across all corner turns.
 * The path connects smoothly from tail (P0) to the exact center of the head cell (P_last).
 */
function buildRoundedFilletPath(pxPoints, radius = 7) {
  if (!pxPoints || pxPoints.length === 0) return '';
  if (pxPoints.length === 1) return `M ${pxPoints[0].x} ${pxPoints[0].y}`;
  if (pxPoints.length === 2) return `M ${pxPoints[0].x} ${pxPoints[0].y} L ${pxPoints[1].x} ${pxPoints[1].y}`;

  let d = `M ${pxPoints[0].x} ${pxPoints[0].y}`;

  for (let i = 1; i < pxPoints.length - 1; i++) {
    const prev = pxPoints[i - 1];
    const curr = pxPoints[i];
    const next = pxPoints[i + 1];

    const d1x = curr.x - prev.x;
    const d1y = curr.y - prev.y;
    const len1 = Math.hypot(d1x, d1y);

    const d2x = next.x - curr.x;
    const d2y = next.y - curr.y;
    const len2 = Math.hypot(d2x, d2y);

    const r = Math.min(radius, len1 / 2, len2 / 2);

    const inX = curr.x - (d1x / len1) * r;
    const inY = curr.y - (d1y / len1) * r;
    const outX = curr.x + (d2x / len2) * r;
    const outY = curr.y + (d2y / len2) * r;

    d += ` L ${inX} ${inY} Q ${curr.x} ${curr.y} ${outX} ${outY}`;
  }

  const last = pxPoints[pxPoints.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

const BrainArrowGrid = ({ levelData, onLevelComplete, onWrongMove }) => {
  const [arrows, setArrows] = useState(levelData.arrows || []);
  const [blockedId, setBlockedId] = useState(null);
  const [flyingIds, setFlyingIds] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [fxEvents, setFxEvents] = useState([]);
  const [combo, setCombo] = useState(0);

  // Floating Gesture Camera (Pinch, Drag, Double-Tap)
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const boardRef = useRef(null);
  const touchStateRef = useRef({ initialDist: null, initialScale: 1, lastTapTime: 0 });
  const comboTimerRef = useRef(null);

  const size = levelData.size || 13;
  const shape = levelData.shape || 'SPIRAL';
  const theme = levelData.theme || {};
  const shapeInfo = {
    name: levelData.shapeName || 'Vortex Spiral',
    icon: levelData.shapeIcon || '🌀'
  };

  // Responsive dynamic cell size
  const CELL_SIZE = Math.min(34, Math.floor(350 / size));
  const BOARD_SIZE = size * CELL_SIZE;
  const STROKE_WIDTH = Math.max(5.2, CELL_SIZE * 0.18);
  const CORNER_RADIUS = Math.max(6, CELL_SIZE * 0.28);
  const EXIT_DISTANCE = 650;

  // Modern Aerodynamic Arrowhead Dimensions
  const HEAD_TIP = Math.max(12, Math.round(CELL_SIZE * 0.42));
  const HEAD_BASE = Math.max(6, Math.round(CELL_SIZE * 0.22));
  const HEAD_HALF_WIDTH = Math.max(8.5, Math.round(CELL_SIZE * 0.30));
  const HEAD_INDENT = Math.max(2.5, Math.round(HEAD_BASE * 0.45));

  // Auto-fit on level load
  useEffect(() => {
    setArrows(levelData.arrows || []);
    setScale(1);
    setPan({ x: 0, y: 0 });
    setCombo(0);
  }, [levelData]);

  // Level completion
  useEffect(() => {
    if (arrows.length === 0) {
      if (navigator.vibrate) navigator.vibrate([30, 40, 60, 40, 100]);
      const timer = setTimeout(() => {
        if (onLevelComplete) onLevelComplete();
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [arrows.length, onLevelComplete]);

  const getPointPx = (r, c) => ({
    x: c * CELL_SIZE + CELL_SIZE / 2,
    y: r * CELL_SIZE + CELL_SIZE / 2
  });

  const checkArrowClear = (arrow, currentArrows) => {
    if (arrow.isLocked || arrow.isFrozen) return false;

    const pts = arrow.points || arrow.vertices;
    const head = pts[pts.length - 1];
    const { direction } = arrow;
    const delta = DELTAS[direction];

    let currR = head.r + delta.r;
    let currC = head.c + delta.c;

    while (currR >= 0 && currR < size && currC >= 0 && currC < size) {
      const hitOther = currentArrows.some(other => 
        other.id !== arrow.id &&
        (other.points || other.vertices).some(p => p.r === currR && p.c === currC)
      );

      if (hitOther) return false;

      currR += delta.r;
      currC += delta.c;
    }

    return true;
  };

  const handleArrowClick = (arrow) => {
    if (flyingIds.includes(arrow.id)) return;

    const isClear = checkArrowClear(arrow, arrows);

    if (isClear) {
      if (navigator.vibrate) navigator.vibrate(18);

      setCombo(c => c + 1);
      clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => setCombo(0), 1800);

      const pts = arrow.vertices || arrow.points;
      const head = pts[pts.length - 1];
      const headPx = getPointPx(head.r, head.c);

      const newSparkle = {
        id: `spark_${Date.now()}_${Math.random()}`,
        x: headPx.x,
        y: headPx.y,
        color: theme.glowColor || '#38bdf8'
      };
      setSparkles(prev => [...prev, newSparkle]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 650);

      setFlyingIds(prev => [...prev, arrow.id]);

      setTimeout(() => {
        setArrows(prev => {
          const remaining = prev.filter(a => a.id !== arrow.id);
          const updated = handleMechanicsOnArrowRemoved(arrow, remaining);

          updated.forEach(u => {
            if (u.justUnlocked || u.justUnfrozen) {
              const uPts = u.vertices || u.points;
              const uHead = getPointPx(uPts[uPts.length - 1].r, uPts[uPts.length - 1].c);
              const newFx = {
                id: `fx_${Date.now()}_${Math.random()}`,
                x: uHead.x,
                y: uHead.y,
                type: u.justUnlocked ? 'UNLOCK' : 'SHATTER'
              };
              setFxEvents(f => [...f, newFx]);
              setTimeout(() => {
                setFxEvents(f => f.filter(e => e.id !== newFx.id));
              }, 700);
            }
          });

          return updated;
        });

        setFlyingIds(prev => prev.filter(id => id !== arrow.id));
      }, 480);
    } else {
      if (navigator.vibrate) navigator.vibrate([35, 25, 35]);
      setBlockedId(arrow.id);
      setCombo(0);
      if (onWrongMove) onWrongMove();
      setTimeout(() => setBlockedId(null), 360);
    }
  };

  // Touch Gesture Listeners (Pinch & Double Tap)
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStateRef.current.initialDist = dist;
      touchStateRef.current.initialScale = scale;
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - touchStateRef.current.lastTapTime < 300) {
        setScale(s => (s > 1.15 ? 1 : 1.75));
        setPan({ x: 0, y: 0 });
      }
      touchStateRef.current.lastTapTime = now;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchStateRef.current.initialDist) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStateRef.current.initialDist;
      const newScale = Math.min(3.0, Math.max(0.6, touchStateRef.current.initialScale * factor));
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    touchStateRef.current.initialDist = null;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale(s => Math.min(3.0, s + 0.15));
    } else {
      setScale(s => Math.max(0.6, s - 0.15));
    }
  };

  const getPixelPoints = (verts) => verts.map(v => getPointPx(v.r, v.c));

  const getPathLength = (pxPoints) => {
    let len = 0;
    for (let i = 0; i < pxPoints.length - 1; i++) {
      const dx = pxPoints[i + 1].x - pxPoints[i].x;
      const dy = pxPoints[i + 1].y - pxPoints[i].y;
      len += Math.hypot(dx, dy);
    }
    return len;
  };

  const primaryColor = theme.primaryArrow || '#10b981';
  const highlightColor = theme.highlightSpine || 'rgba(255, 255, 255, 0.5)';

  return (
    <div 
      className="brain-arrow-grid-wrapper"
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ background: theme.worldGradient || 'transparent' }}
    >
      {/* Top HUD Header */}
      <div className="board-top-hud">
        <motion.div 
          className="world-shape-pill"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            background: theme.tagBg || 'rgba(15, 23, 42, 0.65)',
            color: theme.tagText || '#f8fafc'
          }}
        >
          <span className="world-icon">{theme.worldIcon || '✨'}</span>
          <span className="shape-icon">{shapeInfo.icon}</span>
          <span className="level-title-text">{shapeInfo.name}</span>
          <span className="arrow-count-badge">{arrows.length} left</span>
        </motion.div>

        <AnimatePresence>
          {combo > 1 && (
            <motion.div
              className="combo-multiplier-pill"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{ background: theme.glowColor || '#38bdf8' }}
            >
              🔥 {combo}x COMBO!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Canvas (No Container Box or Borders) */}
      <div className="brain-arrow-viewport">
        <motion.div 
          className="brain-arrow-floating-canvas" 
          ref={boardRef}
          drag={scale > 1.02}
          dragConstraints={containerRef}
          dragElastic={0.12}
          animate={{ scale, x: pan.x, y: pan.y }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          style={{ 
            width: `${BOARD_SIZE}px`, 
            height: `${BOARD_SIZE}px`
          }}
        >
          {/* Subtle Silhouette Guide Dots Layer */}
          <div className="dot-matrix-layer">
            {Array.from({ length: size }).map((_, r) => (
              <div key={`dot-row-${r}`} className="dot-matrix-row">
                {Array.from({ length: size }).map((_, c) => {
                  const isActive = isCellInMask(r, c, shape, size);
                  return (
                    <div 
                      key={`dot-${r}-${c}`} 
                      className="dot-matrix-point" 
                      style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
                    >
                      {isActive && (
                        <span 
                          className="dot-pill" 
                          style={{ backgroundColor: theme.dotColor || 'rgba(255,255,255,0.16)' }}
                        ></span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Premium Vector SVG Arrows Maze */}
          <svg className="winding-arrows-svg" width={BOARD_SIZE} height={BOARD_SIZE}>
            {arrows.map((arrow) => {
              const isBlocked = arrow.id === blockedId;
              const isFlying = flyingIds.includes(arrow.id);
              const verts = arrow.vertices || arrow.points;
              const pxPoints = getPixelPoints(verts);
              const bodyLength = getPathLength(pxPoints);

              const delta = DELTAS[arrow.direction] || DELTAS.RIGHT;
              const headPx = pxPoints[pxPoints.length - 1];
              const exitPx = {
                x: headPx.x + delta.c * EXIT_DISTANCE,
                y: headPx.y + delta.r * EXIT_DISTANCE
              };
              const extendedPxPoints = [...pxPoints, exitPx];
              
              // Rounded Bézier Fillet Paths
              const roundedStaticPath = buildRoundedFilletPath(pxPoints, CORNER_RADIUS);
              const roundedExtendedPath = buildRoundedFilletPath(extendedPxPoints, CORNER_RADIUS);
              const activePathD = isFlying ? roundedExtendedPath : roundedStaticPath;
              const totalPathLength = bodyLength + EXIT_DISTANCE;

              const activeColor = isBlocked 
                ? "#ef4444" 
                : (arrow.isFrozen 
                    ? "#38bdf8" 
                    : (arrow.isLocked ? "#f59e0b" : primaryColor)
                  );

              const activeHighlight = isBlocked
                ? "rgba(255, 180, 180, 0.7)"
                : (arrow.isFrozen ? "rgba(255, 255, 255, 0.8)" : highlightColor);

              const rotationAngle = delta.angle;
              
              // Swept-back aerodynamic luxury arrowhead polygon
              const headPolygonLocal = `${HEAD_TIP},0 ${-HEAD_BASE},${HEAD_HALF_WIDTH} ${-HEAD_INDENT},0 ${-HEAD_BASE},${-HEAD_HALF_WIDTH}`;

              return (
                <g
                  key={arrow.id}
                  className={`winding-arrow-group ${isBlocked ? 'arrow-blocked-shake' : ''} ${isFlying ? 'arrow-is-flying' : ''}`}
                  onClick={() => handleArrowClick(arrow)}
                >
                  {/* Wide Hitbox for Touch Precision */}
                  <path
                    d={roundedStaticPath}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={CELL_SIZE * 0.95}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ cursor: 'pointer' }}
                  />

                  {/* Layer 1: Soft Ambient Shadow for Stem */}
                  <motion.path
                    d={activePathD}
                    fill="none"
                    stroke="rgba(0, 0, 0, 0.35)"
                    strokeWidth={STROKE_WIDTH + 2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={isFlying ? `${bodyLength} ${totalPathLength}` : 'none'}
                    initial={{ strokeDashoffset: 0 }}
                    animate={
                      isFlying
                        ? { strokeDashoffset: -EXIT_DISTANCE, opacity: 0 }
                        : { opacity: 0.6, strokeDashoffset: 0 }
                    }
                    transition={isFlying ? { duration: 0.48, ease: [0.32, 0, 0.24, 1] } : { duration: 0.2 }}
                  />

                  {/* Layer 2: Main Rich Vector Stem Body */}
                  <motion.path
                    d={activePathD}
                    className="arrow-body-path"
                    fill="none"
                    stroke={activeColor}
                    strokeWidth={STROKE_WIDTH}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={isFlying ? `${bodyLength} ${totalPathLength}` : 'none'}
                    initial={{ strokeDashoffset: 0 }}
                    animate={
                      isFlying
                        ? { strokeDashoffset: -EXIT_DISTANCE, opacity: [1, 1, 0] }
                        : (isBlocked ? { x: [-4, 4, -4, 4, 0] } : { opacity: 1, strokeDashoffset: 0, x: 0, y: 0 })
                    }
                    transition={
                      isFlying
                        ? { duration: 0.48, ease: [0.32, 0, 0.24, 1] }
                        : { duration: 0.25 }
                    }
                  />

                  {/* Layer 3: Specular Inner Highlight Spine */}
                  <motion.path
                    d={activePathD}
                    className="arrow-highlight-spine"
                    fill="none"
                    stroke={activeHighlight}
                    strokeWidth={Math.max(1.5, STROKE_WIDTH * 0.28)}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={isFlying ? `${bodyLength} ${totalPathLength}` : 'none'}
                    initial={{ strokeDashoffset: 0 }}
                    animate={
                      isFlying
                        ? { strokeDashoffset: -EXIT_DISTANCE, opacity: 0 }
                        : { opacity: 0.85, strokeDashoffset: 0 }
                    }
                    transition={isFlying ? { duration: 0.48, ease: [0.32, 0, 0.24, 1] } : { duration: 0.2 }}
                  />

                  {/* Layer 4: Solid, Aerodynamic Arrowhead Capping the Stem */}
                  <motion.g
                    initial={{ 
                      x: headPx.x, 
                      y: headPx.y, 
                      rotate: rotationAngle,
                      opacity: 1 
                    }}
                    animate={
                      isFlying
                        ? {
                            x: headPx.x + delta.c * EXIT_DISTANCE,
                            y: headPx.y + delta.r * EXIT_DISTANCE,
                            rotate: rotationAngle,
                            opacity: [1, 1, 0]
                          }
                        : (isBlocked
                            ? { x: [headPx.x - 4, headPx.x + 4, headPx.x - 4, headPx.x + 4, headPx.x], y: headPx.y, rotate: rotationAngle, opacity: 1 }
                            : { x: headPx.x, y: headPx.y, rotate: rotationAngle, opacity: 1 }
                          )
                    }
                    transition={
                      isFlying
                        ? { duration: 0.48, ease: [0.32, 0, 0.24, 1] }
                        : { duration: 0.25 }
                    }
                  >
                    {/* Arrowhead Ambient Shadow */}
                    <polygon
                      points={headPolygonLocal}
                      fill="rgba(0, 0, 0, 0.38)"
                      transform="translate(0, 1.5)"
                    />

                    {/* Arrowhead Main Solid Polygon */}
                    <polygon
                      points={headPolygonLocal}
                      className="arrow-head-poly"
                      fill={activeColor}
                      stroke={activeColor}
                      strokeWidth={1.2}
                      strokeLinejoin="round"
                    />

                    {/* Arrowhead Specular Highlight Spine */}
                    <line
                      x1={-HEAD_INDENT}
                      y1={0}
                      x2={HEAD_TIP - 2}
                      y2={0}
                      stroke={activeHighlight}
                      strokeWidth={Math.max(1.4, STROKE_WIDTH * 0.26)}
                      strokeLinecap="round"
                    />
                  </motion.g>
                </g>
              );
            })}
          </svg>

          {/* Sparkles & FX */}
          <AnimatePresence>
            {sparkles.map((sp) => (
              <motion.div
                key={sp.id}
                className="exit-sparkle-burst"
                style={{ left: sp.x, top: sp.y }}
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="sparkle-ring" style={{ borderColor: sp.color, boxShadow: `0 0 16px ${sp.color}` }}></div>
                <span className="sparkle-star">✨</span>
              </motion.div>
            ))}

            {fxEvents.map((fx) => (
              <motion.div
                key={fx.id}
                className="mechanic-fx-burst"
                style={{ left: fx.x, top: fx.y }}
                initial={{ scale: 0.3, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                {fx.type === 'UNLOCK' ? '🔓✨' : '❄️💥'}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default BrainArrowGrid;
