/**
 * colorThemes.js
 * Modern Vibrant World Color Engine for Brain Arrow:
 * Inspired by modern 3D mobile game design (bright energetic palettes, crisp floating cards, rich vector arrows).
 */

export const COLOR_THEMES = {
  FOREST: {
    id: 'FOREST',
    worldName: 'Citrus Meadow',
    worldIcon: '🍃',
    worldGradient: 'linear-gradient(165deg, #e4f954 0%, #b8f244 50%, #86efac 100%)',
    stageBg: 'rgba(255, 255, 255, 0.92)',
    stageBorder: 'rgba(255, 255, 255, 0.8)',
    primaryArrow: '#059669',
    secondaryArrow: '#10b981',
    highlightSpine: 'rgba(255, 255, 255, 0.75)',
    glowColor: '#10b981',
    dotColor: 'rgba(5, 150, 105, 0.18)',
    tagBg: '#0f172a',
    tagText: '#f8fafc',
    shadowColor: 'rgba(5, 150, 105, 0.25)'
  },
  OCEAN: {
    id: 'OCEAN',
    worldName: 'Sky Adventure',
    worldIcon: '🌊',
    worldGradient: 'linear-gradient(165deg, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%)',
    stageBg: 'rgba(255, 255, 255, 0.94)',
    stageBorder: 'rgba(255, 255, 255, 0.85)',
    primaryArrow: '#0284c7',
    secondaryArrow: '#38bdf8',
    highlightSpine: 'rgba(255, 255, 255, 0.75)',
    glowColor: '#38bdf8',
    dotColor: 'rgba(2, 132, 199, 0.18)',
    tagBg: '#0f172a',
    tagText: '#f8fafc',
    shadowColor: 'rgba(2, 132, 199, 0.25)'
  },
  GALAXY: {
    id: 'GALAXY',
    worldName: 'Cosmic Dream',
    worldIcon: '🌌',
    worldGradient: 'linear-gradient(165deg, #e9d5ff 0%, #c084fc 50%, #7c3aed 100%)',
    stageBg: 'rgba(255, 255, 255, 0.92)',
    stageBorder: 'rgba(255, 255, 255, 0.8)',
    primaryArrow: '#7c3aed',
    secondaryArrow: '#a855f7',
    highlightSpine: 'rgba(255, 255, 255, 0.75)',
    glowColor: '#a855f7',
    dotColor: 'rgba(124, 58, 237, 0.18)',
    tagBg: '#0f172a',
    tagText: '#f8fafc',
    shadowColor: 'rgba(124, 58, 237, 0.25)'
  },
  VOLCANO: {
    id: 'VOLCANO',
    worldName: 'Sunset Peak',
    worldIcon: '🔥',
    worldGradient: 'linear-gradient(165deg, #fed7aa 0%, #fb923c 50%, #ea580c 100%)',
    stageBg: 'rgba(255, 255, 255, 0.94)',
    stageBorder: 'rgba(255, 255, 255, 0.85)',
    primaryArrow: '#ea580c',
    secondaryArrow: '#f97316',
    highlightSpine: 'rgba(255, 255, 255, 0.75)',
    glowColor: '#f97316',
    dotColor: 'rgba(234, 88, 12, 0.18)',
    tagBg: '#0f172a',
    tagText: '#f8fafc',
    shadowColor: 'rgba(234, 88, 12, 0.25)'
  },
  CYBER: {
    id: 'CYBER',
    worldName: 'Neon Horizon',
    worldIcon: '⚡',
    worldGradient: 'linear-gradient(165deg, #bae6fd 0%, #38bdf8 50%, #0284c7 100%)',
    stageBg: 'rgba(255, 255, 255, 0.94)',
    stageBorder: 'rgba(255, 255, 255, 0.85)',
    primaryArrow: '#0891b2',
    secondaryArrow: '#06b6d4',
    highlightSpine: 'rgba(255, 255, 255, 0.75)',
    glowColor: '#06b6d4',
    dotColor: 'rgba(8, 145, 178, 0.18)',
    tagBg: '#0f172a',
    tagText: '#f8fafc',
    shadowColor: 'rgba(8, 145, 178, 0.25)'
  },
  TEMPLE: {
    id: 'TEMPLE',
    worldName: 'Sun Valley',
    worldIcon: '☀️',
    worldGradient: 'linear-gradient(165deg, #fef08a 0%, #fde047 50%, #eab308 100%)',
    stageBg: 'rgba(255, 255, 255, 0.94)',
    stageBorder: 'rgba(255, 255, 255, 0.85)',
    primaryArrow: '#d97706',
    secondaryArrow: '#f59e0b',
    highlightSpine: 'rgba(255, 255, 255, 0.75)',
    glowColor: '#f59e0b',
    dotColor: 'rgba(217, 119, 6, 0.18)',
    tagBg: '#0f172a',
    tagText: '#f8fafc',
    shadowColor: 'rgba(217, 119, 6, 0.25)'
  },
  ICE: {
    id: 'ICE',
    worldName: 'Crystal Glacier',
    worldIcon: '❄️',
    worldGradient: 'linear-gradient(165deg, #e0f2fe 0%, #bae6fd 50%, #38bdf8 100%)',
    stageBg: 'rgba(255, 255, 255, 0.94)',
    stageBorder: 'rgba(255, 255, 255, 0.85)',
    primaryArrow: '#0284c7',
    secondaryArrow: '#38bdf8',
    highlightSpine: 'rgba(255, 255, 255, 0.8)',
    glowColor: '#38bdf8',
    dotColor: 'rgba(2, 132, 199, 0.18)',
    tagBg: '#0f172a',
    tagText: '#f8fafc',
    shadowColor: 'rgba(2, 132, 199, 0.25)'
  },
  NIGHT: {
    id: 'NIGHT',
    worldName: 'Platinum Heights',
    worldIcon: '✨',
    worldGradient: 'linear-gradient(165deg, #f1f5f9 0%, #cbd5e1 50%, #94a3b8 100%)',
    stageBg: 'rgba(255, 255, 255, 0.95)',
    stageBorder: 'rgba(255, 255, 255, 0.9)',
    primaryArrow: '#334155',
    secondaryArrow: '#64748b',
    highlightSpine: 'rgba(255, 255, 255, 0.75)',
    glowColor: '#64748b',
    dotColor: 'rgba(51, 65, 85, 0.16)',
    tagBg: '#0f172a',
    tagText: '#f8fafc',
    shadowColor: 'rgba(51, 65, 85, 0.25)'
  },
  DESERT: {
    id: 'DESERT',
    worldName: 'Coral Oasis',
    worldIcon: '🏜️',
    worldGradient: 'linear-gradient(165deg, #ffedd5 0%, #fed7aa 50%, #fb923c 100%)',
    stageBg: 'rgba(255, 255, 255, 0.94)',
    stageBorder: 'rgba(255, 255, 255, 0.85)',
    primaryArrow: '#c2410c',
    secondaryArrow: '#ea580c',
    highlightSpine: 'rgba(255, 255, 255, 0.75)',
    glowColor: '#ea580c',
    dotColor: 'rgba(194, 65, 12, 0.18)',
    tagBg: '#0f172a',
    tagText: '#f8fafc',
    shadowColor: 'rgba(194, 65, 12, 0.25)'
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
