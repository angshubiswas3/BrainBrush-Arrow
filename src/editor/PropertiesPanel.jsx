import React, { useState } from 'react';
import Board from '../components/Board';
import LevelExporter from './LevelExporter';

function computeArrowStatistics(board = [], gridSize = { rows: 10, cols: 10 }) {
  const totalArrows = board.length;
  if (totalArrows === 0) {
    return {
      totalArrows: 0,
      totalPieces: 0,
      cellsUsed: 0,
      boardCoverage: '0%',
      arrowDensity: '0%',
      longestArrow: 0,
      shortestArrow: 0,
      averageLength: '0',
      deadEnds: 0,
      turns: 0,
      complexity: 'Low',
      autoDifficulty: 'Easy'
    };
  }

  let totalPieces = 0;
  let deadEnds = 0;
  let turns = 0;
  const lengths = [];
  const occupiedCells = new Set();

  board.forEach((arrow) => {
    const pieces = arrow.pieces || [];
    const len = pieces.length;
    lengths.push(len);
    totalPieces += len;

    pieces.forEach((p) => {
      occupiedCells.add(`${p.r},${p.c}`);
      if (p.type === 'DEAD_END') deadEnds++;
      if (p.type === 'CORNER') turns++;
    });
  });

  const cellsUsed = occupiedCells.size;
  const totalCells = (gridSize.rows || 10) * (gridSize.cols || 10);
  const coverageRatio = totalCells > 0 ? ((cellsUsed / totalCells) * 100).toFixed(1) : 0;
  const longestArrow = Math.max(...lengths);
  const shortestArrow = Math.min(...lengths);
  const averageLength = (totalPieces / totalArrows).toFixed(1);
  const autoDifficulty = LevelExporter.calculateDifficulty(board, gridSize);

  let complexity = 'Standard';
  if (turns > 15 || totalArrows > 12) complexity = 'High';
  if (turns > 30 || totalArrows > 25) complexity = 'Very High';

  return {
    totalArrows,
    totalPieces,
    cellsUsed,
    boardCoverage: `${coverageRatio}%`,
    arrowDensity: `${coverageRatio}%`,
    longestArrow,
    shortestArrow,
    averageLength,
    deadEnds,
    turns,
    complexity,
    autoDifficulty
  };
}

