import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEVELS_DIR = path.resolve(__dirname, '../src/levels');

const DELTAS = {
  UP: { r: -1, c: 0, angle: 270 },
  DOWN: { r: 1, c: 0, angle: 90 },
  LEFT: { r: 0, c: -1, angle: 180 },
  RIGHT: { r: 0, c: 1, angle: 0 }
};

const THEMES = [
  { name: 'Spiral Valley', color: '#0f172a', bg: '#f8fafc', diff: 'Easy' },
  { name: 'Emerald Forest', color: '#064e3b', bg: '#ecfdf5', diff: 'Easy' },
  { name: 'Azure Ocean', color: '#0c4a6e', bg: '#f0f9ff', diff: 'Medium' },
  { name: 'Amber Dunes', color: '#78350f', bg: '#fffbeb', diff: 'Medium' },
  { name: 'Amethyst Caves', color: '#581c87', bg: '#faf5ff', diff: 'Hard' },
  { name: 'Ruby Fortress', color: '#881337', bg: '#fff1f2', diff: 'Hard' },
  { name: 'Neon Cyberpunk', color: '#1e1b4b', bg: '#eef2ff', diff: 'Expert' },
  { name: 'Solar Zenith', color: '#7c2d12', bg: '#fff7ed', diff: 'Expert' },
  { name: 'Quantum Void', color: '#18181b', bg: '#fafafa', diff: 'Master' },
  { name: 'Infinite Cosmos', color: '#09090b', bg: '#ffffff', diff: 'Master' }
];

/**
 * Calculates modular piece type and rotation for each cell in an arrow path
 */
