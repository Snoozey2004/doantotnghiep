import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Font,
  Alignment,
  Link,
  List,
  Heading,
  BlockQuote
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import { uploadApi } from '../../api/uploadApi';

const LAYOUT_SCHEMAS = {
  HeroBanner: [
    { key: 'title', label: 'Tiêu đề', type: 'string' },
    { key: 'description', label: 'Mô tả', type: 'textarea' },
    { key: 'image', label: 'Ảnh Background (URL)', type: 'image' },
  ],
  TextOnly: [
    { key: 'title', label: 'Tiêu đề', type: 'string' },
    { key: 'content', label: 'Nội dung', type: 'textarea' },
    { key: 'backgroundColor', label: 'Màu nền', type: 'color' }
  ],
  ImageLeftTextRight: [
    { key: 'title', label: 'Tiêu đề', type: 'string' },
    { key: 'content', label: 'Nội dung', type: 'textarea' },
    { key: 'image', label: 'Ảnh đính kèm (URL)', type: 'image' },
    { key: 'backgroundColor', label: 'Màu nền', type: 'color' }
  ],
  ImageRightTextLeft: [
    { key: 'title', label: 'Tiêu đề', type: 'string' },
    { key: 'content', label: 'Nội dung', type: 'textarea' },
    { key: 'image', label: 'Ảnh đính kèm (URL)', type: 'image' },
    { key: 'backgroundColor', label: 'Màu nền', type: 'color' }
  ],
  Statistics: [
    { key: 'title', label: 'Tiêu đề Thống kê', type: 'string' },
    { key: 'backgroundColor', label: 'Màu nền', type: 'color' },
    {
      key: 'items', label: 'Danh sách Số liệu', type: 'array', itemSchema: [
        { key: 'label', label: 'Nhãn (VD: Năm)', type: 'string' },
        { key: 'value', label: 'Giá trị (VD: 100+)', type: 'string' }
      ]
    }
  ],
  Timeline: [
    { key: 'title', label: 'Tiêu đề Lịch sử', type: 'string' },
    { key: 'backgroundColor', label: 'Màu nền', type: 'color' },
    {
      key: 'steps', label: 'Các mốc thời gian', type: 'array', itemSchema: [
        { key: 'year', label: 'Năm/Mốc', type: 'string' },
        { key: 'title', label: 'Tiêu đề', type: 'string' },
        { key: 'description', label: 'Mô tả chi tiết', type: 'textarea' }
      ]
    }
  ],
  Quote: [
    { key: 'content', label: 'Câu trích dẫn', type: 'textarea' },
    { key: 'author', label: 'Tác giả', type: 'string' },
    { key: 'backgroundColor', label: 'Màu nền', type: 'color' }
  ],
  FAQ: [
    { key: 'title', label: 'Tiêu đề FAQ', type: 'string' },
    { key: 'backgroundColor', label: 'Màu nền', type: 'color' },
    {
      key: 'items', label: 'Danh sách câu hỏi', type: 'array', itemSchema: [
        { key: 'question', label: 'Câu hỏi', type: 'string' },
        { key: 'answer', label: 'Trả lời', type: 'textarea' }
      ]
    }
  ],
  CTA: [
    { key: 'title', label: 'Tiêu đề hành động', type: 'string' },
    { key: 'content', label: 'Mô tả', type: 'textarea' },
    { key: 'buttonText', label: 'Tên nút', type: 'string' },
    { key: 'buttonLink', label: 'Link đích (URL)', type: 'string' },
    { key: 'backgroundColor', label: 'Màu nền', type: 'color' }
  ],
  Gallery: [
    { key: 'title', label: 'Tiêu đề Thư viện', type: 'string' },
    { key: 'description', label: 'Mô tả', type: 'textarea' },
    { key: 'backgroundColor', label: 'Màu nền', type: 'color' },
    {
      key: 'images', label: 'Danh sách Ảnh', type: 'array', itemSchema: [
        { key: 'url', label: 'Ảnh (URL)', type: 'image' },
        { key: 'alt', label: 'Mô tả ảnh', type: 'string' }
      ]
    }
  ],
  FeaturesGrid: [
    { key: 'title', label: 'Tiêu đề', type: 'string' },
    { key: 'subtitle', label: 'Mô tả ngắn', type: 'textarea' },
    { key: 'backgroundColor', label: 'Màu nền', type: 'color' },
    {
      key: 'items', label: 'Danh sách Đặc điểm', type: 'array', itemSchema: [
        { key: 'image', label: 'Ảnh Minh Họa', type: 'image' },
        { key: 'title', label: 'Tên Đặc điểm', type: 'string' },
        { key: 'description', label: 'Mô tả chi tiết', type: 'textarea' },
        { key: 'tag', label: 'Nhãn/Tag', type: 'string' }
      ]
    }
  ],
  Video: [
    { key: 'title', label: 'Tiêu đề Video', type: 'string' },
    { key: 'videoUrl', label: 'Đường dẫn Video (Youtube/MP4)', type: 'string' },
    { key: 'backgroundColor', label: 'Màu nền', type: 'color' }
  ]
};

