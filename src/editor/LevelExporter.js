/**
 * LevelExporter.js
 * Generates production-ready React level files (BAL*.jsx / TAL*.jsx)
 * matching the exact game engine format.
 * Features: Auto-solver solution generator, Auto-difficulty calculation, Full JSX exporter & parser.
 */

export class LevelExporter {
  /**
   * Automatically calculate puzzle difficulty rating.
   */
  static calculateDifficulty(board = [], size = { rows: 10, cols: 10 }) {
    if (!board || board.length === 0) return 'Easy';

    const totalArrows = board.length;
    let totalPieces = 0;
    let totalTurns = 0;
    const occupiedCells = new Set();

    board.forEach(arrow => {
      const pieces = arrow.pieces || [];
      totalPieces += pieces.length;
      pieces.forEach(p => {
        occupiedCells.add(`${p.r},${p.c}`);
        if (p.type === 'CORNER') totalTurns++;
      });
    });

    const totalCells = (size.rows || 10) * (size.cols || 10);
    const coverageRatio = (occupiedCells.size / totalCells) * 100;
    const avgLength = totalPieces / totalArrows;

    // Difficulty score formula
    const score = (totalArrows * 3.5) + (totalTurns * 2.5) + (avgLength * 1.8) + (coverageRatio * 0.4);

    if (score < 20) return 'Easy';
    if (score < 40) return 'Medium';
    if (score < 65) return 'Hard';
    if (score < 90) return 'Expert';
    return 'Master';
  }

  /**
   * Automatically generate solution sequence by simulating step-by-step arrow clears.
   * @param {Array} board
   * @param {Object} size
   * @returns {Array} List of arrow IDs in clear order
   */
  static generateSolution(board = [], size = { rows: 10, cols: 10 }) {
    if (!board || board.length === 0) return [];

    const remaining = [...board];
    const solution = [];
    const DELTA = {
      UP: { r: -1, c: 0 },
      DOWN: { r: 1, c: 0 },
      LEFT: { r: 0, c: -1 },
      RIGHT: { r: 0, c: 1 }
    };

    let progress = true;
    while (remaining.length > 0 && progress) {
      progress = false;

      // Build current occupancy set
      const occMap = new Set();
      remaining.forEach(a => {
        const verts = a.vertices || (a.pieces ? a.pieces.map(p => ({ r: p.r, c: p.c })) : []);
        verts.forEach(v => occMap.add(`${v.r},${v.c}`));
      });

      for (let i = 0; i < remaining.length; i++) {
        const arrow = remaining[i];
        const verts = arrow.vertices || (arrow.pieces ? arrow.pieces.map(p => ({ r: p.r, c: p.c })) : []);
        if (verts.length === 0) continue;

        const head = verts[verts.length - 1];
        const selfCells = new Set(verts.map(v => `${v.r},${v.c}`));
        const dir = DELTA[arrow.direction] || DELTA.RIGHT;

        let curR = head.r + dir.r;
        let curC = head.c + dir.c;
        let clear = true;

        while (curR >= 0 && curR < size.rows && curC >= 0 && curC < size.cols) {
          const key = `${curR},${curC}`;
          if (occMap.has(key) && !selfCells.has(key)) {
            clear = false;
            break;
          }
          curR += dir.r;
          curC += dir.c;
        }

        if (clear) {
          solution.push(arrow.id);
          remaining.splice(i, 1);
          progress = true;
          break;
        }
      }
    }

    // Append any remaining unresolved arrows in default order
    remaining.forEach(a => solution.push(a.id));
    return solution;
  }

