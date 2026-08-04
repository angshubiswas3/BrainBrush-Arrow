export default {
  "id": 32,
  "name": "Level 32",
  "difficulty": "Medium",
  "moves": 10,
  "gridSize": 5,
  "occupancy": "84%",
  "board": [
    {
      "id": "a1",
      "direction": "UP",
      "color": "#78350f",
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
      "direction": "RIGHT",
      "color": "#78350f",
      "vertices": [
        {
          "r": 1,
          "c": 1
        },
        {
          "r": 0,
          "c": 1
        }
      ],
      "pieces": [
        {
          "r": 1,
          "c": 1,
          "type": "DEAD_END",
          "rotation": 270
        },
        {
          "r": 0,
          "c": 1,
          "type": "ARROW_HEAD",
          "rotation": 0,
          "short": false
        }
      ]
    },
    {
      "id": "a3",
      "direction": "UP",
      "color": "#78350f",
      "vertices": [
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        }
      ],
      "pieces": [
        {
          "r": 1,
          "c": 3,
          "type": "DEAD_END",
          "rotation": 90
        },
        {
          "r": 2,
          "c": 3,
          "type": "CORNER",
          "rotation": 0
        },
        {
          "r": 2,
          "c": 2,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 1,
          "c": 2,
          "type": "ARROW_HEAD",
          "rotation": 270,
          "short": false
        }
      ]
    },
    {
      "id": "a4",
      "direction": "DOWN",
      "color": "#78350f",
      "vertices": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "pieces": [
        {
          "r": 2,
          "c": 1,
          "type": "ARROW_HEAD",
          "rotation": 90,
          "short": true
        }
      ]
    },
    {
      "id": "a5",
      "direction": "LEFT",
      "color": "#78350f",
      "vertices": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "pieces": [
        {
          "r": 0,
          "c": 0,
          "type": "ARROW_HEAD",
          "rotation": 180,
          "short": true
        }
      ]
    },
    {
      "id": "a6",
      "direction": "DOWN",
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
          "rotation": 90,
          "short": false
        }
      ]
    },
    {
      "id": "a7",
      "direction": "RIGHT",
      "color": "#78350f",
      "vertices": [
        {
          "r": 4,
          "c": 0
        }
      ],
      "pieces": [
        {
          "r": 4,
          "c": 0,
          "type": "ARROW_HEAD",
          "rotation": 0,
          "short": true
        }
      ]
    },
    {
      "id": "a8",
      "direction": "DOWN",
      "color": "#78350f",
      "vertices": [
        {
          "r": 3,
          "c": 1
        },
        {
          "r": 4,
          "c": 1
        }
      ],
      "pieces": [
        {
          "r": 3,
          "c": 1,
          "type": "DEAD_END",
          "rotation": 90
        },
        {
          "r": 4,
          "c": 1,
          "type": "ARROW_HEAD",
          "rotation": 90,
          "short": false
        }
      ]
    },
    {
      "id": "a9",
      "direction": "DOWN",
      "color": "#78350f",
      "vertices": [
        {
          "r": 1,
          "c": 4
        }
      ],
      "pieces": [
        {
          "r": 1,
          "c": 4,
          "type": "ARROW_HEAD",
          "rotation": 90,
          "short": true
        }
      ]
    },
    {
      "id": "a10",
      "direction": "DOWN",
      "color": "#78350f",
      "vertices": [
        {
          "r": 4,
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
        }
      ],
      "pieces": [
        {
          "r": 4,
          "c": 2,
          "type": "DEAD_END",
          "rotation": 270
        },
        {
          "r": 3,
          "c": 2,
          "type": "CORNER",
          "rotation": 180
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
          "rotation": 90,
          "short": false
        }
      ]
    }
  ],
  "solution": [
    "a10",
    "a9",
    "a8",
    "a7",
    "a6",
    "a5",
    "a4",
    "a3",
    "a2",
    "a1"
  ]
};
