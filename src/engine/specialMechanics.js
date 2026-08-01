/**
 * specialMechanics.js
 * Mechanics for special arrow types in Brain Arrow:
 * - LOCKED (🔒): Unlocks when its trigger arrow escapes or when neighbor clears
 * - FROZEN (❄️): Shatters ice when adjacent arrow clears
 * - PORTAL (🌀): Warps into celestial wormhole
 * - BOMB (💣): Destroys neighboring obstacles upon escape
 */

export const MECHANIC_TYPES = {
  STANDARD: 'STANDARD',
  LOCKED: 'LOCKED',
  FROZEN: 'FROZEN',
  PORTAL: 'PORTAL',
  BOMB: 'BOMB'
};

/**
 * Checks if two arrows share any adjacent cells (Manhattan distance == 1)
 */
export function areArrowsAdjacent(arrow1, arrow2) {
  const pts1 = arrow1.points || arrow1.vertices || [];
  const pts2 = arrow2.points || arrow2.vertices || [];

  for (const p1 of pts1) {
    for (const p2 of pts2) {
      const dist = Math.abs(p1.r - p2.r) + Math.abs(p1.c - p2.c);
      if (dist === 1) return true;
    }
  }
  return false;
}

/**
 * Handle state updates across all remaining arrows after an arrow is removed
 */
export function handleMechanicsOnArrowRemoved(removedArrow, remainingArrows) {
  return remainingArrows.map(arrow => {
    let updated = { ...arrow };

    // 1. Unfreeze frozen arrows if they were adjacent to the removed arrow
    if (updated.mechanic === MECHANIC_TYPES.FROZEN && updated.isFrozen) {
      if (areArrowsAdjacent(removedArrow, arrow)) {
        updated.isFrozen = false;
        updated.justUnfrozen = true;
      }
    }

    // 2. Unlock locked arrows if their key arrow was removed or if adjacent
    if (updated.mechanic === MECHANIC_TYPES.LOCKED && updated.isLocked) {
      if (updated.unlockKeyId === removedArrow.id || areArrowsAdjacent(removedArrow, arrow)) {
        updated.isLocked = false;
        updated.justUnlocked = true;
      }
    }

    return updated;
  });
}