  /**
   * Export level state into production JSX code string.
   * Format: `const BAL12 = { ... }; export default BAL12;`
   * @param {Object} levelData - { metadata, size, board }
   * @param {string} gameType - 'BRAIN_ARROW' | 'TIME_ARROW'
   * @returns {string} Fully formatted JS/JSX code string matching handcrafted standards
   */
  static exportToJsx(levelData, gameType = 'BRAIN_ARROW') {
    const { metadata = {}, size = { rows: 10, cols: 10 }, board = [] } = levelData;

    const rawId = metadata.id !== undefined && metadata.id !== null ? metadata.id : 1;
    const numId = typeof rawId === 'number' ? rawId : parseInt(String(rawId).replace(/\D/g, ''), 10) || 1;

    const prefix = gameType === 'TIME_ARROW' ? 'TAL' : 'BAL';
    const variableName = `${prefix}${numId}`;
    const levelName = metadata.name || `Level ${numId}`;
    const difficulty = metadata.difficulty || LevelExporter.calculateDifficulty(board, size);
    const moves = metadata.moves || Math.max(board.length, 5);
    const solution = LevelExporter.generateSolution(board, size);

    // Calculate occupancy %
    const totalCells = (size.rows || 10) * (size.cols || 10);
    const occupiedCells = new Set();
    board.forEach(a => {
      (a.vertices || a.pieces || []).forEach(v => occupiedCells.add(`${v.r},${v.c}`));
    });
    const occupancyRatio = totalCells > 0 ? Math.min(100, Math.round((occupiedCells.size / totalCells) * 100)) : 0;

    const themeObj = typeof metadata.theme === 'object' && metadata.theme !== null
      ? metadata.theme
      : {
          name: typeof metadata.theme === 'string' ? metadata.theme : 'Spiral Valley',
          color: '#0f172a',
          bg: '#f8fafc',
          diff: difficulty
        };

    const exportObj = {
      id: numId,
      name: levelName,
      difficulty: difficulty,
      moveCount: Number(moves),
      moves: Number(moves),
      gridSize: Math.max(size.rows, size.cols),
      size: {
        rows: Number(size.rows),
        cols: Number(size.cols)
      },
      occupancy: `${occupancyRatio}%`,
      theme: themeObj,
      arrows: board,
      board: board,
      solution: solution
    };

    const codeBody = JSON.stringify(exportObj, null, 2);

    return `/**
 * ${variableName}.jsx - Production Handcrafted ${gameType === 'TIME_ARROW' ? 'Time' : 'Brain'} Arrow Level
 * Generated by Brain Arrow Studio Editor
 */

const ${variableName} = ${codeBody};

export default ${variableName};
`;
  }

  /**
   * Import level file content (JS/JSX string or JSON object) into editor state.
   */
  static importFromCode(codeString) {
    try {
      if (!codeString || typeof codeString !== 'string') return null;

      let cleanText = codeString.trim();

      // Extract JSON payload from `const BAL12 = { ... }; export default BAL12;`
      const matchConst = cleanText.match(/const\s+\w+\s*=\s*(\{[\s\S]*\});?\s*export\s+default/);
      if (matchConst) {
        cleanText = matchConst[1];
      } else {
        if (cleanText.startsWith('export default')) {
          cleanText = cleanText.replace(/^export default\s+/, '').replace(/;\s*$/, '');
        }
      }

      const parsed = JSON.parse(cleanText);
      if (!parsed) return null;

      const rows = parsed.size ? parsed.size.rows : (parsed.gridSize || 10);
      const cols = parsed.size ? parsed.size.cols : (parsed.gridSize || 10);
      const board = parsed.board || parsed.arrows || [];

      // Determine game prefix if imported from string
      let detectedGameType = 'BRAIN_ARROW';
      if (codeString.includes('TAL') || (parsed.name && parsed.name.includes('Time'))) {
        detectedGameType = 'TIME_ARROW';
      }

      return {
        metadata: {
          id: parsed.id || 1,
          name: parsed.name || `Level ${parsed.id || 1}`,
          difficulty: parsed.difficulty || 'Easy',
          moves: parsed.moves || parsed.moveCount || board.length,
          theme: parsed.theme || 'default'
        },
        size: { rows: Number(rows), cols: Number(cols) },
        board: board,
        gameType: detectedGameType
      };
    } catch (err) {
      console.error('Failed to import level code:', err);
      return null;
    }
  }
}

export default LevelExporter;
