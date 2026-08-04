/**
 * TAL5.jsx - Handcrafted Time Arrow Level 5
 * Difficulty: Easy
 * Grid Size: 3x3 | Moves: 4 | Time Limit: 25s
 */

const TAL5 = {
  "id": 5,
  "name": "Level 5",
  "difficulty": "Easy",
  "gridSize": 3,
  "timeLimit": 25,
  "moves": 4,
  "board": [
    {
      "id": "t1",
      "row": 0,
      "col": 1,
      "direction": "RIGHT",
      "color": "#10AC84"
    },
    {
      "id": "t2",
      "row": 2,
      "col": 1,
      "direction": "DOWN",
      "color": "#54A0FF"
    },
    {
      "id": "t3",
      "row": 2,
      "col": 2,
      "direction": "DOWN",
      "color": "#EE5253"
    },
    {
      "id": "t4",
      "row": 0,
      "col": 2,
      "direction": "RIGHT",
      "color": "#A3E635"
    }
  ],
  "solution": [
    "t2",
    "t3",
    "t4",
    "t1"
  ]
};

export default TAL5;