// --- Rich Text Drawer ---

function RichTextDrawer({ config, onClose }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (config) setContent(config.value || '');
  }, [config]);

  if (!config) return null;

  const handleSave = () => {
    config.onChange(content);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: '64px', right: '380px', width: '600px', bottom: 0, backgroundColor: '#fff', boxShadow: '-5px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column', borderLeft: '1px solid #ddd' }}>
      <style>{`.ck-editor__editable_inline { min-height: 400px; }`}</style>
      <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>Soạn thảo: {config.label}</h3>
        <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '20px', cursor: 'pointer', color: '#888' }}>&times;</button>
      </div>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <CKEditor
          editor={ClassicEditor}
          config={{
            licenseKey: 'GPL',
            plugins: [
              Essentials,
              Paragraph,
              Bold,
              Italic,
              Underline,
              Strikethrough,
              Font,
              Alignment,
              Link,
              List,
              Heading,
              BlockQuote
            ],
            toolbar: [
              'heading',
              '|',
              'fontSize',
              'fontColor',
              'fontBackgroundColor',
              '|',
              'bold',
              'italic',
              'underline',
              'strikethrough',
              '|',
              'alignment',
              '|',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'blockQuote',
              '|',
              'undo',
              'redo'
            ]
          }}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
      </div>
      <div style={{ padding: '15px 20px', borderTop: '1px solid #e0e0e0', backgroundColor: '#fafafa', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button onClick={onClose} style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}>Hủy</button>
        <button onClick={handleSave} style={{ padding: '8px 15px', border: 'none', borderRadius: '4px', background: '#1890ff', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Lưu nội dung</button>
      </div>
    </div>
  );
}

// --- Form Controls ---

function StringInput({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', textTransform: 'uppercase' }}>
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
        onFocus={e => e.target.style.borderColor = '#40a9ff'}
        onBlur={e => e.target.style.borderColor = '#d9d9d9'}
      />
    </div>
  );
}

function TextAreaInput({ label, value, onChange, onOpenRichText }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555', textTransform: 'uppercase' }}>
          {label}
        </label>
        <button
          onClick={() => onOpenRichText(label, value, onChange)}
          style={{ fontSize: '11px', padding: '4px 8px', backgroundColor: '#e6f7ff', color: '#1890ff', border: '1px solid #91d5ff', borderRadius: '4px', cursor: 'pointer' }}
        >
          📝 Soạn văn bản
        </button>
      </div>
      <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', fontSize: '14px', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s' }}
        onFocus={e => e.target.style.borderColor = '#40a9ff'}
        onBlur={e => e.target.style.borderColor = '#d9d9d9'}
      />
    </div>
  );
}

