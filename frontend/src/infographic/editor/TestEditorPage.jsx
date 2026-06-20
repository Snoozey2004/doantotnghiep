import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import BlockSidebar from './BlockSidebar';
import PreviewPanel from './PreviewPanel';
import BlockEditor from './BlockEditor';
import { useUndoRedo } from '../hooks/useUndoRedo';
import { useSaveInfographic } from '../hooks/useSaveInfographic';
import { productInfographicApi } from '../services/productInfographicApi';
import { mapApiToEditor } from '../services/mapApiToEditor';
import { productApi } from '../../api/productApi';
import { v4 as uuidv4 } from 'uuid';

export default function TestEditorPage() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug');

  const [product, setProduct] = useState(null);
  const [infographicId, setInfographicId] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  const { currentState: blocks, canUndo, canRedo, undo, redo, recordChange, reset } = useUndoRedo([]);
  const { saveInfographic, isSaving } = useSaveInfographic();

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const prodData = await productApi.getBySlug(slug);
        setProduct(prodData);

        try {
          const infoRes = await productInfographicApi.getByProductId(prodData.id);
          setInfographicId(infoRes.data.id);
          setIsPublished(infoRes.data.status === 'Published');
          
          if (infoRes.data.blocks && infoRes.data.blocks.length > 0) {
            reset(mapApiToEditor(infoRes.data));
          } else {
            reset([]);
          }
        } catch (err) {
          // No infographic yet
          reset([]);
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug, reset]);

  const handleAddBlock = (layoutType) => {
    const newBlock = {
      id: uuidv4(),
      layoutType,
      blockType: 'Default',
      name: layoutType,
      isVisible: true,
      sortOrder: blocks.length,
      data: getDefaultDataForLayout(layoutType)
    };
    recordChange([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const handleDeleteBlock = (id) => {
    recordChange(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const handleToggleVisibility = (id) => {
    recordChange(blocks.map(b => b.id === id ? { ...b, isVisible: b.isVisible === false ? true : false } : b));
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index - 1];
    newBlocks[index - 1] = newBlocks[index];
    newBlocks[index] = temp;
    recordChange(newBlocks);
  };

  const handleMoveDown = (index) => {
    if (index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index + 1];
    newBlocks[index + 1] = newBlocks[index];
    newBlocks[index] = temp;
    recordChange(newBlocks);
  };

  const handleChangeBlockData = (id, newData) => {
    recordChange(blocks.map(b => b.id === id ? { ...b, data: newData } : b));
  };

  const handleSave = async (publish = false) => {
    if (!product) return;
    try {
      const newId = await saveInfographic(product.id, infographicId, blocks, publish);
      if (!infographicId) setInfographicId(newId);
      setIsPublished(publish);
      alert('Đã lưu thành công!');
    } catch (err) {
      alert('Lỗi khi lưu!');
    }
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  if (loading) return <MainLayout><div style={{ padding: '50px', textAlign: 'center' }}>Đang tải...</div></MainLayout>;
  if (!product) return <MainLayout><div style={{ padding: '50px', textAlign: 'center' }}>Không tìm thấy sản phẩm với slug: {slug}</div></MainLayout>;

  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
        <div style={{ padding: '10px 20px', backgroundColor: '#fff', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Editor: {product.name}</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={undo} disabled={!canUndo} style={{ padding: '6px 12px', cursor: canUndo ? 'pointer' : 'not-allowed' }}>Undo</button>
            <button onClick={redo} disabled={!canRedo} style={{ padding: '6px 12px', cursor: canRedo ? 'pointer' : 'not-allowed' }}>Redo</button>
            <button onClick={() => handleSave(true)} disabled={isSaving} style={{ padding: '6px 20px', backgroundColor: '#52c41a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {isSaving ? 'Đang lưu...' : 'Cập nhật'}
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <BlockSidebar blocks={blocks} onAddBlock={handleAddBlock} />
          <PreviewPanel 
            blocks={blocks} 
            selectedBlockId={selectedBlockId} 
            onSelectBlock={setSelectedBlockId} 
            onDeleteBlock={handleDeleteBlock}
            onToggleVisibility={handleToggleVisibility}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
          />
          <BlockEditor selectedBlock={selectedBlock} onChangeBlockData={handleChangeBlockData} />
        </div>
      </div>
    </MainLayout>
  );
}

function getDefaultDataForLayout(layoutType) {
  switch (layoutType) {
    case 'HeroBanner': return { title: 'Tiêu đề', description: 'Mô tả', image: '' };
    case 'TextOnly': return { title: 'Tiêu đề', content: 'Nội dung chi tiết', backgroundColor: '#ffffff' };
    case 'ImageLeftTextRight': return { title: 'Tiêu đề', content: 'Nội dung', image: '', backgroundColor: '#fafafa' };
    case 'ImageRightTextLeft': return { title: 'Tiêu đề', content: 'Nội dung', image: '', backgroundColor: '#ffffff' };
    case 'Statistics': return { title: 'Thống kê nổi bật', items: [{ label: 'Năm', value: '100+' }], backgroundColor: '#f4ecd8' };
    case 'Timeline': return { title: 'Lịch sử', steps: [{ year: '2020', title: 'Khởi đầu', description: 'Mô tả' }], backgroundColor: '#ffffff' };
    case 'Quote': return { content: 'Một câu nói hay', author: 'Tác giả', backgroundColor: '#8b4513' };
    case 'FAQ': return { title: 'Câu hỏi thường gặp', items: [{ question: 'Câu hỏi?', answer: 'Trả lời.' }], backgroundColor: '#fafafa' };
    case 'CTA': return { title: 'Hành động', content: 'Mua ngay hôm nay!', buttonText: 'Mua Ngay', buttonLink: '#', backgroundColor: '#d2691e' };
    default: return {};
  }
}
