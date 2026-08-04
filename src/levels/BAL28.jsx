export default {
  "id": 28,
  "name": "Level 28",
  "difficulty": "Medium",
  "moves": 6,
  "gridSize": 5,
  "occupancy": "72%",
  "board": [
    {
      "id": "a1",
      "direction": "LEFT",
      "color": "#0c4a6e",
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
      "color": "#0c4a6e",
      "vertices": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        }
      ],
      "pieces": [
        {
          "r": 2,
          "c": 3,
          "type": "DEAD_END",
          "rotation": 270
        },
        {
          "r": 1,
          "c": 3,
          "type": "ARROW_HEAD",
          "rotation": 0,
          "short": false
        }
      ]
    },
    {
      "id": "a3",
      "direction": "LEFT",
      "color": "#0c4a6e",
      "vertices": [
        {
          "r": 3,
          "c": 2
        },
        {
          "r": 3,
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        }
      ],
      "pieces": [
        {
          "r": 3,
          "c": 2,
          "type": "DEAD_END",
          "rotation": 0
        },
        {
          "r": 3,
          "c": 3,
          "type": "CORNER",
          "rotation": 270
        },
        {
          "r": 4,
          "c": 3,
          "type": "ARROW_HEAD",
          "rotation": 180,
          "short": false
        }
      ]
    },
    {
      "id": "a4",
      "direction": "LEFT",
      "color": "#0c4a6e",
      "vertices": [
        {
          "r": 4,
          "c": 2
        }
      ],
      "pieces": [
        {
          "r": 4,
          "c": 2,
          "type": "ARROW_HEAD",
          "rotation": 180,
          "short": true
        }
      ]
    },
    {
      "id": "a5",
      "direction": "LEFT",
      "color": "#0c4a6e",
      "vertices": [
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 4,
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
          "type": "CORNER",
          "rotation": 180
        },
        {
          "r": 3,
          "c": 0,
          "type": "STRAIGHT",
          "rotation": 90
        },
        {
          "r": 4,
          "c": 0,
          "type": "ARROW_HEAD",
          "rotation": 180,
          "short": false
        }
      ]
    },
    {
      "id": "a6",
      "direction": "DOWN",
      "color": "#0c4a6e",
      "vertices": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 2,
          "c": 4
        },
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "pieces": [
        {
          "r": 1,
          "c": 4,
          "type": "DEAD_END",
          "rotation": 90
        },
        {
          "r": 2,
          "c": 4,
          "type": "STRAIGHT",
          "rotation": 90
        },
        {
          "r": 3,
          "c": 4,
          "type": "STRAIGHT",
          "rotation": 90
        },
        {
          "r": 4,
          "c": 4,
          "type": "ARROW_HEAD",
          "rotation": 90,
          "short": false
        }
      ]
    }
  ],
  "solution": [
    "a6",
    "a5",
    "a4",
    "a3",
    "a2",
    "a1"
  ]
};
