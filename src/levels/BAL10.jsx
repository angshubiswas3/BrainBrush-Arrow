export default {
  "id": 10,
  "name": "Level 10",
  "difficulty": "Easy",
  "moves": 4,
  "gridSize": 4,
  "occupancy": "69%",
  "board": [
    {
      "id": "a1",
      "direction": "UP",
      "color": "#0f172a",
      "vertices": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 1,
          "c": 0
        }
      ],
      "pieces": [
        {
          "r": 1,
          "c": 1,
          "type": "DEAD_END",
          "rotation": 180
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
      "direction": "RIGHT",
      "color": "#0f172a",
      "vertices": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 2,
          "c": 2
        }
      ],
      "pieces": [
        {
          "r": 3,
          "c": 1,
          "type": "DEAD_END",
          "rotation": 0
        },
        {
          "r": 3,
          "c": 2,
          "type": "CORNER",
          "rotation": 0
        },
        {
          "r": 2,
          "c": 2,
          "type": "ARROW_HEAD",
          "rotation": 0,
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
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        }
      ],
      "pieces": [
        {
          "r": 0,
          "c": 0,
          "type": "DEAD_END",
          "rotation": 0
        },
        {
          "r": 0,
          "c": 1,
          "type": "STRAIGHT",
          "rotation": 0
        },
        {
          "r": 0,
          "c": 2,
          "type": "CORNER",
          "rotation": 270
        },
        {
          "r": 1,
          "c": 2,
          "type": "ARROW_HEAD",
          "rotation": 0,
          "short": false
        }
      ]
    },
    {
      "id": "a4",
      "direction": "DOWN",
      "color": "#0f172a",
      "vertices": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        }
      ],
      "pieces": [
        {
          "r": 2,
          "c": 1,
          "type": "DEAD_END",
          "rotation": 180
        },
        {
          "r": 2,
          "c": 0,
          "type": "ARROW_HEAD",
          "rotation": 90,
          "short": false
        }
      ]
    }
  ],
  "solution": [
    "a4",
    "a3",
    "a2",
    "a1"
  ]
};
