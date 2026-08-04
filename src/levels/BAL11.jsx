export default {
  "id": 11,
  "name": "Level 11",
  "difficulty": "Easy",
  "moves": 4,
  "gridSize": 4,
  "occupancy": "69%",
  "board": [
    {
      "id": "a1",
      "direction": "UP",
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
          "type": "STRAIGHT",
          "rotation": 0
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
      "direction": "LEFT",
      "color": "#064e3b",
      "vertices": [
        {
          "r": 2,
          "c": 3
        },
        {
          "r": 1,
          "c": 3
        },
        {
          "r": 0,
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
          "type": "STRAIGHT",
          "rotation": 90
        },
        {
          "r": 0,
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
          "c": 2,
          "type": "DEAD_END",
          "rotation": 180
        },
        {
          "r": 2,
          "c": 1,
          "type": "STRAIGHT",
          "rotation": 0
        },
        {
          "r": 2,
          "c": 0,
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
          "r": 3,
          "c": 3,
          "type": "DEAD_END",
          "rotation": 180
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
    "a4",
    "a3",
    "a2",
    "a1"
  ]
};
