export default {
  "id": 22,
  "name": "Level 22",
  "difficulty": "Medium",
  "moves": 5,
  "gridSize": 5,
  "occupancy": "72%",
  "board": [
    {
      "id": "a1",
      "direction": "UP",
      "color": "#0c4a6e",
      "vertices": [
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 1
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
          "type": "ARROW_HEAD",
          "rotation": 270,
          "short": false
        }
      ]
    },
    {
      "id": "a2",
      "direction": "DOWN",
      "color": "#0c4a6e",
      "vertices": [
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 3,
          "c": 1
        }
      ],
      "pieces": [
        {
          "r": 1,
          "c": 0,
          "type": "DEAD_END",
          "rotation": 90
        },
        {
          "r": 2,
          "c": 0,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 2,
          "c": 1,
          "type": "CORNER",
          "rotation": 270
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
      "direction": "DOWN",
      "color": "#0c4a6e",
      "vertices": [
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 2
        }
      ],
      "pieces": [
        {
          "r": 4,
          "c": 0,
          "type": "DEAD_END",
          "rotation": 0
        },
        {
          "r": 4,
          "c": 1,
          "type": "STRAIGHT",
          "rotation": 0
        },
        {
          "r": 4,
          "c": 2,
          "type": "ARROW_HEAD",
          "rotation": 90,
          "short": false
        }
      ]
    },
    {
      "id": "a4",
      "direction": "DOWN",
      "color": "#0c4a6e",
      "vertices": [
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
          "c": 3
        },
        {
          "r": 4,
          "c": 3
        },
        {
          "r": 4,
          "c": 4
        }
      ],
      "pieces": [
        {
          "r": 2,
          "c": 2,
          "type": "DEAD_END",
          "rotation": 90
        },
        {
          "r": 3,
          "c": 2,
          "type": "CORNER",
          "rotation": 90
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
          "type": "CORNER",
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
    },
    {
      "id": "a5",
      "direction": "LEFT",
      "color": "#0c4a6e",
      "vertices": [
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        }
      ],
      "pieces": [
        {
          "r": 1,
          "c": 4,
          "type": "DEAD_END",
          "rotation": 180
        },
        {
          "r": 1,
          "c": 3,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 0,
          "c": 3,
          "type": "CORNER",
          "rotation": 270
        },
        {
          "r": 0,
          "c": 2,
          "type": "ARROW_HEAD",
          "rotation": 180,
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
