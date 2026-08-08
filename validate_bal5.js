// Validation script for BAL5 level
const fs = require('fs');

// Inline the level data for testing
const level = {
  board: [
    {
      id: "a1", direction: "DOWN",
      pieces: [
        {r:0,c:3}, {r:0,c:4}, {r:0,c:5}, {r:0,c:6}, {r:0,c:7}, {r:1,c:7}
      ]
    },
    {
      id: "a2", direction: "LEFT",
      pieces: [
        {r:0,c:9}, {r:0,c:8}, {r:1,c:8}, {r:2,c:8}, {r:2,c:7}, {r:2,c:6}, {r:2,c:5}, {r:2,c:4}, {r:2,c:3}
      ]
    },
    {
      id: "a3", direction: "LEFT",
      pieces: [
        {r:1,c:5}, {r:1,c:4}, {r:1,c:3}, {r:1,c:2}, {r:1,c:1}, {r:2,c:1}, {r:2,c:0}, {r:3,c:0}
      ]
    },
    {
      id: "a4", direction: "DOWN",
      pieces: [
        {r:1,c:6}, {r:2,c:6}, {r:3,c:6}, {r:3,c:5}, {r:3,c:4}, {r:3,c:3}, {r:3,c:2}, {r:3,c:1}, {r:4,c:1}
      ]
    },
    {
      id: "a5", direction: "LEFT",
      pieces: [
        {r:3,c:9}, {r:3,c:8}, {r:3,c:7}, {r:4,c:7}, {r:4,c:6}, {r:4,c:5}, {r:4,c:4}, {r:4,c:3}, {r:4,c:2}
      ]
    },
    {
      id: "a6", direction: "DOWN",
      pieces: [
        {r:4,c:0}, {r:5,c:0}, {r:6,c:0}, {r:7,c:0}, {r:8,c:0}, {r:9,c:0}, {r:9,c:1}, {r:9,c:2}, {r:9,c:3}
      ]
    },
    {
      id: "a7", direction: "RIGHT",
      pieces: [
        {r:5,c:3}, {r:5,c:4}, {r:5,c:5}, {r:5,c:6}, {r:5,c:7}, {r:5,c:8}, {r:5,c:9}
      ]
    },
    {
      id: "a8", direction: "RIGHT",
      pieces: [
        {r:5,c:1}, {r:5,c:2}, {r:6,c:2}, {r:6,c:3}, {r:6,c:4}, {r:6,c:5}, {r:6,c:6}, {r:6,c:7}, {r:6,c:8}, {r:6,c:9}
      ]
    },
    {
      id: "a9", direction: "DOWN",
      pieces: [
        {r:4,c:8}, {r:4,c:9}, {r:5,c:9}, {r:6,c:9}, {r:7,c:9}, {r:8,c:9}, {r:9,c:9}, {r:9,c:8}, {r:9,c:7}, {r:9,c:6}, {r:9,c:5}
      ]
    },
    {
      id: "a10", direction: "DOWN",
      pieces: [
        {r:6,c:1}, {r:7,c:1}, {r:7,c:2}, {r:7,c:3}, {r:7,c:4}, {r:7,c:5}, {r:7,c:6}, {r:7,c:7}, {r:7,c:8}, {r:8,c:8}
      ]
    },
    {
      id: "a11", direction: "DOWN",
      pieces: [
        {r:8,c:1}, {r:8,c:2}, {r:8,c:3}, {r:8,c:4}, {r:8,c:5}, {r:8,c:6}, {r:8,c:7}
      ]
    },
    {
      id: "a12", direction: "UP",
      pieces: [
        {r:2,c:2}, {r:2,c:1}, {r:2,c:0}, {r:1,c:0}, {r:0,c:0}, {r:0,c:1}, {r:0,c:2}
      ]
    }
  ],
  size: { rows: 10, cols: 10 }
};

// Check for cell overlaps
const allCells = {};
let hasOverlap = false;

for (const arrow of level.board) {
  for (const piece of arrow.pieces) {
    const key = piece.r + ',' + piece.c;
    if (allCells[key]) {
      console.log('OVERLAP at', key, 'between', allCells[key], 'and', arrow.id);
      hasOverlap = true;
    }
    allCells[key] = arrow.id;
  }
}

if (!hasOverlap) console.log('No overlaps found!');

// Check solvability
const DELTAS = { UP: {r:-1,c:0}, DOWN: {r:1,c:0}, LEFT: {r:0,c:-1}, RIGHT: {r:0,c:1} };
const rows = level.size.rows;
const cols = level.size.cols;

function isArrowClear(arrow, allArrows) {
  const pieces = arrow.pieces;
  const head = pieces[pieces.length - 1];
  const delta = DELTAS[arrow.direction];
  let cr = head.r + delta.r;
  let cc = head.c + delta.c;
  while (cr >= 0 && cr < rows && cc >= 0 && cc < cols) {
    const hit = allArrows.some(other => other.id !== arrow.id && other.pieces.some(p => p.r === cr && p.c === cc));
    if (hit) return false;
    cr += delta.r;
    cc += delta.c;
  }
  return true;
}

let remaining = [...level.board];
const solution = [];

while (remaining.length > 0) {
  const clear = remaining.filter(a => isArrowClear(a, remaining));
  if (clear.length === 0) {
    console.log('NOT SOLVABLE! Stuck with:', remaining.map(a => a.id).join(', '));
    break;
  }
  solution.push(clear[0].id);
  remaining = remaining.filter(a => a.id !== clear[0].id);
}

if (remaining.length === 0) {
  console.log('SOLVABLE! Auto solution:', solution.join(', '));
}
