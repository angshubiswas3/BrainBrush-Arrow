/**
 * src/levels/levelBuilder.js
 * Utility to build and validate handcrafted BAL puzzle levels with modular SVG piece mapping.
 */

export const DELTAS = {
  UP: { r: -1, c: 0, angle: 270 },
  DOWN: { r: 1, c: 0, angle: 90 },
  LEFT: { r: 0, c: -1, angle: 180 },
  RIGHT: { r: 0, c: 1, angle: 0 }
};

/**
 * Maps an arrow's ordered cell vertices [Tail, ..., Head] to modular SVG pieces with CSS rotations.
 */
export function computePiecesFromVertices(vertices, headDir) {
  const pieces = [];
  const n = vertices.length;

  if (n === 1) {
    const head = vertices[0];
    pieces.push({
      r: head.r,
      c: head.c,
      type: 'ARROW_HEAD',
      rotation: DELTAS[headDir].angle,
      short: true
    });
    return pieces;
  }

  for (let i = 0; i < n; i++) {
    const curr = vertices[i];

    if (i === 0) {
      // Tail / DeadEnd piece
      const next = vertices[i + 1];
      const dr = next.r - curr.r;
      const dc = next.c - curr.c;
      let rot = 0;
      if (dr === 1) rot = 90;       // extends DOWN
      else if (dr === -1) rot = 270; // extends UP
      else if (dc === 1) rot = 0;    // extends RIGHT
      else if (dc === -1) rot = 180; // extends LEFT

      pieces.push({
        r: curr.r,
        c: curr.c,
        type: 'DEAD_END',
        rotation: rot
      });
    } else if (i === n - 1) {
      // Arrow Head piece
      pieces.push({
        r: curr.r,
        c: curr.c,
        type: 'ARROW_HEAD',
        rotation: DELTAS[headDir].angle,
        short: false
      });
    } else {
      // Intermediate piece: Straight or Corner
      const prev = vertices[i - 1];
      const next = vertices[i + 1];

      const inDr = curr.r - prev.r;
      const inDc = curr.c - prev.c;
      const outDr = next.r - curr.r;
      const outDc = next.c - curr.c;

      if (inDr === outDr && inDc === outDc) {
        // Continuous Straight Line
        const rot = (inDr !== 0) ? 90 : 0;
        pieces.push({
          r: curr.r,
          c: curr.c,
          type: 'STRAIGHT',
          rotation: rot
        });
      } else {
        // True circular fillet Corner bend
        const side1 = inDr === 1 ? 'TOP' : (inDr === -1 ? 'BOTTOM' : (inDc === 1 ? 'LEFT' : 'RIGHT'));
        const side2 = outDr === 1 ? 'BOTTOM' : (outDr === -1 ? 'TOP' : (outDc === 1 ? 'RIGHT' : 'LEFT'));

        let rot = 0;
        if ((side1 === 'LEFT' && side2 === 'TOP') || (side1 === 'TOP' && side2 === 'LEFT')) rot = 0;
        else if ((side1 === 'TOP' && side2 === 'RIGHT') || (side1 === 'RIGHT' && side2 === 'TOP')) rot = 90;
        else if ((side1 === 'RIGHT' && side2 === 'BOTTOM') || (side1 === 'BOTTOM' && side2 === 'RIGHT')) rot = 180;
        else if ((side1 === 'BOTTOM' && side2 === 'LEFT') || (side1 === 'LEFT' && side2 === 'BOTTOM')) rot = 270;

        pieces.push({
          r: curr.r,
          c: curr.c,
          type: 'CORNER',
          rotation: rot
        });
      }
    }
  }

  return pieces;
}

/**
 * Verifies if an arrow has a clean, unobstructed exit path in direction 'dir'.
 */
export function isArrowClearOnGrid(arrow, allArrows, size) {
  const head = arrow.vertices[arrow.vertices.length - 1];
  const delta = DELTAS[arrow.direction];
  const rows = size.rows || size;
  const cols = size.cols || size;

  let cr = head.r + delta.r;
  let cc = head.c + delta.c;

  while (cr >= 0 && cr < rows && cc >= 0 && cc < cols) {
    const hitOther = allArrows.some(other =>
      other.id !== arrow.id &&
      other.vertices.some(v => v.r === cr && v.c === cc)
    );
    if (hitOther) return false;
    cr += delta.r;
    cc += delta.c;
  }
  return true;
}

/**
 * Automatically calculates the winning solution sequence for a handcrafted level.
 */
export function solveHandcraftedLevel(level) {
  let remaining = [...level.arrows];
  const solution = [];
  const size = level.size;

  while (remaining.length > 0) {
    const clearArrows = remaining.filter(a => isArrowClearOnGrid(a, remaining, size));
    if (clearArrows.length === 0) {
      return { solvable: false, solution };
    }
    const next = clearArrows[0];
    solution.push(next.id);
    remaining = remaining.filter(a => a.id !== next.id);
  }

  return { solvable: true, solution };
}

/**
 * Creates a fully validated handcrafted BAL level object with modular piece definitions.
 */
export function defineBALLevel({ id, name, size, difficulty, theme, arrowsRaw }) {
  const arrows = arrowsRaw.map((raw, idx) => {
    const arrowId = raw.id || `a${idx + 1}`;
    const vertices = raw.vertices || raw.path || [{ r: raw.row, c: raw.col }];
    const dir = raw.direction || raw.dir || 'RIGHT';
    const color = raw.color || theme?.color || '#0f172a';
    const pieces = computePiecesFromVertices(vertices, dir);

    return {
      id: arrowId,
      direction: dir,
      color,
      vertices,
      pieces
    };
  });

  const parsedSize = typeof size === 'number' ? { rows: size, cols: size } : size;
  const { solvable, solution } = solveHandcraftedLevel({ size: parsedSize, arrows });

  return {
    id,
    name: name || `Level ${id}`,
    size: parsedSize,
    difficulty: difficulty || 'Medium',
    theme: theme || { color: '#0f172a', bg: '#f8fafc' },
    moveCount: arrows.length,
    solution: solution.length > 0 ? solution : arrows.map(a => a.id),
    isSolvable: solvable,
    arrows
  };
}
