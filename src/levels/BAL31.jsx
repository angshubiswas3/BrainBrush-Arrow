export default {
  "id": 31,
  "name": "Level 31",
  "difficulty": "Medium",
  "moves": 5,
  "gridSize": 5,
  "occupancy": "72%",
  "board": [
    {
      "id": "a1",
      "direction": "LEFT",
      "color": "#78350f",
      "vertices": [
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
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
          "r": 2,
          "c": 2,
          "type": "DEAD_END",
          "rotation": 270
        },
        {
          "r": 1,
          "c": 2,
          "type": "CORNER",
          "rotation": 270
        },
        {
          "r": 1,
          "c": 1,
          "type": "STRAIGHT",
          "rotation": 0
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
      "color": "#78350f",
      "vertices": [
        {
          "r": 2,
          "c": 1
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
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        }
      ],
      "pieces": [
        {
          "r": 2,
          "c": 1,
          "type": "DEAD_END",
          "rotation": 90
        },
        {
          "r": 3,
          "c": 1,
          "type": "CORNER",
          "rotation": 0
        },
        {
          "r": 3,
          "c": 0,
          "type": "CORNER",
          "rotation": 180
        },
        {
          "r": 4,
          "c": 0,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 4,
          "c": 1,
          "type": "ARROW_HEAD",
          "rotation": 0,
          "short": false
        }
      ]
    },
    {
      "id": "a3",
      "direction": "RIGHT",
      "color": "#78350f",
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
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 2
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
          "type": "STRAIGHT",
          "rotation": 90
        },
        {
          "r": 4,
          "c": 3,
          "type": "CORNER",
          "rotation": 0
        },
        {
          "r": 4,
          "c": 2,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 3,
          "c": 2,
          "type": "ARROW_HEAD",
          "rotation": 0,
          "short": false
        }
      ]
    },
    {
      "id": "a4",
      "direction": "UP",
      "color": "#78350f",
      "vertices": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 4
        }
      ],
      "pieces": [
        {
          "r": 0,
          "c": 3,
          "type": "DEAD_END",
          "rotation": 0
        },
        {
          "r": 0,
          "c": 4,
          "type": "ARROW_HEAD",
          "rotation": 270,
          "short": false
        }
      ]
    },
    {
      "id": "a5",
      "direction": "DOWN",
      "color": "#78350f",
      "vertices": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 1,
          "c": 4
        }
      ],
      "pieces": [
        {
          "r": 1,
          "c": 3,
          "type": "DEAD_END",
          "rotation": 0
        },
        {
          "r": 1,
          "c": 4,
          "type": "ARROW_HEAD",
          "rotation": 90,
          "short": false
        }
      ]
    }
  ],
  "solution": [
    "a5",
    "a4",
    "a3",
    "a2",
    "a1"
  ]
};
