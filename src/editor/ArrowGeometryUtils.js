/**
 * ArrowGeometryUtils.js
 * Production-grade mathematical geometry builder for Brain Arrow and Time Arrow puzzles.
 * Computes exact piece types, rotations, corner bends, dead ends, and arrowheads for any path shape:
 * horizontal, vertical, multiple corners, unlimited bends, U-turns, S-curves, Z-curves, spirals, nested loops.
 */

const DIRECTION_ROTATIONS = {
  RIGHT: 0,
  DOWN: 90,
  LEFT: 180,
  UP: 270
};

const DELTA = {
  UP: { r: -1, c: 0 },
  DOWN: { r: 1, c: 0 },
  LEFT: { r: 0, c: -1 },
  RIGHT: { r: 0, c: 1 }
};

export class ArrowGeometryUtils {
  /**
   * Rebuilds pieces array and direction from an array of 2D grid vertices [{r, c}, ...]
   * @param {Array} vertices - Grid cell points from tail to head
   * @param {string} color - Arrow hex color
   * @param {string} id - Unique arrow ID
   * @param {string|null} directionOverride - Optional exit direction override
   * @returns {Object} Complete arrow object { id, direction, color, vertices, pieces }
   */
  static rebuildArrowFromVertices(vertices = [], color = '#0f172a', id = null, directionOverride = null) {
    if (!vertices || vertices.length === 0) {
      return null;
    }

    const arrowId = id || `a_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    if (vertices.length === 1) {
      // Single piece stub
      const single = vertices[0];
      const dir = directionOverride || 'RIGHT';
      return {
        id: arrowId,
        direction: dir,
        color: color,
        vertices: [{ r: single.r, c: single.c }],
        pieces: [{ r: single.r, c: single.c, type: 'ARROW_HEAD', rotation: DIRECTION_ROTATIONS[dir] || 0, short: true }]
      };
    }

    // Determine exit direction from movement of last segment
    const last = vertices[vertices.length - 1];
    const prev = vertices[vertices.length - 2];
    const exitDr = last.r - prev.r;
    const exitDc = last.c - prev.c;

    let exitDirection = 'RIGHT';
    if (exitDr === -1 && exitDc === 0) exitDirection = 'UP';
    else if (exitDr === 1 && exitDc === 0) exitDirection = 'DOWN';
    else if (exitDr === 0 && exitDc === -1) exitDirection = 'LEFT';
    else if (exitDr === 0 && exitDc === 1) exitDirection = 'RIGHT';

    if (directionOverride && DIRECTION_ROTATIONS[directionOverride] !== undefined) {
      exitDirection = directionOverride;
    }

    const pieces = [];

    for (let i = 0; i < vertices.length; i++) {
      const cur = vertices[i];

      if (i === 0) {
        // 1. Tail Piece -> DEAD_END
        const nextCell = vertices[1];
        const dr = nextCell.r - cur.r;
        const dc = nextCell.c - cur.c;

        let rot = 0;
        if (dc === 1) rot = 0;       // Extends RIGHT
        else if (dr === 1) rot = 90;  // Extends DOWN
        else if (dc === -1) rot = 180;// Extends LEFT
        else if (dr === -1) rot = 270;// Extends UP

        pieces.push({ r: cur.r, c: cur.c, type: 'DEAD_END', rotation: rot });
      } else if (i === vertices.length - 1) {
        // 2. Head Piece -> ARROW_HEAD
        const rot = DIRECTION_ROTATIONS[exitDirection] !== undefined ? DIRECTION_ROTATIONS[exitDirection] : 0;
        pieces.push({ r: cur.r, c: cur.c, type: 'ARROW_HEAD', rotation: rot, short: false });
      } else {
        // 3. Intermediate Piece -> STRAIGHT or CORNER
        const prevCell = vertices[i - 1];
        const nextCell = vertices[i + 1];

        const inDr = cur.r - prevCell.r;
        const inDc = cur.c - prevCell.c;
        const outDr = nextCell.r - cur.r;
        const outDc = nextCell.c - cur.c;

        if (inDr === outDr && inDc === outDc) {
          // Straight segment
          const rot = inDr !== 0 ? 90 : 0;
          pieces.push({ r: cur.r, c: cur.c, type: 'STRAIGHT', rotation: rot });
        } else {
          // Corner segment: calculate connected sides of cell
          // Side entering cell:
          let sideIn = '';
          if (inDc === 1) sideIn = 'LEFT';
          else if (inDc === -1) sideIn = 'RIGHT';
          else if (inDr === 1) sideIn = 'TOP';
          else if (inDr === -1) sideIn = 'BOTTOM';

          // Side leaving cell:
          let sideOut = '';
          if (outDc === 1) sideOut = 'RIGHT';
          else if (outDc === -1) sideOut = 'LEFT';
          else if (outDr === 1) sideOut = 'BOTTOM';
          else if (outDr === -1) sideOut = 'TOP';

          const sides = [sideIn, sideOut].sort().join('_');

          let rot = 0;
          if (sides === 'LEFT_TOP') rot = 0;       // Corner 0deg connects Left & Top
          else if (sides === 'RIGHT_TOP') rot = 90;  // Corner 90deg connects Top & Right
          else if (sides === 'BOTTOM_RIGHT') rot = 180;// Corner 180deg connects Right & Bottom
          else if (sides === 'BOTTOM_LEFT') rot = 270; // Corner 270deg connects Bottom & Left

          pieces.push({ r: cur.r, c: cur.c, type: 'CORNER', rotation: rot });
        }
      }
    }

    return {
      id: arrowId,
      direction: exitDirection,
      color: color,
      vertices: vertices.map(v => ({ r: v.r, c: v.c })),
      pieces: pieces
    };
  }

  /**
   * Rotate arrow 90 degrees clockwise.
   */
  static rotateArrow(arrow) {
    if (!arrow || !arrow.vertices || arrow.vertices.length === 0) return arrow;

    const minR = Math.min(...arrow.vertices.map(v => v.r));
    const maxR = Math.max(...arrow.vertices.map(v => v.r));
    const minC = Math.min(...arrow.vertices.map(v => v.c));

    // Rotate 90deg CW: (r, c) -> (c - minC + minR, maxR - r + minC)
    const newVertices = arrow.vertices.map(v => ({
      r: v.c - minC + minR,
      c: maxR - v.r + minC
    }));

    const nextDirs = { UP: 'RIGHT', RIGHT: 'DOWN', DOWN: 'LEFT', LEFT: 'UP' };
    const newDir = nextDirs[arrow.direction] || 'RIGHT';

    return ArrowGeometryUtils.rebuildArrowFromVertices(
      newVertices,
      arrow.color || '#0f172a',
      arrow.id,
      newDir
    );
  }

  /**
   * Mirror arrow horizontally.
   */
  static mirrorHorizontal(arrow) {
    if (!arrow || !arrow.vertices || arrow.vertices.length === 0) return arrow;

    const minC = Math.min(...arrow.vertices.map(v => v.c));
    const maxC = Math.max(...arrow.vertices.map(v => v.c));

    const newVertices = arrow.vertices.map(v => ({
      r: v.r,
      c: maxC + minC - v.c
    }));

    const flipDirs = { LEFT: 'RIGHT', RIGHT: 'LEFT', UP: 'UP', DOWN: 'DOWN' };
    const newDir = flipDirs[arrow.direction] || arrow.direction;

    return ArrowGeometryUtils.rebuildArrowFromVertices(
      newVertices,
      arrow.color || '#0f172a',
      arrow.id,
      newDir
    );
  }

  /**
   * Mirror arrow vertically.
   */
  static mirrorVertical(arrow) {
    if (!arrow || !arrow.vertices || arrow.vertices.length === 0) return arrow;

    const minR = Math.min(...arrow.vertices.map(v => v.r));
    const maxR = Math.max(...arrow.vertices.map(v => v.r));

    const newVertices = arrow.vertices.map(v => ({
      r: maxR + minR - v.r,
      c: v.c
    }));

    const flipDirs = { UP: 'DOWN', DOWN: 'UP', LEFT: 'LEFT', RIGHT: 'RIGHT' };
    const newDir = flipDirs[arrow.direction] || arrow.direction;

    return ArrowGeometryUtils.rebuildArrowFromVertices(
      newVertices,
      arrow.color || '#0f172a',
      arrow.id,
      newDir
    );
  }

  /**
   * Duplicate arrow with offset shift.
   */
  static duplicateArrow(arrow, offset = { r: 1, c: 1 }, gridSize = { rows: 10, cols: 10 }) {
    if (!arrow || !arrow.vertices) return null;

    const newVertices = arrow.vertices.map(v => ({
      r: Math.min(gridSize.rows - 1, Math.max(0, v.r + offset.r)),
      c: Math.min(gridSize.cols - 1, Math.max(0, v.c + offset.c))
    }));

    const newId = `a_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return ArrowGeometryUtils.rebuildArrowFromVertices(
      newVertices,
      arrow.color || '#0f172a',
      newId,
      arrow.direction
    );
  }
}

export default ArrowGeometryUtils;
