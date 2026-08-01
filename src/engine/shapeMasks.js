/**
 * shapeMasks.js
 * Library of 20+ recognizable silhouette shapes for Brain Arrow.
 * Controls which grid cells are active so puzzles form stunning visual silhouettes.
 */

export const SHAPES = {
  SQUARE: 'SQUARE',
  HEART: 'HEART',
  DIAMOND: 'DIAMOND',
  CIRCLE: 'CIRCLE',
  TRIANGLE: 'TRIANGLE',
  HEXAGON: 'HEXAGON',
  STAR: 'STAR',
  CROWN: 'CROWN',
  BUTTERFLY: 'BUTTERFLY',
  ROCKET: 'ROCKET',
  TREE: 'TREE',
  SHIELD: 'SHIELD',
  BRAIN: 'BRAIN',
  INFINITY: 'INFINITY',
  LIGHTNING: 'LIGHTNING',
  MOON: 'MOON',
  CLOUD: 'CLOUD',
  HOURGLASS: 'HOURGLASS',
  CASTLE: 'CASTLE',
  PUMPKIN: 'PUMPKIN'
};

export const SHAPE_METADATA = {
  HEART: { name: 'Heart', icon: '❤️', minSize: 7 },
  DIAMOND: { name: 'Diamond', icon: '💎', minSize: 7 },
  STAR: { name: 'Star', icon: '⭐', minSize: 7 },
  CROWN: { name: 'Crown', icon: '👑', minSize: 7 },
  BUTTERFLY: { name: 'Butterfly', icon: '🦋', minSize: 7 },
  ROCKET: { name: 'Rocket', icon: '🚀', minSize: 8 },
  TREE: { name: 'Evergreen', icon: '🌲', minSize: 7 },
  SHIELD: { name: 'Shield', icon: '🛡️', minSize: 7 },
  BRAIN: { name: 'Brain', icon: '🧠', minSize: 8 },
  INFINITY: { name: 'Infinity', icon: '♾️', minSize: 7 },
  LIGHTNING: { name: 'Lightning', icon: '⚡', minSize: 7 },
  MOON: { name: 'Crescent Moon', icon: '🌙', minSize: 7 },
  CLOUD: { name: 'Cloud', icon: '☁️', minSize: 7 },
  HOURGLASS: { name: 'Hourglass', icon: '⏳', minSize: 7 },
  HEXAGON: { name: 'Hexagon', icon: '⬡', minSize: 7 },
  TRIANGLE: { name: 'Triangle', icon: '▲', minSize: 7 },
  CIRCLE: { name: 'Circle', icon: '⚪', minSize: 7 },
  CASTLE: { name: 'Castle', icon: '🏰', minSize: 8 },
  PUMPKIN: { name: 'Pumpkin', icon: '🎃', minSize: 7 },
  SQUARE: { name: 'Square', icon: '⬛', minSize: 5 }
};

/**
 * Returns whether cell (r, c) is inside the silhouette for a given shape and size.
 */
