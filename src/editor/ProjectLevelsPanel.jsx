import React, { useState, useMemo } from 'react';
import { ALL_HANDCRAFTED_LEVELS } from '../levels/index';
import { ALL_TIME_ARROW_LEVELS } from '../timeArrow/levels/index';

export const ProjectLevelsPanel = ({
  isOpen,
  gameType,
  onClose,
  onLoadLevel,
  onPlayLevel,
  onDuplicateLevel,
  onDeleteLevel,
  onOpenSource
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const levelsList = useMemo(() => {
    const rawList = gameType === 'TIME_ARROW' ? ALL_TIME_ARROW_LEVELS : ALL_HANDCRAFTED_LEVELS;
    const prefix = gameType === 'TIME_ARROW' ? 'TAL' : 'BAL';

    return rawList.map((lvl, idx) => {
      const idNum = lvl.id || idx + 1;
      const rows = lvl.size ? lvl.size.rows : (lvl.gridSize || 10);
      const cols = lvl.size ? lvl.size.cols : (lvl.gridSize || 10);
      const arrowCount = lvl.board ? lvl.board.length : (lvl.arrows ? lvl.arrows.length : 0);

      return {
        idNum,
        tag: `${prefix}${idNum}`,
        name: lvl.name || `Level ${idNum}`,
        difficulty: lvl.difficulty || 'Easy',
        dimensions: `${rows}×${cols}`,
        arrowCount,
        rawObj: lvl
      };
    });
  }, [gameType]);

  const filteredLevels = useMemo(() => {
    if (!searchTerm.trim()) return levelsList;
    const term = searchTerm.toLowerCase().trim();
    return levelsList.filter((item) => {
      return (
        item.tag.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.difficulty.toLowerCase().includes(term) ||
        String(item.idNum).includes(term)
      );
    });
  }, [levelsList, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="export-modal-backdrop">
      <div className="export-modal" style={{ width: '600px', maxHeight: '85vh' }}>
        {/* Header */}
        <div className="export-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📂 Project Levels Browser ({gameType === 'TIME_ARROW' ? 'Time Arrow' : 'Brain Arrow'})</span>
            <span style={{ fontSize: '11px', background: 'var(--ed-accent)', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
              {filteredLevels.length} Levels
            </span>
          </div>
          <button className="toolbar-btn" onClick={onClose}>✕</button>
        </div>

        {/* Search Bar */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--ed-border)', background: 'var(--ed-bg-card)' }}>
          <input
            type="text"
            className="property-input"
            style={{ width: '100%' }}
            placeholder="Search Level... (e.g. 1, 25, BAL45, Easy, Hard)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        {/* Level List */}
        <div style={{ padding: '12px 16px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '450px' }}>
          {filteredLevels.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--ed-text-muted)', fontSize: '13px' }}>
              No levels matched search criteria "{searchTerm}"
            </div>
          ) : (
            filteredLevels.map((item) => {
              const isSelected = selectedItem?.tag === item.tag;
              return (
                <div
                  key={item.tag}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: isSelected ? 'var(--ed-bg-hover)' : 'var(--ed-bg-card)',
                    border: `1px solid ${isSelected ? 'var(--ed-accent)' : 'var(--ed-border)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedItem(item)}
                  onDoubleClick={() => {
                    onPlayLevel(item.rawObj);
                    onClose();
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--ed-accent)', width: '60px' }}>
                      {item.tag}
                    </span>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700 }}>{item.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--ed-text-muted)' }}>
                        {item.dimensions} • {item.arrowCount} arrows
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: item.difficulty === 'Easy' ? 'rgba(16,185,129,0.2)' : item.difficulty === 'Medium' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
                        color: item.difficulty === 'Easy' ? '#10b981' : item.difficulty === 'Medium' ? '#f59e0b' : '#ef4444'
                      }}
                    >
                      {item.difficulty}
                    </span>

                    {/* Quick Action Buttons */}
                    <button
                      className="toolbar-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLoadLevel(item.rawObj);
                        onClose();
                      }}
                      title="Load Level into Canvas Editor"
                      style={{ padding: '2px 8px', height: '26px', fontSize: '11px' }}
                    >
                      Load
                    </button>

                    <button
                      className="toolbar-btn active"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayLevel(item.rawObj);
                        onClose();
                      }}
                      title="Play Test Level in Game Engine"
                      style={{ padding: '2px 8px', height: '26px', fontSize: '11px', background: '#3b82f6', color: '#fff' }}
                    >
                      Play
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--ed-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--ed-bg-panel)' }}>
          <span style={{ fontSize: '11px', color: 'var(--ed-text-muted)' }}>
            💡 Double-click any level item to play test immediately
          </span>
          <button className="toolbar-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectLevelsPanel;
