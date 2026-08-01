/**
 * colorThemes.js
 * World-themed color palettes for Brain Arrow:
 * 1. Forest - Emerald & Jade Crystal
 * 2. Ocean - Sapphire & Cyan Crystal
 * 3. Volcano - Molten Obsidian & Crimson Flare
 * 4. Cyber - Neon Cyan & Electric Violet
 * 5. Galaxy - Cosmic Purple & Star Glow
 * 6. Temple - Dark Bronze & Sunburst Gold
 * 7. Ice - Arctic Navy & Glacier Shimmer
 */

export const COLOR_THEMES = {
  FOREST: {
    id: 'FOREST',
    worldName: 'Emerald Forest',
    worldIcon: '🌲',
    bg: '#042f2e',
    boardBg: '#0f172a',
    dotColor: '#1e293b',
    primaryArrow: '#10b981',
    accentArrow: '#059669',
    specialArrow: '#34d399',
    glowColor: '#34d399',
    particleColor: '#10b981',
    tagBg: '#064e3b',
    tagText: '#6ee7b7'
  },
  OCEAN: {
    id: 'OCEAN',
    worldName: 'Ocean Crystal',
    worldIcon: '🌊',
    bg: '#082f49',
    boardBg: '#0f172a',
    dotColor: '#1e293b',
    primaryArrow: '#38bdf8',
    accentArrow: '#0284c7',
    specialArrow: '#7dd3fc',
    glowColor: '#38bdf8',
    particleColor: '#0284c7',
    tagBg: '#0c4a6e',
    tagText: '#7dd3fc'
  },
  VOLCANO: {
    id: 'VOLCANO',
    worldName: 'Volcano Flare',
    worldIcon: '🌋',
    bg: '#450a0a',
    boardBg: '#0f172a',
    dotColor: '#1e293b',
    primaryArrow: '#f97316',
    accentArrow: '#ea580c',
    specialArrow: '#fb923c',
    glowColor: '#f97316',
    particleColor: '#ea580c',
    tagBg: '#7f1d1d',
    tagText: '#fdba74'
  },
  CYBER: {
    id: 'CYBER',
    worldName: 'Cyber Neon',
    worldIcon: '⚡',
    bg: '#030712',
    boardBg: '#0f172a',
    dotColor: '#1e293b',
    primaryArrow: '#00f0ff',
    accentArrow: '#818cf8',
    specialArrow: '#a855f7',
    glowColor: '#00f0ff',
    particleColor: '#818cf8',
    tagBg: '#1e1b4b',
    tagText: '#a5b4fc'
  },
  GALAXY: {
    id: 'GALAXY',
    worldName: 'Cosmic Galaxy',
    worldIcon: '🌌',
    bg: '#1e1035',
    boardBg: '#0f172a',
    dotColor: '#1e293b',
    primaryArrow: '#c084fc',
    accentArrow: '#a855f7',
    specialArrow: '#e879f9',
    glowColor: '#c084fc',
    particleColor: '#a855f7',
    tagBg: '#3b0764',
    tagText: '#e9d5ff'
  },
  TEMPLE: {
    id: 'TEMPLE',
    worldName: 'Golden Temple',
    worldIcon: '🏛️',
    bg: '#291804',
    boardBg: '#0f172a',
    dotColor: '#1e293b',
    primaryArrow: '#fbbf24',
    accentArrow: '#f59e0b',
    specialArrow: '#fde047',
    glowColor: '#fbbf24',
    particleColor: '#f59e0b',
    tagBg: '#451a03',
    tagText: '#fde68a'
  },
  ICE: {
    id: 'ICE',
    worldName: 'Glacier Frost',
    worldIcon: '❄️',
    bg: '#082f49',
    boardBg: '#0f172a',
    dotColor: '#1e293b',
    primaryArrow: '#e0f2fe',
    accentArrow: '#38bdf8',
    specialArrow: '#bae6fd',
    glowColor: '#38bdf8',
    particleColor: '#7dd3fc',
    tagBg: '#075985',
    tagText: '#bae6fd'
  }
};

export const WORLD_THEME_LIST = [
  COLOR_THEMES.OCEAN,
  COLOR_THEMES.GALAXY,
  COLOR_THEMES.FOREST,
  COLOR_THEMES.VOLCANO,
  COLOR_THEMES.CYBER,
  COLOR_THEMES.TEMPLE,
  COLOR_THEMES.ICE
];

export function getThemeForLevel(levelIndex) {
  return WORLD_THEME_LIST[levelIndex % WORLD_THEME_LIST.length];
}
