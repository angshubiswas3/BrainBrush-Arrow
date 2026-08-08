import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ArrowGeometryUtils from './ArrowGeometryUtils';
import { screenToGrid } from './CoordinateEngine';
import { Straight, Corner, TJunction, Cross, DeadEnd, ArrowHead } from '../components/puzzle';

const TILE_SIZE = 40; // Base cell size in canvas space
const HEADER_OFFSET = 32; // Offset for header numbers margin

const PIECE_COMPONENTS = {
  STRAIGHT: Straight,
  CORNER: Corner,
  T_JUNCTION: TJunction,
  CROSS: Cross,
  DEAD_END: DeadEnd,
  ARROW_HEAD: ArrowHead
};

export const GridCanvas = ({
  gridSize = { rows: 10, cols: 10 },
  board = [],
  onUpdateBoard,
  activeMode = 'DRAW_ARROW',
  selectedPieceType = 'STRAIGHT',
  selectedArrowId,
  setSelectedArrowId,
  selectedCells,
  setSelectedCells,
  zoom = 1,
  setZoom,
  pan = { x: 0, y: 0 },
  setPan,
  validationResult = { errors: [], warnings: [] },
  onHoverCell
}) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });
  const [containerDim, setContainerDim] = useState({ width: 800, height: 600 });
  const [hoverCell, setHoverCellState] = useState(null);

  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  // Path drawing state (Click -> Drag -> Release)
  const [isDrawingPath, setIsDrawingPath] = useState(false);
  const [currentPathCells, setCurrentPathCells] = useState([]);

  // Box selection drag state
  const [isBoxSelecting, setIsBoxSelecting] = useState(false);
  const [boxStart, setBoxStart] = useState(null);
  const [boxEnd, setBoxEnd] = useState(null);

  // Track container dimensions and scroll position for virtualization
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleResize = () => {
      setContainerDim({ width: el.clientWidth, height: el.clientHeight });
    };
    handleResize();

    const handleScroll = () => {
      setScrollPos({ left: el.scrollLeft, top: el.scrollTop });
    };

    window.addEventListener('resize', handleResize);
    el.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Track space key for panning
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        setIsSpacePressed(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Fast cell map lookup: "r,c" -> arrow
  const cellMap = useRef(new Map());
  useEffect(() => {
    const map = new Map();
    board.forEach((arrow) => {
      const vertices = arrow.vertices || (arrow.pieces ? arrow.pieces.map((p) => ({ r: p.r, c: p.c })) : []);
      vertices.forEach((v) => {
        map.set(`${v.r},${v.c}`, arrow);
      });
    });
    cellMap.current = map;
  }, [board]);

  // VIRTUALIZATION BOUNDS CALCULATION
  const visibleBounds = useMemo(() => {
    const scaledTile = TILE_SIZE * zoom;
    const startCol = Math.max(0, Math.floor((scrollPos.left - pan.x) / scaledTile) - 2);
    const endCol = Math.min(gridSize.cols - 1, Math.ceil((scrollPos.left - pan.x + containerDim.width) / scaledTile) + 2);
    const startRow = Math.max(0, Math.floor((scrollPos.top - pan.y) / scaledTile) - 2);
    const endRow = Math.min(gridSize.rows - 1, Math.ceil((scrollPos.top - pan.y + containerDim.height) / scaledTile) + 2);

    return { startRow, endRow, startCol, endCol };
  }, [scrollPos, pan, containerDim, gridSize, zoom]);

  // SINGLE UNIFIED HIT TESTING CALL
  const getCellFromEvent = useCallback(
    (e) => {
      return screenToGrid(e, svgRef.current, gridSize);
    },
    [gridSize]
  );

  // Wheel Scroll (Vertical, Shift+Horizontal, Ctrl+Zoom)
  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.min(5, Math.max(0.2, zoom + delta));
      setZoom(newZoom);
    } else if (e.shiftKey) {
      if (containerRef.current) {
        containerRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  // Mouse Handlers for Drawing, Panning, Selection
  const handleMouseDown = (e) => {
    if (e.button === 1 || (e.button === 0 && isSpacePressed)) {
      setIsPanning(true);
      if (containerRef.current) {
        setPanStart({
          x: e.clientX + containerRef.current.scrollLeft,
          y: e.clientY + containerRef.current.scrollTop
        });
      }
      return;
    }

    if (e.button === 2) {
      e.preventDefault();
      const cell = getCellFromEvent(e);
      if (cell) {
        const existing = cellMap.current.get(`${cell.r},${cell.c}`);
        if (existing) {
          onUpdateBoard(board.filter((a) => a.id !== existing.id));
        }
      }
      setIsDrawingPath(false);
      setCurrentPathCells([]);
      return;
    }

    if (e.button === 0) {
      const cell = getCellFromEvent(e);
      if (!cell) return;

      if (activeMode === 'DRAW_ARROW') {
        setIsDrawingPath(true);
        setCurrentPathCells([cell]);
      } else if (activeMode === 'SELECT') {
        setIsBoxSelecting(true);
        setBoxStart(cell);
        setBoxEnd(cell);
        const existing = cellMap.current.get(`${cell.r},${cell.c}`);
        setSelectedArrowId(existing ? existing.id : null);
      } else if (activeMode === 'ERASE') {
        const existing = cellMap.current.get(`${cell.r},${cell.c}`);
        if (existing) {
          onUpdateBoard(board.filter((a) => a.id !== existing.id));
        }
      } else if (activeMode === 'STAMP') {
        const existing = cellMap.current.get(`${cell.r},${cell.c}`);
        if (!existing) {
          const newArrow = ArrowGeometryUtils.rebuildArrowFromVertices(
            [{ r: cell.r, c: cell.c }],
            '#0f172a'
          );
          if (newArrow) {
            onUpdateBoard([...board, newArrow]);
            setSelectedArrowId(newArrow.id);
          }
        }
      }
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning && containerRef.current) {
      containerRef.current.scrollLeft = panStart.x - e.clientX;
      containerRef.current.scrollTop = panStart.y - e.clientY;
      return;
    }

    const cell = getCellFromEvent(e);
    setHoverCellState(cell);
    if (cell && onHoverCell) {
      onHoverCell(cell);
    }

    if (!cell) return;

    if (isDrawingPath && activeMode === 'DRAW_ARROW') {
      const lastCell = currentPathCells[currentPathCells.length - 1];
      if (lastCell && (lastCell.r !== cell.r || lastCell.c !== cell.c)) {
        const dr = Math.abs(cell.r - lastCell.r);
        const dc = Math.abs(cell.c - lastCell.c);
        if ((dr === 1 && dc === 0) || (dr === 0 && dc === 1)) {
          const existingIdx = currentPathCells.findIndex((c) => c.r === cell.r && c.c === cell.c);
          if (existingIdx !== -1) {
            setCurrentPathCells(currentPathCells.slice(0, existingIdx + 1));
          } else {
            setCurrentPathCells([...currentPathCells, cell]);
          }
        }
      }
    } else if (isBoxSelecting) {
      setBoxEnd(cell);
    } else if (activeMode === 'ERASE' && e.buttons === 1) {
      const existing = cellMap.current.get(`${cell.r},${cell.c}`);
      if (existing) {
        onUpdateBoard(board.filter((a) => a.id !== existing.id));
      }
    }
  };

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (isDrawingPath && activeMode === 'DRAW_ARROW') {
      if (currentPathCells.length >= 2) {
        const newArrow = ArrowGeometryUtils.rebuildArrowFromVertices(
          currentPathCells,
          '#0f172a'
        );
        if (newArrow) {
          onUpdateBoard([...board, newArrow]);
          setSelectedArrowId(newArrow.id);
        }
      }
      setIsDrawingPath(false);
      setCurrentPathCells([]);
    }

    if (isBoxSelecting) {
      setIsBoxSelecting(false);
    }
  };

  const canvasWidth = gridSize.cols * TILE_SIZE;
  const canvasHeight = gridSize.rows * TILE_SIZE;

  // Filter arrows that have pieces in the visible bounds
  const visibleArrows = useMemo(() => {
    const { startRow, endRow, startCol, endCol } = visibleBounds;
    return board.filter((arrow) => {
      const verts = arrow.vertices || (arrow.pieces ? arrow.pieces.map((p) => ({ r: p.r, c: p.c })) : []);
      return verts.some((v) => v.r >= startRow && v.r <= endRow && v.c >= startCol && v.c <= endCol);
    });
  }, [board, visibleBounds]);

  return (
    <div
      className="editor-canvas-wrapper"
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        overflow: 'auto',
        position: 'relative',
        cursor: isPanning || isSpacePressed ? 'grab' : 'crosshair'
      }}
    >
      <div className="grid-canvas-stage">
        {/* Sticky Column Header Bar (Top) */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            zIndex: 40,
            display: 'flex',
            background: 'var(--ed-bg-panel)',
            borderBottom: '1px solid var(--ed-border)',
            width: `${canvasWidth * zoom + HEADER_OFFSET}px`,
            paddingLeft: `${HEADER_OFFSET}px`,
            height: '24px',
            pointerEvents: 'none'
          }}
        >
          {Array.from({ length: visibleBounds.endCol - visibleBounds.startCol + 1 }).map((_, i) => {
            const c = visibleBounds.startCol + i;
            return (
              <div
                key={`hdr-col-${c}`}
                style={{
                  position: 'absolute',
                  left: `${c * TILE_SIZE * zoom + HEADER_OFFSET}px`,
                  width: `${TILE_SIZE * zoom}px`,
                  textAlign: 'center',
                  fontSize: '10px',
                  fontWeight: '800',
                  color: 'var(--ed-accent)'
                }}
              >
                {c}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex' }}>
          {/* Sticky Row Header Bar (Left) */}
          <div
            style={{
              position: 'sticky',
              left: 0,
              zIndex: 35,
              background: 'var(--ed-bg-panel)',
              borderRight: '1px solid var(--ed-border)',
              width: `${HEADER_OFFSET}px`,
              height: `${canvasHeight * zoom}px`,
              pointerEvents: 'none'
            }}
          >
            {Array.from({ length: visibleBounds.endRow - visibleBounds.startRow + 1 }).map((_, i) => {
              const r = visibleBounds.startRow + i;
              return (
                <div
                  key={`hdr-row-${r}`}
                  style={{
                    position: 'absolute',
                    top: `${r * TILE_SIZE * zoom}px`,
                    height: `${TILE_SIZE * zoom}px`,
                    width: `${HEADER_OFFSET}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: '800',
                    color: 'var(--ed-accent)'
                  }}
                >
                  {r}
                </div>
              );
            })}
          </div>

          {/* Main Virtualized SVG Stage */}
          <div
            style={{
              width: `${canvasWidth}px`,
              height: `${canvasHeight}px`,
              position: 'relative',
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0'
            }}
          >
            <svg
              ref={svgRef}
              className="grid-canvas-svg"
              width={canvasWidth}
              height={canvasHeight}
            >
              {/* Background Grid Pattern */}
              <defs>
                <pattern id="grid-pattern" width={TILE_SIZE} height={TILE_SIZE} patternUnits="userSpaceOnUse">
                  <path
                    d={`M ${TILE_SIZE} 0 L 0 0 0 ${TILE_SIZE}`}
                    fill="none"
                    stroke="var(--ed-border)"
                    strokeWidth="0.8"
                  />
                </pattern>
              </defs>

              <rect width={canvasWidth} height={canvasHeight} fill="url(#grid-pattern)" />
              <rect
                width={canvasWidth}
                height={canvasHeight}
                fill="none"
                stroke="var(--ed-accent)"
                strokeWidth="2"
                opacity="0.4"
              />

              {/* ISSUE 3 & 11: Hover Cell Highlight Box (100% Equal to Click Cell) */}
              {hoverCell && (
                <rect
                  x={hoverCell.c * TILE_SIZE}
                  y={hoverCell.r * TILE_SIZE}
                  width={TILE_SIZE}
                  height={TILE_SIZE}
                  fill="rgba(0, 210, 255, 0.22)"
                  stroke="#00d2ff"
                  strokeWidth="2"
                  rx="4"
                  pointerEvents="none"
                />
              )}

              {/* Render Visible Arrows (Virtualized) */}
              {visibleArrows.map((arrow) => {
                const isSelected = selectedArrowId === arrow.id;
                const pieces = arrow.pieces || [];
                const vertices = arrow.vertices || pieces.map((p) => ({ r: p.r, c: p.c }));

                const pointsStr = vertices
                  .map((v) => `${v.c * TILE_SIZE + TILE_SIZE / 2},${v.r * TILE_SIZE + TILE_SIZE / 2}`)
                  .join(' ');

                const arrowColor = isSelected ? '#00d2ff' : (arrow.color || '#0f172a');

                return (
                  <g key={arrow.id} className="rendered-arrow-group">
                    {vertices.length > 1 && (
                      <polyline
                        points={pointsStr}
                        fill="none"
                        stroke={isSelected ? '#00d2ff' : arrowColor}
                        strokeWidth={isSelected ? '6' : '4'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={isSelected ? 1 : 0.85}
                      />
                    )}

                    {pieces.map((p, idx) => {
                      const PieceComp = PIECE_COMPONENTS[p.type] || Straight;
                      return (
                        <foreignObject
                          key={idx}
                          x={p.c * TILE_SIZE}
                          y={p.r * TILE_SIZE}
                          width={TILE_SIZE}
                          height={TILE_SIZE}
                          style={{ pointerEvents: 'none', overflow: 'visible' }}
                        >
                          <PieceComp
                            color={arrowColor}
                            strokeWidth={8}
                            rotation={p.rotation || 0}
                            short={p.short || false}
                          />
                        </foreignObject>
                      );
                    })}
                  </g>
                );
              })}

              {/* Live Path Guide preview while dragging */}
              {isDrawingPath && currentPathCells.length > 0 && (
                <g style={{ pointerEvents: 'none' }}>
                  <polyline
                    points={currentPathCells
                      .map((c) => `${c.c * TILE_SIZE + TILE_SIZE / 2},${c.r * TILE_SIZE + TILE_SIZE / 2}`)
                      .join(' ')}
                    fill="none"
                    stroke="#00d2ff"
                    strokeWidth="4"
                    strokeDasharray="6,4"
                    strokeLinecap="round"
                  />
                  {currentPathCells.map((c, idx) => (
                    <circle
                      key={idx}
                      cx={c.c * TILE_SIZE + TILE_SIZE / 2}
                      cy={c.r * TILE_SIZE + TILE_SIZE / 2}
                      r="6"
                      fill="#00d2ff"
                    />
                  ))}
                </g>
              )}

              {/* Error Highlight Overlays */}
              {validationResult.errors.map((err, idx) => {
                if (!err.cell) return null;
                return (
                  <g key={`err-${idx}`} style={{ pointerEvents: 'none' }}>
                    <rect
                      x={err.cell.c * TILE_SIZE}
                      y={err.cell.r * TILE_SIZE}
                      width={TILE_SIZE}
                      height={TILE_SIZE}
                      fill="rgba(239, 68, 68, 0.35)"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                      rx="4"
                    />
                    <text
                      x={err.cell.c * TILE_SIZE + TILE_SIZE / 2}
                      y={err.cell.r * TILE_SIZE + TILE_SIZE / 2 + 4}
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="900"
                      textAnchor="middle"
                    >
                      ⚠️
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridCanvas;
