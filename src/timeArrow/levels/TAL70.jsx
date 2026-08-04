/**
 * TAL70.jsx - Handcrafted Time Arrow Level 70
 * Difficulty: Expert
 * Grid Size: 7x7 | Moves: 37 | Time Limit: 70s
 */

const TAL70 = {
  "id": 70,
  "name": "Level 70",
  "difficulty": "Expert",
  "gridSize": 7,
  "timeLimit": 70,
  "moves": 37,
  "board": [
    {
      "id": "t1",
      "row": 3,
      "col": 6,
      "direction": "UP",
      "color": "#9B59B6"
    },
    {
      "id": "t2",
      "row": 2,
      "col": 6,
      "direction": "LEFT",
      "color": "#1DD1A1"
    },
    {
      "id": "t3",
      "row": 5,
      "col": 3,
      "direction": "RIGHT",
      "color": "#FF5E7E"
    },
    {
      "id": "t4",
      "row": 1,
      "col": 2,
      "direction": "UP",
      "color": "#00D2D3"
    },
    {
      "id": "t5",
      "row": 6,
      "col": 3,
      "direction": "RIGHT",
      "color": "#FECA57"
    },
    {
      "id": "t6",
      "row": 4,
      "col": 1,
      "direction": "UP",
      "color": "#5F27CD"
    },
    {
      "id": "t7",
      "row": 1,
      "col": 3,
      "direction": "RIGHT",
      "color": "#FF9F43"
    },
    {
      "id": "t8",
      "row": 3,
      "col": 1,
      "direction": "UP",
      "color": "#10AC84"
    },
    {
      "id": "t9",
      "row": 5,
      "col": 6,
      "direction": "DOWN",
      "color": "#54A0FF"
    },
    {
      "id": "t10",
      "row": 6,
      "col": 0,
      "direction": "LEFT",
      "color": "#EE5253"
    },
    {
      "id": "t11",
      "row": 1,
      "col": 6,
      "direction": "UP",
      "color": "#A3E635"
    },
    {
      "id": "t12",
      "row": 3,
      "col": 5,
      "direction": "UP",
      "color": "#48DBFB"
    },
    {
      "id": "t13",
      "row": 0,
      "col": 5,
      "direction": "UP",
      "color": "#9B59B6"
    },
    {
      "id": "t14",
      "row": 4,
      "col": 0,
      "direction": "UP",
      "color": "#1DD1A1"
    },
    {
      "id": "t15",
      "row": 3,
      "col": 4,
      "direction": "UP",
      "color": "#FF5E7E"
    },
    {
      "id": "t16",
      "row": 6,
      "col": 4,
      "direction": "RIGHT",
      "color": "#00D2D3"
    },
    {
      "id": "t17",
      "row": 0,
      "col": 4,
      "direction": "UP",
      "color": "#FECA57"
    },
    {
      "id": "t18",
      "row": 5,
      "col": 5,
      "direction": "DOWN",
      "color": "#5F27CD"
    },
    {
      "id": "t19",
      "row": 2,
      "col": 0,
      "direction": "UP",
      "color": "#FF9F43"
    },
    {
      "id": "t20",
      "row": 1,
      "col": 0,
      "direction": "LEFT",
      "color": "#10AC84"
    },
    {
      "id": "t21",
      "row": 1,
      "col": 1,
      "direction": "UP",
      "color": "#54A0FF"
    },
    {
      "id": "t22",
      "row": 5,
      "col": 1,
      "direction": "DOWN",
      "color": "#EE5253"
    },
    {
      "id": "t23",
      "row": 6,
      "col": 5,
      "direction": "RIGHT",
      "color": "#A3E635"
    },
    {
      "id": "t24",
      "row": 5,
      "col": 0,
      "direction": "LEFT",
      "color": "#48DBFB"
    },
    {
      "id": "t25",
      "row": 0,
      "col": 0,
      "direction": "UP",
      "color": "#9B59B6"
    },
    {
      "id": "t26",
      "row": 5,
      "col": 2,
      "direction": "DOWN",
      "color": "#1DD1A1"
    },
    {
      "id": "t27",
      "row": 3,
      "col": 0,
      "direction": "LEFT",
      "color": "#FF5E7E"
    },
    {
      "id": "t28",
      "row": 6,
      "col": 2,
      "direction": "DOWN",
      "color": "#00D2D3"
    },
    {
      "id": "t29",
      "row": 0,
      "col": 3,
      "direction": "UP",
      "color": "#FECA57"
    },
    {
      "id": "t30",
      "row": 0,
      "col": 6,
      "direction": "RIGHT",
      "color": "#5F27CD"
    },
    {
      "id": "t31",
      "row": 4,
      "col": 4,
      "direction": "RIGHT",
      "color": "#FF9F43"
    },
    {
      "id": "t32",
      "row": 0,
      "col": 1,
      "direction": "UP",
      "color": "#10AC84"
    },
    {
      "id": "t33",
      "row": 4,
      "col": 5,
      "direction": "RIGHT",
      "color": "#54A0FF"
    },
    {
      "id": "t34",
      "row": 4,
      "col": 6,
      "direction": "RIGHT",
      "color": "#EE5253"
    },
    {
      "id": "t35",
      "row": 6,
      "col": 6,
      "direction": "DOWN",
      "color": "#A3E635"
    },
    {
      "id": "t36",
      "row": 0,
      "col": 2,
      "direction": "UP",
      "color": "#48DBFB"
    },
    {
      "id": "t37",
      "row": 6,
      "col": 1,
      "direction": "DOWN",
      "color": "#9B59B6"
    }
  ],
  "solution": [
    "t10",
    "t13",
    "t12",
    "t17",
    "t15",
    "t20",
    "t24",
    "t25",
    "t19",
    "t2",
    "t27",
    "t14",
    "t28",
    "t26",
    "t29",
    "t30",
    "t11",
    "t1",
    "t7",
    "t32",
    "t21",
    "t8",
    "t6",
    "t34",
    "t33",
    "t31",
    "t35",
    "t9",
    "t23",
    "t16",
    "t5",
    "t18",
    "t3",
    "t36",
    "t4",
    "t37",
    "t22"
  ]
};

export default TAL70;
