/**
 * TAL81.jsx - Handcrafted Time Arrow Level 81
 * Difficulty: Expert
 * Grid Size: 7x7 | Moves: 39 | Time Limit: 70s
 */

const TAL81 = {
  "id": 81,
  "name": "Level 81",
  "difficulty": "Expert",
  "gridSize": 7,
  "timeLimit": 70,
  "moves": 39,
  "board": [
    {
      "id": "t1",
      "row": 4,
      "col": 3,
      "direction": "RIGHT",
      "color": "#48DBFB"
    },
    {
      "id": "t2",
      "row": 5,
      "col": 1,
      "direction": "RIGHT",
      "color": "#9B59B6"
    },
    {
      "id": "t3",
      "row": 6,
      "col": 1,
      "direction": "LEFT",
      "color": "#1DD1A1"
    },
    {
      "id": "t4",
      "row": 3,
      "col": 1,
      "direction": "UP",
      "color": "#FF5E7E"
    },
    {
      "id": "t5",
      "row": 3,
      "col": 6,
      "direction": "UP",
      "color": "#00D2D3"
    },
    {
      "id": "t6",
      "row": 6,
      "col": 0,
      "direction": "UP",
      "color": "#FECA57"
    },
    {
      "id": "t7",
      "row": 3,
      "col": 0,
      "direction": "UP",
      "color": "#5F27CD"
    },
    {
      "id": "t8",
      "row": 5,
      "col": 5,
      "direction": "UP",
      "color": "#FF9F43"
    },
    {
      "id": "t9",
      "row": 1,
      "col": 3,
      "direction": "RIGHT",
      "color": "#10AC84"
    },
    {
      "id": "t10",
      "row": 4,
      "col": 2,
      "direction": "DOWN",
      "color": "#54A0FF"
    },
    {
      "id": "t11",
      "row": 5,
      "col": 2,
      "direction": "DOWN",
      "color": "#EE5253"
    },
    {
      "id": "t12",
      "row": 1,
      "col": 5,
      "direction": "UP",
      "color": "#A3E635"
    },
    {
      "id": "t13",
      "row": 4,
      "col": 0,
      "direction": "LEFT",
      "color": "#48DBFB"
    },
    {
      "id": "t14",
      "row": 6,
      "col": 3,
      "direction": "DOWN",
      "color": "#9B59B6"
    },
    {
      "id": "t15",
      "row": 0,
      "col": 2,
      "direction": "RIGHT",
      "color": "#1DD1A1"
    },
    {
      "id": "t16",
      "row": 3,
      "col": 4,
      "direction": "UP",
      "color": "#FF5E7E"
    },
    {
      "id": "t17",
      "row": 1,
      "col": 2,
      "direction": "LEFT",
      "color": "#00D2D3"
    },
    {
      "id": "t18",
      "row": 5,
      "col": 0,
      "direction": "LEFT",
      "color": "#FECA57"
    },
    {
      "id": "t19",
      "row": 0,
      "col": 6,
      "direction": "UP",
      "color": "#5F27CD"
    },
    {
      "id": "t20",
      "row": 2,
      "col": 1,
      "direction": "RIGHT",
      "color": "#FF9F43"
    },
    {
      "id": "t21",
      "row": 1,
      "col": 6,
      "direction": "RIGHT",
      "color": "#10AC84"
    },
    {
      "id": "t22",
      "row": 5,
      "col": 6,
      "direction": "DOWN",
      "color": "#54A0FF"
    },
    {
      "id": "t23",
      "row": 0,
      "col": 0,
      "direction": "LEFT",
      "color": "#EE5253"
    },
    {
      "id": "t24",
      "row": 2,
      "col": 6,
      "direction": "RIGHT",
      "color": "#A3E635"
    },
    {
      "id": "t25",
      "row": 1,
      "col": 1,
      "direction": "UP",
      "color": "#48DBFB"
    },
    {
      "id": "t26",
      "row": 2,
      "col": 4,
      "direction": "UP",
      "color": "#9B59B6"
    },
    {
      "id": "t27",
      "row": 4,
      "col": 4,
      "direction": "DOWN",
      "color": "#1DD1A1"
    },
    {
      "id": "t28",
      "row": 6,
      "col": 4,
      "direction": "DOWN",
      "color": "#FF5E7E"
    },
    {
      "id": "t29",
      "row": 0,
      "col": 4,
      "direction": "UP",
      "color": "#00D2D3"
    },
    {
      "id": "t30",
      "row": 0,
      "col": 5,
      "direction": "UP",
      "color": "#FECA57"
    },
    {
      "id": "t31",
      "row": 6,
      "col": 6,
      "direction": "RIGHT",
      "color": "#5F27CD"
    },
    {
      "id": "t32",
      "row": 4,
      "col": 5,
      "direction": "RIGHT",
      "color": "#FF9F43"
    },
    {
      "id": "t33",
      "row": 4,
      "col": 6,
      "direction": "RIGHT",
      "color": "#10AC84"
    },
    {
      "id": "t34",
      "row": 2,
      "col": 0,
      "direction": "LEFT",
      "color": "#54A0FF"
    },
    {
      "id": "t35",
      "row": 0,
      "col": 1,
      "direction": "UP",
      "color": "#EE5253"
    },
    {
      "id": "t36",
      "row": 0,
      "col": 3,
      "direction": "UP",
      "color": "#A3E635"
    },
    {
      "id": "t37",
      "row": 6,
      "col": 5,
      "direction": "DOWN",
      "color": "#48DBFB"
    },
    {
      "id": "t38",
      "row": 6,
      "col": 2,
      "direction": "DOWN",
      "color": "#9B59B6"
    },
    {
      "id": "t39",
      "row": 1,
      "col": 0,
      "direction": "LEFT",
      "color": "#1DD1A1"
    }
  ],
  "solution": [
    "t13",
    "t14",
    "t18",
    "t19",
    "t21",
    "t23",
    "t24",
    "t5",
    "t28",
    "t27",
    "t29",
    "t26",
    "t16",
    "t20",
    "t30",
    "t12",
    "t9",
    "t31",
    "t22",
    "t33",
    "t32",
    "t1",
    "t8",
    "t34",
    "t35",
    "t25",
    "t4",
    "t36",
    "t15",
    "t37",
    "t38",
    "t11",
    "t2",
    "t10",
    "t39",
    "t7",
    "t6",
    "t3",
    "t17"
  ]
};

export default TAL81;
