import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isCellInMask, SHAPE_METADATA } from '../engine/shapeMasks';
import { MECHANIC_TYPES, handleMechanicsOnArrowRemoved } from '../engine/specialMechanics';
import './BrainArrowGrid.css';

const DELTAS = {
  UP: { r: -1, c: 0 },
  DOWN: { r: 1, c: 0 },
  LEFT: { r: 0, c: -1 },
  RIGHT: { r: 0, c: 1 }
};

const BrainArrowGrid = ({ levelData, onLevelComplete, onWrongMove }) => {
  const [arrows, setArrows] = useState(levelData.arrows || []);
  const [blockedId, setBlockedId] = useState(null);
  const [flyingIds, setFlyingIds] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [fxEvents, setFxEvents] = useState([]);
  const [combo, setCombo] = useState(0);

  // Native Mobile Camera State (Google Maps Style)
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const boardRef = useRef(null);
  const touchStateRef = useRef({ initialDist: null, initialScale: 1, lastTapTime: 0 });
  const comboTimerRef = useRef(null);

  const size = levelData.size || 9;
  const shape = levelData.shape || 'SQUARE';
  const theme = levelData.theme || {};
  const shapeInfo = SHAPE_METADATA[shape] || SHAPE_METADATA.SQUARE;

  const CELL_SIZE = Math.min(42, Math.floor(340 / size));
  const BOARD_SIZE = size * CELL_SIZE;

  // Auto-fit camera on level load
  useEffect(() => {
    setArrows(levelData.arrows || []);
    setScale(1);
    setPan({ x: 0, y: 0 });
    setCombo(0);
  }, [levelData]);

  // Level complete detection
  useEffect(() => {
    if (arrows.length === 0) {
      if (navigator.vibrate) navigator.vibrate([30, 50, 60, 50, 100]);
      const timer = setTimeout(() => {
        if (onLevelComplete) onLevelComplete();
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [arrows.length, onLevelComplete]);

  // Convert grid (r, c) to pixel center (x, y)
  const getPointPx = (r, c) => ({
    x: c * CELL_SIZE + CELL_SIZE / 2,
    y: r * CELL_SIZE + CELL_SIZE / 2
  });

  // Collision raycast check to board perimeter
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
      // Haptic feedback
      if (navigator.vibrate) navigator.vibrate(18);

      // Increment Combo
      setCombo(c => c + 1);
      clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => setCombo(0), 1800);

      const pts = arrow.vertices || arrow.points;
      const head = pts[pts.length - 1];
      const headPx = getPointPx(head.r, head.c);

      // Sparkle FX
      const newSparkle = {
        id: `spark_${Date.now()}_${Math.random()}`,
        x: headPx.x,
        y: headPx.y,
        color: theme.glowColor || '#38bdf8'
      };
      setSparkles(prev => [...prev, newSparkle]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 700);

      // Launch Arrow
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
      }, 500);
    } else {
      // Blocked Feedback
      if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
      setBlockedId(arrow.id);
      setCombo(0);
      if (onWrongMove) onWrongMove();
      setTimeout(() => setBlockedId(null), 380);
    }
  };

  // Touch Gesture Listeners (Pinch-to-Zoom & Double-Tap)
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
        // Double Tap Toggle
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
      const newScale = Math.min(2.8, Math.max(0.65, touchStateRef.current.initialScale * factor));
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    touchStateRef.current.initialDist = null;
  };

  // Mouse wheel zoom for desktop testing
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale(s => Math.min(2.8, s + 0.15));
    } else {
      setScale(s => Math.max(0.65, s - 0.15));
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

  const buildSvgPathString = (pxPoints) => {
    if (!pxPoints || pxPoints.length === 0) return '';
    let d = `M ${pxPoints[0].x} ${pxPoints[0].y}`;
    for (let i = 1; i < pxPoints.length; i++) {
      d += ` L ${pxPoints[i].x} ${pxPoints[i].y}`;
    }
    return d;
  };

  const getArrowHeadPolygon = (headPoint, direction) => {
    const { x, y } = getPointPx(headPoint.r, headPoint.c);
    const headLen = Math.max(9, Math.round(CELL_SIZE * 0.28));
    const halfWidth = Math.max(5.5, Math.round(CELL_SIZE * 0.16));

    switch (direction) {
      case 'UP':
        return `${x},${y - headLen} ${x - halfWidth},${y + 1} ${x + halfWidth},${y + 1}`;
      case 'DOWN':
        return `${x},${y + headLen} ${x - halfWidth},${y - 1} ${x + halfWidth},${y - 1}`;
      case 'LEFT':
        return `${x - headLen},${y} ${x + 1},${y - halfWidth} ${x + 1},${y + halfWidth}`;
      case 'RIGHT':
        return `${x + headLen},${y} ${x - 1},${y - halfWidth} ${x - 1},${y + halfWidth}`;
      default:
        return '';
    }
  };

  const getHeadFlightTransform = (direction, distance) => {
    switch (direction) {
      case 'UP': return { y: [0, -distance], opacity: [1, 1, 0] };
      case 'DOWN': return { y: [0, distance], opacity: [1, 1, 0] };
      case 'LEFT': return { x: [0, -distance], opacity: [1, 1, 0] };
      case 'RIGHT': return { x: [0, distance], opacity: [1, 1, 0] };
      default: return {};
    }
  };

  const STROKE_WIDTH = Math.max(4, CELL_SIZE * 0.13);
  const EXIT_DISTANCE = 500;

  return (
    <div 
      className="brain-arrow-grid-wrapper"
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic World & Shape Header Badge */}
      <div className="board-top-hud">
        <motion.div 
          className="world-shape-pill"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            background: theme.tagBg || '#1e293b',
            color: theme.tagText || '#f8fafc'
          }}
        >
          <span className="world-icon">{theme.worldIcon || '✨'}</span>
          <span className="shape-icon">{shapeInfo.icon}</span>
          <span className="level-title-text">{shapeInfo.name}</span>
          <span className="arrow-count-badge">{arrows.length} left</span>
        </motion.div>

        {/* Dynamic Combo Multiplier Pill */}
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

      {/* Interactive Viewport (Drag & Pan Enabled with Inertia) */}
      <div className="brain-arrow-viewport">
        <motion.div 
          className="brain-arrow-board" 
          ref={boardRef}
          drag={scale > 1.02}
          dragConstraints={containerRef}
          dragElastic={0.12}
          animate={{ scale, x: pan.x, y: pan.y }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          style={{ 
            width: `${BOARD_SIZE}px`, 
            height: `${BOARD_SIZE}px`,
            background: theme.boardBg || '#0f172a'
          }}
        >
          {/* Dot Matrix Layer (Masked to Shape) */}
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
                          style={{ backgroundColor: theme.dotColor || '#334155' }}
                        ></span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* High-Performance SVG Arrow Maze Layer */}
          <svg className="winding-arrows-svg" width={BOARD_SIZE} height={BOARD_SIZE}>
            {arrows.map((arrow) => {
              const isBlocked = arrow.id === blockedId;
              const isFlying = flyingIds.includes(arrow.id);
              const verts = arrow.vertices || arrow.points;
              const headPoint = verts[verts.length - 1];
              const pxPoints = getPixelPoints(verts);
              const bodyLength = getPathLength(pxPoints);

              const delta = DELTAS[arrow.direction];
              const headPx = pxPoints[pxPoints.length - 1];
              const exitPx = {
                x: headPx.x + delta.c * EXIT_DISTANCE,
                y: headPx.y + delta.r * EXIT_DISTANCE
              };
              const extendedPxPoints = [...pxPoints, exitPx];
              const extendedPathD = buildSvgPathString(isFlying ? extendedPxPoints : pxPoints);
              const totalPathLength = bodyLength + EXIT_DISTANCE;

              const headPolygon = getArrowHeadPolygon(headPoint, arrow.direction);
              const activeColor = isBlocked 
                ? "#ef4444" 
                : (arrow.isFrozen 
                    ? "#38bdf8" 
                    : (arrow.isLocked ? "#f59e0b" : (arrow.color || theme.primaryArrow || "#38bdf8"))
                  );

              return (
                <g
                  key={arrow.id}
                  className={`winding-arrow-group ${isBlocked ? 'arrow-blocked-shake' : ''} ${isFlying ? 'arrow-is-flying' : ''}`}
                  onClick={() => handleArrowClick(arrow)}
                >
                  {/* Generous Touch Target Hitbox */}
                  <path
                    d={buildSvgPathString(pxPoints)}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={CELL_SIZE * 0.9}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ cursor: 'pointer' }}
                  />

                  {/* Slithering Snake Body Path */}
                  <motion.path
                    d={extendedPathD}
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
                        : (isBlocked ? { x: [-5, 5, -5, 5, 0] } : { opacity: 1, strokeDashoffset: 0, x: 0, y: 0 })
                    }
                    transition={
                      isFlying
                        ? { duration: 0.48, ease: [0.32, 0, 0.24, 1] }
                        : { duration: 0.25 }
                    }
                  />

                  {/* Arrowhead Geometry */}
                  <motion.polygon
                    points={headPolygon}
                    className="arrow-head-poly"
                    fill={activeColor}
                    initial={{ x: 0, y: 0 }}
                    animate={
                      isFlying
                        ? getHeadFlightTransform(arrow.direction, EXIT_DISTANCE)
                        : (isBlocked ? { x: [-5, 5, -5, 5, 0] } : { opacity: 1, x: 0, y: 0 })
                    }
                    transition={
                      isFlying
                        ? { duration: 0.48, ease: [0.32, 0, 0.24, 1] }
                        : { duration: 0.25 }
                    }
                  />
                </g>
              );
            })}
          </svg>

          {/* Particles & Sparkles */}
          <AnimatePresence>
            {sparkles.map((sp) => (
              <motion.div
                key={sp.id}
                className="exit-sparkle-burst"
                style={{ left: sp.x, top: sp.y }}
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2.4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="sparkle-ring" style={{ borderColor: sp.color, boxShadow: `0 0 14px ${sp.color}` }}></div>
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
