import React from 'react';

export const Toolbar = ({
  gameType,
  setGameType,
  autoNextLevel,
  setAutoNextLevel,
  hasUnsavedChanges,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onRotateSelection,
  onMirrorHorizontal,
  onMirrorVertical,
  onDuplicateSelection,
  onDeleteSelection,
  onClearBoard,
  zoom,
  setZoom,
  onResetPanZoom,
  onSaveToProject,
  onOpenProjectBrowser,
  onExportJsx,
  onExportJson,
  onOpenSource,
  onOpenImport,
  onDeleteLevel,
  onPlayTest,
  showLivePreview,
  setShowLivePreview,
  gridSize,
  setGridSize,
  isSaving,
  isValid = true,
  balCount = 0,
  talCount = 0
}) => {
  return (
    <div className="editor-topbar">
      {/* Tier 1: Engine Selector & Primary Executive Action Buttons (ALWAYS VISIBLE) */}
      <div className="topbar-row">
        <div className="editor-title" style={{ gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>⚡ Studio Engine</span>
            <span className="editor-title-badge">{gameType === 'TIME_ARROW' ? 'TAL' : 'BAL'}</span>
          </div>

          <select
            value={gameType}
            onChange={(e) => setGameType(e.target.value)}
            style={{
              background: 'var(--ed-bg-card)',
              color: 'var(--ed-accent)',
              border: '1px solid var(--ed-border)',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '800',
              padding: '4px 10px',
              cursor: 'pointer'
            }}
            title="Switch Game Type (Brain Arrow vs Time Arrow)"
          >
            <option value="BRAIN_ARROW">🧠 Brain Arrow ({balCount} levels)</option>
            <option value="TIME_ARROW">⏱️ Time Arrow ({talCount} levels)</option>
          </select>

          {/* Auto Next Level Toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: 'var(--ed-text-muted)', cursor: 'pointer', marginLeft: '8px' }}>
            <input
              type="checkbox"
              checked={autoNextLevel}
              onChange={(e) => setAutoNextLevel(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Auto Next Level
          </label>

          {/* Unsaved Changes Indicator */}
          {hasUnsavedChanges && (
            <span style={{ fontSize: '10px', color: 'var(--ed-warning)', fontWeight: 800, background: 'rgba(245, 158, 11, 0.15)', padding: '2px 8px', borderRadius: '12px', border: '1px solid var(--ed-warning)' }}>
              ● Unsaved Changes
            </span>
          )}
        </div>

        {/* PRIMARY EXECUTIVE ACTIONS */}
        <div className="toolbar-actions">
          {/* 📂 Open Level Browser */}
          <button
            className="toolbar-btn"
            onClick={onOpenProjectBrowser}
            title="Browse, Search, Load, and Play all saved project levels"
          >
            <span>📂</span> Open Level
          </button>

          {/* 💾 Save Level */}
          <button
            className="toolbar-btn btn-save"
            onClick={onSaveToProject}
            disabled={isSaving}
            title="Save Level directly into Project & Register in Game (1-Click)"
          >
            <span>💾</span> {isSaving ? 'Saving...' : 'Save Level'}
          </button>

          {/* ▶ Play Test */}
          <button
            className="toolbar-btn btn-play"
            onClick={onPlayTest}
            title="Play Test current level with real game engine"
          >
            <span>▶</span> Play Test
          </button>

          {/* 📄 Export JSX */}
          <button
            className="toolbar-btn"
            onClick={onExportJsx}
            title="Export production JSX level code string"
          >
            <span>📄</span> Export JSX
          </button>

          {/* 📦 Export JSON */}
          <button
            className="toolbar-btn"
            onClick={onExportJson}
            title="Export raw JSON level data format"
          >
            <span>📦</span> Export JSON
          </button>

          {/* 📂 Open Source Inspector */}
          <button
            className="toolbar-btn"
            onClick={onOpenSource}
            title="Inspect & View generated level source code"
          >
            <span>🔍</span> View Source
          </button>

          {/* 📥 Import File */}
          <button
            className="toolbar-btn"
            onClick={onOpenImport}
            title="Import existing BAL*.jsx / TAL*.jsx level file"
          >
            <span>📥</span> Import
          </button>

          {/* 🗑 Delete Saved Level File */}
          <button
            className="toolbar-btn btn-danger"
            onClick={onDeleteLevel}
            title="Delete saved level file from disk"
          >
            <span>🗑</span> Delete Level
          </button>
        </div>
      </div>

      {/* Tier 2: History, Selection Tools, Grid & Zoom Controls */}
      <div className="topbar-row" style={{ paddingTop: '4px', borderTop: '1px solid var(--ed-border)' }}>
        <div className="toolbar-actions">
          <button
            className="toolbar-btn"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl + Z)"
          >
            <span>↩</span> Undo
          </button>

          <button
            className="toolbar-btn"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl + Y)"
          >
            <span>↪</span> Redo
          </button>

          <div className="toolbar-divider" />

          <button
            className="toolbar-btn"
            onClick={onRotateSelection}
            title="Rotate Selected Piece 90° (HotKey: R)"
          >
            <span>🔄</span> Rotate (R)
          </button>

          <button
            className="toolbar-btn"
            onClick={onMirrorHorizontal}
            title="Flip Selection Horizontally"
          >
            <span>↔</span> Mirror H
          </button>

          <button
            className="toolbar-btn"
            onClick={onMirrorVertical}
            title="Flip Selection Vertically"
          >
            <span>↕</span> Mirror V
          </button>

          <button
            className="toolbar-btn"
            onClick={onDuplicateSelection}
            title="Duplicate Selection"
          >
            <span>📋</span> Duplicate Selection
          </button>

          <button
            className="toolbar-btn"
            onClick={onDeleteSelection}
            title="Delete Selected Piece (Delete / Backspace)"
          >
            <span>✂</span> Delete Piece
          </button>

          <button
            className="toolbar-btn"
            onClick={onClearBoard}
            title="Clear Entire Board"
          >
            <span>⚠️</span> Clear All
          </button>
        </div>

        <div className="toolbar-actions">
          {/* Custom Grid Dimensions Inputs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '11px', color: 'var(--ed-text-muted)', fontWeight: 600 }}>Grid:</span>
            <input
              type="number"
              min="3"
              max="100"
              value={gridSize.rows}
              onChange={(e) => setGridSize({ ...gridSize, rows: Math.max(3, parseInt(e.target.value) || 10) })}
              style={{ width: '42px', height: '28px', background: 'var(--ed-bg-card)', border: '1px solid var(--ed-border)', color: '#fff', textAlign: 'center', borderRadius: '4px' }}
              title="Number of Rows"
            />
            <span style={{ fontSize: '11px', color: 'var(--ed-text-muted)' }}>×</span>
            <input
              type="number"
              min="3"
              max="100"
              value={gridSize.cols}
              onChange={(e) => setGridSize({ ...gridSize, cols: Math.max(3, parseInt(e.target.value) || 10) })}
              style={{ width: '42px', height: '28px', background: 'var(--ed-bg-card)', border: '1px solid var(--ed-border)', color: '#fff', textAlign: 'center', borderRadius: '4px' }}
              title="Number of Columns"
            />
          </div>

          <div className="toolbar-divider" />

          {/* Zoom Presets Dropdown */}
          <span style={{ fontSize: '11px', color: 'var(--ed-text-muted)', fontWeight: 600 }}>Zoom:</span>
          <select
            value={Math.round(zoom * 100)}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'FIT') onResetPanZoom();
              else setZoom(parseInt(val, 10) / 100);
            }}
            style={{
              background: 'var(--ed-bg-card)',
              color: '#fff',
              border: '1px solid var(--ed-border)',
              borderRadius: '4px',
              fontSize: '11px',
              padding: '3px 6px',
              cursor: 'pointer'
            }}
          >
            <option value="25">25%</option>
            <option value="50">50%</option>
            <option value="75">75%</option>
            <option value="100">100% (Actual)</option>
            <option value="125">125%</option>
            <option value="150">150%</option>
            <option value="200">200%</option>
            <option value="FIT">🎯 Fit View</option>
          </select>

          <div className="toolbar-divider" />

          {/* Live Preview Toggle */}
          <button
            className={`toolbar-btn ${showLivePreview ? 'active' : ''}`}
            onClick={() => setShowLivePreview(!showLivePreview)}
            title="Toggle Live Game Board Preview"
          >
            <span>🎮</span> Live Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
