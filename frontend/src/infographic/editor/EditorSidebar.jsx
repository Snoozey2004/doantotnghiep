import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BlockEditor from './BlockEditor';

const BLOCK_TYPES = [
  { type: 'HeroBanner', label: 'Ảnh Bìa (Hero Banner)' },
  { type: 'TextOnly', label: 'Chỉ Văn Bản' },
  { type: 'ImageLeftTextRight', label: 'Ảnh Trái - Chữ Phải' },
  { type: 'ImageRightTextLeft', label: 'Ảnh Phải - Chữ Trái' },
  { type: 'Statistics', label: 'Thống Kê' },
  { type: 'Timeline', label: 'Dòng Thời Gian' },
  { type: 'Quote', label: 'Trích Dẫn' },
  { type: 'FAQ', label: 'Câu Hỏi Thường Gặp' },
  { type: 'CTA', label: 'Kêu Gọi Hành Động' },
  { type: 'Gallery', label: 'Thư Viện Ảnh' },
  { type: 'FeaturesGrid', label: 'Đặc Điểm (Lưới)' },
  { type: 'Video', label: 'Video' },
  { type: 'RestaurantList', label: 'Gợi Ý Địa Điểm' },
  { type: 'TextImageText', label: 'Chữ - Ảnh - Chữ' }
];

function SortableItem({ block, onSelect, onToggleVisibility, onCopy, onDelete, isSelected }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '12px 15px',
    marginBottom: '8px',
    backgroundColor: isSelected ? '#e6f7ff' : '#f5f5f5',
    border: isSelected ? '1px solid #1890ff' : '1px solid #ddd',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    opacity: block.isVisible === false ? 0.6 : 1,
    position: 'relative',
    zIndex: isSelected ? 2 : 1
  };

  return (
    <div ref={setNodeRef} style={style} onClick={() => onSelect(block.id)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div {...attributes} {...listeners} style={{ cursor: 'grab', color: '#aaa', padding: '0 5px' }}>
          ⋮⋮
        </div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
            {BLOCK_TYPES.find(b => b.type === block.layoutType)?.label || block.layoutType}
          </div>
          <div style={{ fontSize: '11px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
            {block.data?.title || 'Chưa có tiêu đề'}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '5px' }}>
        <button onClick={(e) => { e.stopPropagation(); onToggleVisibility(block.id); }} title="Ẩn/Hiện" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
          {block.isVisible === false ? '👁️‍🗨️' : '👁️'}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onCopy(block); }} title="Copy" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
          📋
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(block.id); }} title="Xóa" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', color: 'red' }}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export default function EditorSidebar({ 
  blocks, 
  selectedBlockId, 
  onSelectBlock, 
  onAddBlock, 
  onPasteBlock, 
  onDeleteBlock, 
  onChangeBlockData, 
  onToggleVisibility, 
  onCopyBlock,
  onReorderBlocks
}) {
  const [view, setView] = useState('layers'); // 'layers' | 'add' | 'edit'

  useEffect(() => {
    if (selectedBlockId) {
      setView('edit');
    } else {
      setView('layers');
    }
  }, [selectedBlockId]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      onReorderBlocks(oldIndex, newIndex);
    }
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  return (
    <div className="editor-sidebar" style={{ width: '380px', borderRight: '1px solid #e0e0e0', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100%', overflowY: 'hidden' }}>
      
      {view === 'layers' && (
        <>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Layer Blocks</span>
            <button 
              onClick={onPasteBlock} 
              style={{ padding: '4px 8px', fontSize: '12px', backgroundColor: '#fff', border: '1px solid #d9d9d9', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              title="Dán Block từ bộ nhớ tạm"
            >
              📋 Dán
            </button>
          </div>
          <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
            {blocks.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', fontStyle: 'italic', padding: '20px 0' }}>
                Chưa có block nào.
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  {blocks.map(block => (
                    <SortableItem 
                      key={block.id} 
                      block={block} 
                      onSelect={onSelectBlock}
                      onToggleVisibility={onToggleVisibility}
                      onCopy={onCopyBlock}
                      onDelete={onDeleteBlock}
                      isSelected={selectedBlockId === block.id}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
            
            <button
              onClick={() => { onSelectBlock(null); setView('add'); }}
              style={{ width: '100%', padding: '12px', marginTop: '20px', backgroundColor: '#1890ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
            >
              + Thêm Block Mới
            </button>
          </div>
        </>
      )}

      {view === 'add' && (
        <>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => setView('layers')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '16px' }}>←</button>
            <span>Thêm Block Mới</span>
          </div>
          <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
            {BLOCK_TYPES.map(b => (
              <div 
                key={b.type} 
                onClick={() => {
                  onAddBlock(b.type);
                }}
                style={{ 
                  padding: '12px 15px', 
                  marginBottom: '10px', 
                  backgroundColor: '#f9f9f9', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: '#444',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eef'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
              >
                + {b.label}
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'edit' && selectedBlock && (
        <>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => { onSelectBlock(null); setView('layers'); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '16px' }}>←</button>
            <span>Tùy chỉnh Block</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <BlockEditor selectedBlock={selectedBlock} onChangeBlockData={onChangeBlockData} />
          </div>
        </>
      )}

    </div>
  );
}
