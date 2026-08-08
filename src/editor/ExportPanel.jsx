import React, { useState, useEffect } from 'react';
import LevelExporter from './LevelExporter';

export const ExportPanel = ({
  isOpen,
  mode = 'EXPORT_JSX', // 'EXPORT_JSX' | 'EXPORT_JSON' | 'OPEN_SOURCE' | 'IMPORT'
  gameType = 'BRAIN_ARROW',
  onClose,
  levelData,
  onImportLevel
}) => {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const prefix = gameType === 'TIME_ARROW' ? 'TAL' : 'BAL';
  const levelId = levelData?.metadata?.id || 1;
  const filename = `${prefix}${levelId}.${mode === 'EXPORT_JSON' ? 'json' : 'jsx'}`;

  useEffect(() => {
    if (!isOpen) return;

    if (mode === 'EXPORT_JSX' || mode === 'OPEN_SOURCE') {
      const generatedCode = LevelExporter.exportToJsx(levelData, gameType);
      setCode(generatedCode);
      setError(null);
    } else if (mode === 'EXPORT_JSON') {
      const { metadata = {}, size = { rows: 10, cols: 10 }, board = [] } = levelData;
      const jsonObj = {
        id: Number(metadata.id || 1),
        name: metadata.name || `Level ${metadata.id || 1}`,
        difficulty: metadata.difficulty || 'Easy',
        moves: Number(metadata.moves || 10),
        gridSize: Math.max(size.rows, size.cols),
        size: { rows: Number(size.rows), cols: Number(size.cols) },
        theme: metadata.theme || 'default',
        arrows: board,
        board: board,
        solution: LevelExporter.generateSolution(board, size)
      };
      setCode(JSON.stringify(jsonObj, null, 2));
      setError(null);
    } else if (mode === 'IMPORT') {
      setCode('');
      setError(null);
    }
  }, [isOpen, mode, levelData, gameType]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const mime = mode === 'EXPORT_JSON' ? 'application/json' : 'text/javascript';
    const blob = new Blob([code], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    setError(null);
    const imported = LevelExporter.importFromCode(code);
    if (imported) {
      onImportLevel(imported);
      onClose();
    } else {
      setError('Invalid level format. Please paste a valid BAL*.jsx or TAL*.jsx level export.');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target.result;
      setCode(content);
    };
    reader.readAsText(file);
  };

  const getTitle = () => {
    if (mode === 'EXPORT_JSX') return `📄 Export Production JSX (${filename})`;
    if (mode === 'EXPORT_JSON') return `📦 Export Raw Level JSON (${filename})`;
    if (mode === 'OPEN_SOURCE') return `📂 Source Code Inspector (${filename})`;
    return `📥 Import Level Code`;
  };

  return (
    <div className="export-modal-backdrop">
      <div className="export-modal">
        <div className="export-modal-header">
          <span>{getTitle()}</span>
          <button className="toolbar-btn" onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '16px' }}>
          {mode !== 'IMPORT' ? (
            <p style={{ fontSize: '12px', color: 'var(--ed-text-muted)', margin: 0 }}>
              100% compatible with your existing game engine architecture (`{filename}`).
            </p>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '12px', color: 'var(--ed-text-muted)', margin: 0 }}>
                Paste the contents of any `BAL*.jsx` or `TAL*.jsx` file, or select a file to import.
              </p>
              <input
                type="file"
                accept=".jsx,.js,.json"
                onChange={handleFileUpload}
                style={{ fontSize: '12px' }}
              />
            </div>
          )}
        </div>

        <textarea
          className="export-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={mode === 'IMPORT' ? 'Paste level code here...' : ''}
          readOnly={mode === 'OPEN_SOURCE'}
        />

        {error && (
          <div style={{ color: 'var(--ed-danger)', padding: '0 16px 8px 16px', fontSize: '12px', fontWeight: 600 }}>
            ⚠ {error}
          </div>
        )}

        <div style={{ padding: '16px', borderTop: '1px solid var(--ed-border)', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button className="toolbar-btn" onClick={onClose}>Close</button>

          {mode !== 'IMPORT' ? (
            <>
              <button className="toolbar-btn" onClick={handleCopy}>
                {copied ? '✓ Copied!' : '📋 Copy Code'}
              </button>
              <button className="toolbar-btn active" onClick={handleDownload}>
                💾 Download {filename}
              </button>
            </>
          ) : (
            <button className="toolbar-btn active" onClick={handleImportSubmit}>
              📥 Import to Canvas
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;
