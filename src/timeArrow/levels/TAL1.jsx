/**
 * TAL1.jsx - Handcrafted Time Arrow Level 1
 * Difficulty: Easy
 * Grid Size: 3x3 | Moves: 4 | Time Limit: 25s
 */

const TAL1 = {
  "id": 1,
  "name": "Level 1",
  "difficulty": "Easy",
  "gridSize": 3,
  "timeLimit": 25,
  "moves": 4,
  "board": [
    {
      "id": "t1",
      "row": 0,
      "col": 0,
      "direction": "LEFT",
      "color": "#00D2D3"
    },
    {
      "id": "t2",
      "row": 1,
      "col": 1,
      "direction": "RIGHT",
      "color": "#FECA57"
    },
    {
      "id": "t3",
      "row": 2,
      "col": 2,
      "direction": "LEFT",
      "color": "#5F27CD"
    },
    {
      "id": "t4",
      "row": 1,
      "col": 2,
      "direction": "UP",
      "color": "#FF9F43"
    }
  ],
  "solution": [
    "t1",
    "t3",
    "t4",
    "t2"
  ]
};

export default TAL1;
