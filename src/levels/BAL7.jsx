export default {
  "id": 7,
  "name": "Level 7",
  "difficulty": "Easy",
  "moves": 3,
  "gridSize": 4,
  "occupancy": "75%",
  "board": [
    {
      "id": "a1",
      "direction": "LEFT",
      "color": "#0f172a",
      "vertices": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 1,
          "c": 0
        }
      ],
      "pieces": [
        {
          "r": 0,
          "c": 1,
          "type": "DEAD_END",
          "rotation": 180
        },
        {
          "r": 0,
          "c": 0,
          "type": "CORNER",
          "rotation": 180
        },
        {
          "r": 1,
          "c": 0,
          "type": "ARROW_HEAD",
          "rotation": 180,
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
          "c": 2
        },
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        }
      ],
      "pieces": [
        {
          "r": 3,
          "c": 2,
          "type": "DEAD_END",
          "rotation": 180
        },
        {
          "r": 3,
          "c": 1,
          "type": "STRAIGHT",
          "rotation": 0
        },
        {
          "r": 3,
          "c": 0,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 2,
          "c": 0,
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
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 2,
          "c": 1
        },
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
          "r": 1,
          "c": 2,
          "type": "DEAD_END",
          "rotation": 180
        },
        {
          "r": 1,
          "c": 1,
          "type": "CORNER",
          "rotation": 180
        },
        {
          "r": 2,
          "c": 1,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 2,
          "c": 2,
          "type": "STRAIGHT",
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
