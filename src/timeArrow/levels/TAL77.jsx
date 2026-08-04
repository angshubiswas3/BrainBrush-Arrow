/**
 * TAL77.jsx - Handcrafted Time Arrow Level 77
 * Difficulty: Expert
 * Grid Size: 7x7 | Moves: 37 | Time Limit: 70s
 */

const TAL77 = {
  "id": 77,
  "name": "Level 77",
  "difficulty": "Expert",
  "gridSize": 7,
  "timeLimit": 70,
  "moves": 37,
  "board": [
    {
      "id": "t1",
      "row": 4,
      "col": 6,
      "direction": "RIGHT",
      "color": "#10AC84"
    },
    {
      "id": "t2",
      "row": 0,
      "col": 3,
      "direction": "RIGHT",
      "color": "#54A0FF"
    },
    {
      "id": "t3",
      "row": 5,
      "col": 3,
      "direction": "LEFT",
      "color": "#EE5253"
    },
    {
      "id": "t4",
      "row": 1,
      "col": 0,
      "direction": "UP",
      "color": "#A3E635"
    },
    {
      "id": "t5",
      "row": 2,
      "col": 0,
      "direction": "RIGHT",
      "color": "#48DBFB"
    },
    {
      "id": "t6",
      "row": 1,
      "col": 2,
      "direction": "RIGHT",
      "color": "#9B59B6"
    },
    {
      "id": "t7",
      "row": 0,
      "col": 0,
      "direction": "UP",
      "color": "#1DD1A1"
    },
    {
      "id": "t8",
      "row": 5,
      "col": 5,
      "direction": "UP",
      "color": "#FF5E7E"
    },
    {
      "id": "t9",
      "row": 1,
      "col": 6,
      "direction": "RIGHT",
      "color": "#00D2D3"
    },
    {
      "id": "t10",
      "row": 2,
      "col": 4,
      "direction": "RIGHT",
      "color": "#FECA57"
    },
    {
      "id": "t11",
      "row": 1,
      "col": 5,
      "direction": "UP",
      "color": "#5F27CD"
    },
    {
      "id": "t12",
      "row": 6,
      "col": 5,
      "direction": "RIGHT",
      "color": "#FF9F43"
    },
    {
      "id": "t13",
      "row": 3,
      "col": 0,
      "direction": "DOWN",
      "color": "#10AC84"
    },
    {
      "id": "t14",
      "row": 4,
      "col": 2,
      "direction": "DOWN",
      "color": "#54A0FF"
    },
    {
      "id": "t15",
      "row": 2,
      "col": 5,
      "direction": "RIGHT",
      "color": "#EE5253"
    },
    {
      "id": "t16",
      "row": 4,
      "col": 4,
      "direction": "DOWN",
      "color": "#A3E635"
    },
    {
      "id": "t17",
      "row": 3,
      "col": 2,
      "direction": "RIGHT",
      "color": "#48DBFB"
    },
    {
      "id": "t18",
      "row": 1,
      "col": 1,
      "direction": "DOWN",
      "color": "#9B59B6"
    },
    {
      "id": "t19",
      "row": 5,
      "col": 2,
      "direction": "LEFT",
      "color": "#1DD1A1"
    },
    {
      "id": "t20",
      "row": 0,
      "col": 6,
      "direction": "UP",
      "color": "#FF5E7E"
    },
    {
      "id": "t21",
      "row": 5,
      "col": 1,
      "direction": "DOWN",
      "color": "#00D2D3"
    },
    {
      "id": "t22",
      "row": 5,
      "col": 6,
      "direction": "RIGHT",
      "color": "#FECA57"
    },
    {
      "id": "t23",
      "row": 6,
      "col": 4,
      "direction": "LEFT",
      "color": "#5F27CD"
    },
    {
      "id": "t24",
      "row": 6,
      "col": 1,
      "direction": "LEFT",
      "color": "#FF9F43"
    },
    {
      "id": "t25",
      "row": 3,
      "col": 6,
      "direction": "RIGHT",
      "color": "#10AC84"
    },
    {
      "id": "t26",
      "row": 0,
      "col": 4,
      "direction": "UP",
      "color": "#54A0FF"
    },
    {
      "id": "t27",
      "row": 4,
      "col": 1,
      "direction": "LEFT",
      "color": "#EE5253"
    },
    {
      "id": "t28",
      "row": 0,
      "col": 1,
      "direction": "UP",
      "color": "#A3E635"
    },
    {
      "id": "t29",
      "row": 2,
      "col": 6,
      "direction": "RIGHT",
      "color": "#48DBFB"
    },
    {
      "id": "t30",
      "row": 4,
      "col": 0,
      "direction": "DOWN",
      "color": "#9B59B6"
    },
    {
      "id": "t31",
      "row": 6,
      "col": 3,
      "direction": "DOWN",
      "color": "#1DD1A1"
    },
    {
      "id": "t32",
      "row": 6,
      "col": 0,
      "direction": "DOWN",
      "color": "#FF5E7E"
    },
    {
      "id": "t33",
      "row": 5,
      "col": 0,
      "direction": "LEFT",
      "color": "#00D2D3"
    },
    {
      "id": "t34",
      "row": 0,
      "col": 2,
      "direction": "UP",
      "color": "#FECA57"
    },
    {
      "id": "t35",
      "row": 6,
      "col": 2,
      "direction": "DOWN",
      "color": "#5F27CD"
    },
    {
      "id": "t36",
      "row": 0,
      "col": 5,
      "direction": "UP",
      "color": "#FF9F43"
    },
    {
      "id": "t37",
      "row": 6,
      "col": 6,
      "direction": "RIGHT",
      "color": "#10AC84"
    }
  ],
  "solution": [
    "t1",
    "t7",
    "t4",
    "t9",
    "t20",
    "t22",
    "t25",
    "t17",
    "t26",
    "t28",
    "t29",
    "t15",
    "t10",
    "t5",
    "t31",
    "t32",
    "t24",
    "t21",
    "t33",
    "t19",
    "t3",
    "t30",
    "t13",
    "t27",
    "t18",
    "t34",
    "t35",
    "t14",
    "t23",
    "t16",
    "t36",
    "t2",
    "t11",
    "t6",
    "t8",
    "t37",
    "t12"
  ]
};

export default TAL77;
