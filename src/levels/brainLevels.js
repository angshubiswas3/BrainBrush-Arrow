/**
 * brainLevels.js
 * Solver and Validation Pipeline for Brain Arrow.
 * Fully verifies 100% solvability and processes points and mechanics.
 */

import { getShapeForLevel, isCellInMask } from '../engine/shapeMasks';
import { getThemeForLevel } from '../engine/colorThemes';
import { MECHANIC_TYPES, handleMechanicsOnArrowRemoved } from '../engine/specialMechanics';

const DELTAS = {
  UP: { r: -1, c: 0 },
  DOWN: { r: 1, c: 0 },
  LEFT: { r: 0, c: -1 },
  RIGHT: { r: 0, c: 1 }
};

export function expandVerticesToCells(vertices) {
  const cells = [];
  for (let i = 0; i < vertices.length - 1; i++) {
    const p1 = vertices[i];
    const p2 = vertices[i + 1];

    const dr = Math.sign(p2.r - p1.r);
    const dc = Math.sign(p2.c - p1.c);

    let currR = p1.r;
    let currC = p1.c;

    while (currR !== p2.r || currC !== p2.c) {
      cells.push({ r: currR, c: currC });
      currR += dr;
      currC += dc;
    }
  }
  cells.push(vertices[vertices.length - 1]);
  return cells;
}

export function isArrowClear(arrow, remainingArrows, size) {
  if (arrow.isLocked || arrow.isFrozen) return false;

  const pts = arrow.points || expandVerticesToCells(arrow.vertices);
  const head = pts[pts.length - 1];
  const delta = DELTAS[arrow.direction];

  let currR = head.r + delta.r;
  let currC = head.c + delta.c;

  while (currR >= 0 && currR < size && currC >= 0 && currC < size) {
    const isOccupied = remainingArrows.some(other =>
      other.id !== arrow.id &&
      (other.points || expandVerticesToCells(other.vertices)).some(p => p.r === currR && p.c === currC)
    );
    if (isOccupied) return false;
    currR += delta.r;
    currC += delta.c;
  }
  return true;
}

export function solveBrainLevel(level) {
  let remaining = [...level.arrows];
  const size = level.size;
  const moves = [];

  while (remaining.length > 0) {
    const clearArrows = remaining.filter(a => isArrowClear(a, remaining, size));

    if (clearArrows.length === 0) {
      return { solvable: false, remainingCount: remaining.length, solutionSteps: moves };
    }

    const chosen = clearArrows[0];
    moves.push(chosen.id);
    remaining = remaining.filter(a => a.id !== chosen.id);
    remaining = handleMechanicsOnArrowRemoved(chosen, remaining);
  }

  return { solvable: true, solutionSteps: moves };
}

export function processBrainLevel(rawLevel, index = 0) {
  const theme = rawLevel.theme || getThemeForLevel(index);
  const shapeInfo = getShapeForLevel(index);
  const shape = rawLevel.shape || shapeInfo.id;

  const processedArrows = rawLevel.arrows.map(arrow => {
    const fullCells = expandVerticesToCells(arrow.vertices || arrow.points);
    return {
      ...arrow,
      vertices: arrow.vertices || arrow.points,
      points: fullCells,
      color: arrow.color || theme.primaryArrow,
      mechanic: arrow.mechanic || MECHANIC_TYPES.STANDARD,
      isLocked: arrow.mechanic === MECHANIC_TYPES.LOCKED,
      isFrozen: arrow.mechanic === MECHANIC_TYPES.FROZEN
    };
  });

  return {
    ...rawLevel,
    shape,
    shapeName: shapeInfo.name,
    shapeIcon: shapeInfo.icon,
    theme,
    arrows: processedArrows
  };
}
