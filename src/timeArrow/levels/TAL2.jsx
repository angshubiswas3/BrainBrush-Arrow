/**
 * TAL2.jsx - Handcrafted Time Arrow Level 2
 * Difficulty: Easy
 * Grid Size: 3x3 | Moves: 4 | Time Limit: 25s
 */

const TAL2 = {
  "id": 2,
  "name": "Level 2",
  "difficulty": "Easy",
  "gridSize": 3,
  "timeLimit": 25,
  "moves": 4,
  "board": [
    {
      "id": "t1",
      "row": 0,
      "col": 0,
      "direction": "UP",
      "color": "#FECA57"
    },
    {
      "id": "t2",
      "row": 1,
      "col": 2,
      "direction": "LEFT",
      "color": "#5F27CD"
    },
    {
      "id": "t3",
      "row": 1,
      "col": 1,
      "direction": "UP",
      "color": "#FF9F43"
    },
    {
      "id": "t4",
      "row": 2,
      "col": 0,
      "direction": "LEFT",
      "color": "#10AC84"
    }
  ],
  "solution": [
    "t1",
    "t3",
    "t2",
    "t4"
  ]
};

export default TAL2;