export const PropertiesPanel = ({
  metadata,
  setMetadata,
  selectedArrow,
  onUpdateArrow,
  validationResult,
  showLivePreview,
  levelBoard,
  gridSize,
  gameType,
  setGameType,
  balCount = 0,
  talCount = 0,
  onFocusCell
}) => {
  const [activeTab, setActiveTab] = useState('SETTINGS');

  const stats = computeArrowStatistics(levelBoard, gridSize);
  const prefix = gameType === 'TIME_ARROW' ? 'TAL' : 'BAL';

  // Single rendering pipeline: preview data matches Board.jsx 1:1
  const previewData = {
    id: metadata.id || 1,
    name: metadata.name || 'Level Preview',
    difficulty: metadata.difficulty || stats.autoDifficulty,
    moves: metadata.moves || Math.max(levelBoard.length, 5),
    gridSize: Math.max(gridSize.rows, gridSize.cols),
    size: { rows: gridSize.rows, cols: gridSize.cols },
    theme: metadata.theme || { color: '#0f172a', bg: '#f8fafc' },
    board: levelBoard,
    arrows: levelBoard
  };

  return (
    <div className="editor-right-dock">
      {/* Dock Tabs Header (Fixed Top) */}
      <div className="dock-tabs">
        <div
          className={`dock-tab ${activeTab === 'SETTINGS' ? 'active' : ''}`}
          onClick={() => setActiveTab('SETTINGS')}
        >
          Level & Stats
        </div>
        <div
          className={`dock-tab ${activeTab === 'SELECTION' ? 'active' : ''}`}
          onClick={() => setActiveTab('SELECTION')}
        >
          {selectedArrow ? `Arrow (${selectedArrow.id})` : 'Selection'}
        </div>
        <div
          className={`dock-tab ${activeTab === 'VALIDATION' ? 'active' : ''}`}
          onClick={() => setActiveTab('VALIDATION')}
        >
          Errors ({validationResult.errors.length})
        </div>
      </div>

      {/* Dock Scrollable Content Area */}
      <div className="dock-scroll-body">
        {/* TAB 1: LEVEL SETTINGS & LIVE STATISTICS */}
        {activeTab === 'SETTINGS' && (
          <>
            {/* Registered Level Counts Bar */}
            <div style={{ padding: '8px 10px', background: 'var(--ed-bg-card)', border: '1px solid var(--ed-border)', borderRadius: '6px', fontSize: '11px' }}>
              <div style={{ fontWeight: 700, color: 'var(--ed-accent)', marginBottom: '4px' }}>Registered Project Levels</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ed-text-muted)' }}>
                <span>Brain Arrow (BAL): <strong style={{ color: '#fff' }}>{balCount}</strong></span>
                <span>Time Arrow (TAL): <strong style={{ color: '#fff' }}>{talCount}</strong></span>
              </div>
            </div>

            <div className="dock-section-title" style={{ marginTop: '4px' }}>Game Type & Metadata</div>

            <div className="property-group">
              <label className="property-label">Target Game Engine</label>
              <select
                className="property-select"
                value={gameType}
                onChange={(e) => setGameType(e.target.value)}
              >
                <option value="BRAIN_ARROW">Brain Arrow (BAL*.jsx)</option>
                <option value="TIME_ARROW">Time Arrow (TAL*.jsx)</option>
              </select>
            </div>

            <div className="property-group">
              <label className="property-label">
                Level ID ({prefix} ID)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ed-accent)' }}>{prefix}</span>
                <input
                  type="number"
                  min="1"
                  max="999"
                  className="property-input"
                  style={{ flex: 1 }}
                  value={metadata.id}
                  onChange={(e) => setMetadata({ ...metadata, id: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>

            <div className="property-group">
              <label className="property-label">Level Name</label>
              <input
                type="text"
                className="property-input"
                value={metadata.name}
                onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
              />
            </div>

            <div className="property-group">
              <label className="property-label">
                Difficulty <span style={{ color: 'var(--ed-accent)', fontSize: '10px' }}>(Auto: {stats.autoDifficulty})</span>
              </label>
              <select
                className="property-select"
                value={metadata.difficulty}
                onChange={(e) => setMetadata({ ...metadata, difficulty: e.target.value })}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Expert">Expert</option>
                <option value="Master">Master</option>
              </select>
            </div>

            <div className="property-group">
              <label className="property-label">Move Limit</label>
              <input
                type="number"
                min="1"
                className="property-input"
                value={metadata.moves}
                onChange={(e) => setMetadata({ ...metadata, moves: parseInt(e.target.value) || 10 })}
              />
            </div>

            {/* LIVE ARROW STATISTICS CARDS GRID */}
            <div className="dock-section-title" style={{ marginTop: '12px' }}>
              📊 Live Arrow Statistics
            </div>
            <div className="stat-cards-grid">
              <div className="stat-card">
                <span className="stat-num">{stats.totalArrows}</span>
                <span className="stat-lbl">Total Arrows</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">{stats.totalPieces}</span>
                <span className="stat-lbl">Total Pieces</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">{stats.cellsUsed}</span>
                <span className="stat-lbl">Cells Used</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">{stats.boardCoverage}</span>
                <span className="stat-lbl">Board Coverage</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">{stats.longestArrow}</span>
                <span className="stat-lbl">Longest Arrow</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">{stats.shortestArrow}</span>
                <span className="stat-lbl">Shortest Arrow</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">{stats.averageLength}</span>
                <span className="stat-lbl">Avg Path Length</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">{stats.turns}</span>
                <span className="stat-lbl">Total Corners</span>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: SELECTION PROPERTIES */}
        {activeTab === 'SELECTION' && (
          <div>
            {selectedArrow ? (
              <div>
                <div className="dock-section-title">Arrow Properties ({selectedArrow.id})</div>

                <div className="property-group">
                  <label className="property-label">Exit Direction</label>
                  <select
                    className="property-select"
                    value={selectedArrow.direction}
                    onChange={(e) => onUpdateArrow({ ...selectedArrow, direction: e.target.value })}
                  >
                    <option value="UP">UP ⬆</option>
                    <option value="DOWN">DOWN ⬇</option>
                    <option value="LEFT">LEFT ⬅</option>
                    <option value="RIGHT">RIGHT ➡</option>
                  </select>
                </div>

                <div className="property-group">
                  <label className="property-label">Arrow Color</label>
                  <input
                    type="color"
                    className="property-input"
                    value={selectedArrow.color || '#0f172a'}
                    onChange={(e) => onUpdateArrow({ ...selectedArrow, color: e.target.value })}
                    style={{ height: '36px', cursor: 'pointer' }}
                  />
                </div>

                <div className="dock-section-title" style={{ marginTop: '14px' }}>Pieces Breakdown</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {(selectedArrow.pieces || []).map((p, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        padding: '6px 8px',
                        background: 'var(--ed-bg-card)',
                        border: '1px solid var(--ed-border)',
                        borderRadius: '4px',
                        fontSize: '11px'
                      }}
                    >
                      <span>({p.r}, {p.c})</span>
                      <span style={{ fontWeight: 600, color: 'var(--ed-accent)' }}>{p.type}</span>
                      <span>Rot: {p.rotation}°</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--ed-text-muted)', fontSize: '12px', textAlign: 'center', padding: '24px 0' }}>
                No arrow selected. Click an arrow on the canvas or draw a new one.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AUTO VALIDATION */}
        {activeTab === 'VALIDATION' && (
          <div>
            <div className="dock-section-title">Validation Status</div>
            
            {validationResult.isValid ? (
              <div className="status-valid" style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '6px', marginBottom: '12px' }}>
                <span>✓</span> Level is 100% Valid & Production Ready!
              </div>
            ) : (
              <div className="status-invalid" style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', marginBottom: '12px' }}>
                <span>⚠</span> {validationResult.errors.length} Error(s) Found
              </div>
            )}

            {/* Error List */}
            {validationResult.errors.map((err) => (
              <div
                key={err.id}
                style={{
                  padding: '8px 10px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  borderLeft: '3px solid var(--ed-danger)',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  fontSize: '11px',
                  cursor: err.cell ? 'pointer' : 'default'
                }}
                onClick={() => err.cell && onFocusCell(err.cell.r, err.cell.c)}
              >
                <div style={{ fontWeight: 700, color: 'var(--ed-danger)', marginBottom: '2px' }}>
                  [{err.type}]
                </div>
                <div>{err.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ISSUE 3: ALWAYS VISIBLE LIVE GAME BOARD PREVIEW (Fixed Dock Footer Container) */}
      {showLivePreview && (
        <div className="dock-preview-footer">
          <div className="dock-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span>Live Board Preview</span>
            <span style={{ fontSize: '10px', color: 'var(--ed-success)', fontWeight: 600 }}>● Uses Board.jsx</span>
          </div>
          <div className="live-preview-container">
            <Board
              key={JSON.stringify(levelBoard)}
              data={previewData}
              showGuides={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