function computePiecesFromVertices(vertices, headDir) {
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
      // Tail / Start piece
      const next = vertices[i + 1];
      const dr = next.r - curr.r;
      const dc = next.c - curr.c;
      let rot = 0;
      if (dr === 1) rot = 90;       // goes DOWN
      else if (dr === -1) rot = 270; // goes UP
      else if (dc === 1) rot = 0;    // goes RIGHT
      else if (dc === -1) rot = 180; // goes LEFT

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
      // Intermediate piece: straight or corner
      const prev = vertices[i - 1];
      const next = vertices[i + 1];

      const inDr = curr.r - prev.r;
      const inDc = curr.c - prev.c;
      const outDr = next.r - curr.r;
      const outDc = next.c - curr.c;

      if (inDr === outDr && inDc === outDc) {
        // Straight
        const rot = (inDr !== 0) ? 90 : 0;
        pieces.push({
          r: curr.r,
          c: curr.c,
          type: 'STRAIGHT',
          rotation: rot
        });
      } else {
        // Corner
        // Determine rotation for Corner piece (Left-to-Top is 0deg)
        // Let's match connecting sides:
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
 * Handcrafted Level Generator using Reverse Playback Solvability Guarantee
 */
function createHandcraftedBALLevel(levelNum) {
  const worldIndex = Math.min(9, Math.floor((levelNum - 1) / 10));
  const theme = THEMES[worldIndex];

  // Level 1: Handcrafted 3-arrow straight tutorial (Left: DOWN, Middle: UP, Right: DOWN)
  if (levelNum === 1) {
    return {
      id: 1,
      name: `Spiral Valley 1`,
      size: { rows: 3, cols: 3 },
      difficulty: 'Easy',
      moveCount: 3,
      solution: ['a1', 'a2', 'a3'],
      arrows: [
        {
          id: 'a1',
          direction: 'DOWN',
          color: theme.color,
          vertices: [{ r: 0, c: 0 }, { r: 1, c: 0 }, { r: 2, c: 0 }],
          pieces: [
            { r: 0, c: 0, type: 'DEAD_END', rotation: 90 },
            { r: 1, c: 0, type: 'STRAIGHT', rotation: 90 },
            { r: 2, c: 0, type: 'ARROW_HEAD', rotation: 90, short: false }
          ]
        },
        {
          id: 'a2',
          direction: 'UP',
          color: theme.color,
          vertices: [{ r: 2, c: 1 }, { r: 1, c: 1 }, { r: 0, c: 1 }],
          pieces: [
            { r: 2, c: 1, type: 'DEAD_END', rotation: 270 },
            { r: 1, c: 1, type: 'STRAIGHT', rotation: 90 },
            { r: 0, c: 1, type: 'ARROW_HEAD', rotation: 270, short: false }
          ]
        },
        {
          id: 'a3',
          direction: 'DOWN',
          color: theme.color,
          vertices: [{ r: 0, c: 2 }, { r: 1, c: 2 }, { r: 2, c: 2 }],
          pieces: [
            { r: 0, c: 2, type: 'DEAD_END', rotation: 90 },
            { r: 1, c: 2, type: 'STRAIGHT', rotation: 90 },
            { r: 2, c: 2, type: 'ARROW_HEAD', rotation: 90, short: false }
          ]
        }
      ]
    };
  }

  // Level 2: Handcrafted 3-arrow curved puzzle (Exact match to design)
  if (levelNum === 2) {
    return {
      id: 2,
      name: `Level 2`,
      size: { rows: 4, cols: 4 },
      difficulty: 'Easy',
      moveCount: 3,
      solution: ['a1', 'a2', 'a3'],
      arrows: [
        {
          id: 'a1',
          direction: 'UP',
          color: theme.color,
          vertices: [
            { r: 3, c: 0 },
            { r: 2, c: 0 },
            { r: 1, c: 0 },
            { r: 1, c: 1 },
            { r: 0, c: 1 }
          ],
          pieces: [
            { r: 3, c: 0, type: 'DEAD_END', rotation: 270 },
            { r: 2, c: 0, type: 'STRAIGHT', rotation: 90 },
            { r: 1, c: 0, type: 'CORNER', rotation: 180 },
            { r: 1, c: 1, type: 'CORNER', rotation: 0 },
            { r: 0, c: 1, type: 'ARROW_HEAD', rotation: 270, short: false }
          ]
        },
        {
          id: 'a2',
          direction: 'LEFT',
          color: theme.color,
          vertices: [
            { r: 0, c: 2 },
            { r: 1, c: 2 },
            { r: 2, c: 2 },
            { r: 2, c: 1 }
          ],
          pieces: [
            { r: 0, c: 2, type: 'DEAD_END', rotation: 90 },
            { r: 1, c: 2, type: 'STRAIGHT', rotation: 90 },
            { r: 2, c: 2, type: 'CORNER', rotation: 0 },
            { r: 2, c: 1, type: 'ARROW_HEAD', rotation: 180, short: false }
          ]
        },
        {
          id: 'a3',
          direction: 'LEFT',
          color: theme.color,
          vertices: [
            { r: 2, c: 3 },
            { r: 3, c: 3 },
            { r: 3, c: 2 },
            { r: 3, c: 1 }
          ],
          pieces: [
            { r: 2, c: 3, type: 'DEAD_END', rotation: 90 },
            { r: 3, c: 3, type: 'CORNER', rotation: 0 },
            { r: 3, c: 2, type: 'STRAIGHT', rotation: 0 },
            { r: 3, c: 1, type: 'ARROW_HEAD', rotation: 180, short: false }
          ]
        }
      ]
  // Level 3: Handcrafted 4-arrow puzzle (Exact match to user design)
  if (levelNum === 3) {
    return {
      id: 3,
      name: `Level 3`,
      size: { rows: 4, cols: 4 },
      difficulty: 'Easy',
      moveCount: 4,
      solution: ['a1', 'a2', 'a3', 'a4'],
      arrows: [
        {
          id: 'a1',
          direction: 'LEFT',
          color: theme.color,
          vertices: [
            { r: 0, c: 3 },
            { r: 0, c: 2 },
            { r: 0, c: 1 }
          ],
          pieces: [
            { r: 0, c: 3, type: 'DEAD_END', rotation: 180 },
            { r: 0, c: 2, type: 'STRAIGHT', rotation: 0 },
            { r: 0, c: 1, type: 'ARROW_HEAD', rotation: 180, short: false }
          ]
        },
        {
          id: 'a2',
          direction: 'DOWN',
          color: theme.color,
          vertices: [
            { r: 1, c: 1 },
            { r: 1, c: 0 },
            { r: 2, c: 0 },
            { r: 3, c: 0 }
          ],
          pieces: [
            { r: 1, c: 1, type: 'DEAD_END', rotation: 180 },
            { r: 1, c: 0, type: 'CORNER', rotation: 180 },
            { r: 2, c: 0, type: 'STRAIGHT', rotation: 90 },
            { r: 3, c: 0, type: 'ARROW_HEAD', rotation: 90, short: false }
          ]
        },
        {
          id: 'a3',
          direction: 'UP',
          color: theme.color,
          vertices: [
            { r: 2, c: 3 },
            { r: 3, c: 3 },
            { r: 3, c: 2 },
            { r: 3, c: 1 },
            { r: 2, c: 1 }
          ],
          pieces: [
            { r: 2, c: 3, type: 'DEAD_END', rotation: 90 },
            { r: 3, c: 3, type: 'CORNER', rotation: 0 },
            { r: 3, c: 2, type: 'STRAIGHT', rotation: 0 },
            { r: 3, c: 1, type: 'CORNER', rotation: 90 },
            { r: 2, c: 1, type: 'ARROW_HEAD', rotation: 270, short: false }
          ]
        },
        {
          id: 'a4',
          direction: 'DOWN',
          color: theme.color,
          vertices: [
            { r: 1, c: 3 },
            { r: 1, c: 2 },
            { r: 2, c: 2 }
          ],
          pieces: [
            { r: 1, c: 3, type: 'DEAD_END', rotation: 180 },
            { r: 1, c: 2, type: 'CORNER', rotation: 180 },
            { r: 2, c: 2, type: 'ARROW_HEAD', rotation: 90, short: false }
          ]
        }
      ]
    };
  }

  // Level 4: Handcrafted 5-arrow maze puzzle (100% exact match to reference image)
  if (levelNum === 4) {
    return {
      id: 4,
      name: `Level 4`,
      size: { rows: 8, cols: 8 },
      difficulty: 'Easy',
      moveCount: 5,
      solution: ['a1', 'a5', 'a4', 'a2', 'a3'],
      arrows: [
        {
          id: 'a1',
          direction: 'UP',
          color: theme.color,
          vertices: [
            { r: 6, c: 0 },
            { r: 7, c: 0 },
            { r: 7, c: 1 },
            { r: 7, c: 2 },
            { r: 7, c: 3 },
            { r: 7, c: 4 },
            { r: 7, c: 5 },
            { r: 7, c: 6 },
            { r: 7, c: 7 },
            { r: 6, c: 7 },
            { r: 5, c: 7 },
            { r: 4, c: 7 },
            { r: 3, c: 7 },
            { r: 2, c: 7 },
            { r: 1, c: 7 },
            { r: 0, c: 7 },
            { r: 0, c: 6 },
            { r: 0, c: 5 },
            { r: 0, c: 4 },
            { r: 1, c: 4 },
            { r: 2, c: 4 },
            { r: 3, c: 4 },
            { r: 4, c: 4 },
            { r: 4, c: 3 },
            { r: 3, c: 3 },
            { r: 2, c: 3 },
            { r: 1, c: 3 },
            { r: 0, c: 3 }
          ],
          pieces: [
            { r: 6, c: 0, type: 'DEAD_END', rotation: 90 },
            { r: 7, c: 0, type: 'CORNER', rotation: 90 },
            { r: 7, c: 1, type: 'STRAIGHT', rotation: 0 },
            { r: 7, c: 2, type: 'STRAIGHT', rotation: 0 },
            { r: 7, c: 3, type: 'STRAIGHT', rotation: 0 },
            { r: 7, c: 4, type: 'STRAIGHT', rotation: 0 },
            { r: 7, c: 5, type: 'STRAIGHT', rotation: 0 },
            { r: 7, c: 6, type: 'STRAIGHT', rotation: 0 },
            { r: 7, c: 7, type: 'CORNER', rotation: 0 },
            { r: 6, c: 7, type: 'STRAIGHT', rotation: 90 },
            { r: 5, c: 7, type: 'STRAIGHT', rotation: 90 },
            { r: 4, c: 7, type: 'STRAIGHT', rotation: 90 },
            { r: 3, c: 7, type: 'STRAIGHT', rotation: 90 },
            { r: 2, c: 7, type: 'STRAIGHT', rotation: 90 },
            { r: 1, c: 7, type: 'STRAIGHT', rotation: 90 },
            { r: 0, c: 7, type: 'CORNER', rotation: 270 },
            { r: 0, c: 6, type: 'STRAIGHT', rotation: 0 },
            { r: 0, c: 5, type: 'STRAIGHT', rotation: 0 },
            { r: 0, c: 4, type: 'CORNER', rotation: 180 },
            { r: 1, c: 4, type: 'STRAIGHT', rotation: 90 },
            { r: 2, c: 4, type: 'STRAIGHT', rotation: 90 },
            { r: 3, c: 4, type: 'STRAIGHT', rotation: 90 },
            { r: 4, c: 4, type: 'CORNER', rotation: 0 },
            { r: 4, c: 3, type: 'CORNER', rotation: 90 },
            { r: 3, c: 3, type: 'STRAIGHT', rotation: 90 },
            { r: 2, c: 3, type: 'STRAIGHT', rotation: 90 },
            { r: 1, c: 3, type: 'STRAIGHT', rotation: 90 },
            { r: 0, c: 3, type: 'ARROW_HEAD', rotation: 270, short: false }
          ]
        },
        {
          id: 'a2',
          direction: 'RIGHT',
          color: theme.color,
          vertices: [
            { r: 4, c: 1 },
            { r: 3, c: 1 },
            { r: 2, c: 1 },
            { r: 2, c: 2 }
          ],
          pieces: [
            { r: 4, c: 1, type: 'DEAD_END', rotation: 270 },
            { r: 3, c: 1, type: 'STRAIGHT', rotation: 90 },
            { r: 2, c: 1, type: 'CORNER', rotation: 180 },
            { r: 2, c: 2, type: 'ARROW_HEAD', rotation: 0, short: false }
          ]
        },
        {
          id: 'a3',
          direction: 'RIGHT',
          color: theme.color,
          vertices: [
            { r: 1, c: 2 },
            { r: 1, c: 1 },
            { r: 0, c: 1 },
            { r: 0, c: 0 },
            { r: 1, c: 0 },
            { r: 2, c: 0 },
            { r: 3, c: 0 },
            { r: 4, c: 0 },
            { r: 5, c: 0 },
            { r: 5, c: 1 },
            { r: 6, c: 1 },
            { r: 6, c: 2 },
            { r: 6, c: 3 },
            { r: 6, c: 4 },
            { r: 6, c: 5 },
            { r: 6, c: 6 }
          ],
          pieces: [
            { r: 1, c: 2, type: 'DEAD_END', rotation: 180 },
            { r: 1, c: 1, type: 'CORNER', rotation: 90 },
            { r: 0, c: 1, type: 'CORNER', rotation: 270 },
            { r: 0, c: 0, type: 'CORNER', rotation: 180 },
            { r: 1, c: 0, type: 'STRAIGHT', rotation: 90 },
            { r: 2, c: 0, type: 'STRAIGHT', rotation: 90 },
            { r: 3, c: 0, type: 'STRAIGHT', rotation: 90 },
            { r: 4, c: 0, type: 'STRAIGHT', rotation: 90 },
            { r: 5, c: 0, type: 'CORNER', rotation: 90 },
            { r: 5, c: 1, type: 'CORNER', rotation: 270 },
            { r: 6, c: 1, type: 'CORNER', rotation: 90 },
            { r: 6, c: 2, type: 'STRAIGHT', rotation: 0 },
            { r: 6, c: 3, type: 'STRAIGHT', rotation: 0 },
            { r: 6, c: 4, type: 'STRAIGHT', rotation: 0 },
            { r: 6, c: 5, type: 'STRAIGHT', rotation: 0 },
            { r: 6, c: 6, type: 'ARROW_HEAD', rotation: 0, short: false }
          ]
        },
        {
          id: 'a4',
          direction: 'UP',
          color: theme.color,
          vertices: [
            { r: 3, c: 2 },
            { r: 4, c: 2 },
            { r: 5, c: 2 },
            { r: 5, c: 3 },
            { r: 5, c: 4 },
            { r: 5, c: 5 },
            { r: 4, c: 5 },
            { r: 3, c: 5 }
          ],
          pieces: [
            { r: 3, c: 2, type: 'DEAD_END', rotation: 90 },
            { r: 4, c: 2, type: 'STRAIGHT', rotation: 90 },
            { r: 5, c: 2, type: 'CORNER', rotation: 90 },
            { r: 5, c: 3, type: 'STRAIGHT', rotation: 0 },
            { r: 5, c: 4, type: 'STRAIGHT', rotation: 0 },
            { r: 5, c: 5, type: 'CORNER', rotation: 0 },
            { r: 4, c: 5, type: 'STRAIGHT', rotation: 90 },
            { r: 3, c: 5, type: 'ARROW_HEAD', rotation: 270, short: false }
          ]
        },
        {
          id: 'a5',
          direction: 'RIGHT',
          color: theme.color,
          vertices: [
            { r: 5, c: 6 },
            { r: 4, c: 6 },
            { r: 3, c: 6 },
            { r: 2, c: 6 },
            { r: 2, c: 5 },
            { r: 1, c: 5 },
            { r: 1, c: 6 }
          ],
          pieces: [
            { r: 5, c: 6, type: 'DEAD_END', rotation: 270 },
            { r: 4, c: 6, type: 'STRAIGHT', rotation: 90 },
            { r: 3, c: 6, type: 'STRAIGHT', rotation: 90 },
            { r: 2, c: 6, type: 'CORNER', rotation: 270 },
            { r: 2, c: 5, type: 'CORNER', rotation: 90 },
            { r: 1, c: 5, type: 'CORNER', rotation: 180 },
            { r: 1, c: 6, type: 'ARROW_HEAD', rotation: 0, short: false }
          ]
        }
      ]
    };
  }

  // Grid sizes scale gracefully from 4x4 up to 10x10
  let rows = 4 + Math.floor((levelNum - 1) / 20);
  let cols = rows;
  if (levelNum > 60 && levelNum % 2 === 0) cols = rows + 1;

  // Arrow counts scale from 3-4 up to 35-45
  const targetArrowCount = Math.min(48, Math.max(3, Math.floor(3 + (levelNum - 1) * 0.42)));

  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  const arrows = [];
  const solutionStack = []; // Reverse assembly = forward solution!

  // Multi-pass reverse placement
  let attempts = 0;
  let arrowIdCounter = 1;

  while (arrows.length < targetArrowCount && attempts++ < 1200) {
    // Find unassigned border-clear exit candidate
    const emptyCells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === null) emptyCells.push({ r, c });
      }
    }

    if (emptyCells.length === 0) break;

    const head = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const dirs = ['UP', 'DOWN', 'LEFT', 'RIGHT'].sort(() => Math.random() - 0.5);

    let placed = false;
    for (const dir of dirs) {
      // Check if exit is clear in currently placed arrows
      let cr = head.r + DELTAS[dir].r;
      let cc = head.c + DELTAS[dir].c;
      let exitClear = true;

      while (cr >= 0 && cr < rows && cc >= 0 && cc < cols) {
        if (grid[cr][cc] !== null) {
          exitClear = false;
          break;
        }
        cr += DELTAS[dir].r;
        cc += DELTAS[dir].c;
      }

      if (exitClear) {
        // Grow serpentine body backwards from head
        const pathLen = Math.min(6, Math.max(1, Math.floor(Math.random() * 4) + 1));
        const path = [head];
        let curr = head;
        let currDir = dir;

        for (let step = 1; step < pathLen; step++) {
          const opposite = currDir === 'UP' ? 'DOWN' : (currDir === 'DOWN' ? 'UP' : (currDir === 'LEFT' ? 'RIGHT' : 'LEFT'));
          const turns = currDir === 'UP' || currDir === 'DOWN' ? ['LEFT', 'RIGHT'] : ['UP', 'DOWN'];
          const options = Math.random() < 0.75 ? [...turns.sort(() => Math.random() - 0.5), opposite] : [opposite, ...turns];

          let advanced = false;
          for (const nextDir of options) {
            const nr = curr.r + DELTAS[nextDir].r;
            const nc = curr.c + DELTAS[nextDir].c;

            if (
              nr >= 0 && nr < rows &&
              nc >= 0 && nc < cols &&
              grid[nr][nc] === null &&
              !path.some(p => p.r === nr && p.c === nc)
            ) {
              curr = { r: nr, c: nc };
              path.push(curr);
              currDir = nextDir === 'UP' ? 'DOWN' : (nextDir === 'DOWN' ? 'UP' : (nextDir === 'LEFT' ? 'RIGHT' : 'LEFT'));
              advanced = true;
              break;
            }
          }
          if (!advanced) break;
        }

        // Reverse path so vertices go Tail -> Head
        const forwardVertices = [...path].reverse();
        const arrowId = `a${arrowIdCounter++}`;

        // Mark grid
        for (const pt of forwardVertices) {
          grid[pt.r][pt.c] = arrowId;
        }

        const pieces = computePiecesFromVertices(forwardVertices, dir);

        arrows.push({
          id: arrowId,
          direction: dir,
          color: theme.color,
          vertices: forwardVertices,
          pieces
        });

        // In reverse generation, the latest placed arrow is the FIRST that can exit!
        solutionStack.unshift(arrowId);
        placed = true;
        break;
      }
    }
  }

  return {
    id: levelNum,
    name: `${theme.name} ${levelNum}`,
    size: { rows, cols },
    difficulty: theme.diff,
    moveCount: arrows.length,
    solution: solutionStack,
    arrows
  };
}

// Generate all BAL1.jsx to BAL100.jsx
if (!fs.existsSync(LEVELS_DIR)) {
  fs.mkdirSync(LEVELS_DIR, { recursive: true });
}

const levelImports = [];

for (let i = 1; i <= 100; i++) {
  const levelData = createHandcraftedBALLevel(i);
  const fileName = `BAL${i}.jsx`;
  const filePath = path.join(LEVELS_DIR, fileName);

  const fileContent = `/**
 * BAL${i}.jsx - Handcrafted Level ${i}
 * Theme: ${levelData.name}
 * Difficulty: ${levelData.difficulty}
 */

const BAL${i} = ${JSON.stringify(levelData, null, 2)};

export default BAL${i};
`;

  fs.writeFileSync(filePath, fileContent, 'utf-8');
  levelImports.push({ num: i, varName: `BAL${i}`, file: `./BAL${i}` });
}

// Generate index.js
let indexContent = `/**
 * src/levels/index.js
 * Handcrafted Level Registry (BAL1 to BAL100+)
 */\n\n`;

for (const item of levelImports) {
  indexContent += `import ${item.varName} from '${item.file}';\n`;
}

indexContent += `\nexport const ALL_HANDCRAFTED_LEVELS = [\n`;
for (const item of levelImports) {
  indexContent += `  ${item.varName},\n`;
}
indexContent += `];\n\n`;

indexContent += `export function getHandcraftedLevel(levelIndex) {
  if (levelIndex >= 0 && levelIndex < ALL_HANDCRAFTED_LEVELS.length) {
    return ALL_HANDCRAFTED_LEVELS[levelIndex];
  }
  // Seamless loop or fallback
  const wrappedIdx = levelIndex % ALL_HANDCRAFTED_LEVELS.length;
  const base = ALL_HANDCRAFTED_LEVELS[wrappedIdx];
  return {
    ...base,
    id: levelIndex + 1,
    name: \`\${base.name} (Loop \${Math.floor(levelIndex / 100) + 1})\`
  };
}\n\n`;

indexContent += `export {\n`;
for (const item of levelImports) {
  indexContent += `  ${item.varName},\n`;
}
indexContent += `};\n`;

fs.writeFileSync(path.join(LEVELS_DIR, 'index.js'), indexContent, 'utf-8');

console.log(`Successfully generated all 100 BAL level files and index.js in ${LEVELS_DIR}`);
