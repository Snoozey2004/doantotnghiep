import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditorSidebar from './EditorSidebar';
import PreviewPanel from './PreviewPanel';
import { useUndoRedo } from '../hooks/useUndoRedo';
import { useSaveInfographic } from '../hooks/useSaveInfographic';
import { productInfographicApi } from '../services/productInfographicApi';
import { mapApiToEditor } from '../services/mapApiToEditor';
import { productApi } from '../../api/productApi';
// Removed uuid import, will use crypto.randomUUID()

export default function TestEditorPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [infographicId, setInfographicId] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [initialBlocksStr, setInitialBlocksStr] = useState("[]");

  const { currentState: blocks = [], canUndo, canRedo, undo, redo, recordChange, reset } = useUndoRedo([]);
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
            const editorBlocks = mapApiToEditor(infoRes.data);
            reset(editorBlocks);
            setInitialBlocksStr(JSON.stringify(editorBlocks));
          } else {
            reset([]);
            setInitialBlocksStr("[]");
          }
        } catch (err) {
          // No infographic yet
          reset([]);
          setInitialBlocksStr("[]");
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug, reset]);

  const isDirty = JSON.stringify(blocks) !== initialBlocksStr;

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleBack = () => {
    if (isDirty) {
      if (window.confirm('Bạn có thay đổi chưa lưu. Bạn có chắc chắn muốn thoát?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const handleCopyBlock = (block) => {
    const blockCopy = {
      layoutType: block.layoutType,
      blockType: block.blockType,
      name: block.name,
      isVisible: block.isVisible,
      data: block.data
    };
    navigator.clipboard.writeText(JSON.stringify(blockCopy)).then(() => {
      alert('Đã copy block vào clipboard! Bạn có thể sang sản phẩm khác để paste.');
    }).catch(() => {
      alert('Lỗi copy!');
    });
  };

  const handlePasteBlock = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) return;
      const blockData = JSON.parse(text);
      if (!blockData.layoutType) {
        alert('Dữ liệu clipboard không hợp lệ!');
        return;
      }

      const newBlock = {
        ...blockData,
        id: crypto.randomUUID(),
        sortOrder: blocks.length,
      };
      recordChange([...blocks, newBlock]);
      setSelectedBlockId(newBlock.id);
    } catch (err) {
      alert('Không có dữ liệu block hợp lệ trong clipboard!');
    }
  };

  const handleAddBlock = (layoutType) => {
    const mapLayoutToBlockType = (layout) => {
      switch (layout) {
        case 'HeroBanner': return 'Hero';
        case 'Statistics': return 'Statistics';
        case 'Timeline': return 'Timeline';
        case 'FAQ': return 'FAQ';
        case 'CTA': return 'CTA';
        case 'Gallery': return 'Gallery';
        case 'FeaturesGrid': return 'FeaturesGrid';
        case 'Video': return 'Video';
        case 'TextImageText': return 'Content';
        default: return 'Content';
      }
    };

    const newBlock = {
      id: crypto.randomUUID(),
      layoutType,
      blockType: mapLayoutToBlockType(layoutType),
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

  const handleReorderBlocks = (oldIndex, newIndex) => {
    if (oldIndex === newIndex) return;
    const newBlocks = [...blocks];
    const [movedItem] = newBlocks.splice(oldIndex, 1);
    newBlocks.splice(newIndex, 0, movedItem);
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
      setInitialBlocksStr(JSON.stringify(blocks));
      alert('Đã lưu thành công!');
    } catch (err) {
      alert('Lỗi khi lưu!');
    }
  };

  const selectedBlock = (blocks || []).find(b => b.id === selectedBlockId);

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Đang tải...</div>;
  if (!product) return <div style={{ padding: '50px', textAlign: 'center' }}>Không tìm thấy sản phẩm với slug: {slug}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#f0f2f5' }}>
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .hidden-desktop { display: none !important; }
        }
      `}</style>
      <div style={{ padding: '10px 20px', backgroundColor: '#fff', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={handleBack} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.5rem', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Quay lại">
            &#8592;
          </button>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Editor: {product.name}</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={undo} disabled={!canUndo} style={{ padding: '6px 12px', cursor: canUndo ? 'pointer' : 'not-allowed' }}>Undo</button>
          <button onClick={redo} disabled={!canRedo} style={{ padding: '6px 12px', cursor: canRedo ? 'pointer' : 'not-allowed' }}>Redo</button>
          <button onClick={() => handleSave(true)} disabled={isSaving} style={{ padding: '6px 20px', backgroundColor: '#52c41a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {isSaving ? 'Đang lưu...' : 'Cập nhật'}
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <EditorSidebar
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          onAddBlock={handleAddBlock}
          onPasteBlock={handlePasteBlock}
          onDeleteBlock={handleDeleteBlock}
          onChangeBlockData={handleChangeBlockData}
          onToggleVisibility={handleToggleVisibility}
          onCopyBlock={handleCopyBlock}
          onReorderBlocks={handleReorderBlocks}
        />
        <PreviewPanel
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          onDeleteBlock={handleDeleteBlock}
          onToggleVisibility={handleToggleVisibility}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onCopyBlock={handleCopyBlock}
        />
      </div>
    </div>
  );
}

function getDefaultDataForLayout(layoutType) {
  const common = { marginTop: 0, marginBottom: 0, textAlign: 'left', textColor: '#333333', visibility: 'all' };
  let specific = {};
  switch (layoutType) {
    case 'HeroBanner': specific = { title: 'Tiêu đề', description: 'Mô tả', image: '' }; break;
    case 'TextOnly': specific = { title: 'Tiêu đề', content: 'Nội dung chi tiết', backgroundColor: '#ffffff' }; break;
    case 'ImageLeftTextRight': specific = { title: 'Tiêu đề', content: 'Nội dung', image: '', backgroundColor: '#fafafa' }; break;
    case 'ImageRightTextLeft': specific = { title: 'Tiêu đề', content: 'Nội dung', image: '', backgroundColor: '#ffffff' }; break;
    case 'Statistics': specific = { title: 'Thống kê nổi bật', items: [{ label: 'Năm', value: '100+' }], backgroundColor: '#f4ecd8' }; break;
    case 'Timeline': specific = { title: 'Lịch sử', steps: [{ year: '2020', title: 'Khởi đầu', description: 'Mô tả' }], backgroundColor: '#ffffff' }; break;
    case 'Quote': specific = { content: 'Một câu nói hay', author: 'Tác giả', backgroundColor: '#8b4513', textColor: '#ffffff' }; break;
    case 'FAQ': specific = { title: 'Câu hỏi thường gặp', items: [{ question: 'Câu hỏi?', answer: 'Trả lời.' }], backgroundColor: '#fafafa' }; break;
    case 'CTA': specific = { title: 'Hành động', content: 'Mua ngay hôm nay!', buttonText: 'Mua Ngay', buttonLink: '#', backgroundColor: '#d2691e', textColor: '#ffffff', textAlign: 'center' }; break;
    case 'Gallery': specific = { title: 'Thư viện ảnh', description: 'Hình ảnh chi tiết về sản phẩm', images: [{ url: '', alt: 'Image 1' }], backgroundColor: '#ffffff' }; break;
    case 'FeaturesGrid': specific = { title: 'Đặc điểm nổi bật', subtitle: 'Những tính năng vượt trội', items: [{ image: '', title: 'Đặc điểm 1', description: 'Mô tả chi tiết', tag: 'Nổi bật' }], backgroundColor: '#fafafa' }; break;
    case 'Video': specific = { title: 'Video Sản phẩm', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', backgroundColor: '#000000', textColor: '#ffffff' }; break;
    case 'TextImageText': specific = { topText: 'Nội dung bên trái', image: '', bottomText: 'Nội dung bên phải', backgroundColor: '#ffffff' }; break;
  }
  return { ...common, ...specific };
}
