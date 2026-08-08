export default {
  "id": 5,
  "name": "Level 5",
  "difficulty": "Easy",
  "moves": 15,
  "gridSize": 10,
  "size": {
    "rows": 10,
    "cols": 10
  },
  "occupancy": "85%",
  "board": [
    {
      "id": "a1",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 0, "c": 0 }, { "r": 0, "c": 1 }, { "r": 0, "c": 2 }, { "r": 0, "c": 3 }, { "r": 0, "c": 4 }, { "r": 0, "c": 5 },
        { "r": 1, "c": 5 }, { "r": 1, "c": 4 }, { "r": 1, "c": 3 }, { "r": 1, "c": 2 },
        { "r": 2, "c": 2 }, { "r": 2, "c": 1 }, { "r": 2, "c": 0 },
        { "r": 3, "c": 0 }, { "r": 4, "c": 0 }
      ],
      "pieces": [
        { "r": 0, "c": 0, "type": "DEAD_END", "rotation": 180 },
        { "r": 0, "c": 1, "type": "STRAIGHT", "rotation": 0 },
        { "r": 0, "c": 2, "type": "STRAIGHT", "rotation": 0 },
        { "r": 0, "c": 3, "type": "STRAIGHT", "rotation": 0 },
        { "r": 0, "c": 4, "type": "STRAIGHT", "rotation": 0 },
        { "r": 0, "c": 5, "type": "CORNER", "rotation": 180 },
        { "r": 1, "c": 5, "type": "CORNER", "rotation": 0 },
        { "r": 1, "c": 4, "type": "STRAIGHT", "rotation": 0 },
        { "r": 1, "c": 3, "type": "STRAIGHT", "rotation": 0 },
        { "r": 1, "c": 2, "type": "CORNER", "rotation": 90 },
        { "r": 2, "c": 2, "type": "CORNER", "rotation": 270 },
        { "r": 2, "c": 1, "type": "STRAIGHT", "rotation": 0 },
        { "r": 2, "c": 0, "type": "CORNER", "rotation": 90 },
        { "r": 3, "c": 0, "type": "STRAIGHT", "rotation": 90 },
        { "r": 4, "c": 0, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    },
    {
      "id": "a2",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 0, "c": 8 }, { "r": 0, "c": 9 }, { "r": 1, "c": 9 }, { "r": 2, "c": 9 }
      ],
      "pieces": [
        { "r": 0, "c": 8, "type": "DEAD_END", "rotation": 180 },
        { "r": 0, "c": 9, "type": "CORNER", "rotation": 180 },
        { "r": 1, "c": 9, "type": "STRAIGHT", "rotation": 90 },
        { "r": 2, "c": 9, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    },
    {
      "id": "a3",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 0, "c": 6 }, { "r": 0, "c": 7 }, { "r": 1, "c": 7 }, { "r": 2, "c": 7 }
      ],
      "pieces": [
        { "r": 0, "c": 6, "type": "DEAD_END", "rotation": 180 },
        { "r": 0, "c": 7, "type": "CORNER", "rotation": 180 },
        { "r": 1, "c": 7, "type": "STRAIGHT", "rotation": 90 },
        { "r": 2, "c": 7, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    },
    {
      "id": "a4",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        { "r": 3, "c": 1 }, { "r": 3, "c": 2 }, { "r": 4, "c": 2 }
      ],
      "pieces": [
        { "r": 3, "c": 1, "type": "DEAD_END", "rotation": 180 },
        { "r": 3, "c": 2, "type": "CORNER", "rotation": 180 },
        { "r": 4, "c": 2, "type": "ARROW_HEAD", "rotation": 90, "short": false }
      ]
    },
    {
      "id": "a5",
      "direction": "LEFT",
      "color": "#0f172a",
      "vertices": [
        { "r": 2, "c": 6 }, { "r": 2, "c": 5 }, { "r": 2, "c": 4 }, { "r": 2, "c": 3 }
      ],
      "pieces": [
        { "r": 2, "c": 6, "type": "DEAD_END", "rotation": 0 },
        { "r": 2, "c": 5, "type": "STRAIGHT", "rotation": 0 },
        { "r": 2, "c": 4, "type": "STRAIGHT", "rotation": 0 },
        { "r": 2, "c": 3, "type": "ARROW_HEAD", "rotation": 180, "short": false }
      ]
    },
    {
      "id": "a6",
      "direction": "LEFT",
      "color": "#0f172a",
      "vertices": [
        { "r": 3, "c": 4 }, { "r": 4, "c": 4 }, { "r": 4, "c": 3 }
      ],
      "pieces": [
        { "r": 3, "c": 4, "type": "DEAD_END", "rotation": 90 },
        { "r": 4, "c": 4, "type": "CORNER", "rotation": 270 },
        { "r": 4, "c": 3, "type": "ARROW_HEAD", "rotation": 180, "short": false }
      ]
    },
    {
      "id": "a7",
      "direction": "LEFT",
      "color": "#0f172a",
      "vertices": [
        { "r": 4, "c": 9 }, { "r": 3, "c": 9 }, { "r": 3, "c": 8 }, { "r": 4, "c": 8 },
        { "r": 4, "c": 7 }, { "r": 3, "c": 7 }, { "r": 3, "c": 6 }, { "r": 4, "c": 6 }, { "r": 4, "c": 5 }
      ],
      "pieces": [
        { "r": 4, "c": 9, "type": "DEAD_END", "rotation": 270 },
        { "r": 3, "c": 9, "type": "CORNER", "rotation": 270 },
        { "r": 3, "c": 8, "type": "CORNER", "rotation": 90 },
        { "r": 4, "c": 8, "type": "CORNER", "rotation": 0 },
        { "r": 4, "c": 7, "type": "CORNER", "rotation": 180 },
        { "r": 3, "c": 7, "type": "CORNER", "rotation": 270 },
        { "r": 3, "c": 6, "type": "CORNER", "rotation": 90 },
        { "r": 4, "c": 6, "type": "CORNER", "rotation": 0 },
        { "r": 4, "c": 5, "type": "ARROW_HEAD", "rotation": 180, "short": false }
      ]
    },
    {
      "id": "a8",
      "direction": "RIGHT",
      "color": "#0f172a",
      "vertices": [
        { "r": 5, "c": 2 }, { "r": 5, "c": 3 }, { "r": 5, "c": 4 }, { "r": 5, "c": 5 }, { "r": 5, "c": 6 }, { "r": 5, "c": 7 }
      ],
      "pieces": [
        { "r": 5, "c": 2, "type": "DEAD_END", "rotation": 180 },
        { "r": 5, "c": 3, "type": "STRAIGHT", "rotation": 0 },
        { "r": 5, "c": 4, "type": "STRAIGHT", "rotation": 0 },
        { "r": 5, "c": 5, "type": "STRAIGHT", "rotation": 0 },
        { "r": 5, "c": 6, "type": "STRAIGHT", "rotation": 0 },
        { "r": 5, "c": 7, "type": "ARROW_HEAD", "rotation": 0, "short": false }
      ]
    },
    {
      "id": "a9",
      "direction": "UP",
      "color": "#0f172a",
      "vertices": [
        { "r": 7, "c": 0 }, { "r": 6, "c": 0 }, { "r": 5, "c": 0 }
      ],
      "pieces": [
        { "r": 7, "c": 0, "type": "DEAD_END", "rotation": 270 },
        { "r": 6, "c": 0, "type": "STRAIGHT", "rotation": 90 },
        { "r": 5, "c": 0, "type": "ARROW_HEAD", "rotation": 270, "short": false }
      ]
    },
    {
      "id": "a10",
      "direction": "RIGHT",
      "color": "#0f172a",
      "vertices": [
        { "r": 5, "c": 1 }, { "r": 6, "c": 1 }, { "r": 7, "c": 1 }, { "r": 7, "c": 2 }
      ],
      "pieces": [
        { "r": 5, "c": 1, "type": "DEAD_END", "rotation": 90 },
        { "r": 6, "c": 1, "type": "STRAIGHT", "rotation": 90 },
        { "r": 7, "c": 1, "type": "CORNER", "rotation": 90 },
        { "r": 7, "c": 2, "type": "ARROW_HEAD", "rotation": 0, "short": false }
      ]
    },
    {
      "id": "a11",
      "direction": "LEFT",
      "color": "#0f172a",
      "vertices": [
        { "r": 6, "c": 4 }, { "r": 6, "c": 5 }, { "r": 6, "c": 6 }, { "r": 6, "c": 7 }, { "r": 6, "c": 8 },
        { "r": 7, "c": 8 }, { "r": 7, "c": 7 }, { "r": 7, "c": 6 }, { "r": 7, "c": 5 }
      ],
      "pieces": [
        { "r": 6, "c": 4, "type": "DEAD_END", "rotation": 180 },
        { "r": 6, "c": 5, "type": "STRAIGHT", "rotation": 0 },
        { "r": 6, "c": 6, "type": "STRAIGHT", "rotation": 0 },
        { "r": 6, "c": 7, "type": "STRAIGHT", "rotation": 0 },
        { "r": 6, "c": 8, "type": "CORNER", "rotation": 180 },
        { "r": 7, "c": 8, "type": "CORNER", "rotation": 0 },
        { "r": 7, "c": 7, "type": "STRAIGHT", "rotation": 0 },
        { "r": 7, "c": 6, "type": "STRAIGHT", "rotation": 0 },
        { "r": 7, "c": 5, "type": "ARROW_HEAD", "rotation": 180, "short": false }
      ]
    },
    {
      "id": "a12",
      "direction": "RIGHT",
      "color": "#0f172a",
      "vertices": [
        { "r": 6, "c": 3 }, { "r": 7, "c": 3 }, { "r": 7, "c": 4 }
      ],
      "pieces": [
        { "r": 6, "c": 3, "type": "DEAD_END", "rotation": 90 },
        { "r": 7, "c": 3, "type": "CORNER", "rotation": 90 },
        { "r": 7, "c": 4, "type": "ARROW_HEAD", "rotation": 0, "short": false }
      ]
    },
    {
      "id": "a13",
      "direction": "UP",
      "color": "#0f172a",
      "vertices": [
        { "r": 8, "c": 8 }, { "r": 8, "c": 9 }, { "r": 7, "c": 9 }
      ],
      "pieces": [
        { "r": 8, "c": 8, "type": "DEAD_END", "rotation": 180 },
        { "r": 8, "c": 9, "type": "CORNER", "rotation": 180 },
        { "r": 7, "c": 9, "type": "ARROW_HEAD", "rotation": 270, "short": false }
      ]
    },
    {
      "id": "a14",
      "direction": "RIGHT",
      "color": "#0f172a",
      "vertices": [
        { "r": 8, "c": 3 }, { "r": 8, "c": 4 }, { "r": 8, "c": 5 }, { "r": 8, "c": 6 }, { "r": 8, "c": 7 }
      ],
      "pieces": [
        { "r": 8, "c": 3, "type": "DEAD_END", "rotation": 180 },
        { "r": 8, "c": 4, "type": "STRAIGHT", "rotation": 0 },
        { "r": 8, "c": 5, "type": "STRAIGHT", "rotation": 0 },
        { "r": 8, "c": 6, "type": "STRAIGHT", "rotation": 0 },
        { "r": 8, "c": 7, "type": "ARROW_HEAD", "rotation": 0, "short": false }
      ]
    },
    {
      "id": "a15",
      "direction": "RIGHT",
      "color": "#0f172a",
      "vertices": [
        { "r": 9, "c": 0 }, { "r": 9, "c": 1 }, { "r": 9, "c": 2 }, { "r": 9, "c": 3 }, { "r": 9, "c": 4 },
        { "r": 9, "c": 5 }, { "r": 9, "c": 6 }, { "r": 9, "c": 7 }, { "r": 9, "c": 8 }, { "r": 9, "c": 9 }
      ],
      "pieces": [
        { "r": 9, "c": 0, "type": "DEAD_END", "rotation": 180 },
        { "r": 9, "c": 1, "type": "STRAIGHT", "rotation": 0 },
        { "r": 9, "c": 2, "type": "STRAIGHT", "rotation": 0 },
        { "r": 9, "c": 3, "type": "STRAIGHT", "rotation": 0 },
        { "r": 9, "c": 4, "type": "STRAIGHT", "rotation": 0 },
        { "r": 9, "c": 5, "type": "STRAIGHT", "rotation": 0 },
        { "r": 9, "c": 6, "type": "STRAIGHT", "rotation": 0 },
        { "r": 9, "c": 7, "type": "STRAIGHT", "rotation": 0 },
        { "r": 9, "c": 8, "type": "STRAIGHT", "rotation": 0 },
        { "r": 9, "c": 9, "type": "ARROW_HEAD", "rotation": 0, "short": false }
      ]
    }
  ],
  "solution": [
    "a15", "a14", "a13", "a12", "a11", "a10", "a9", "a8", "a7", "a6", "a5", "a4", "a3", "a2", "a1"
  ]
};
