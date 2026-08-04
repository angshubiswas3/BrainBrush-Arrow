/**
 * TAL85.jsx - Handcrafted Time Arrow Level 85
 * Difficulty: Expert
 * Grid Size: 7x7 | Moves: 37 | Time Limit: 70s
 */

const TAL85 = {
  "id": 85,
  "name": "Level 85",
  "difficulty": "Expert",
  "gridSize": 7,
  "timeLimit": 70,
  "moves": 37,
  "board": [
    {
      "id": "t1",
      "row": 4,
      "col": 0,
      "direction": "DOWN",
      "color": "#00D2D3"
    },
    {
      "id": "t2",
      "row": 0,
      "col": 1,
      "direction": "RIGHT",
      "color": "#FECA57"
    },
    {
      "id": "t3",
      "row": 4,
      "col": 6,
      "direction": "UP",
      "color": "#5F27CD"
    },
    {
      "id": "t4",
      "row": 2,
      "col": 5,
      "direction": "UP",
      "color": "#FF9F43"
    },
    {
      "id": "t5",
      "row": 6,
      "col": 1,
      "direction": "RIGHT",
      "color": "#10AC84"
    },
    {
      "id": "t6",
      "row": 5,
      "col": 2,
      "direction": "LEFT",
      "color": "#54A0FF"
    },
    {
      "id": "t7",
      "row": 2,
      "col": 0,
      "direction": "LEFT",
      "color": "#EE5253"
    },
    {
      "id": "t8",
      "row": 0,
      "col": 0,
      "direction": "LEFT",
      "color": "#A3E635"
    },
    {
      "id": "t9",
      "row": 3,
      "col": 2,
      "direction": "LEFT",
      "color": "#48DBFB"
    },
    {
      "id": "t10",
      "row": 1,
      "col": 3,
      "direction": "LEFT",
      "color": "#9B59B6"
    },
    {
      "id": "t11",
      "row": 1,
      "col": 5,
      "direction": "RIGHT",
      "color": "#1DD1A1"
    },
    {
      "id": "t12",
      "row": 4,
      "col": 5,
      "direction": "DOWN",
      "color": "#FF5E7E"
    },
    {
      "id": "t13",
      "row": 2,
      "col": 4,
      "direction": "UP",
      "color": "#00D2D3"
    },
    {
      "id": "t14",
      "row": 2,
      "col": 6,
      "direction": "UP",
      "color": "#FECA57"
    },
    {
      "id": "t15",
      "row": 1,
      "col": 4,
      "direction": "UP",
      "color": "#5F27CD"
    },
    {
      "id": "t16",
      "row": 3,
      "col": 1,
      "direction": "LEFT",
      "color": "#FF9F43"
    },
    {
      "id": "t17",
      "row": 4,
      "col": 3,
      "direction": "DOWN",
      "color": "#10AC84"
    },
    {
      "id": "t18",
      "row": 6,
      "col": 3,
      "direction": "DOWN",
      "color": "#54A0FF"
    },
    {
      "id": "t19",
      "row": 5,
      "col": 5,
      "direction": "RIGHT",
      "color": "#EE5253"
    },
    {
      "id": "t20",
      "row": 6,
      "col": 6,
      "direction": "DOWN",
      "color": "#A3E635"
    },
    {
      "id": "t21",
      "row": 3,
      "col": 0,
      "direction": "LEFT",
      "color": "#48DBFB"
    },
    {
      "id": "t22",
      "row": 6,
      "col": 5,
      "direction": "DOWN",
      "color": "#9B59B6"
    },
    {
      "id": "t23",
      "row": 5,
      "col": 6,
      "direction": "RIGHT",
      "color": "#1DD1A1"
    },
    {
      "id": "t24",
      "row": 3,
      "col": 6,
      "direction": "RIGHT",
      "color": "#FF5E7E"
    },
    {
      "id": "t25",
      "row": 1,
      "col": 1,
      "direction": "LEFT",
      "color": "#00D2D3"
    },
    {
      "id": "t26",
      "row": 6,
      "col": 4,
      "direction": "DOWN",
      "color": "#FECA57"
    },
    {
      "id": "t27",
      "row": 6,
      "col": 0,
      "direction": "DOWN",
      "color": "#5F27CD"
    },
    {
      "id": "t28",
      "row": 0,
      "col": 4,
      "direction": "UP",
      "color": "#FF9F43"
    },
    {
      "id": "t29",
      "row": 1,
      "col": 2,
      "direction": "UP",
      "color": "#10AC84"
    },
    {
      "id": "t30",
      "row": 5,
      "col": 0,
      "direction": "LEFT",
      "color": "#54A0FF"
    },
    {
      "id": "t31",
      "row": 0,
      "col": 3,
      "direction": "UP",
      "color": "#EE5253"
    },
    {
      "id": "t32",
      "row": 1,
      "col": 0,
      "direction": "LEFT",
      "color": "#A3E635"
    },
    {
      "id": "t33",
      "row": 0,
      "col": 6,
      "direction": "RIGHT",
      "color": "#48DBFB"
    },
    {
      "id": "t34",
      "row": 6,
      "col": 2,
      "direction": "DOWN",
      "color": "#9B59B6"
    },
    {
      "id": "t35",
      "row": 0,
      "col": 2,
      "direction": "UP",
      "color": "#1DD1A1"
    },
    {
      "id": "t36",
      "row": 0,
      "col": 5,
      "direction": "UP",
      "color": "#FF5E7E"
    },
    {
      "id": "t37",
      "row": 1,
      "col": 6,
      "direction": "RIGHT",
      "color": "#00D2D3"
    }
  ],
  "solution": [
    "t7",
    "t8",
    "t18",
    "t17",
    "t20",
    "t21",
    "t16",
    "t9",
    "t22",
    "t23",
    "t19",
    "t12",
    "t24",
    "t26",
    "t27",
    "t28",
    "t15",
    "t13",
    "t30",
    "t1",
    "t6",
    "t31",
    "t32",
    "t25",
    "t33",
    "t34",
    "t5",
    "t35",
    "t29",
    "t10",
    "t36",
    "t2",
    "t37",
    "t11",
    "t4",
    "t14",
    "t3"
  ]
};

export default TAL85;