function ColorInput({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', textTransform: 'uppercase' }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="color"
          value={value || '#ffffff'}
          onChange={e => onChange(e.target.value)}
          style={{ width: '40px', height: '40px', padding: '0', border: '1px solid #d9d9d9', borderRadius: '4px', cursor: 'pointer' }}
        />
        <input
          type="text"
          value={value || '#ffffff'}
          onChange={e => onChange(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
        />
      </div>
    </div>
  );
}

function ImageInput({ label, value, onChange }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    try {
      const result = await uploadApi.upload(file, "infographics", null, "infographic-block", "IMG");
      onChange(result.url);
    } catch (err) {
      console.error(err);
      setUploadError("Tải ảnh lên thất bại");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', textTransform: 'uppercase' }}>
        <span>{label}</span>
        <label style={{
          fontSize: '11px',
          padding: '4px 8px',
          backgroundColor: '#e6f7ff',
          color: '#1890ff',
          border: '1px solid #91d5ff',
          borderRadius: '4px',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          textTransform: 'none',
          fontWeight: 'normal',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {isUploading ? '⏳ Đang tải...' : '⬆️ Tải ảnh lên'}
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} disabled={isUploading} />
        </label>
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder="Hoặc nhập đường dẫn ảnh (http://...)"
        style={{ width: '100%', padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', fontSize: '14px', outline: 'none', marginBottom: '5px', boxSizing: 'border-box' }}
      />
      {uploadError && <div style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{uploadError}</div>}
      {value && (
        <div style={{ width: '100%', height: '100px', backgroundColor: '#f5f5f5', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d9d9d9' }}>
          <img src={value} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="color:#999;font-size:12px">Ảnh lỗi / Không hiển thị được</span>' }} />
        </div>
      )}
    </div>
  );
}

function ArrayInput({ label, value, itemSchema, onChange, onOpenRichText }) {
  const items = Array.isArray(value) ? value : [];

  const handleAddItem = () => {
    const newItem = {};
    itemSchema.forEach(field => { newItem[field.key] = ''; });
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleChangeItem = (index, key, val) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: val };
    onChange(newItems);
  };

  const moveItem = (index, direction) => {
    if (index + direction < 0 || index + direction >= items.length) return;
    const newItems = [...items];
    const temp = newItems[index + direction];
    newItems[index + direction] = newItems[index];
    newItems[index] = temp;
    onChange(newItems);
  };

  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fafafa', border: '1px solid #eaeaea', borderRadius: '6px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '15px', textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
        {label}
      </label>

      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '4px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#888' }}>ITEM #{index + 1}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button onClick={() => moveItem(index, -1)} disabled={index === 0} style={{ padding: '2px 6px', fontSize: '12px', cursor: index === 0 ? 'not-allowed' : 'pointer' }}>↑</button>
              <button onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} style={{ padding: '2px 6px', fontSize: '12px', cursor: index === items.length - 1 ? 'not-allowed' : 'pointer' }}>↓</button>
              <button onClick={() => handleRemoveItem(index)} style={{ padding: '2px 6px', fontSize: '12px', color: 'red', cursor: 'pointer' }}>Xóa</button>
            </div>
          </div>

          {itemSchema.map(field => (
            <FieldRenderer
              key={field.key}
              field={field}
              value={item[field.key]}
              onChange={(val) => handleChangeItem(index, field.key, val)}
              onOpenRichText={onOpenRichText}
            />
          ))}
        </div>
      ))}

      <button
        onClick={handleAddItem}
        style={{ width: '100%', padding: '10px', backgroundColor: '#fff', border: '1px dashed #1890ff', color: '#1890ff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        + Thêm Mới
      </button>
    </div>
  );
}

function FieldRenderer({ field, value, onChange, onOpenRichText }) {
  switch (field.type) {
    case 'string':
      return <StringInput label={field.label} value={value} onChange={onChange} />;
    case 'textarea':
      return <TextAreaInput label={field.label} value={value} onChange={onChange} onOpenRichText={onOpenRichText} />;
    case 'color':
      return <ColorInput label={field.label} value={value} onChange={onChange} />;
    case 'image':
      return <ImageInput label={field.label} value={value} onChange={onChange} />;
    case 'array':
      return <ArrayInput label={field.label} value={value} itemSchema={field.itemSchema} onChange={onChange} onOpenRichText={onOpenRichText} />;
    default:
      return null;
  }
}

// --- Main Editor Component ---

export default function BlockEditor({ selectedBlock, onChangeBlockData }) {
  const [localData, setLocalData] = useState({});
  const [richTextConfig, setRichTextConfig] = useState(null);

  // Sync localData when a new block is selected or external changes happen
  useEffect(() => {
    if (selectedBlock) {
      setLocalData(selectedBlock.data || {});
      setRichTextConfig(null); // Close rich text if switching blocks
    }
  }, [selectedBlock]);

  if (!selectedBlock) {
    return (
      <div className="block-editor" style={{ width: '100%', backgroundColor: '#fff', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
        Chưa có block nào được chọn.
      </div>
    );
  }

  const schema = LAYOUT_SCHEMAS[selectedBlock.layoutType] || [];

  const handleFieldChange = (key, val) => {
    const newData = { ...localData, [key]: val };
    setLocalData(newData);
    onChangeBlockData(selectedBlock.id, newData);
  };

  const handleOpenRichText = (label, value, onChange) => {
    setRichTextConfig({ label, value, onChange });
  };

  return (
    <>
      <div className="block-editor" style={{ width: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#001529', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>⚙️</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Tùy chỉnh Block</span>
            <span style={{ fontSize: '12px', color: '#aaa' }}>{selectedBlock.layoutType}</span>
          </div>
        </div>

        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          {schema.length === 0 ? (
            <div style={{ color: '#888', fontStyle: 'italic', fontSize: '13px' }}>
              Không có cấu hình nào cho layout <b>{selectedBlock.layoutType}</b>.
            </div>
          ) : (
            schema.map(field => (
              <FieldRenderer
                key={field.key}
                field={field}
                value={localData[field.key]}
                onChange={(val) => handleFieldChange(field.key, val)}
                onOpenRichText={handleOpenRichText}
              />
            ))
          )}
        </div>
      </div>

      {richTextConfig && (
        <RichTextDrawer
          config={richTextConfig}
          onClose={() => setRichTextConfig(null)}
        />
      )}
    </>
  );
}
