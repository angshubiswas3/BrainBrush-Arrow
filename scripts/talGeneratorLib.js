import fs from 'fs';
import path from 'path';

const DELTAS = {
  UP: { r: -1, c: 0 },
  DOWN: { r: 1, c: 0 },
  LEFT: { r: 0, c: -1 },
  RIGHT: { r: 0, c: 1 }
};

const DIRECTIONS = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

const CANDY_PALETTE = [
  '#FF5E7E', // Neon Bubblegum Pink
  '#00D2D3', // Electric Cyan
  '#FECA57', // Radiant Mango Gold
  '#5F27CD', // Deep Purple Candy
  '#FF9F43', // Juicy Orange
  '#10AC84', // Mint Emerald
  '#54A0FF', // Sky Marine
  '#EE5253', // Crimson Coral
  '#A3E635', // Electric Lime
  '#48DBFB', // Ice Spark Blue
  '#9B59B6', // Amethyst Violet
  '#1DD1A1'  // Wild Seafoam
];

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function solveArrows(arrows) {
  let remaining = [...arrows];
  const solution = [];

  while (remaining.length > 0) {
    let moved = false;

    for (let i = 0; i < remaining.length; i++) {
      const arrow = remaining[i];
      let isClear = true;

      for (let j = 0; j < remaining.length; j++) {
        if (i === j) continue;
        const other = remaining[j];

        if (arrow.direction === 'UP' && other.col === arrow.col && other.row < arrow.row) isClear = false;
        if (arrow.direction === 'DOWN' && other.col === arrow.col && other.row > arrow.row) isClear = false;
        if (arrow.direction === 'LEFT' && other.row === arrow.row && other.col < arrow.col) isClear = false;
        if (arrow.direction === 'RIGHT' && other.row === arrow.row && other.col > arrow.col) isClear = false;

        if (!isClear) break;
      }

      if (isClear) {
        solution.push(arrow.id);
        remaining.splice(i, 1);
        moved = true;
        break;
      }
    }

    if (!moved) break;
  }

  return {
    isSolvable: remaining.length === 0,
    solution
  };
}

export function createHandcraftedTALLevel(levelNum) {
  const rand = seededRandom(levelNum * 997 + 1337);

  let gridSize = 3;
  let difficulty = 'Easy';
  let timeLimit = 25;
  let targetDensity = 0.55;

  if (levelNum <= 5) {
    gridSize = 3;
    difficulty = 'Easy';
    timeLimit = 25;
    targetDensity = 0.55;
  } else if (levelNum <= 15) {
    gridSize = 4;
    difficulty = 'Easy';
    timeLimit = 35;
    targetDensity = 0.65;
  } else if (levelNum <= 35) {
    gridSize = 5;
    difficulty = 'Medium';
    timeLimit = 45;
    targetDensity = 0.72;
  } else if (levelNum <= 65) {
    gridSize = 6;
    difficulty = 'Hard';
    timeLimit = 55;
    targetDensity = 0.78;
  } else if (levelNum <= 85) {
    gridSize = 7;
    difficulty = 'Expert';
    timeLimit = 70;
    targetDensity = 0.82;
  } else {
    gridSize = 8;
    difficulty = 'Master';
    timeLimit = 85;
    targetDensity = 0.85;
  }

  const totalCells = gridSize * gridSize;
  let targetArrows = Math.max(3, Math.floor(totalCells * targetDensity));
  if (targetArrows > totalCells - 1) targetArrows = totalCells - 1;

  let bestBoard = null;
  let bestSolution = null;

  for (let attempt = 0; attempt < 100; attempt++) {
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
    const arrows = [];
    let idCounter = 1;

    let innerTries = 0;
    while (arrows.length < targetArrows && innerTries++ < 600) {
      const r = Math.floor(rand() * gridSize);
      const c = Math.floor(rand() * gridSize);

      if (grid[r][c] !== null) continue;

      const dirs = [...DIRECTIONS].sort(() => rand() - 0.5);

      for (const dir of dirs) {
        let canSlideIn = true;
        if (dir === 'UP') {
          for (let i = 0; i < r; i++) {
            if (grid[i][c] !== null) { canSlideIn = false; break; }
          }
        } else if (dir === 'DOWN') {
          for (let i = r + 1; i < gridSize; i++) {
            if (grid[i][c] !== null) { canSlideIn = false; break; }
          }
        } else if (dir === 'LEFT') {
          for (let j = 0; j < c; j++) {
            if (grid[r][j] !== null) { canSlideIn = false; break; }
          }
        } else if (dir === 'RIGHT') {
          for (let j = c + 1; j < gridSize; j++) {
            if (grid[r][j] !== null) { canSlideIn = false; break; }
          }
        }

        if (canSlideIn) {
          const color = CANDY_PALETTE[(arrows.length + levelNum) % CANDY_PALETTE.length];
          const arrowObj = {
            id: `t${idCounter++}`,
            row: r,
            col: c,
            direction: dir,
            color
          };
          grid[r][c] = arrowObj.id;
          arrows.push(arrowObj);
          break;
        }
      }
    }

    if (arrows.length >= Math.min(3, targetArrows - 1)) {
      const res = solveArrows(arrows);
      if (res.isSolvable) {
        bestBoard = arrows;
        bestSolution = res.solution;
        break;
      }
    }
  }

  if (!bestBoard || bestBoard.length === 0) {
    bestBoard = [
      { id: 't1', row: 0, col: 1, direction: 'UP', color: CANDY_PALETTE[0] },
      { id: 't2', row: 1, col: 1, direction: 'RIGHT', color: CANDY_PALETTE[1] },
      { id: 't3', row: 1, col: 0, direction: 'LEFT', color: CANDY_PALETTE[2] },
      { id: 't4', row: 2, col: 1, direction: 'DOWN', color: CANDY_PALETTE[3] }
    ];
    bestSolution = ['t1', 't2', 't3', 't4'];
  }

  return {
    id: levelNum,
    name: `Level ${levelNum}`,
    difficulty,
    gridSize,
    timeLimit,
    moves: bestBoard.length,
    board: bestBoard,
    solution: bestSolution
  };
}

