export default {
  "id": 19,
  "name": "Level 19",
  "difficulty": "Easy",
  "moves": 4,
  "gridSize": 5,
  "occupancy": "72%",
  "board": [
    {
      "id": "a1",
      "direction": "LEFT",
      "color": "#064e3b",
      "vertices": [
        {
          "r": 1,
          "c": 0
        },
        {
          "r": 0,
          "c": 0
        },
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 1,
          "c": 1
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
          "type": "CORNER",
          "rotation": 180
        },
        {
          "r": 0,
          "c": 1,
          "type": "CORNER",
          "rotation": 270
        },
        {
          "r": 1,
          "c": 1,
          "type": "ARROW_HEAD",
          "rotation": 180,
          "short": false
        }
      ]
    },
    {
      "id": "a2",
      "direction": "UP",
      "color": "#064e3b",
      "vertices": [
        {
          "r": 3,
          "c": 4
        },
        {
          "r": 2,
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
          "r": 1,
          "c": 2
        }
      ],
      "pieces": [
        {
          "r": 3,
          "c": 4,
          "type": "DEAD_END",
          "rotation": 270
        },
        {
          "r": 2,
          "c": 4,
          "type": "STRAIGHT",
          "rotation": 90
        },
        {
          "r": 1,
          "c": 4,
          "type": "CORNER",
          "rotation": 270
        },
        {
          "r": 1,
          "c": 3,
          "type": "STRAIGHT",
          "rotation": 0
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
      "id": "a3",
      "direction": "LEFT",
      "color": "#064e3b",
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
          "r": 2,
          "c": 3
        },
        {
          "r": 2,
          "c": 2
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
          "rotation": 0
        },
        {
          "r": 2,
          "c": 3,
          "type": "CORNER",
          "rotation": 270
        },
        {
          "r": 2,
          "c": 2,
          "type": "ARROW_HEAD",
          "rotation": 180,
          "short": false
        }
      ]
    },
    {
      "id": "a4",
      "direction": "DOWN",
      "color": "#064e3b",
      "vertices": [
        {
          "r": 4,
          "c": 2
        },
        {
          "r": 4,
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        },
        {
          "r": 3,
          "c": 1
        }
      ],
      "pieces": [
        {
          "r": 4,
          "c": 2,
          "type": "DEAD_END",
          "rotation": 180
        },
        {
          "r": 4,
          "c": 1,
          "type": "STRAIGHT",
          "rotation": 0
        },
        {
          "r": 4,
          "c": 0,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 3,
          "c": 0,
          "type": "CORNER",
          "rotation": 180
        },
        {
          "r": 3,
          "c": 1,
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
