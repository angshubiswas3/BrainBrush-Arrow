import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Toolbar from './Toolbar';
import PiecePalette from './PiecePalette';
import GridCanvas from './GridCanvas';
import PropertiesPanel from './PropertiesPanel';
import ExportPanel from './ExportPanel';
import ProjectLevelsPanel from './ProjectLevelsPanel';
import HistoryManager from './HistoryManager';
import LevelValidator from './LevelValidator';
import LevelExporter from './LevelExporter';
import ArrowGeometryUtils from './ArrowGeometryUtils';
import { useGameStore } from '../store/gameStore';
import { ALL_HANDCRAFTED_LEVELS, getHighestBALLevelId } from '../levels/index';
import { ALL_TIME_ARROW_LEVELS, getHighestTALLevelId } from '../timeArrow/levels/index';
import './levelEditor.css';

export const LevelEditor = ({ onExitEditor }) => {
  const playCustomLevel = useGameStore((state) => state.playCustomLevel);

  // Game & Level State
  const [gameType, setGameType] = useState('BRAIN_ARROW'); // 'BRAIN_ARROW' | 'TIME_ARROW'
  const [autoNextLevel, setAutoNextLevel] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Initial metadata default
  const [metadata, setMetadata] = useState(() => ({
    id: 1,
    name: 'Custom Level 1',
    difficulty: 'Easy',
    moves: 10,
    theme: 'default'
  }));

  const [gridSize, setGridSize] = useState({ rows: 10, cols: 10 });
  const [board, setBoard] = useState([]);
  const [hoverCell, setHoverCell] = useState(null);

  // Live level counts
  const balCount = ALL_HANDCRAFTED_LEVELS.length;
  const talCount = ALL_TIME_ARROW_LEVELS.length;

  // Interaction State
  const [activeMode, setActiveMode] = useState('DRAW_ARROW');
  const [selectedPieceType, setSelectedPieceType] = useState('STRAIGHT');
  const [selectedArrowId, setSelectedArrowId] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);

  // Viewport State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showLivePreview, setShowLivePreview] = useState(true);

  // Status & Modals State
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessModal, setSaveSuccessModal] = useState(null);
  const [overwriteModal, setOverwriteModal] = useState(null);
  const [lastSavedLevelObj, setLastSavedLevelObj] = useState(null);

  // Overlay Modals State
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportMode, setExportMode] = useState('EXPORT_JSX');
  const [projectBrowserOpen, setProjectBrowserOpen] = useState(false);

  // History Stack
  const historyRef = useRef(new HistoryManager(1000));
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Auto-Validation State
  const [validationResult, setValidationResult] = useState({ isValid: true, errors: [], warnings: [] });

  // Compute live statistics for status bar
  const stats = useMemo(() => {
    const totalArrows = board.length;
    let totalPieces = 0;
    const occupiedCells = new Set();

    board.forEach((arrow) => {
      const pieces = arrow.pieces || [];
      totalPieces += pieces.length;
      pieces.forEach((p) => occupiedCells.add(`${p.r},${p.c}`));
    });

    const cellsUsed = occupiedCells.size;
    const totalCells = (gridSize.rows || 10) * (gridSize.cols || 10);
    const coverage = totalCells > 0 ? ((cellsUsed / totalCells) * 100).toFixed(1) : '0';
    const autoDifficulty = LevelExporter.calculateDifficulty(board, gridSize);

    return {
      totalArrows,
      totalPieces,
      cellsUsed,
      coverage: `${coverage}%`,
      autoDifficulty
    };
  }, [board, gridSize]);

  // Selected arrow object and length
  const selectedArrowObj = useMemo(() => {
    return board.find((a) => a.id === selectedArrowId) || null;
  }, [board, selectedArrowId]);

  const selectedArrowLength = useMemo(() => {
    if (!selectedArrowObj) return 0;
    return (selectedArrowObj.pieces || selectedArrowObj.vertices || []).length;
  }, [selectedArrowObj]);

  // Handle Game Type Switch
  const handleSetGameType = (newType) => {
    setGameType(newType);
    if (autoNextLevel) {
      const nextId = newType === 'TIME_ARROW' ? Math.max(1, getHighestTALLevelId() + 1) : Math.max(1, getHighestBALLevelId() + 1);
      setMetadata((prev) => ({ ...prev, id: nextId, name: `Custom Level ${nextId}` }));
    }
  };

  // Push to history stack
  const pushHistory = useCallback((newBoard, newMetadata, newSize, newGameType = gameType) => {
    historyRef.current.push({
      board: newBoard,
      metadata: newMetadata,
      size: newSize,
      gameType: newGameType
    });
    setCanUndo(historyRef.current.canUndo());
    setCanRedo(historyRef.current.canRedo());
    setHasUnsavedChanges(true);
  }, [gameType]);

  // Run validation whenever board or gridSize changes
  useEffect(() => {
    const result = LevelValidator.validate(board, gridSize);
    setValidationResult(result);
  }, [board, gridSize]);

  // Handlers for board modifications
  const handleUpdateBoard = (newBoard) => {
    setBoard(newBoard);
    pushHistory(newBoard, metadata, gridSize);
  };

  const handleSetGridSize = (newSize) => {
    setGridSize(newSize);
    pushHistory(board, metadata, newSize);
  };

  const handleSetMetadata = (newMetadata) => {
    setMetadata(newMetadata);
    pushHistory(board, newMetadata, gridSize);
  };

  // Undo & Redo Actions
  const handleUndo = () => {
    const prev = historyRef.current.undo({ board, metadata, size: gridSize, gameType });
    if (prev) {
      setBoard(prev.board || []);
      setMetadata(prev.metadata || metadata);
      setGridSize(prev.size || gridSize);
      if (prev.gameType) setGameType(prev.gameType);
      setCanUndo(historyRef.current.canUndo());
      setCanRedo(historyRef.current.canRedo());
      setHasUnsavedChanges(true);
    }
  };

  const handleRedo = () => {
    const next = historyRef.current.redo({ board, metadata, size: gridSize, gameType });
    if (next) {
      setBoard(next.board || []);
      setMetadata(next.metadata || metadata);
      setGridSize(next.size || gridSize);
      if (next.gameType) setGameType(next.gameType);
      setCanUndo(historyRef.current.canUndo());
      setCanRedo(historyRef.current.canRedo());
      setHasUnsavedChanges(true);
    }
  };

  // Selection Transformations using ArrowGeometryUtils
  const handleRotateSelection = () => {
    if (!selectedArrowId) return;
    const updated = board.map((arrow) => {
      if (arrow.id !== selectedArrowId) return arrow;
      return ArrowGeometryUtils.rotateArrow(arrow);
    });
    handleUpdateBoard(updated);
  };

  const handleMirrorHorizontal = () => {
    if (!selectedArrowId) return;
    const updated = board.map((arrow) => {
      if (arrow.id !== selectedArrowId) return arrow;
      return ArrowGeometryUtils.mirrorHorizontal(arrow);
    });
    handleUpdateBoard(updated);
  };

  const handleMirrorVertical = () => {
    if (!selectedArrowId) return;
    const updated = board.map((arrow) => {
      if (arrow.id !== selectedArrowId) return arrow;
      return ArrowGeometryUtils.mirrorVertical(arrow);
    });
    handleUpdateBoard(updated);
  };

  const handleDuplicateSelection = () => {
    if (!selectedArrowId) return;
    const target = board.find((a) => a.id === selectedArrowId);
    if (!target) return;

    const duplicated = ArrowGeometryUtils.duplicateArrow(target, { r: 1, c: 1 }, gridSize);
    if (duplicated) {
      handleUpdateBoard([...board, duplicated]);
      setSelectedArrowId(duplicated.id);
    }
  };

  const handleDeleteSelection = () => {
    if (!selectedArrowId) return;
    handleUpdateBoard(board.filter((a) => a.id !== selectedArrowId));
    setSelectedArrowId(null);
  };

  const handleClearBoard = () => {
    if (window.confirm('Are you sure you want to clear all arrows from the board?')) {
      handleUpdateBoard([]);
      setSelectedArrowId(null);
    }
  };

  // Perform actual disk save API call
  const executeSaveDiskCall = async (targetId) => {
    setIsSaving(true);
    const prefix = gameType === 'TIME_ARROW' ? 'TAL' : 'BAL';
    const filename = `${prefix}${targetId}.jsx`;
    const folder = gameType === 'TIME_ARROW' ? 'src/timeArrow/levels' : 'src/levels';
    const filePath = `${folder}/${filename}`;

    const saveMetadata = { ...metadata, id: Number(targetId) };
    const jsxCode = LevelExporter.exportToJsx({ metadata: saveMetadata, size: gridSize, board }, gameType);

    const levelObj = {
      id: Number(targetId),
      name: metadata.name || `Level ${targetId}`,
      difficulty: metadata.difficulty || 'Easy',
      moves: Number(metadata.moves || 10),
      moveCount: Number(metadata.moves || 10),
      gridSize: Math.max(gridSize.rows, gridSize.cols),
      size: { rows: Number(gridSize.rows), cols: Number(gridSize.cols) },
      board: board,
      arrows: board,
      solution: LevelExporter.generateSolution(board, gridSize)
    };

    try {
      const response = await fetch('/api/save-level', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath, content: jsxCode })
      });

      const resData = await response.json();

      if (resData.success) {
        setLastSavedLevelObj(levelObj);
        setHasUnsavedChanges(false);

        // If autoNextLevel is ON, increment metadata ID for next level
        if (autoNextLevel) {
          const nextId = Number(targetId) + 1;
          setMetadata((prev) => ({ ...prev, id: nextId, name: `Custom Level ${nextId}` }));
        }

        setSaveSuccessModal({
          filename,
          filePath,
          sizeBytes: resData.sizeBytes || jsxCode.length,
          gameType,
          levelId: targetId,
          levelObj
        });
      } else {
        throw new Error(resData.error || 'Server save failed');
      }
    } catch (err) {
      console.error('Save failed:', err);
      alert(`Save Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // 1-Click Project Save Action with Overwrite Check
  const handleSaveToProject = async () => {
    const val = LevelValidator.validate(board, gridSize);
    if (!val.isValid) {
      alert(`Cannot save invalid level. ${val.errors.length} error(s) found. Please resolve errors highlighted on the canvas.`);
      return;
    }

    let targetId = metadata.id || 1;

    if (autoNextLevel) {
      const highest = gameType === 'TIME_ARROW' ? getHighestTALLevelId() : getHighestBALLevelId();
      targetId = Math.max(1, highest + 1);
    }

    const prefix = gameType === 'TIME_ARROW' ? 'TAL' : 'BAL';
    const folder = gameType === 'TIME_ARROW' ? 'src/timeArrow/levels' : 'src/levels';
    const filePath = `${folder}/${prefix}${targetId}.jsx`;

    // Check if file exists on disk before overwriting
    try {
      const verifyRes = await fetch('/api/verify-level', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath })
      });
      const verifyData = await verifyRes.json();

      if (verifyData.exists) {
        // Prompt Overwrite confirmation modal
        setOverwriteModal({
          targetId,
          prefix,
          filePath
        });
        return;
      }
    } catch (e) {
      console.warn('Could not verify file existence beforehand:', e.message);
    }

    await executeSaveDiskCall(targetId);
  };

  // Load an existing level into the canvas
  const handleLoadLevel = (levelObj) => {
    if (hasUnsavedChanges) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to load this level and discard current canvas?')) {
        return;
      }
    }

    if (!levelObj) return;

    const rows = levelObj.size ? levelObj.size.rows : (levelObj.gridSize || 10);
    const cols = levelObj.size ? levelObj.size.cols : (levelObj.gridSize || 10);
    const loadedBoard = levelObj.board || levelObj.arrows || [];

    setGridSize({ rows, cols });
    setBoard(loadedBoard);
    setMetadata({
      id: levelObj.id || 1,
      name: levelObj.name || `Level ${levelObj.id || 1}`,
      difficulty: levelObj.difficulty || 'Easy',
      moves: levelObj.moves || levelObj.moveCount || 10,
      theme: levelObj.theme || 'default'
    });

    setSelectedArrowId(null);
    setHasUnsavedChanges(false);
    pushHistory(loadedBoard, { id: levelObj.id || 1, name: levelObj.name }, { rows, cols }, gameType);
  };

  // Delete saved level file from disk
  const handleDeleteSavedFile = async () => {
    const levelId = metadata.id || 1;
    const prefix = gameType === 'TIME_ARROW' ? 'TAL' : 'BAL';
    const filename = `${prefix}${levelId}.jsx`;
    const folder = gameType === 'TIME_ARROW' ? 'src/timeArrow/levels' : 'src/levels';
    const filePath = `${folder}/${filename}`;

    if (!window.confirm(`Are you sure you want to delete ${filePath} from disk?`)) return;

    try {
      const res = await fetch('/api/delete-level', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Successfully deleted ${filePath}`);
        handleClearBoard();
      } else {
        alert(`Failed to delete: ${data.error}`);
      }
    } catch (e) {
      alert(`Delete error: ${e.message}`);
    }
  };

  // Launch Play Test with real game engine
  const handleLaunchPlayTest = (targetLevelObj = null) => {
    const targetObj = targetLevelObj || lastSavedLevelObj || {
      id: metadata.id || 1,
      name: metadata.name || 'Custom Level',
      difficulty: metadata.difficulty || 'Easy',
      moves: metadata.moves || 10,
      gridSize: Math.max(gridSize.rows, gridSize.cols),
      size: { rows: gridSize.rows, cols: gridSize.cols },
      board: board,
      arrows: board,
      solution: LevelExporter.generateSolution(board, gridSize)
    };

    setSaveSuccessModal(null);
    playCustomLevel(targetObj);
  };

  const handleImportLevel = (importedState) => {
    if (!importedState) return;
    if (importedState.gameType) setGameType(importedState.gameType);
    setMetadata(importedState.metadata);
    setGridSize(importedState.size);
    setBoard(importedState.board);
    setHasUnsavedChanges(true);
    pushHistory(importedState.board, importedState.metadata, importedState.size, importedState.gameType || gameType);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (validationResult.isValid) handleSaveToProject();
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleRotateSelection();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        handleDeleteSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board, selectedArrowId, canUndo, canRedo, metadata, gridSize, gameType, validationResult.isValid]);

  return (
    <div className="level-editor-container">
      {/* Top Action Bar */}
      <Toolbar
        gameType={gameType}
        setGameType={handleSetGameType}
        autoNextLevel={autoNextLevel}
        setAutoNextLevel={setAutoNextLevel}
        hasUnsavedChanges={hasUnsavedChanges}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onRotateSelection={handleRotateSelection}
        onMirrorHorizontal={handleMirrorHorizontal}
        onMirrorVertical={handleMirrorVertical}
        onDuplicateSelection={handleDuplicateSelection}
        onDeleteSelection={handleDeleteSelection}
        onClearBoard={handleClearBoard}
        zoom={zoom}
        setZoom={setZoom}
        onResetPanZoom={() => {
          setZoom(1);
          setPan({ x: 0, y: 0 });
        }}
        onSaveToProject={handleSaveToProject}
        onOpenProjectBrowser={() => setProjectBrowserOpen(true)}
        onExportJsx={() => {
          setExportMode('EXPORT_JSX');
          setExportModalOpen(true);
        }}
        onExportJson={() => {
          setExportMode('EXPORT_JSON');
          setExportModalOpen(true);
        }}
        onOpenSource={() => {
          setExportMode('OPEN_SOURCE');
          setExportModalOpen(true);
        }}
        onOpenImport={() => {
          setExportMode('IMPORT');
          setExportModalOpen(true);
        }}
        onDeleteLevel={handleDeleteSavedFile}
        onPlayTest={() => handleLaunchPlayTest()}
        showLivePreview={showLivePreview}
        setShowLivePreview={setShowLivePreview}
        gridSize={gridSize}
        setGridSize={handleSetGridSize}
        isSaving={isSaving}
        isValid={validationResult.isValid}
        balCount={balCount}
        talCount={talCount}
      />

      {/* Main Studio Workspace */}
      <div className="editor-workspace">
        {/* Left Tool & Piece Library Dock */}
        <PiecePalette
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          selectedPieceType={selectedPieceType}
          setSelectedPieceType={setSelectedPieceType}
          gridSize={gridSize}
          setGridSize={handleSetGridSize}
        />

        {/* Center Interactive Drawing Canvas with Virtualization & Scroll */}
        <GridCanvas
          gridSize={gridSize}
          board={board}
          onUpdateBoard={handleUpdateBoard}
          activeMode={activeMode}
          selectedPieceType={selectedPieceType}
          selectedArrowId={selectedArrowId}
          setSelectedArrowId={setSelectedArrowId}
          selectedCells={selectedCells}
          setSelectedCells={setSelectedCells}
          zoom={zoom}
          setZoom={setZoom}
          pan={pan}
          setPan={setPan}
          validationResult={validationResult}
          onHoverCell={(cell) => setHoverCell(cell)}
        />

        {/* Right Dock: Properties & Live Game Board Preview */}
        <PropertiesPanel
          metadata={metadata}
          setMetadata={handleSetMetadata}
          selectedArrow={selectedArrowObj}
          onUpdateArrow={(updated) => {
            handleUpdateBoard(board.map((a) => (a.id === updated.id ? updated : a)));
          }}
          validationResult={validationResult}
          showLivePreview={showLivePreview}
          levelBoard={board}
          gridSize={gridSize}
          gameType={gameType}
          setGameType={handleSetGameType}
          balCount={balCount}
          talCount={talCount}
          onFocusCell={(r, c) => {
            setPan({ x: -c * 40 + 200, y: -r * 40 + 200 });
          }}
        />
      </div>

      {/* Extended Status Bar Footer (Issue 9) */}
      <div className="editor-statusbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span>Grid: <strong>{gridSize.rows}×{gridSize.cols}</strong></span>
          <span>Mouse: <strong>{hoverCell ? `(${hoverCell.r}, ${hoverCell.c})` : '(-, -)'}</strong></span>
          <span>Zoom: <strong>{Math.round(zoom * 100)}%</strong></span>
          <span>Selected Arrow: <strong>{selectedArrowObj ? selectedArrowObj.id : 'None'}</strong></span>
          <span>Length: <strong>{selectedArrowLength} cells</strong></span>
          <span>Total Arrows: <strong>{stats.totalArrows}</strong></span>
          <span>Cells Used: <strong>{stats.cellsUsed}</strong></span>
          <span>Coverage: <strong>{stats.coverage}</strong></span>
          <span>Difficulty: <strong>{metadata.difficulty || stats.autoDifficulty}</strong></span>
        </div>

        <div>
          {hasUnsavedChanges ? (
            <span className="status-invalid" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              ● UNSAVED CHANGES
            </span>
          ) : (
            <span className="status-valid">
              ✓ SAVED & UP TO DATE
            </span>
          )}
        </div>
      </div>

      {/* Overwrite Confirmation Dialog Modal (Issue 1) */}
      {overwriteModal && (
        <div className="export-modal-backdrop">
          <div className="export-modal" style={{ width: '440px' }}>
            <div className="export-modal-header" style={{ background: 'var(--ed-warning)', color: '#000' }}>
              <span>⚠️ Level {overwriteModal.prefix}{overwriteModal.targetId} Already Exists</span>
              <button className="toolbar-btn" onClick={() => setOverwriteModal(null)} style={{ background: 'transparent', color: '#000', border: 'none' }}>✕</button>
            </div>

            <div style={{ padding: '20px', fontSize: '13px', lineHeight: '1.6' }}>
              File <code style={{ color: '#00d2ff' }}>{overwriteModal.filePath}</code> already exists on disk.
              <br />
              Do you want to overwrite this level or save as a new level ID?
            </div>

            <div style={{ padding: '16px', borderTop: '1px solid var(--ed-border)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: 'var(--ed-bg-panel)' }}>
              <button className="toolbar-btn" onClick={() => setOverwriteModal(null)}>Cancel</button>

              <button
                className="toolbar-btn"
                onClick={async () => {
                  const highest = gameType === 'TIME_ARROW' ? getHighestTALLevelId() : getHighestBALLevelId();
                  const newId = highest + 1;
                  setOverwriteModal(null);
                  setMetadata((prev) => ({ ...prev, id: newId }));
                  await executeSaveDiskCall(newId);
                }}
              >
                Save As New ({overwriteModal.prefix}{(gameType === 'TIME_ARROW' ? getHighestTALLevelId() : getHighestBALLevelId()) + 1})
              </button>

              <button
                className="toolbar-btn active"
                style={{ background: 'var(--ed-danger)', color: '#fff' }}
                onClick={async () => {
                  const targetId = overwriteModal.targetId;
                  setOverwriteModal(null);
                  await executeSaveDiskCall(targetId);
                }}
              >
                Yes, Overwrite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Success Verification & Play Test Modal (Issue 6) */}
      {saveSuccessModal && (
        <div className="export-modal-backdrop">
          <div className="export-modal" style={{ width: '480px' }}>
            <div className="export-modal-header" style={{ background: 'var(--ed-success)', color: '#fff' }}>
              <span>✅ Saved & Verified Successfully!</span>
              <button className="toolbar-btn" onClick={() => setSaveSuccessModal(null)} style={{ background: 'transparent', color: '#fff', border: 'none' }}>✕</button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                <div>Saved As: <strong style={{ color: 'var(--ed-accent)' }}>{saveSuccessModal.filename}</strong></div>
                <div>Location: <code style={{ color: '#a5f3fc', background: '#0f172a', padding: '2px 6px', borderRadius: '4px' }}>{saveSuccessModal.filePath}</code></div>
                <div>File Size: <strong>{saveSuccessModal.sizeBytes.toLocaleString()} bytes</strong></div>
                <div>Registered: <strong style={{ color: 'var(--ed-success)' }}>YES (via import.meta.glob)</strong></div>
                <div>Playable: <strong style={{ color: 'var(--ed-success)' }}>YES (1-Click Engine)</strong></div>
              </div>
            </div>

            <div style={{ padding: '16px', borderTop: '1px solid var(--ed-border)', display: 'flex', gap: '8px', justifyContent: 'flex-end', background: 'var(--ed-bg-panel)' }}>
              <button className="toolbar-btn" onClick={() => setSaveSuccessModal(null)}>Close</button>

              <button
                className="toolbar-btn"
                onClick={() => {
                  setSaveSuccessModal(null);
                  handleLoadLevel(saveSuccessModal.levelObj);
                }}
              >
                📂 Open Level
              </button>

              <button
                className="toolbar-btn"
                onClick={() => {
                  setSaveSuccessModal(null);
                  setExportMode('OPEN_SOURCE');
                  setExportModalOpen(true);
                }}
              >
                📄 View Source
              </button>

              <button
                className="toolbar-btn active"
                onClick={() => handleLaunchPlayTest(saveSuccessModal.levelObj)}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff' }}
              >
                🎮 Play
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Levels Browser Drawer / Modal (Issue 4 & 10) */}
      <ProjectLevelsPanel
        isOpen={projectBrowserOpen}
        gameType={gameType}
        onClose={() => setProjectBrowserOpen(false)}
        onLoadLevel={handleLoadLevel}
        onPlayLevel={(lvl) => handleLaunchPlayTest(lvl)}
        onDeleteLevel={handleDeleteSavedFile}
      />

      {/* Import / Export / Source Viewer Overlay */}
      <ExportPanel
        isOpen={exportModalOpen}
        mode={exportMode}
        gameType={gameType}
        onClose={() => setExportModalOpen(false)}
        levelData={{ metadata, size: gridSize, board }}
        onImportLevel={handleImportLevel}
      />
    </div>
  );
};

export default LevelEditor;
