export default {
  "id": 6,
  "name": "Level 6",
  "difficulty": "Easy",
  "moves": 3,
  "gridSize": 4,
  "occupancy": "69%",
  "board": [
    {
      "id": "a1",
      "direction": "UP",
      "color": "#0f172a",
      "vertices": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 1,
          "c": 1
        }
      ],
      "pieces": [
        {
          "r": 3,
          "c": 1,
          "type": "DEAD_END",
          "rotation": 270
        },
        {
          "r": 2,
          "c": 1,
          "type": "CORNER",
          "rotation": 270
        },
        {
          "r": 2,
          "c": 0,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 1,
          "c": 0,
          "type": "CORNER",
          "rotation": 180
        },
        {
          "r": 1,
          "c": 1,
          "type": "ARROW_HEAD",
          "rotation": 270,
          "short": false
        }
      ]
    },
    {
      "id": "a2",
      "direction": "RIGHT",
      "color": "#0f172a",
      "vertices": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 0,
          "c": 2
        }
      ],
      "pieces": [
        {
          "r": 0,
          "c": 3,
          "type": "DEAD_END",
          "rotation": 90
        },
        {
          "r": 1,
          "c": 3,
          "type": "CORNER",
          "rotation": 0
        },
        {
          "r": 1,
          "c": 2,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 0,
          "c": 2,
          "type": "ARROW_HEAD",
          "rotation": 0,
          "short": false
        }
      ]
    },
    {
      "id": "a3",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 2,
          "c": 3
        }
      ],
      "pieces": [
        {
          "r": 2,
          "c": 2,
          "type": "DEAD_END",
          "rotation": 0
        },
        {
          "r": 2,
          "c": 3,
          "type": "ARROW_HEAD",
          "rotation": 90,
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