export function isCellInMask(r, c, shape = 'SQUARE', size = 8) {
  if (r < 0 || r >= size || c < 0 || c >= size) return false;
  if (shape === 'SQUARE') return true;

  // Normalized coordinates from -1.0 to 1.0
  const ny = ((r + 0.5) / size) * 2 - 1; // -1 (top) to +1 (bottom)
  const nx = ((c + 0.5) / size) * 2 - 1; // -1 (left) to +1 (right)

  switch (shape) {
    case 'HEART': {
      // (x^2 + y^2 - 1)^3 - x^2 * y^3 <= 0
      const x = nx * 1.25;
      const y = -ny * 1.25 + 0.2; // invert y for top
      const val = Math.pow(x * x + y * y - 1, 3) - x * x * Math.pow(y, 3);
      return val <= 0.15;
    }

    case 'DIAMOND': {
      return Math.abs(nx) + Math.abs(ny) <= 0.95;
    }

    case 'CIRCLE': {
      return nx * nx + ny * ny <= 0.9;
    }

    case 'TRIANGLE': {
      // Apex at top center, base at bottom
      const widthAtY = (ny + 1) * 0.9;
      return ny >= -0.85 && ny <= 0.85 && Math.abs(nx) <= widthAtY;
    }

    case 'HEXAGON': {
      return Math.abs(nx) <= 0.85 && (Math.abs(nx) * 0.5 + Math.abs(ny) * 0.866) <= 0.85;
    }

    case 'STAR': {
      const dist = Math.hypot(nx, ny);
      const angle = Math.atan2(ny, nx);
      // 5 pointed star
      const starRadius = 0.55 + 0.35 * Math.cos(5 * angle);
      return dist <= starRadius;
    }

    case 'CROWN': {
      if (ny > 0.7) return false;
      if (ny > 0.2) return Math.abs(nx) <= 0.85;
      // 3 peaks: left (-0.6), center (0), right (0.6)
      const peak1 = Math.hypot(nx + 0.6, ny + 0.4) <= 0.45;
      const peak2 = Math.hypot(nx, ny + 0.6) <= 0.45;
      const peak3 = Math.hypot(nx - 0.6, ny + 0.4) <= 0.45;
      return peak1 || peak2 || peak3;
    }

    case 'BUTTERFLY': {
      const leftWing = Math.hypot(nx + 0.45, ny * 0.8) <= 0.55;
      const rightWing = Math.hypot(nx - 0.45, ny * 0.8) <= 0.55;
      const centerBody = Math.abs(nx) <= 0.2 && Math.abs(ny) <= 0.8;
      return leftWing || rightWing || centerBody;
    }

    case 'ROCKET': {
      // Cone top
      if (ny < -0.2) {
        const w = (ny + 0.85) * 0.7;
        return ny >= -0.85 && Math.abs(nx) <= -w + 0.15;
      }
      // Fuselage
      if (ny <= 0.4) return Math.abs(nx) <= 0.4;
      // Fins at bottom
      const fins = ny <= 0.85 && Math.abs(nx) <= (ny - 0.4) * 1.5 + 0.4;
      return fins;
    }

    case 'TREE': {
      // Top triangular foliage
      if (ny <= 0.35) {
        const w = (ny + 0.85) * 0.65;
        return ny >= -0.85 && Math.abs(nx) <= w;
      }
      // Trunk
      return ny <= 0.85 && Math.abs(nx) <= 0.22;
    }

    case 'SHIELD': {
      if (ny < -0.85 || ny > 0.85) return false;
      if (ny <= 0) return Math.abs(nx) <= 0.8;
      // Curves down to point
      const w = 0.8 * (1 - Math.pow((ny) / 0.85, 2));
      return Math.abs(nx) <= w;
    }

    case 'BRAIN': {
      // Two rounded hemispheres with indent at center
      const leftHemi = Math.hypot(nx + 0.35, ny * 0.9) <= 0.55;
      const rightHemi = Math.hypot(nx - 0.35, ny * 0.9) <= 0.55;
      return (leftHemi || rightHemi) && !(Math.abs(nx) < 0.1 && ny < -0.4);
    }

    case 'INFINITY': {
      const leftLoop = Math.hypot(nx + 0.42, ny * 1.2) <= 0.45;
      const rightLoop = Math.hypot(nx - 0.42, ny * 1.2) <= 0.45;
      const bridge = Math.abs(nx) <= 0.35 && Math.abs(ny) <= 0.22;
      return leftLoop || rightLoop || bridge;
    }

    case 'LIGHTNING': {
      // Diagonal zig-zag bolt
      if (ny < -0.1) {
        return Math.abs(nx - (-ny * 0.5 - 0.2)) <= 0.35;
      } else {
        return Math.abs(nx - (ny * 0.5 + 0.1)) <= 0.35;
      }
    }

    case 'MOON': {
      const outerCircle = nx * nx + ny * ny <= 0.85;
      const innerCutout = Math.hypot(nx - 0.4, ny - 0.1) <= 0.65;
      return outerCircle && !innerCutout;
    }

    case 'HOURGLASS': {
      const w = Math.abs(ny) * 0.8 + 0.15;
      return Math.abs(ny) <= 0.85 && Math.abs(nx) <= w;
    }

    case 'CASTLE': {
      if (ny > 0.8) return false;
      if (ny > 0.1) return Math.abs(nx) <= 0.85;
      // Battlements / towers at left (-0.7), center (0), right (0.7)
      const leftTower = Math.abs(nx + 0.65) <= 0.22 && ny >= -0.8;
      const midTower = Math.abs(nx) <= 0.22 && ny >= -0.65;
      const rightTower = Math.abs(nx - 0.65) <= 0.22 && ny >= -0.8;
      return leftTower || midTower || rightTower;
    }

    case 'PUMPKIN': {
      const oval = (nx * nx) / 0.75 + (ny * ny) / 0.55 <= 1;
      const stem = Math.abs(nx) <= 0.15 && ny >= -0.85 && ny <= -0.55;
      return oval || stem;
    }

    default:
      return true;
  }
}

/**
 * Returns all {r, c} cells that belong to the shape mask.
 */
export function getMaskActiveCells(shape = 'SQUARE', size = 8) {
  const activeCells = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isCellInMask(r, c, shape, size)) {
        activeCells.push({ r, c });
      }
    }
  }
  return activeCells;
}

/**
 * Get an ordered list of shape names for level progression
 */
export const LEVEL_SHAPE_ROTATION = [
  'SQUARE', 'HEART', 'DIAMOND', 'STAR', 'HEXAGON', 
  'CROWN', 'BUTTERFLY', 'TREE', 'SHIELD', 'BRAIN', 
  'ROCKET', 'INFINITY', 'LIGHTNING', 'MOON', 'HOURGLASS', 'CASTLE'
];
