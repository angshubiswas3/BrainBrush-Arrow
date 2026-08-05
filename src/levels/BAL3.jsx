/**
 * BAL3.jsx - Handcrafted Level 3
 * Exact match to user design:
 * - Arrow 1 (a1): Top straight arrow at (0,3)->(0,1) pointing LEFT (←)
 * - Arrow 2 (a2): Left hook arrow at (1,1)->(1,0)->(3,0) pointing DOWN (↓)
 * - Arrow 3 (a3): Center-to-right U-cradle arrow at (2,3)->(3,3)->(3,1)->(2,1) pointing UP (↑)
 * - Arrow 4 (a4): Right hook arrow nestled inside U at (1,3)->(1,2)->(2,2) pointing DOWN (↓)
 */

const BAL3 = {
  "id": 3,
  "name": "Level 3",
  "difficulty": "Easy",
  "moveCount": 4,
  "moves": 4,
  "gridSize": 4,
  "size": {
    "rows": 4,
    "cols": 4
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
      "direction": "LEFT",
      "color": "#0f172a",
      "vertices": [
        { "r": 0, "c": 3 },
        { "r": 0, "c": 2 },
        { "r": 0, "c": 1 }
      ],
      "pieces": [
        { "r": 0, "c": 3, "type": "DEAD_END", "rotation": 180 },
        { "r": 0, "c": 2, "type": "STRAIGHT", "rotation": 0 },
        { "r": 0, "c": 1, "type": "ARROW_HEAD", "rotation": 180, "short": false }
      ]
    },
    {
      "id": "a2",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 1, "c": 1 },
        { "r": 1, "c": 0 },
        { "r": 2, "c": 0 },
        { "r": 3, "c": 0 }
      ],
      "pieces": [
        { "r": 1, "c": 1, "type": "DEAD_END", "rotation": 180 },
        { "r": 1, "c": 0, "type": "CORNER", "rotation": 180 },
        { "r": 2, "c": 0, "type": "STRAIGHT", "rotation": 90 },
        { "r": 3, "c": 0, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    },
    {
      "id": "a3",
      "direction": "UP",
      "color": "#0f172a",
      "vertices": [
        { "r": 2, "c": 3 },
        { "r": 3, "c": 3 },
        { "r": 3, "c": 2 },
        { "r": 3, "c": 1 },
        { "r": 2, "c": 1 }
      ],
      "pieces": [
        { "r": 2, "c": 3, "type": "DEAD_END", "rotation": 90 },
        { "r": 3, "c": 3, "type": "CORNER", "rotation": 0 },
        { "r": 3, "c": 2, "type": "STRAIGHT", "rotation": 0 },
        { "r": 3, "c": 1, "type": "CORNER", "rotation": 90 },
        { "r": 2, "c": 1, "type": "ARROW_HEAD", "rotation": 270, "short": false }
      ]
    },
    {
      "id": "a4",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 1, "c": 3 },
        { "r": 1, "c": 2 },
        { "r": 2, "c": 2 }
      ],
      "pieces": [
        { "r": 1, "c": 3, "type": "DEAD_END", "rotation": 180 },
        { "r": 1, "c": 2, "type": "CORNER", "rotation": 180 },
        { "r": 2, "c": 2, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    }
  ],
  "board": [
    {
      "id": "a1",
      "direction": "LEFT",
      "color": "#0f172a",
      "vertices": [
        { "r": 0, "c": 3 },
        { "r": 0, "c": 2 },
        { "r": 0, "c": 1 }
      ],
      "pieces": [
        { "r": 0, "c": 3, "type": "DEAD_END", "rotation": 180 },
        { "r": 0, "c": 2, "type": "STRAIGHT", "rotation": 0 },
        { "r": 0, "c": 1, "type": "ARROW_HEAD", "rotation": 180, "short": false }
      ]
    },
    {
      "id": "a2",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 1, "c": 1 },
        { "r": 1, "c": 0 },
        { "r": 2, "c": 0 },
        { "r": 3, "c": 0 }
      ],
      "pieces": [
        { "r": 1, "c": 1, "type": "DEAD_END", "rotation": 180 },
        { "r": 1, "c": 0, "type": "CORNER", "rotation": 180 },
        { "r": 2, "c": 0, "type": "STRAIGHT", "rotation": 90 },
        { "r": 3, "c": 0, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    },
    {
      "id": "a3",
      "direction": "UP",
      "color": "#0f172a",
      "vertices": [
        { "r": 2, "c": 3 },
        { "r": 3, "c": 3 },
        { "r": 3, "c": 2 },
        { "r": 3, "c": 1 },
        { "r": 2, "c": 1 }
      ],
      "pieces": [
        { "r": 2, "c": 3, "type": "DEAD_END", "rotation": 90 },
        { "r": 3, "c": 3, "type": "CORNER", "rotation": 0 },
        { "r": 3, "c": 2, "type": "STRAIGHT", "rotation": 0 },
        { "r": 3, "c": 1, "type": "CORNER", "rotation": 90 },
        { "r": 2, "c": 1, "type": "ARROW_HEAD", "rotation": 270, "short": false }
      ]
    },
    {
      "id": "a4",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 1, "c": 3 },
        { "r": 1, "c": 2 },
        { "r": 2, "c": 2 }
      ],
      "pieces": [
        { "r": 1, "c": 3, "type": "DEAD_END", "rotation": 180 },
        { "r": 1, "c": 2, "type": "CORNER", "rotation": 180 },
        { "r": 2, "c": 2, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    }
  ],
  "solution": [
    "a1",
    "a2",
    "a3",
    "a4"
  ]
};

export default BAL3;
