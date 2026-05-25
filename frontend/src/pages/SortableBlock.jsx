import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableBlock({ id, block, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: 'grid',
    gridTemplateColumns: '1fr auto auto',
    gap: 12,
    marginBottom: 10,
    alignItems: 'center',
    padding: 12,
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    background: 'white'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div {...listeners} style={{ cursor: 'grab', padding: 6, borderRadius: 6, background: '#f1f5f9' }}>≡</div>
        <div>
          <div><strong>{block.blockType}</strong> - {block.title}</div>
          <div style={{ color: '#64748b', fontSize: 12 }}>Sort: {block.sortOrder} · {block.isEnabled ? 'Enabled' : 'Disabled'}</div>
        </div>
      </div>
      <button className="btn btn-outline btn-sm" type="button" onClick={onEdit}>
        Sửa
      </button>
      <button className="btn btn-outline btn-sm" type="button" onClick={onDelete}>
        Xoá
      </button>
    </div>
  );
}
