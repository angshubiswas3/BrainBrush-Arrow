/**
 * TAL72.jsx - Handcrafted Time Arrow Level 72
 * Difficulty: Expert
 * Grid Size: 7x7 | Moves: 37 | Time Limit: 70s
 */

const TAL72 = {
  "id": 72,
  "name": "Level 72",
  "difficulty": "Expert",
  "gridSize": 7,
  "timeLimit": 70,
  "moves": 37,
  "board": [
    {
      "id": "t1",
      "row": 4,
      "col": 1,
      "direction": "UP",
      "color": "#FF5E7E"
    },
    {
      "id": "t2",
      "row": 1,
      "col": 5,
      "direction": "LEFT",
      "color": "#00D2D3"
    },
    {
      "id": "t3",
      "row": 1,
      "col": 0,
      "direction": "UP",
      "color": "#FECA57"
    },
    {
      "id": "t4",
      "row": 6,
      "col": 3,
      "direction": "UP",
      "color": "#5F27CD"
    },
    {
      "id": "t5",
      "row": 1,
      "col": 2,
      "direction": "UP",
      "color": "#FF9F43"
    },
    {
      "id": "t6",
      "row": 5,
      "col": 4,
      "direction": "LEFT",
      "color": "#10AC84"
    },
    {
      "id": "t7",
      "row": 5,
      "col": 0,
      "direction": "DOWN",
      "color": "#54A0FF"
    },
    {
      "id": "t8",
      "row": 4,
      "col": 5,
      "direction": "RIGHT",
      "color": "#EE5253"
    },
    {
      "id": "t9",
      "row": 5,
      "col": 1,
      "direction": "DOWN",
      "color": "#A3E635"
    },
    {
      "id": "t10",
      "row": 0,
      "col": 1,
      "direction": "LEFT",
      "color": "#48DBFB"
    },
    {
      "id": "t11",
      "row": 1,
      "col": 4,
      "direction": "UP",
      "color": "#9B59B6"
    },
    {
      "id": "t12",
      "row": 3,
      "col": 0,
      "direction": "RIGHT",
      "color": "#1DD1A1"
    },
    {
      "id": "t13",
      "row": 3,
      "col": 3,
      "direction": "UP",
      "color": "#FF5E7E"
    },
    {
      "id": "t14",
      "row": 0,
      "col": 5,
      "direction": "RIGHT",
      "color": "#00D2D3"
    },
    {
      "id": "t15",
      "row": 1,
      "col": 6,
      "direction": "UP",
      "color": "#FECA57"
    },
    {
      "id": "t16",
      "row": 2,
      "col": 6,
      "direction": "DOWN",
      "color": "#5F27CD"
    },
    {
      "id": "t17",
      "row": 2,
      "col": 4,
      "direction": "LEFT",
      "color": "#FF9F43"
    },
    {
      "id": "t18",
      "row": 2,
      "col": 2,
      "direction": "DOWN",
      "color": "#10AC84"
    },
    {
      "id": "t19",
      "row": 0,
      "col": 6,
      "direction": "RIGHT",
      "color": "#54A0FF"
    },
    {
      "id": "t20",
      "row": 3,
      "col": 5,
      "direction": "RIGHT",
      "color": "#EE5253"
    },
    {
      "id": "t21",
      "row": 6,
      "col": 5,
      "direction": "RIGHT",
      "color": "#A3E635"
    },
    {
      "id": "t22",
      "row": 1,
      "col": 3,
      "direction": "UP",
      "color": "#48DBFB"
    },
    {
      "id": "t23",
      "row": 6,
      "col": 0,
      "direction": "DOWN",
      "color": "#9B59B6"
    },
    {
      "id": "t24",
      "row": 6,
      "col": 1,
      "direction": "DOWN",
      "color": "#1DD1A1"
    },
    {
      "id": "t25",
      "row": 2,
      "col": 0,
      "direction": "LEFT",
      "color": "#FF5E7E"
    },
    {
      "id": "t26",
      "row": 6,
      "col": 4,
      "direction": "DOWN",
      "color": "#00D2D3"
    },
    {
      "id": "t27",
      "row": 6,
      "col": 6,
      "direction": "DOWN",
      "color": "#FECA57"
    },
    {
      "id": "t28",
      "row": 5,
      "col": 6,
      "direction": "RIGHT",
      "color": "#5F27CD"
    },
    {
      "id": "t29",
      "row": 0,
      "col": 3,
      "direction": "UP",
      "color": "#FF9F43"
    },
    {
      "id": "t30",
      "row": 3,
      "col": 6,
      "direction": "RIGHT",
      "color": "#10AC84"
    },
    {
      "id": "t31",
      "row": 4,
      "col": 6,
      "direction": "RIGHT",
      "color": "#54A0FF"
    },
    {
      "id": "t32",
      "row": 4,
      "col": 2,
      "direction": "DOWN",
      "color": "#EE5253"
    },
    {
      "id": "t33",
      "row": 6,
      "col": 2,
      "direction": "DOWN",
      "color": "#A3E635"
    },
    {
      "id": "t34",
      "row": 4,
      "col": 0,
      "direction": "LEFT",
      "color": "#48DBFB"
    },
    {
      "id": "t35",
      "row": 0,
      "col": 4,
      "direction": "UP",
      "color": "#9B59B6"
    },
    {
      "id": "t36",
      "row": 0,
      "col": 2,
      "direction": "UP",
      "color": "#1DD1A1"
    },
    {
      "id": "t37",
      "row": 0,
      "col": 0,
      "direction": "LEFT",
      "color": "#FF5E7E"
    }
  ],
  "solution": [
    "t19",
    "t14",
    "t15",
    "t23",
    "t7",
    "t24",
    "t9",
    "t6",
    "t25",
    "t26",
    "t27",
    "t21",
    "t28",
    "t29",
    "t22",
    "t13",
    "t4",
    "t30",
    "t20",
    "t12",
    "t31",
    "t8",
    "t16",
    "t33",
    "t32",
    "t18",
    "t17",
    "t34",
    "t35",
    "t11",
    "t36",
    "t5",
    "t37",
    "t3",
    "t2",
    "t10",
    "t1"
  ]
};

export default TAL72;
