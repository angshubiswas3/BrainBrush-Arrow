/**
 * src/timeArrow/levels/index.js
 * Automatic dynamic level registry for Time Arrow (TAL1 to TAL100+) using Vite import.meta.glob.
 * Any new TAL*.jsx level file added to this directory is automatically discovered and registered.
 */

const levelModules = import.meta.glob('./TAL*.jsx', { eager: true });

const levelsMap = {};
Object.keys(levelModules).forEach((filePath) => {
  const match = filePath.match(/TAL(\d+)\.jsx$/);
  if (match) {
    const num = parseInt(match[1], 10);
    const mod = levelModules[filePath];
    levelsMap[num] = mod.default || mod;
  }
});

const sortedNumbers = Object.keys(levelsMap).map(Number).sort((a, b) => a - b);

export const ALL_TIME_ARROW_LEVELS = sortedNumbers.map((num) => levelsMap[num]);

export function getHighestTALLevelId() {
  if (sortedNumbers.length === 0) return 0;
  return sortedNumbers[sortedNumbers.length - 1];
}

export function getTimeArrowLevel(levelIndex) {
  if (ALL_TIME_ARROW_LEVELS.length === 0) return null;
  const idx = typeof levelIndex === 'number' ? Math.floor(levelIndex) : 0;
  if (idx >= 0 && idx < ALL_TIME_ARROW_LEVELS.length) {
    return ALL_TIME_ARROW_LEVELS[idx];
  }
  const wrapped = Math.abs(idx) % ALL_TIME_ARROW_LEVELS.length;
  return ALL_TIME_ARROW_LEVELS[wrapped];
}

export default ALL_TIME_ARROW_LEVELS;
