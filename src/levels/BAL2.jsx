/**
 * BAL2.jsx - Handcrafted Level 2
 * Layout: Exact match to design
 * - Arrow 1 (a1): Left S-hook starting at (3,0), curving right to (1,1), then up to (0,1) pointing UP (↑)
 * - Arrow 2 (a2): Middle L-shape starting at (0,2), going down to (2,2), curving left to (2,1) pointing LEFT (←)
 * - Arrow 3 (a3): Right L-shape starting at (2,3), going down to (3,3), curving left to (3,1) pointing LEFT (←)
 */

const BAL2 = {
  "id": 2,
  "name": "Level 2",
  "difficulty": "Easy",
  "moveCount": 3,
  "moves": 3,
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
      "direction": "UP",
      "color": "#0f172a",
      "vertices": [
        { "r": 3, "c": 0 },
        { "r": 2, "c": 0 },
        { "r": 1, "c": 0 },
        { "r": 1, "c": 1 },
        { "r": 0, "c": 1 }
      ],
      "pieces": [
        { "r": 3, "c": 0, "type": "DEAD_END", "rotation": 270 },
        { "r": 2, "c": 0, "type": "STRAIGHT", "rotation": 90 },
        { "r": 1, "c": 0, "type": "CORNER", "rotation": 180 },
        { "r": 1, "c": 1, "type": "CORNER", "rotation": 0 },
        { "r": 0, "c": 1, "type": "ARROW_HEAD", "rotation": 270, "short": false }
      ]
    },
    {
      "id": "a2",
      "direction": "LEFT",
      "color": "#0f172a",
      "vertices": [
        { "r": 0, "c": 2 },
        { "r": 1, "c": 2 },
        { "r": 2, "c": 2 },
        { "r": 2, "c": 1 }
      ],
      "pieces": [
        { "r": 0, "c": 2, "type": "DEAD_END", "rotation": 90 },
        { "r": 1, "c": 2, "type": "STRAIGHT", "rotation": 90 },
        { "r": 2, "c": 2, "type": "CORNER", "rotation": 0 },
        { "r": 2, "c": 1, "type": "ARROW_HEAD", "rotation": 180, "short": false }
      ]
    },
    {
      "id": "a3",
      "direction": "LEFT",
      "color": "#0f172a",
      "vertices": [
        { "r": 2, "c": 3 },
        { "r": 3, "c": 3 },
        { "r": 3, "c": 2 },
        { "r": 3, "c": 1 }
      ],
      "pieces": [
        { "r": 2, "c": 3, "type": "DEAD_END", "rotation": 90 },
        { "r": 3, "c": 3, "type": "CORNER", "rotation": 0 },
        { "r": 3, "c": 2, "type": "STRAIGHT", "rotation": 0 },
        { "r": 3, "c": 1, "type": "ARROW_HEAD", "rotation": 180, "short": false }
      ]
    }
  ],
  "board": [
    {
      "id": "a1",
      "direction": "UP",
      "color": "#0f172a",
      "vertices": [
        { "r": 3, "c": 0 },
        { "r": 2, "c": 0 },
        { "r": 1, "c": 0 },
        { "r": 1, "c": 1 },
        { "r": 0, "c": 1 }
      ],
      "pieces": [
        { "r": 3, "c": 0, "type": "DEAD_END", "rotation": 270 },
        { "r": 2, "c": 0, "type": "STRAIGHT", "rotation": 90 },
        { "r": 1, "c": 0, "type": "CORNER", "rotation": 180 },
        { "r": 1, "c": 1, "type": "CORNER", "rotation": 0 },
        { "r": 0, "c": 1, "type": "ARROW_HEAD", "rotation": 270, "short": false }
      ]
    },
    {
      "id": "a2",
      "direction": "LEFT",
      "color": "#0f172a",
      "vertices": [
        { "r": 0, "c": 2 },
        { "r": 1, "c": 2 },
        { "r": 2, "c": 2 },
        { "r": 2, "c": 1 }
      ],
      "pieces": [
        { "r": 0, "c": 2, "type": "DEAD_END", "rotation": 90 },
        { "r": 1, "c": 2, "type": "STRAIGHT", "rotation": 90 },
        { "r": 2, "c": 2, "type": "CORNER", "rotation": 0 },
        { "r": 2, "c": 1, "type": "ARROW_HEAD", "rotation": 180, "short": false }
      ]
    },
    {
      "id": "a3",
      "direction": "LEFT",
      "color": "#0f172a",
      "vertices": [
        { "r": 2, "c": 3 },
        { "r": 3, "c": 3 },
        { "r": 3, "c": 2 },
        { "r": 3, "c": 1 }
      ],
      "pieces": [
        { "r": 2, "c": 3, "type": "DEAD_END", "rotation": 90 },
        { "r": 3, "c": 3, "type": "CORNER", "rotation": 0 },
        { "r": 3, "c": 2, "type": "STRAIGHT", "rotation": 0 },
        { "r": 3, "c": 1, "type": "ARROW_HEAD", "rotation": 180, "short": false }
      ]
    }
  ],
  "solution": [
    "a1",
    "a2",
    "a3"
  ]
};

export default BAL2;
