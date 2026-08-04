export default {
  "id": 20,
  "name": "Level 20",
  "difficulty": "Easy",
  "moves": 6,
  "gridSize": 5,
  "occupancy": "76%",
  "board": [
    {
      "id": "a1",
      "direction": "UP",
      "color": "#064e3b",
      "vertices": [
        {
          "r": 2,
          "c": 0
        },
        {
          "r": 2,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
        }
      ],
      "pieces": [
        {
          "r": 2,
          "c": 0,
          "type": "DEAD_END",
          "rotation": 0
        },
        {
          "r": 2,
          "c": 1,
          "type": "CORNER",
          "rotation": 0
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
      "direction": "LEFT",
      "color": "#064e3b",
      "vertices": [
        {
          "r": 0,
          "c": 4
        },
        {
          "r": 1,
          "c": 4
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 3,
          "c": 3
        }
      ],
      "pieces": [
        {
          "r": 0,
          "c": 4,
          "type": "DEAD_END",
          "rotation": 90
        },
        {
          "r": 1,
          "c": 4,
          "type": "CORNER",
          "rotation": 0
        },
        {
          "r": 1,
          "c": 3,
          "type": "CORNER",
          "rotation": 180
        },
        {
          "r": 2,
          "c": 3,
          "type": "STRAIGHT",
          "rotation": 90
        },
        {
          "r": 3,
          "c": 3,
          "type": "ARROW_HEAD",
          "rotation": 180,
          "short": false
        }
      ]
    },
    {
      "id": "a3",
      "direction": "DOWN",
      "color": "#064e3b",
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
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 3
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
          "type": "STRAIGHT",
          "rotation": 90
        },
        {
          "r": 4,
          "c": 2,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 4,
          "c": 3,
          "type": "ARROW_HEAD",
          "rotation": 90,
          "short": false
        }
      ]
    },
    {
      "id": "a4",
      "direction": "LEFT",
      "color": "#064e3b",
      "vertices": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "pieces": [
        {
          "r": 0,
          "c": 3,
          "type": "ARROW_HEAD",
          "rotation": 180,
          "short": true
        }
      ]
    },
    {
      "id": "a5",
      "direction": "UP",
      "color": "#064e3b",
      "vertices": [
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        }
      ],
      "pieces": [
        {
          "r": 1,
          "c": 0,
          "type": "DEAD_END",
          "rotation": 270
        },
        {
          "r": 0,
          "c": 0,
          "type": "ARROW_HEAD",
          "rotation": 270,
          "short": false
        }
      ]
    },
    {
      "id": "a6",
      "direction": "LEFT",
      "color": "#064e3b",
      "vertices": [
        {
          "r": 4,
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
        }
      ],
      "pieces": [
        {
          "r": 4,
          "c": 1,
          "type": "DEAD_END",
          "rotation": 270
        },
        {
          "r": 3,
          "c": 1,
          "type": "CORNER",
          "rotation": 270
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
          "type": "ARROW_HEAD",
          "rotation": 180,
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
