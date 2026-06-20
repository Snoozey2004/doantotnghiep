import React from 'react';

export default function BlockEditor({ selectedBlock, onChangeBlockData }) {
  if (!selectedBlock) {
    return (
      <div className="block-editor" style={{ width: '300px', borderLeft: '1px solid #e0e0e0', backgroundColor: '#fff', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', flexShrink: 0 }}>
        Chọn một block để chỉnh sửa
      </div>
    );
  }

  const handleChange = (e) => {
    try {
      const parsed = JSON.parse(e.target.value);
      onChangeBlockData(selectedBlock.id, parsed);
    } catch (err) {
      // Ignore parse errors while typing
    }
  };

  return (
    <div className="block-editor" style={{ width: '300px', borderLeft: '1px solid #e0e0e0', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa', fontWeight: 'bold' }}>
        Chỉnh sửa: {selectedBlock.layoutType}
      </div>
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>Dữ liệu JSON:</p>
        <textarea 
          style={{ flex: 1, width: '100%', padding: '10px', fontFamily: 'monospace', fontSize: '0.9rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'none' }}
          defaultValue={JSON.stringify(selectedBlock.data || {}, null, 2)}
          onBlur={handleChange}
        />
        <p style={{ marginTop: '10px', fontSize: '0.8rem', color: '#999' }}>* Sửa JSON và click ra ngoài (blur) để áp dụng.</p>
      </div>
    </div>
  );
}
