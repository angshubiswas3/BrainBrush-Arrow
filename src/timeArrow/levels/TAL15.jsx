/**
 * TAL15.jsx - Handcrafted Time Arrow Level 15
 * Difficulty: Easy
 * Grid Size: 4x4 | Moves: 10 | Time Limit: 35s
 */

const TAL15 = {
  "id": 15,
  "name": "Level 15",
  "difficulty": "Easy",
  "gridSize": 4,
  "timeLimit": 35,
  "moves": 10,
  "board": [
    {
      "id": "t1",
      "row": 0,
      "col": 0,
      "direction": "RIGHT",
      "color": "#5F27CD"
    },
    {
      "id": "t2",
      "row": 1,
      "col": 0,
      "direction": "RIGHT",
      "color": "#FF9F43"
    },
    {
      "id": "t3",
      "row": 2,
      "col": 3,
      "direction": "UP",
      "color": "#10AC84"
    },
    {
      "id": "t4",
      "row": 2,
      "col": 1,
      "direction": "UP",
      "color": "#54A0FF"
    },
    {
      "id": "t5",
      "row": 3,
      "col": 1,
      "direction": "DOWN",
      "color": "#EE5253"
    },
    {
      "id": "t6",
      "row": 0,
      "col": 3,
      "direction": "UP",
      "color": "#A3E635"
    },
    {
      "id": "t7",
      "row": 2,
      "col": 0,
      "direction": "DOWN",
      "color": "#48DBFB"
    },
    {
      "id": "t8",
      "row": 0,
      "col": 2,
      "direction": "DOWN",
      "color": "#9B59B6"
    },
    {
      "id": "t9",
      "row": 1,
      "col": 2,
      "direction": "DOWN",
      "color": "#1DD1A1"
    },
    {
      "id": "t10",
      "row": 3,
      "col": 0,
      "direction": "DOWN",
      "color": "#FF5E7E"
    }
  ],
  "solution": [
    "t4",
    "t5",
    "t6",
    "t3",
    "t9",
    "t2",
    "t8",
    "t1",
    "t10",
    "t7"
  ]
};

export default TAL15;
