import React from 'react';

export default function BlockSidebar({ blocks, onAddBlock }) {
  const blockTypes = [
    { type: 'HeroBanner', label: 'Hero Banner' },
    { type: 'TextOnly', label: 'Text Only' },
    { type: 'ImageLeftTextRight', label: 'Image Left - Text Right' },
    { type: 'ImageRightTextLeft', label: 'Image Right - Text Left' },
    { type: 'Statistics', label: 'Statistics' },
    { type: 'Timeline', label: 'Timeline' },
    { type: 'Quote', label: 'Quote' },
    { type: 'FAQ', label: 'FAQ' },
    { type: 'CTA', label: 'Call to Action' },
  ];

  return (
    <div className="block-sidebar" style={{ width: '250px', borderRight: '1px solid #e0e0e0', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa', fontWeight: 'bold' }}>
        Danh sách Blocks
      </div>
      <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
        {blockTypes.map(b => (
          <div 
            key={b.type} 
            onClick={() => onAddBlock(b.type)}
            style={{ 
              padding: '10px 15px', 
              marginBottom: '10px', 
              backgroundColor: '#f5f5f5', 
              border: '1px solid #ddd', 
              borderRadius: '4px', 
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eef'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
          >
            + {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}
