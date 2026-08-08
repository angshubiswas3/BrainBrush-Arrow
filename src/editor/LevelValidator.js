/**
 * LevelValidator.js
 * Comprehensive auto-validation for Level Editor puzzles (BAL & TAL).
 * Checks: continuous path, single head, single tail, correct exit direction, connected vertices,
 * no impossible bends, no isolated piece, no duplicated cells/overlaps, no broken lines, exit blockages.
 */

const DELTA = {
  UP: { r: -1, c: 0 },
  DOWN: { r: 1, c: 0 },
  LEFT: { r: 0, c: -1 },
  RIGHT: { r: 0, c: 1 }
};

export class LevelValidator {
  /**
   * Run full validation suite on current level board and grid dimensions.
   * @param {Array} board - List of arrow objects
   * @param {Object} size - { rows, cols }
   * @returns {Object} { isValid, errors: [], warnings: [], cellOccupancy: Map }
   */
  static validate(board = [], size = { rows: 10, cols: 10 }) {
    const errors = [];
    const warnings = [];
    const cellOccupancy = new Map(); // "r,c" -> arrowId

    if (!board || board.length === 0) {
      warnings.push({
        id: 'empty_board',
        type: 'EMPTY_BOARD',
        message: 'Board is empty. Add at least one arrow to build a puzzle.'
      });
      return { isValid: true, errors, warnings, cellOccupancy };
    }

    // 1. Check Cell Overlaps & Out-of-Bounds
    board.forEach((arrow) => {
      const vertices = arrow.vertices || (arrow.pieces ? arrow.pieces.map(p => ({ r: p.r, c: p.c })) : []);

      if (!vertices || vertices.length === 0) {
        errors.push({
          id: `empty_arrow_${arrow.id}`,
          type: 'ISOLATED_PIECE',
          message: `Arrow "${arrow.id}" contains no pieces or vertices.`,
          arrowId: arrow.id
        });
        return;
      }

      vertices.forEach((v, idx) => {
        // Out of Bounds check
        if (v.r < 0 || v.r >= size.rows || v.c < 0 || v.c >= size.cols) {
          errors.push({
            id: `oob_${arrow.id}_${idx}`,
            type: 'OUT_OF_BOUNDS',
            message: `Arrow "${arrow.id}" piece at (${v.r}, ${v.c}) is outside grid limits (${size.rows}×${size.cols}).`,
            cell: { r: v.r, c: v.c },
            arrowId: arrow.id
          });
        }

        // Duplicate / Shared Cell Overlap check
        const key = `${v.r},${v.c}`;
        if (cellOccupancy.has(key)) {
          errors.push({
            id: `overlap_${key}`,
            type: 'DUPLICATE_CELL',
            message: `Cell (${v.r}, ${v.c}) is shared by Arrow "${cellOccupancy.get(key)}" and Arrow "${arrow.id}".`,
            cell: { r: v.r, c: v.c },
            arrowId: arrow.id
          });
        } else {
          cellOccupancy.set(key, arrow.id);
        }
      });
    });

    // 2. Validate Arrow Structure, Path Contiguity, Head & Tail
    board.forEach((arrow) => {
      const pieces = arrow.pieces || [];
      const vertices = arrow.vertices || pieces.map(p => ({ r: p.r, c: p.c }));

      if (vertices.length === 0) return;

      // Check Path Contiguity & Broken Lines
      for (let i = 0; i < vertices.length - 1; i++) {
        const p1 = vertices[i];
        const p2 = vertices[i + 1];
        const dr = Math.abs(p1.r - p2.r);
        const dc = Math.abs(p1.c - p2.c);

        if ((dr === 1 && dc === 0) || (dr === 0 && dc === 1)) {
          // Valid orthogonally connected step
        } else {
          errors.push({
            id: `broken_${arrow.id}_${i}`,
            type: 'BROKEN_LINE',
            message: `Arrow "${arrow.id}": Broken path between (${p1.r}, ${p1.c}) and (${p2.r}, ${p2.c}).`,
            cell: { r: p1.r, c: p1.c },
            arrowId: arrow.id
          });
        }
      }

      // Check Head and Tail Integrity
      if (pieces.length > 0) {
        const headPiece = pieces[pieces.length - 1];
        const tailPiece = pieces[0];

        // Single Head check
        const headCount = pieces.filter(p => p.type === 'ARROW_HEAD').length;
        if (headCount === 0) {
          errors.push({
            id: `missing_head_${arrow.id}`,
            type: 'SINGLE_HEAD',
            message: `Arrow "${arrow.id}" is missing an ARROW_HEAD piece at (${headPiece.r}, ${headPiece.c}).`,
            cell: { r: headPiece.r, c: headPiece.c },
            arrowId: arrow.id
          });
        } else if (headCount > 1) {
          errors.push({
            id: `multi_head_${arrow.id}`,
            type: 'SINGLE_HEAD',
            message: `Arrow "${arrow.id}" contains ${headCount} ARROW_HEAD pieces. Must have exactly 1 head.`,
            cell: { r: headPiece.r, c: headPiece.c },
            arrowId: arrow.id
          });
        }

        // Single Tail check
        const tailCount = pieces.filter(p => p.type === 'DEAD_END').length;
        if (pieces.length > 1 && tailCount === 0) {
          warnings.push({
            id: `missing_tail_${arrow.id}`,
            type: 'SINGLE_TAIL',
            message: `Arrow "${arrow.id}" starting piece at (${tailPiece.r}, ${tailPiece.c}) is not a DEAD_END tail.`,
            cell: { r: tailPiece.r, c: tailPiece.c },
            arrowId: arrow.id
          });
        }
      }

      // Check Exit Direction and Head Alignment
      if (vertices.length >= 2) {
        const last = vertices[vertices.length - 1];
        const prev = vertices[vertices.length - 2];
        const exitDr = last.r - prev.r;
        const exitDc = last.c - prev.c;

        let expectedDirection = 'RIGHT';
        if (exitDr === -1 && exitDc === 0) expectedDirection = 'UP';
        else if (exitDr === 1 && exitDc === 0) expectedDirection = 'DOWN';
        else if (exitDr === 0 && exitDc === -1) expectedDirection = 'LEFT';
        else if (exitDr === 0 && exitDc === 1) expectedDirection = 'RIGHT';

        if (arrow.direction !== expectedDirection) {
          warnings.push({
            id: `dir_mismatch_${arrow.id}`,
            type: 'CORRECT_DIRECTION',
            message: `Arrow "${arrow.id}" movement points ${expectedDirection}, but direction property is set to ${arrow.direction}.`,
            cell: { r: last.r, c: last.c },
            arrowId: arrow.id
          });
        }
      }

      // Check Head-to-Head Exit Deadlocks
      const lastVertex = vertices[vertices.length - 1];
      const dir = DELTA[arrow.direction] || DELTA.RIGHT;
      let checkR = lastVertex.r + dir.r;
      let checkC = lastVertex.c + dir.c;

      if (checkR >= 0 && checkR < size.rows && checkC >= 0 && checkC < size.cols) {
        const blockingArrowId = cellOccupancy.get(`${checkR},${checkC}`);
        if (blockingArrowId && blockingArrowId !== arrow.id) {
          const blockingArrow = board.find(a => a.id === blockingArrowId);
          if (blockingArrow) {
            const bVerts = blockingArrow.vertices || (blockingArrow.pieces ? blockingArrow.pieces.map(p => ({ r: p.r, c: p.c })) : []);
            const bLast = bVerts[bVerts.length - 1];
            if (bLast && bLast.r === checkR && bLast.c === checkC) {
              errors.push({
                id: `head_deadlock_${arrow.id}_${blockingArrowId}`,
                type: 'IMPOSSIBLE_BEND',
                message: `Head-to-Head deadlock between Arrow "${arrow.id}" at (${lastVertex.r},${lastVertex.c}) and Arrow "${blockingArrowId}" at (${checkR},${checkC}). Neither arrow can escape.`,
                cell: { r: lastVertex.r, c: lastVertex.c },
                arrowId: arrow.id
              });
            }
          }
        }
      }
    });

    const isValid = errors.length === 0;

    return {
      isValid,
      errors,
      warnings,
      cellOccupancy
    };
  }
}

export default LevelValidator;
