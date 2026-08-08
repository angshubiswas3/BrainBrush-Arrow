/**
 * src/levels/index.js
 * Automatic dynamic level registry for Brain Arrow (BAL1 to BAL100+) using Vite import.meta.glob.
 * Any new BAL*.jsx level file added to this directory is automatically discovered and registered.
 */

const levelModules = import.meta.glob('./BAL*.jsx', { eager: true });

const levelsMap = {};
Object.keys(levelModules).forEach((filePath) => {
  const match = filePath.match(/BAL(\d+)\.jsx$/);
  if (match) {
    const num = parseInt(match[1], 10);
    const mod = levelModules[filePath];
    levelsMap[num] = mod.default || mod;
  }
});

const sortedNumbers = Object.keys(levelsMap).map(Number).sort((a, b) => a - b);

export const ALL_HANDCRAFTED_LEVELS = sortedNumbers.map((num) => levelsMap[num]);

export function getHighestBALLevelId() {
  if (sortedNumbers.length === 0) return 0;
  return sortedNumbers[sortedNumbers.length - 1];
}

export function getHandcraftedLevel(levelIndex) {
  if (ALL_HANDCRAFTED_LEVELS.length === 0) return null;
  const idx = typeof levelIndex === 'number' ? Math.floor(levelIndex) : 0;
  if (idx >= 0 && idx < ALL_HANDCRAFTED_LEVELS.length) {
    return ALL_HANDCRAFTED_LEVELS[idx];
  }
  const wrapped = Math.abs(idx) % ALL_HANDCRAFTED_LEVELS.length;
  return ALL_HANDCRAFTED_LEVELS[wrapped];
}

export default ALL_HANDCRAFTED_LEVELS;
