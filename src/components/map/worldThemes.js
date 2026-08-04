/**
 * Rich thematic World Biomes configuration for BrainBrush Arrow.
 * Inspired by Candy Crush Saga, Royal Match, Coin Master, and Dream Games.
 */

export const WORLD_BIOMES = [
  {
    id: 1,
    name: 'Emerald Forest',
    subtitle: 'Lush Woodland & Fairy Groves',
    icon: '🌲',
    start: 1,
    end: 25,
    bgGradient: 'linear-gradient(180deg, #1e3a29 0%, #14281c 50%, #0d1a12 100%)',
    ambientLight: 'rgba(52, 211, 153, 0.15)',
    particleType: 'LEAVES', // Leaves & Fireflies
    road: {
      outerCurb: '#1b4332',
      mainSurface: 'linear-gradient(180deg, #2d6a4f 0%, #1b4332 100%)',
      innerCore: '#74c69d',
      activeGlow: '#10b981',
      shadow: 'rgba(8, 28, 21, 0.5)'
    },
    decorations: [
      { type: 'PINE_TREE', icon: '🌲', scale: 1.2 },
      { type: 'OAK_TREE', icon: '🌳', scale: 1.1 },
      { type: 'MUSHROOM', icon: '🍄', scale: 0.9 },
      { type: 'FLOWER', icon: '🌸', scale: 0.8 },
      { type: 'SHRINE', icon: '⛩️', scale: 1.1 },
      { type: 'BUTTERFLY', icon: '🦋', scale: 0.8 }
    ]
  },
  {
    id: 2,
    name: 'Desert Oasis',
    subtitle: 'Golden Sands & Sunlit Ruins',
    icon: '🏜️',
    start: 26,
    end: 50,
    bgGradient: 'linear-gradient(180deg, #3d2614 0%, #29180c 50%, #1a0f07 100%)',
    ambientLight: 'rgba(251, 191, 36, 0.15)',
    particleType: 'SAND_DUST', // Golden Dust & Wind
    road: {
      outerCurb: '#78350f',
      mainSurface: 'linear-gradient(180deg, #b45309 0%, #92400e 100%)',
      innerCore: '#fde68a',
      activeGlow: '#f59e0b',
      shadow: 'rgba(69, 26, 3, 0.5)'
    },
    decorations: [
      { type: 'PALM_TREE', icon: '🌴', scale: 1.2 },
      { type: 'CACTUS', icon: '🌵', scale: 1.0 },
      { type: 'PYRAMID', icon: '🏛️', scale: 1.3 },
      { type: 'DESERT_ROCK', icon: '🪨', scale: 0.9 },
      { type: 'OASIS_WATER', icon: '💧', scale: 0.8 },
      { type: 'CAMEL', icon: '🐪', scale: 1.0 }
    ]
  },
  {
    id: 3,
    name: 'Crystal Peaks',
    subtitle: 'Glacial Caverns & Aurora Sky',
    icon: '❄️',
    start: 51,
    end: 75,
    bgGradient: 'linear-gradient(180deg, #0f2744 0%, #0a192c 50%, #050e18 100%)',
    ambientLight: 'rgba(56, 189, 248, 0.18)',
    particleType: 'SNOWFLAKES', // Falling Snow & Ice Shimmers
    road: {
      outerCurb: '#0369a1',
      mainSurface: 'linear-gradient(180deg, #0284c7 0%, #0369a1 100%)',
      innerCore: '#e0f2fe',
      activeGlow: '#38bdf8',
      shadow: 'rgba(8, 47, 73, 0.5)'
    },
    decorations: [
      { type: 'ICE_CRYSTAL', icon: '💎', scale: 1.1 },
      { type: 'SNOW_PINE', icon: '🌲', scale: 1.2 },
      { type: 'FROZEN_ROCK', icon: '🧊', scale: 0.9 },
      { type: 'IGLOO', icon: '🏔️', scale: 1.2 },
      { type: 'SNOWMAN', icon: '⛄', scale: 0.9 },
      { type: 'AURORA_ORB', icon: '✨', scale: 0.8 }
    ]
  },
  {
    id: 4,
    name: 'Molten Volcano',
    subtitle: 'Magma Rivers & Dragon Cavern',
    icon: '🌋',
    start: 76,
    end: 100,
    bgGradient: 'linear-gradient(180deg, #450a0a 0%, #2b0606 50%, #170303 100%)',
    ambientLight: 'rgba(239, 68, 68, 0.18)',
    particleType: 'LAVA_EMBERS', // Floating Embers & Smoke
    road: {
      outerCurb: '#881337',
      mainSurface: 'linear-gradient(180deg, #be123c 0%, #9f1239 100%)',
      innerCore: '#fecdd3',
      activeGlow: '#f43f5e',
      shadow: 'rgba(76, 5, 25, 0.5)'
    },
    decorations: [
      { type: 'VOLCANO_VENT', icon: '🌋', scale: 1.3 },
      { type: 'LAVA_CRYSTAL', icon: '🔮', scale: 1.0 },
      { type: 'DRAGON_STATUE', icon: '🐉', scale: 1.2 },
      { type: 'OBSIDIAN_ROCK', icon: '🪨', scale: 0.9 },
      { type: 'FIRE_PIT', icon: '🔥', scale: 0.8 }
    ]
  },
  {
    id: 5,
    name: 'Starlight Cosmos',
    subtitle: 'Nebula Astral Gateways',
    icon: '🌌',
    start: 101,
    end: 999,
    bgGradient: 'linear-gradient(180deg, #2e1065 0%, #1e0845 50%, #110526 100%)',
    ambientLight: 'rgba(168, 85, 247, 0.2)',
    particleType: 'COSMIC_STARS', // Twinkling Star clusters & Nebula Dust
    road: {
      outerCurb: '#581c87',
      mainSurface: 'linear-gradient(180deg, #7e22ce 0%, #6b21a8 100%)',
      innerCore: '#f3e8ff',
      activeGlow: '#a855f7',
      shadow: 'rgba(46, 16, 101, 0.5)'
    },
    decorations: [
      { type: 'PLANET', icon: '🪐', scale: 1.3 },
      { type: 'STAR_PORTAL', icon: '🛸', scale: 1.2 },
      { type: 'COSMIC_CRYSTAL', icon: '💎', scale: 1.0 },
      { type: 'CRESCENT_MOON', icon: '🌙', scale: 1.1 },
      { type: 'STARBURST', icon: '⭐', scale: 0.9 }
    ]
  }
];

export const getWorldForLevel = (levelNumber) => {
  return WORLD_BIOMES.find(w => levelNumber >= w.start && levelNumber <= w.end) || WORLD_BIOMES[0];
};
