export default {
  "id": 8,
  "name": "Level 8",
  "difficulty": "Easy",
  "moves": 3,
  "gridSize": 4,
  "occupancy": "63%",
  "board": [
    {
      "id": "a1",
      "direction": "UP",
      "color": "#0f172a",
      "vertices": [
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        }
      ],
      "pieces": [
        {
          "r": 3,
          "c": 0,
          "type": "DEAD_END",
          "rotation": 270
        },
        {
          "r": 2,
          "c": 0,
          "type": "STRAIGHT",
          "rotation": 90
        },
        {
          "r": 1,
          "c": 0,
          "type": "ARROW_HEAD",
          "rotation": 270,
          "short": false
        }
      ]
    },
    {
      "id": "a2",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        }
      ],
      "pieces": [
        {
          "r": 1,
          "c": 3,
          "type": "DEAD_END",
          "rotation": 180
        },
        {
          "r": 1,
          "c": 2,
          "type": "CORNER",
          "rotation": 180
        },
        {
          "r": 2,
          "c": 2,
          "type": "STRAIGHT",
          "rotation": 90
        },
        {
          "r": 3,
          "c": 2,
          "type": "CORNER",
          "rotation": 0
        },
        {
          "r": 3,
          "c": 1,
          "type": "ARROW_HEAD",
          "rotation": 90,
          "short": false
        }
      ]
    },
    {
      "id": "a3",
      "direction": "RIGHT",
      "color": "#0f172a",
      "vertices": [
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        }
      ],
      "pieces": [
        {
          "r": 3,
          "c": 3,
          "type": "DEAD_END",
          "rotation": 270
        },
        {
          "r": 2,
          "c": 3,
          "type": "ARROW_HEAD",
          "rotation": 0,
          "short": false
        }
      ]
    }
  ],
  "solution": [
    "a3",
    "a2",
    "a1"
  ]
};
