/**
 * colorThemes.js
 * Unified Luxury World Color Engine for Brain Arrow:
 * 1. Forest: Emerald Green
 * 2. Ocean: Deep Blue
 * 3. Galaxy: Cosmic Purple
 * 4. Volcano: Molten Orange
 * 5. Cyber: Electric Cyan
 * 6. Temple: Imperial Gold
 * 7. Ice: Crystal Blue
 * 8. Night: Sterling Silver
 * 9. Desert: Warm Amber
 *
 * Enforces a single, harmonious, elegant luxury palette per world.
 */

export const COLOR_THEMES = {
  FOREST: {
    id: 'FOREST',
    worldName: 'Emerald Forest',
    worldIcon: '🌲',
    worldGradient: 'linear-gradient(145deg, #022c22 0%, #064e3b 100%)',
    primaryArrow: '#10b981',
    secondaryArrow: '#059669',
    highlightSpine: 'rgba(255, 255, 255, 0.45)',
    glowColor: '#34d399',
    dotColor: 'rgba(52, 211, 153, 0.16)',
    tagBg: 'rgba(6, 78, 59, 0.65)',
    tagText: '#a7f3d0',
    shadowColor: 'rgba(2, 44, 34, 0.5)'
  },
  OCEAN: {
    id: 'OCEAN',
    worldName: 'Deep Ocean',
    worldIcon: '🌊',
    worldGradient: 'linear-gradient(145deg, #031926 0%, #082f49 100%)',
    primaryArrow: '#0ea5e9',
    secondaryArrow: '#0284c7',
    highlightSpine: 'rgba(255, 255, 255, 0.45)',
    glowColor: '#38bdf8',
    dotColor: 'rgba(56, 189, 248, 0.16)',
    tagBg: 'rgba(12, 74, 110, 0.65)',
    tagText: '#bae6fd',
    shadowColor: 'rgba(3, 25, 38, 0.5)'
  },
  GALAXY: {
    id: 'GALAXY',
    worldName: 'Cosmic Galaxy',
    worldIcon: '🌌',
    worldGradient: 'linear-gradient(145deg, #0f051d 0%, #2e1065 100%)',
    primaryArrow: '#a855f7',
    secondaryArrow: '#9333ea',
    highlightSpine: 'rgba(255, 255, 255, 0.45)',
    glowColor: '#c084fc',
    dotColor: 'rgba(192, 132, 252, 0.16)',
    tagBg: 'rgba(59, 7, 100, 0.65)',
    tagText: '#f3e8ff',
    shadowColor: 'rgba(15, 5, 29, 0.5)'
  },
  VOLCANO: {
    id: 'VOLCANO',
    worldName: 'Molten Volcano',
    worldIcon: '🌋',
    worldGradient: 'linear-gradient(145deg, #2b0707 0%, #450a0a 100%)',
    primaryArrow: '#f97316',
    secondaryArrow: '#ea580c',
    highlightSpine: 'rgba(255, 255, 255, 0.45)',
    glowColor: '#fb923c',
    dotColor: 'rgba(251, 146, 60, 0.16)',
    tagBg: 'rgba(127, 29, 29, 0.65)',
    tagText: '#ffedd5',
    shadowColor: 'rgba(43, 7, 7, 0.5)'
  },
  CYBER: {
    id: 'CYBER',
    worldName: 'Cyber Neon',
    worldIcon: '⚡',
    worldGradient: 'linear-gradient(145deg, #020617 0%, #083344 100%)',
    primaryArrow: '#06b6d4',
    secondaryArrow: '#0891b2',
    highlightSpine: 'rgba(255, 255, 255, 0.45)',
    glowColor: '#22d3ee',
    dotColor: 'rgba(34, 211, 238, 0.16)',
    tagBg: 'rgba(21, 94, 117, 0.65)',
    tagText: '#cffafe',
    shadowColor: 'rgba(2, 6, 23, 0.5)'
  },
  TEMPLE: {
    id: 'TEMPLE',
    worldName: 'Imperial Temple',
    worldIcon: '🏛️',
    worldGradient: 'linear-gradient(145deg, #1c1002 0%, #451a03 100%)',
    primaryArrow: '#f59e0b',
    secondaryArrow: '#d97706',
    highlightSpine: 'rgba(255, 255, 255, 0.45)',
    glowColor: '#fbbf24',
    dotColor: 'rgba(251, 191, 36, 0.16)',
    tagBg: 'rgba(120, 53, 15, 0.65)',
    tagText: '#fef3c7',
    shadowColor: 'rgba(28, 16, 2, 0.5)'
  },
  ICE: {
    id: 'ICE',
    worldName: 'Crystal Glacier',
    worldIcon: '❄️',
    worldGradient: 'linear-gradient(145deg, #041f2d 0%, #0c4a6e 100%)',
    primaryArrow: '#38bdf8',
    secondaryArrow: '#0284c7',
    highlightSpine: 'rgba(255, 255, 255, 0.5)',
    glowColor: '#7dd3fc',
    dotColor: 'rgba(186, 230, 253, 0.18)',
    tagBg: 'rgba(7, 89, 133, 0.65)',
    tagText: '#e0f2fe',
    shadowColor: 'rgba(4, 31, 45, 0.5)'
  },
  NIGHT: {
    id: 'NIGHT',
    worldName: 'Sterling Night',
    worldIcon: '🌙',
    worldGradient: 'linear-gradient(145deg, #090d16 0%, #1e293b 100%)',
    primaryArrow: '#cbd5e1',
    secondaryArrow: '#94a3b8',
    highlightSpine: 'rgba(255, 255, 255, 0.55)',
    glowColor: '#e2e8f0',
    dotColor: 'rgba(203, 213, 225, 0.16)',
    tagBg: 'rgba(30, 41, 59, 0.65)',
    tagText: '#f8fafc',
    shadowColor: 'rgba(9, 13, 22, 0.5)'
  },
  DESERT: {
    id: 'DESERT',
    worldName: 'Amber Dunes',
    worldIcon: '🏜️',
    worldGradient: 'linear-gradient(145deg, #1c0e05 0%, #431407 100%)',
    primaryArrow: '#d97706',
    secondaryArrow: '#b45309',
    highlightSpine: 'rgba(255, 255, 255, 0.45)',
    glowColor: '#f59e0b',
    dotColor: 'rgba(245, 158, 11, 0.16)',
    tagBg: 'rgba(124, 45, 18, 0.65)',
    tagText: '#ffedd5',
    shadowColor: 'rgba(28, 14, 5, 0.5)'
  }
};

export const WORLD_THEME_LIST = [
  COLOR_THEMES.FOREST,
  COLOR_THEMES.OCEAN,
  COLOR_THEMES.GALAXY,
  COLOR_THEMES.VOLCANO,
  COLOR_THEMES.CYBER,
  COLOR_THEMES.TEMPLE,
  COLOR_THEMES.ICE,
  COLOR_THEMES.NIGHT,
  COLOR_THEMES.DESERT
];

export function getThemeForLevel(levelIndex) {
  return WORLD_THEME_LIST[levelIndex % WORLD_THEME_LIST.length];
}
