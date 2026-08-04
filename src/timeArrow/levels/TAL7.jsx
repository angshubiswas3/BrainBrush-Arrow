/**
 * TAL7.jsx - Handcrafted Time Arrow Level 7
 * Difficulty: Easy | Grid Size: 4x4 | Time Limit: 35s
 */

const TAL7 = {
  id: 7,
  name: "Level 7",
  difficulty: "Easy",
  gridSize: 4,
  timeLimit: 35,
  moves: 8,
  board: [
    { id: "t1", row: 0, col: 1, direction: "UP", color: "#FF5E7E" },
    { id: "t2", row: 0, col: 2, direction: "UP", color: "#00D2D3" },
    { id: "t3", row: 1, col: 0, direction: "LEFT", color: "#FECA57" },
    { id: "t4", row: 1, col: 3, direction: "RIGHT", color: "#5F27CD" },
    { id: "t5", row: 2, col: 0, direction: "LEFT", color: "#FF9F43" },
    { id: "t6", row: 2, col: 3, direction: "RIGHT", color: "#10AC84" },
    { id: "t7", row: 3, col: 1, direction: "DOWN", color: "#54A0FF" },
    { id: "t8", row: 3, col: 2, direction: "DOWN", color: "#EE5253" }
  ],
  solution: ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"]
};

export default TAL7;
