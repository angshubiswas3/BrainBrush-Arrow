/**
 * TAL4.jsx - Handcrafted Time Arrow Level 4
 * Difficulty: Easy
 * Grid Size: 3x3 | Moves: 4 | Time Limit: 25s
 */

const TAL4 = {
  "id": 4,
  "name": "Level 4",
  "difficulty": "Easy",
  "gridSize": 3,
  "timeLimit": 25,
  "moves": 4,
  "board": [
    {
      "id": "t1",
      "row": 0,
      "col": 1,
      "direction": "UP",
      "color": "#FF9F43"
    },
    {
      "id": "t2",
      "row": 2,
      "col": 0,
      "direction": "LEFT",
      "color": "#10AC84"
    },
    {
      "id": "t3",
      "row": 2,
      "col": 1,
      "direction": "DOWN",
      "color": "#54A0FF"
    },
    {
      "id": "t4",
      "row": 0,
      "col": 0,
      "direction": "UP",
      "color": "#EE5253"
    }
  ],
  "solution": [
    "t1",
    "t2",
    "t3",
    "t4"
  ]
};

export default TAL4;
