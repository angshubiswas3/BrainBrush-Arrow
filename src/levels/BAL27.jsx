export default {
  "id": 27,
  "name": "Level 27",
  "difficulty": "Medium",
  "moves": 7,
  "gridSize": 5,
  "occupancy": "84%",
  "board": [
    {
      "id": "a1",
      "direction": "UP",
      "color": "#0c4a6e",
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
          "r": 2,
          "c": 3
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
          "type": "CORNER",
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
    },
    {
      "id": "a3",
      "direction": "DOWN",
      "color": "#0c4a6e",
      "vertices": [
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
          "r": 3,
          "c": 3,
          "type": "DEAD_END",
          "rotation": 90
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
      "id": "a4",
      "direction": "DOWN",
      "color": "#0c4a6e",
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
    },
    {
      "id": "a5",
      "direction": "UP",
      "color": "#0c4a6e",
      "vertices": [
        {
          "r": 0,
          "c": 3
        },
        {
          "r": 0,
          "c": 2
        },
        {
          "r": 1,
          "c": 2
        },
        {
          "r": 1,
          "c": 3
        }
      ],
      "pieces": [
        {
          "r": 0,
          "c": 3,
          "type": "DEAD_END",
          "rotation": 180
        },
        {
          "r": 0,
          "c": 2,
          "type": "CORNER",
          "rotation": 180
        },
        {
          "r": 1,
          "c": 2,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 1,
          "c": 3,
          "type": "ARROW_HEAD",
          "rotation": 270,
          "short": false
        }
      ]
    },
    {
      "id": "a6",
      "direction": "UP",
      "color": "#0c4a6e",
      "vertices": [
        {
          "r": 0,
          "c": 1
        },
        {
          "r": 0,
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
          "type": "ARROW_HEAD",
          "rotation": 270,
          "short": false
        }
      ]
    },
    {
      "id": "a7",
      "direction": "LEFT",
      "color": "#0c4a6e",
      "vertices": [
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
          "c": 1
        },
        {
          "r": 4,
          "c": 0
        },
        {
          "r": 3,
          "c": 0
        }
      ],
      "pieces": [
        {
          "r": 3,
          "c": 2,
          "type": "DEAD_END",
          "rotation": 90
        },
        {
          "r": 4,
          "c": 2,
          "type": "CORNER",
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
          "c": 0,
          "type": "CORNER",
          "rotation": 90
        },
        {
          "r": 3,
          "c": 0,
          "type": "ARROW_HEAD",
          "rotation": 180,
          "short": false
        }
      ]
    }
  ],
  "solution": [
    "a7",
    "a6",
    "a5",
    "a4",
    "a3",
    "a2",
    "a1"
  ]
};
