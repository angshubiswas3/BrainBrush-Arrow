/**
 * TAL12.jsx - Handcrafted Time Arrow Level 12
 * Difficulty: Easy
 * Grid Size: 4x4 | Moves: 10 | Time Limit: 35s
 */

const TAL12 = {
  "id": 12,
  "name": "Level 12",
  "difficulty": "Easy",
  "gridSize": 4,
  "timeLimit": 35,
  "moves": 10,
  "board": [
    {
      "id": "t1",
      "row": 0,
      "col": 2,
      "direction": "LEFT",
      "color": "#FF5E7E"
    },
    {
      "id": "t2",
      "row": 1,
      "col": 1,
      "direction": "UP",
      "color": "#00D2D3"
    },
    {
      "id": "t3",
      "row": 3,
      "col": 0,
      "direction": "UP",
      "color": "#FECA57"
    },
    {
      "id": "t4",
      "row": 3,
      "col": 3,
      "direction": "UP",
      "color": "#5F27CD"
    },
    {
      "id": "t5",
      "row": 2,
      "col": 0,
      "direction": "UP",
      "color": "#FF9F43"
    },
    {
      "id": "t6",
      "row": 3,
      "col": 1,
      "direction": "DOWN",
      "color": "#10AC84"
    },
    {
      "id": "t7",
      "row": 0,
      "col": 3,
      "direction": "RIGHT",
      "color": "#54A0FF"
    },
    {
      "id": "t8",
      "row": 1,
      "col": 2,
      "direction": "DOWN",
      "color": "#EE5253"
    },
    {
      "id": "t9",
      "row": 2,
      "col": 1,
      "direction": "RIGHT",
      "color": "#A3E635"
    },
    {
      "id": "t10",
      "row": 0,
      "col": 1,
      "direction": "LEFT",
      "color": "#48DBFB"
    }
  ],
  "solution": [
    "t5",
    "t3",
    "t6",
    "t7",
    "t4",
    "t8",
    "t9",
    "t10",
    "t1",
    "t2"
  ]
};

export default TAL12;