export function generateAllTALLevels(levelsDir) {
  if (!fs.existsSync(levelsDir)) {
    fs.mkdirSync(levelsDir, { recursive: true });
  }

  const levelImports = [];

  for (let i = 1; i <= 100; i++) {
    const levelData = createHandcraftedTALLevel(i);
    const fileName = `TAL${i}.jsx`;
    const filePath = path.join(levelsDir, fileName);

    const fileContent = `/**
 * TAL${i}.jsx - Handcrafted Time Arrow Level ${i}
 * Difficulty: ${levelData.difficulty}
 * Grid Size: ${levelData.gridSize}x${levelData.gridSize} | Moves: ${levelData.moves} | Time Limit: ${levelData.timeLimit}s
 */

const TAL${i} = ${JSON.stringify(levelData, null, 2)};

export default TAL${i};
`;

    fs.writeFileSync(filePath, fileContent, 'utf-8');
    levelImports.push({ num: i, varName: `TAL${i}`, file: `./TAL${i}` });
  }

  let indexContent = `/**
 * src/timeArrow/levels/index.js
 * Master Handcrafted Time Arrow Levels Registry (TAL1 to TAL100)
 * Independent from Brain Arrow
 */\n\n`;

  for (const item of levelImports) {
    indexContent += `import ${item.varName} from '${item.file}';\n`;
  }

  indexContent += `\nexport const ALL_TIME_ARROW_LEVELS = [\n`;
  for (const item of levelImports) {
    indexContent += `  ${item.varName},\n`;
  }
  indexContent += `];\n\n`;

  indexContent += `export function getTimeArrowLevel(levelIndexOrNumber) {
  const all = ALL_TIME_ARROW_LEVELS;
  const idx = typeof levelIndexOrNumber === 'number'
    ? (levelIndexOrNumber >= 1 && levelIndexOrNumber <= all.length ? levelIndexOrNumber - 1 : levelIndexOrNumber)
    : 0;

  if (idx >= 0 && idx < all.length) {
    return all[idx];
  }
  const wrapped = Math.abs(idx) % all.length;
  return all[wrapped];
}\n\n`;

  indexContent += `export {\n`;
  for (const item of levelImports) {
    indexContent += `  ${item.varName},\n`;
  }
  indexContent += `};\n\n`;

  indexContent += `export default ALL_TIME_ARROW_LEVELS;\n`;

  fs.writeFileSync(path.join(levelsDir, 'index.js'), indexContent, 'utf-8');
  console.log(`Successfully generated all 100 TAL levels in ${levelsDir}`);
}
