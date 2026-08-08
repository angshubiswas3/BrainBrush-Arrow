import React from 'react';

const STANDARD_PIECES = [
  { id: 'ARROW_HEAD', label: 'Arrow Head', icon: '➔', type: 'ARROW_HEAD' },
  { id: 'STRAIGHT', label: 'Straight', icon: '━', type: 'STRAIGHT' },
  { id: 'CORNER', label: 'Corner', icon: '┗', type: 'CORNER' },
  { id: 'DEAD_END', label: 'Dead End', icon: '┯', type: 'DEAD_END' },
  { id: 'T_JUNCTION', label: 'T-Junction', icon: '┳', type: 'T_JUNCTION' },
  { id: 'CROSS', label: 'Cross', icon: '╋', type: 'CROSS' }
];

const SPECIAL_PIECES = [
  { id: 'LOCKED', label: 'Locked', icon: '🔒', type: 'LOCKED' },
  { id: 'FROZEN', label: 'Frozen', icon: '❄️', type: 'FROZEN' },
  { id: 'BOMB', label: 'Bomb', icon: '💣', type: 'BOMB' },
  { id: 'TELEPORT', label: 'Teleport', icon: '🌀', type: 'TELEPORT' },
  { id: 'PORTAL', label: 'Portal', icon: '🌌', type: 'PORTAL' },
  { id: 'KEY', label: 'Key', icon: '🔑', type: 'KEY' },
  { id: 'GATE', label: 'Gate', icon: '⛩️', type: 'GATE' },
  { id: 'RAINBOW', label: 'Rainbow', icon: '🌈', type: 'RAINBOW' },
  { id: 'MYSTERY', label: 'Mystery', icon: '❓', type: 'MYSTERY' }
];

const GRID_PRESETS = [
  { rows: 5, cols: 5, label: '5×5' },
  { rows: 8, cols: 8, label: '8×8' },
  { rows: 10, cols: 10, label: '10×10' },
  { rows: 12, cols: 12, label: '12×12' },
  { rows: 15, cols: 12, label: '15×12' },
  { rows: 15, cols: 15, label: '15×15' },
  { rows: 20, cols: 20, label: '20×20' },
  { rows: 25, cols: 25, label: '25×25' },
  { rows: 30, cols: 30, label: '30×30' },
  { rows: 40, cols: 40, label: '40×40' },
  { rows: 50, cols: 50, label: '50×50' },
  { rows: 100, cols: 100, label: '100×100' }
];

export const PiecePalette = ({
  activeMode,
  setActiveMode,
  selectedPieceType,
  setSelectedPieceType,
  gridSize,
  setGridSize
}) => {
  return (
    <div className="editor-left-dock">
      {/* Editor Tool Modes */}
      <div className="dock-section">
        <div className="dock-section-title">Drawing Tools</div>
        <div className="tool-grid">
          <button
            className={`toolbar-btn ${activeMode === 'DRAW_ARROW' ? 'active' : ''}`}
            onClick={() => setActiveMode('DRAW_ARROW')}
            title="Click and drag to automatically generate a complete arrow with DeadEnd, Straights, Corners, and ArrowHead"
          >
            <span>🏹</span> Arrow Path
          </button>

          <button
            className={`toolbar-btn ${activeMode === 'SELECT' ? 'active' : ''}`}
            onClick={() => setActiveMode('SELECT')}
            title="Click or drag box to select pieces"
          >
            <span>↖</span> Select
          </button>

          <button
            className={`toolbar-btn ${activeMode === 'STAMP' ? 'active' : ''}`}
            onClick={() => setActiveMode('STAMP')}
            title="Place single piece manually"
          >
            <span>🖌</span> Stamp Piece
          </button>

          <button
            className={`toolbar-btn ${activeMode === 'ERASE' ? 'active' : ''}`}
            onClick={() => setActiveMode('ERASE')}
            title="Click or drag to delete pieces"
          >
            <span>🧹</span> Erase
          </button>
        </div>
      </div>

      {/* Grid Presets */}
      <div className="dock-section">
        <div className="dock-section-title">Grid Size Presets</div>
        <div className="tool-grid">
          {GRID_PRESETS.map((preset) => (
            <button
              key={preset.label}
              className={`toolbar-btn ${gridSize.rows === preset.rows && gridSize.cols === preset.cols ? 'active' : ''}`}
              onClick={() => setGridSize({ rows: preset.rows, cols: preset.cols })}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Core Piece Library */}
      <div className="dock-section">
        <div className="dock-section-title">Core Puzzle Pieces</div>
        <div className="piece-grid">
          {STANDARD_PIECES.map((piece) => (
            <div
              key={piece.id}
              className={`palette-card ${selectedPieceType === piece.type ? 'active' : ''}`}
              onClick={() => {
                setSelectedPieceType(piece.type);
                if (activeMode !== 'STAMP') setActiveMode('STAMP');
              }}
            >
              <div className="palette-icon">{piece.icon}</div>
              <div className="palette-label">{piece.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Special / Future Piece Library */}
      <div className="dock-section">
        <div className="dock-section-title">Special & Future Mechanics</div>
        <div className="piece-grid">
          {SPECIAL_PIECES.map((piece) => (
            <div
              key={piece.id}
              className={`palette-card ${selectedPieceType === piece.type ? 'active' : ''}`}
              onClick={() => {
                setSelectedPieceType(piece.type);
                if (activeMode !== 'STAMP') setActiveMode('STAMP');
              }}
            >
              <div className="palette-icon">{piece.icon}</div>
              <div className="palette-label">{piece.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PiecePalette;
