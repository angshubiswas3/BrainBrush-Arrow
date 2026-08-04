/**
 * TAL3.jsx - Handcrafted Time Arrow Level 3
 * Difficulty: Easy
 * Grid Size: 3x3 | Moves: 4 | Time Limit: 25s
 */

const TAL3 = {
  "id": 3,
  "name": "Level 3",
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
      "color": "#5F27CD"
    },
    {
      "id": "t2",
      "row": 0,
      "col": 2,
      "direction": "DOWN",
      "color": "#FF9F43"
    },
    {
      "id": "t3",
      "row": 1,
      "col": 2,
      "direction": "RIGHT",
      "color": "#10AC84"
    },
    {
      "id": "t4",
      "row": 2,
      "col": 1,
      "direction": "RIGHT",
      "color": "#54A0FF"
    }
  ],
  "solution": [
    "t1",
    "t3",
    "t2",
    "t4"
  ]
};

export default TAL3;
