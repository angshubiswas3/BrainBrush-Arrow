/**
 * BAL1.jsx - Handcrafted Level 1
 * Theme: Spiral Valley 1
 * Difficulty: Easy
 * Layout: 3 straight arrows side-by-side (Left: DOWN, Middle: UP, Right: DOWN)
 */

const BAL1 = {
  "id": 1,
  "name": "Level 1",
  "difficulty": "Easy",
  "moveCount": 3,
  "moves": 3,
  "gridSize": 3,
  "size": {
    "rows": 3,
    "cols": 3
  },
  "theme": {
    "name": "Spiral Valley",
    "color": "#0f172a",
    "bg": "#f8fafc",
    "diff": "Easy"
  },
  "arrows": [
    {
      "id": "a1",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 0, "c": 0 },
        { "r": 1, "c": 0 },
        { "r": 2, "c": 0 }
      ],
      "pieces": [
        { "r": 0, "c": 0, "type": "DEAD_END", "rotation": 90 },
        { "r": 1, "c": 0, "type": "STRAIGHT", "rotation": 90 },
        { "r": 2, "c": 0, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    },
    {
      "id": "a2",
      "direction": "UP",
      "color": "#0f172a",
      "vertices": [
        { "r": 2, "c": 1 },
        { "r": 1, "c": 1 },
        { "r": 0, "c": 1 }
      ],
      "pieces": [
        { "r": 2, "c": 1, "type": "DEAD_END", "rotation": 270 },
        { "r": 1, "c": 1, "type": "STRAIGHT", "rotation": 90 },
        { "r": 0, "c": 1, "type": "ARROW_HEAD", "rotation": 270, "short": false }
      ]
    },
    {
      "id": "a3",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 0, "c": 2 },
        { "r": 1, "c": 2 },
        { "r": 2, "c": 2 }
      ],
      "pieces": [
        { "r": 0, "c": 2, "type": "DEAD_END", "rotation": 90 },
        { "r": 1, "c": 2, "type": "STRAIGHT", "rotation": 90 },
        { "r": 2, "c": 2, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    }
  ],
  "board": [
    {
      "id": "a1",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 0, "c": 0 },
        { "r": 1, "c": 0 },
        { "r": 2, "c": 0 }
      ],
      "pieces": [
        { "r": 0, "c": 0, "type": "DEAD_END", "rotation": 90 },
        { "r": 1, "c": 0, "type": "STRAIGHT", "rotation": 90 },
        { "r": 2, "c": 0, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    },
    {
      "id": "a2",
      "direction": "UP",
      "color": "#0f172a",
      "vertices": [
        { "r": 2, "c": 1 },
        { "r": 1, "c": 1 },
        { "r": 0, "c": 1 }
      ],
      "pieces": [
        { "r": 2, "c": 1, "type": "DEAD_END", "rotation": 270 },
        { "r": 1, "c": 1, "type": "STRAIGHT", "rotation": 90 },
        { "r": 0, "c": 1, "type": "ARROW_HEAD", "rotation": 270, "short": false }
      ]
    },
    {
      "id": "a3",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 0, "c": 2 },
        { "r": 1, "c": 2 },
        { "r": 2, "c": 2 }
      ],
      "pieces": [
        { "r": 0, "c": 2, "type": "DEAD_END", "rotation": 90 },
        { "r": 1, "c": 2, "type": "STRAIGHT", "rotation": 90 },
        { "r": 2, "c": 2, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    }
  ],
  "solution": [
    "a1",
    "a2",
    "a3"
  ]
};

export default BAL1;
