import React from 'react';
import BlockRenderer from '../renderers/BlockRenderer';

export default function PreviewPanel({ blocks, selectedBlockId, onSelectBlock, onDeleteBlock, onToggleVisibility, onMoveUp, onMoveDown, onCopyBlock }) {
  return (
    <div className="preview-panel" style={{ flex: 1, backgroundColor: '#f0f2f5', overflow: 'auto', position: 'relative' }}>
      <div style={{ width: '100%', minWidth: '1024px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', minHeight: '100%' }}>
        {blocks.length === 0 ? (
          <div style={{ padding: '50px', textAlign: 'center', color: '#888' }}>
            Chưa có block nào. Hãy chọn từ danh sách bên trái.
          </div>
        ) : (
          blocks.map((block, index) => (
            <div 
              key={block.id} 
              onClick={() => onSelectBlock(block.id)}
              style={{ 
                position: 'relative',
                border: selectedBlockId === block.id ? '2px solid #1890ff' : '2px solid transparent',
                opacity: block.isVisible === false ? 0.5 : 1,
                cursor: 'pointer'
              }}
            >
              {selectedBlockId === block.id && (
                <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10, display: 'flex', gap: '5px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '5px', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                  <button onClick={(e) => { e.stopPropagation(); onMoveUp(index); }} disabled={index === 0} title="Move Up">↑</button>
                  <button onClick={(e) => { e.stopPropagation(); onMoveDown(index); }} disabled={index === blocks.length - 1} title="Move Down">↓</button>
                  <button onClick={(e) => { e.stopPropagation(); onToggleVisibility(block.id); }} title="Toggle Visibility">
                    {block.isVisible === false ? '👁️‍🗨️' : '👁️'}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onCopyBlock(block); }} title="Copy Block">📋</button>
                  <button onClick={(e) => { e.stopPropagation(); onDeleteBlock(block.id); }} style={{ color: 'red' }} title="Delete">🗑️</button>
                </div>
              )}
              <div style={{ pointerEvents: 'none' }}>
                <BlockRenderer block={block} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
