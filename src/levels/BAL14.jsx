export default {
  "id": 14,
  "name": "Level 14",
  "difficulty": "Easy",
  "moves": 3,
  "gridSize": 4,
  "occupancy": "69%",
  "board": [
    {
      "id": "a1",
      "direction": "RIGHT",
      "color": "#064e3b",
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
          "c": 0
        },
        {
          "r": 1,
          "c": 0
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
          "rotation": 0
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
          "type": "ARROW_HEAD",
          "rotation": 0,
          "short": false
        }
      ]
    },
    {
      "id": "a2",
      "direction": "RIGHT",
      "color": "#064e3b",
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
          "type": "ARROW_HEAD",
          "rotation": 0,
          "short": false
        }
      ]
    },
    {
      "id": "a3",
      "direction": "LEFT",
      "color": "#064e3b",
      "vertices": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 3,
          "c": 2
        }
      ],
      "pieces": [
        {
          "r": 2,
          "c": 3,
          "type": "DEAD_END",
          "rotation": 90
        },
        {
          "r": 3,
          "c": 3,
          "type": "CORNER",
          "rotation": 0
        },
        {
          "r": 3,
          "c": 2,
          "type": "ARROW_HEAD",
          "rotation": 180,
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
