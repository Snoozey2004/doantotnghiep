import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { landingConfigApi } from "../api/landingConfigApi";
import { uiBlockApi } from "../api/uiBlockApi";
import { provinceApi } from "../api/provinceApi";
import { uploadApi } from "../api/uploadApi";
import RichTextEditor from "../components/RichTextEditor.jsx";
import LandingPageRenderer from "../components/landing/LandingPageRenderer.jsx";
import VisualBlockCanvas from "../components/landing/VisualBlockCanvas.jsx";
import provinceData from "../data/provinceData";
import SortableBlock from "./SortableBlock.jsx";

function parseJson(value) {
  if (!value) {
    return {};
  }

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function serializeJson(value) {
  return JSON.stringify(value, null, 2);
}

const emptyProvinceForm = {
  name: "",
  description: "",
  overview: "",
  keyFeatures: "",
  region: "",
  imageUrl: "",
  videoUrl: "",
  introduction: "",
  introductionEn: "",
  body: "",
  tags: "",
  isHighlighted: false,
  highlightOrder: 0,
  slug: ""
};

export default function AdminLandingEdit() {
  const { id } = useParams();
  const [provinceId, setProvinceId] = useState("");
  const [provinceForm, setProvinceForm] = useState(emptyProvinceForm);
  const [configForm, setConfigForm] = useState({
    themeColor: "#2563eb",
    fontFamily: "Inter",
    backgroundUrl: "",
    layout: "default"
  });
  const [blocks, setBlocks] = useState([]);
  const [editingBlockId, setEditingBlockId] = useState("");
  const [selectedBlockImageIndex, setSelectedBlockImageIndex] = useState(0);
  const [blockForm, setBlockForm] = useState({
    blockType: "",
    title: "",
    contentJson: "{}",
    sortOrder: 1,
    isEnabled: true
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [selectedPreset, setSelectedPreset] = useState("");
  const [editorMode, setEditorMode] = useState("list");

  const handlePresetChange = (event) => {
    const key = event.target.value;
    setSelectedPreset(key);
    if (!key) {
      setBlockForm({ blockType: "", title: "", contentJson: "{}", sortOrder: blocks.length + 1, isEnabled: true });
      return;
    }
    const preset = blockPresets.find((p) => p.key === key);
    if (preset) {
      // clone template and ensure sortOrder is based on current blocks length
      const tmpl = { ...preset.template, sortOrder: blocks.length + 1 };
      setBlockForm(tmpl);
    }
  };

  const selectedProvinceData = provinceData.find((province) => province.id === provinceId || province.slug === provinceForm.slug);
  const blockContent = parseJson(blockForm.contentJson);
  const blockImages = Array.isArray(blockContent.images) ? blockContent.images.filter(Boolean) : [];
  const blockImageUrl = blockImages.length > 0
    ? blockImages[Math.min(selectedBlockImageIndex, blockImages.length - 1)]
    : (blockContent.imageUrl || blockContent.image || "");

  useEffect(() => {
    landingConfigApi
      .getById(id)
      .then((data) => setConfigForm({
        provinceId: data.provinceId ?? "",
        themeColor: data.themeColor ?? "#2563eb",
        fontFamily: data.fontFamily ?? "Inter",
        backgroundUrl: data.backgroundUrl ?? "",
        layout: data.layout ?? "default"
      }))
      .catch(() => setMessage("Không tải được config."));

    uiBlockApi
      .getByConfig(id)
      .then(setBlocks)
      .catch(() => setBlocks([]));
  }, [id]);

  useEffect(() => {
    if (blockImages.length === 0) {
      setSelectedBlockImageIndex(0);
      return;
    }

    setSelectedBlockImageIndex((current) => Math.min(current, blockImages.length - 1));
  }, [blockImages.length]);

  const handleConfigChange = (event) => {
    setConfigForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleConfigImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setMessage("");
    try {
      const result = await uploadApi.upload(file, "landing", provinceId, selectedProvinceData?.name || provinceForm.slug || "Landing", "IMG");
      setConfigForm((prev) => ({ ...prev, backgroundUrl: result.url }));
      setMessage(`Upload thành công: ${result.fileName}`);
    } catch {
      setMessage("Upload thất bại.");
    } finally {
      event.target.value = "";
    }
  };

  const handleImportFallbackLanding = async () => {
    setMessage("");
    try {
      if (!provinceId) {
        setMessage("Config này chưa gắn với province.");
        return;
      }

      const fallbackProvince = provinceData.find((province) => province.id === provinceId || province.slug === provinceForm.slug);
      if (!fallbackProvince) {
        setMessage("Không tìm thấy dữ liệu fallback của province.");
        return;
      }

      const currentConfig = await landingConfigApi.getById(id);
      const existingBlocks = await uiBlockApi.getByConfig(id).catch(() => []);
      const existingTypes = new Set(existingBlocks.map((block) => block.blockType));
      const fallbackBlocks = [
        { blockType: "hero", title: fallbackProvince.name, contentJson: JSON.stringify({ title: fallbackProvince.name, subtitle: fallbackProvince.slogan, description: fallbackProvince.description, imageUrl: fallbackProvince.heroImage }), sortOrder: 1, isEnabled: true },
        { blockType: "intro", title: "Giới thiệu", contentJson: JSON.stringify({ title: fallbackProvince.name, subtitle: fallbackProvince.slogan, description: fallbackProvince.description, imageUrl: fallbackProvince.introImage }), sortOrder: 2, isEnabled: true },
        { blockType: "richText", title: "Nội dung", contentJson: JSON.stringify({ html: fallbackProvince.body || "" }), sortOrder: 3, isEnabled: true },
        { blockType: "highlights", title: "Điểm nhấn", contentJson: JSON.stringify({ title: "Điểm nhấn", description: fallbackProvince.description, items: fallbackProvince.keyFeatures ? fallbackProvince.keyFeatures.split(",").map((item) => item.trim()).filter(Boolean) : [] }), sortOrder: 4, isEnabled: true },
        { blockType: "specialties", title: "Đặc sản", contentJson: JSON.stringify({ title: "Đặc sản", items: fallbackProvince.specialties || [] }), sortOrder: 5, isEnabled: true },
        { blockType: "tourism", title: "Du lịch", contentJson: JSON.stringify({ title: "Du lịch", items: fallbackProvince.tourism || [] }), sortOrder: 6, isEnabled: true },
        { blockType: "culture", title: "Văn hóa", contentJson: JSON.stringify({ title: "Văn hóa", items: fallbackProvince.culture || [] }), sortOrder: 7, isEnabled: true },
        { blockType: "gallery", title: "Thư viện ảnh", contentJson: JSON.stringify({ title: "Thư viện ảnh", images: fallbackProvince.gallery || [] }), sortOrder: 8, isEnabled: true },
        { blockType: "cta", title: "CTA", contentJson: "{}", sortOrder: 9, isEnabled: true }
      ].filter((block) => !existingTypes.has(block.blockType));

      await landingConfigApi.update(id, {
        ...currentConfig,
        provinceId,
        themeColor: configForm.themeColor,
        fontFamily: configForm.fontFamily,
        backgroundUrl: configForm.backgroundUrl,
        layout: configForm.layout
      });

      for (const block of fallbackBlocks) {
        await uiBlockApi.create(id, block);
      }

      const refreshedBlocks = await uiBlockApi.getByConfig(id);
      setBlocks(refreshedBlocks);
      setMessage("Đã nhập fallback landing page vào config.");
    } catch {
      setMessage("Không thể nhập fallback landing page.");
    }
  };

  const handleProvinceChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setProvinceForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleProvinceBodyChange = (html) => {
    setProvinceForm((prev) => ({ ...prev, body: html }));
  };

  const handleUpload = async (event, fieldName) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const mediaType = fieldName === "videoUrl" ? "VID" : "IMG";
      const result = await uploadApi.upload(file, "provinces", provinceId, provinceForm.name, mediaType);
      setProvinceForm((prev) => ({ ...prev, [fieldName]: result.url }));
      setMessage("Upload thành công.");
    } catch {
      setMessage("Upload thất bại.");
    } finally {
      event.target.value = "";
    }
  };

  const handleBlockFieldChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setBlockForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleSelectPreviousBlockImage = () => {
    if (blockImages.length <= 1) {
      return;
    }

    setSelectedBlockImageIndex((current) => (current - 1 + blockImages.length) % blockImages.length);
  };

  const handleSelectNextBlockImage = () => {
    if (blockImages.length <= 1) {
      return;
    }

    setSelectedBlockImageIndex((current) => (current + 1) % blockImages.length);
  };

  const handleBlockImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setMessage("");
    try {
      const result = await uploadApi.upload(file, "landing", provinceId, selectedProvinceData?.name || provinceForm.slug || "Landing", "IMG");
      const currentContent = parseJson(blockForm.contentJson);
      const existingImages = Array.isArray(currentContent.images) ? currentContent.images.filter(Boolean) : [];

      if (existingImages.length > 0) {
        currentContent.images = [...existingImages, result.url];
        currentContent.imageUrl = currentContent.imageUrl || currentContent.images[0];
        currentContent.image = currentContent.image || currentContent.images[0];
        setSelectedBlockImageIndex(currentContent.images.length - 1);
      } else if (currentContent.imageUrl || currentContent.image) {
        const primaryImage = currentContent.imageUrl || currentContent.image;
        currentContent.images = [primaryImage, result.url];
        currentContent.imageUrl = primaryImage;
        currentContent.image = primaryImage;
        setSelectedBlockImageIndex(1);
      } else {
        currentContent.images = [result.url];
        currentContent.imageUrl = result.url;
        currentContent.image = result.url;
        setSelectedBlockImageIndex(0);
      }

      setBlockForm((prev) => ({
        ...prev,
        contentJson: serializeJson(currentContent)
      }));
      setMessage(`Upload thành công: ${result.fileName}`);
    } catch {
      setMessage("Upload thất bại.");
    } finally {
      event.target.value = "";
    }
  };

  const handleReplaceBlockImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setMessage("");
    try {
      const result = await uploadApi.upload(file, "landing", provinceId, selectedProvinceData?.name || provinceForm.slug || "Landing", "IMG");
      const currentContent = parseJson(blockForm.contentJson);
      const existingImages = Array.isArray(currentContent.images) ? currentContent.images.filter(Boolean) : [];

      if (existingImages.length > 0) {
        const safeIndex = Math.min(selectedBlockImageIndex, existingImages.length - 1);
        currentContent.images = [...existingImages];
        currentContent.images[safeIndex] = result.url;
        currentContent.imageUrl = currentContent.images[0] || "";
        currentContent.image = currentContent.images[0] || "";
      } else {
        currentContent.imageUrl = result.url;
        currentContent.image = result.url;
        if (Array.isArray(currentContent.images) && currentContent.images.length > 0) {
          currentContent.images[0] = result.url;
        }
      }

      setBlockForm((prev) => ({
        ...prev,
        contentJson: serializeJson(currentContent)
      }));
      setMessage(`Đã thay ảnh: ${result.fileName}`);
    } catch {
      setMessage("Thay ảnh thất bại.");
    } finally {
      event.target.value = "";
    }
  };

  const handleDeleteSelectedBlockImage = () => {
    const currentContent = parseJson(blockForm.contentJson);
    const existingImages = Array.isArray(currentContent.images) ? currentContent.images.filter(Boolean) : [];

    if (existingImages.length > 0) {
      const safeIndex = Math.min(selectedBlockImageIndex, existingImages.length - 1);
      currentContent.images = existingImages.filter((_, index) => index !== safeIndex);

      if (currentContent.images.length > 0) {
        currentContent.imageUrl = currentContent.images[0];
        currentContent.image = currentContent.images[0];
        setSelectedBlockImageIndex(Math.min(safeIndex, currentContent.images.length - 1));
      } else {
        delete currentContent.images;
        currentContent.imageUrl = "";
        currentContent.image = "";
        setSelectedBlockImageIndex(0);
      }
    } else {
      currentContent.imageUrl = "";
      currentContent.image = "";
      setSelectedBlockImageIndex(0);
    }

    setBlockForm((prev) => ({
      ...prev,
      contentJson: serializeJson(currentContent)
    }));
    setMessage("Đã xoá ảnh khỏi block.");
  };

  const handleEditBlock = (block) => {
    setEditingBlockId(block.id);
    setSelectedBlockImageIndex(0);
    setBlockForm({
      blockType: block.blockType || "",
      title: block.title || "",
      contentJson: block.contentJson || "{}",
      sortOrder: block.sortOrder || 1,
      isEnabled: block.isEnabled !== false
    });
  };

  const handleSaveBlock = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      if (editingBlockId) {
        const result = await uiBlockApi.update(editingBlockId, { id: editingBlockId, ...blockForm });
        setBlocks((prev) => prev.map((item) => (item.id === editingBlockId ? result : item)));
        setMessage("Đã cập nhật block.");
      } else {
        const result = await uiBlockApi.create(id, blockForm);
        setBlocks((prev) => [...prev, result]);
        setMessage("Đã thêm block.");
      }

      setEditingBlockId("");
      setSelectedBlockImageIndex(0);
      setBlockForm({ blockType: "", title: "", contentJson: "{}", sortOrder: 1, isEnabled: true });
    } catch {
      setMessage("Lưu block thất bại.");
    }
  };

  const handleBlockChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setBlockForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleUpdateConfig = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await landingConfigApi.update(id, configForm);
      setMessage("Đã cập nhật config.");
    } catch {
      setMessage("Cập nhật config thất bại.");
    }
  };

  const handleUpdateProvince = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      if (!provinceId) {
        setMessage("Config này chưa gắn với province.");
        return;
      }

      await provinceApi.update(provinceId, provinceForm);
      setMessage("Đã cập nhật nội dung province.");
    } catch {
      setMessage("Cập nhật province thất bại.");
    }
  };

  const handleCreateBlock = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const block = await uiBlockApi.create(id, blockForm);
      setBlocks((prev) => [...prev, block]);
      setSelectedBlockImageIndex(0);
      setBlockForm({ blockType: "", title: "", contentJson: "{}", sortOrder: 1, isEnabled: true });
    } catch {
      setMessage("Thêm UIBlock thất bại.");
    }
  };

  const handleDeleteBlock = async (blockId) => {
    setMessage("");
    try {
      await uiBlockApi.delete(blockId);
      setBlocks((prev) => prev.filter((item) => item.id !== blockId));
    } catch {
      setMessage("Xoá UIBlock thất bại.");
    }
  };

  const handleCanvasBlockUpdate = async (blockId, propertyName, value) => {
    let updatedBlockData = null;

    setBlocks((prev) => {
      const newBlocks = prev.map((block) => {
        if (block.id !== blockId) return block;
        const content = parseJson(block.contentJson);
        let updatedBlock = { ...block };

        if (propertyName === "layoutX" || propertyName === "layoutY" || propertyName === "layoutWidth" || propertyName === "layoutHeight" || propertyName === "layoutZIndex") {
          const layoutKey = propertyName.replace("layout", "").toLowerCase();
          if (!content.layout) content.layout = {};
          content.layout[layoutKey === "zindex" ? "zIndex" : layoutKey] = value;
        } else if (propertyName === "contentElements") {
          // Handle element positioning (entire content object with elements)
          const newContent = value;
          updatedBlock.contentJson = serializeJson(newContent);
          updatedBlockData = updatedBlock;
          return updatedBlock;
        } else if (propertyName.startsWith("content")) {
          const contentKey = propertyName.replace("content", "");
          const camelCaseKey = contentKey.charAt(0).toLowerCase() + contentKey.slice(1);
          content[camelCaseKey] = value;
        } else {
          updatedBlock[propertyName] = value;
        }

        updatedBlock.contentJson = serializeJson(content);
        updatedBlockData = updatedBlock;
        return updatedBlock;
      });
      return newBlocks;
    });

    if (updatedBlockData) {
      try {
        await uiBlockApi.update(blockId, { id: blockId, ...updatedBlockData });
        setMessage("Đã cập nhật block.");
      } catch {
        setMessage("Cập nhật block thất bại.");
      }
    }
  };

  const handleCanvasLayoutChange = async (blockId, layoutData) => {
    let updatedBlockData = null;

    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== blockId) return block;
        const content = parseJson(block.contentJson);
        content.layout = layoutData;
        const updatedBlock = { ...block, contentJson: serializeJson(content) };
        updatedBlockData = updatedBlock;
        return updatedBlock;
      })
    );

    if (updatedBlockData) {
      try {
        await uiBlockApi.update(blockId, { id: blockId, ...updatedBlockData });
      } catch {
        setMessage("Cập nhật layout thất bại.");
      }
    }
  };

  const handleCanvasImageUpload = async (file, blockId) => {
    if (!file) {
      return;
    }

    setMessage("");
    try {
      const result = await uploadApi.upload(file, "landing", provinceId, selectedProvinceData?.name || provinceForm.slug || "Landing", "IMG");

      setBlocks((prev) =>
        prev.map((block) => {
          if (block.id !== blockId) return block;
          const content = parseJson(block.contentJson);

          // Handle imageUrl
          if (content.imageUrl !== undefined && !Array.isArray(content.images)) {
            content.imageUrl = result.url;
          } else if (content.imageUrl !== undefined) {
            // If we have both imageUrl and images array, add to images
            if (!Array.isArray(content.images)) {
              content.images = [content.imageUrl];
            }
            content.images.push(result.url);
            content.imageUrl = result.url;
          }

          // Handle images array
          if (Array.isArray(content.images)) {
            content.images.push(result.url);
            content.imageUrl = content.images[0] || result.url;
          }

          return { ...block, contentJson: serializeJson(content) };
        })
      );

      setMessage(`Upload thành công: ${result.fileName}`);
    } catch {
      setMessage("Upload thất bại.");
    }
  };

  // Preset templates for quick block creation
  const blockPresets = [
    { key: "hero", label: "Hero (Tên + Ảnh)", template: { blockType: "hero", title: "Hero", contentJson: JSON.stringify({ title: "", subtitle: "", description: "", imageUrl: "" }), sortOrder: blocks.length + 1, isEnabled: true } },
    { key: "intro", label: "Intro (Giới thiệu)", template: { blockType: "intro", title: "Giới thiệu", contentJson: JSON.stringify({ title: "Giới thiệu", subtitle: "", description: "" }), sortOrder: blocks.length + 1, isEnabled: true } },
    { key: "richText", label: "Rich Text (HTML)", template: { blockType: "richText", title: "Nội dung", contentJson: JSON.stringify({ html: "" }), sortOrder: blocks.length + 1, isEnabled: true } },
    { key: "highlights", label: "Highlights (List)", template: { blockType: "highlights", title: "Điểm nhấn", contentJson: JSON.stringify({ title: "Điểm nhấn", description: "", items: [] }), sortOrder: blocks.length + 1, isEnabled: true } },
    { key: "gallery", label: "Gallery (Ảnh)", template: { blockType: "gallery", title: "Thư viện ảnh", contentJson: JSON.stringify({ title: "Thư viện ảnh", images: [] }), sortOrder: blocks.length + 1, isEnabled: true } },
    { key: "cta", label: "CTA (Call to Action)", template: { blockType: "cta", title: "CTA", contentJson: "{}", sortOrder: blocks.length + 1, isEnabled: true } }
  ];

  return (
    <AdminLayout>
      <div style={{ width: "100%" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: 12 }}>Cập nhật Landing Config</h1>
        {message && <div className="card" style={{ marginBottom: 12, padding: 10, fontSize: 13 }}>{message}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <form className="card" onSubmit={handleUpdateConfig} style={{ padding: 12 }}>
            <h3 style={{ fontSize: 14, marginBottom: 10 }}>Cập nhật Config</h3>
            <input name="themeColor" placeholder="Theme Color" value={configForm.themeColor} onChange={handleConfigChange} style={{ fontSize: 12, padding: 6 }} />
            <input name="fontFamily" placeholder="Font" value={configForm.fontFamily} onChange={handleConfigChange} style={{ fontSize: 12, padding: 6 }} />
            <input name="backgroundUrl" placeholder="Background URL" value={configForm.backgroundUrl} onChange={handleConfigChange} style={{ fontSize: 12, padding: 6 }} />
            <input type="file" accept="image/*" onChange={handleConfigImageUpload} style={{ fontSize: 11 }} />
            {configForm.backgroundUrl && (
              <img
                src={configForm.backgroundUrl}
                alt="Preview"
                style={{ width: "100%", maxHeight: 140, objectFit: "cover", borderRadius: 6, marginTop: 6 }}
              />
            )}
            <input name="layout" placeholder="Layout" value={configForm.layout} onChange={handleConfigChange} style={{ fontSize: 12, padding: 6 }} />
            <button className="btn btn-primary" type="submit" style={{ fontSize: 12, padding: "6px 12px" }}>Lưu Config</button>
          </form>

          <form className="card" onSubmit={handleSaveBlock} style={{ padding: 12 }}>
            <h3 style={{ fontSize: 14, marginBottom: 10 }}>Thêm UI Block</h3>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 4, fontSize: 11, color: "#64748b" }}>Chọn mẫu</label>
              <select value={selectedPreset} onChange={handlePresetChange} style={{ width: "100%", padding: "6px", borderRadius: 4, fontSize: 12 }}>
                <option value="">-- Chọn mẫu --</option>
                {blockPresets.map((p) => (
                  <option key={p.key} value={p.key}>{p.label}</option>
                ))}
              </select>
            </div>

            <label style={{ display: "block", marginBottom: 4, fontSize: 11, color: "#64748b" }}>Hoặc cấu hình thủ công</label>
            <input name="blockType" placeholder="Block Type" value={blockForm.blockType} onChange={handleBlockChange} style={{ fontSize: 11, padding: 6 }} />
            <input name="title" placeholder="Tiêu đề" value={blockForm.title} onChange={handleBlockChange} style={{ fontSize: 11, padding: 6 }} />
            <input name="sortOrder" type="number" value={blockForm.sortOrder} onChange={handleBlockChange} style={{ fontSize: 11, padding: 6 }} />
            <textarea
              name="contentJson"
              placeholder="Content JSON"
              value={blockForm.contentJson}
              onChange={handleBlockChange}
              rows={2}
              style={{ fontSize: 11, padding: 6, fontFamily: "monospace" }}
            />
            {blockImageUrl && (
              <div>
                <img
                  src={blockImageUrl}
                  alt="Block preview"
                  style={{ width: "100%", maxHeight: 120, objectFit: "cover", borderRadius: 6, marginTop: 6 }}
                />
                {blockImages.length > 1 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6, gap: 4 }}>
                    <button className="btn btn-outline btn-sm" type="button" onClick={handleSelectPreviousBlockImage} style={{ fontSize: 10, padding: "4px 8px" }}>
                      Ảnh trước
                    </button>
                    <span style={{ fontSize: 10, color: "#64748b" }}>
                      {selectedBlockImageIndex + 1}/{blockImages.length}
                    </span>
                    <button className="btn btn-outline btn-sm" type="button" onClick={handleSelectNextBlockImage} style={{ fontSize: 10, padding: "4px 8px" }}>
                      Ảnh sau
                    </button>
                  </div>
                )}
              </div>
            )}
            {(blockForm.blockType === "hero" || blockForm.blockType === "intro" || blockForm.blockType === "media" || blockForm.blockType === "gallery" || blockImageUrl) && (
              <input type="file" accept="image/*" onChange={handleBlockImageUpload} style={{ fontSize: 11, marginTop: 6 }} />
            )}
            {blockImageUrl && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                <label className="btn btn-outline btn-sm" style={{ cursor: "pointer", fontSize: 10, padding: "4px 8px" }}>
                  Thay ảnh
                  <input type="file" accept="image/*" onChange={handleReplaceBlockImageUpload} style={{ display: "none" }} />
                </label>
                <button className="btn btn-outline btn-sm" type="button" onClick={handleDeleteSelectedBlockImage} style={{ fontSize: 10, padding: "4px 8px" }}>
                  Xoá ảnh
                </button>
              </div>
            )}
            <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, marginTop: 6 }}>
              <input
                type="checkbox"
                name="isEnabled"
                checked={blockForm.isEnabled}
                onChange={handleBlockChange}
              />
              Enabled
            </label>
            <button className="btn btn-primary" type="submit" style={{ fontSize: 12, padding: "6px 12px", marginTop: 6 }}>{editingBlockId ? "Lưu Block" : "Thêm Block"}</button>
          </form>
        </div>

        <div className="card" style={{ marginTop: 12, padding: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 14 }}>Danh sách UI Blocks</h3>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                className={`btn ${editorMode === "list" ? "btn-primary" : "btn-outline"}`}
                type="button"
                onClick={() => setEditorMode("list")}
                style={{ fontSize: 12, padding: "6px 12px" }}
              >
                List View
              </button>
              <button
                className={`btn ${editorMode === "canvas" ? "btn-primary" : "btn-outline"}`}
                type="button"
                onClick={() => setEditorMode("canvas")}
                style={{ fontSize: 12, padding: "6px 12px" }}
              >
                Canvas View
              </button>
            </div>
          </div>

          {editorMode === "list" ? (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={async (event) => {
                const { active, over } = event;
                if (!over || active.id === over.id) return;

                const oldIndex = blocks.findIndex((b) => String(b.id) === String(active.id));
                const newIndex = blocks.findIndex((b) => String(b.id) === String(over.id));
                if (oldIndex === -1 || newIndex === -1) return;

                const newBlocks = arrayMove(blocks, oldIndex, newIndex).map((b, idx) => ({ ...b, sortOrder: idx + 1 }));
                setBlocks(newBlocks);

                // Persist updated sortOrder for affected blocks (optimistically)
                try {
                  for (const b of newBlocks) {
                    if (b.sortOrder !== blocks.find(x => x.id === b.id)?.sortOrder) {
                      await uiBlockApi.update(b.id, { id: b.id, ...b });
                    }
                  }
                  setMessage("Đã cập nhật thứ tự block.");
                } catch {
                  setMessage("Không thể cập nhật thứ tự block.");
                }
              }}
            >
              <SortableContext items={blocks.map(b => String(b.id))} strategy={verticalListSortingStrategy}>
                {blocks.map((block) => (
                  <SortableBlock key={block.id} id={String(block.id)} block={block} onEdit={() => handleEditBlock(block)} onDelete={() => handleDeleteBlock(block.id)} />
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            <VisualBlockCanvas
              blocks={blocks}
              configForm={configForm}
              province={selectedProvinceData || {}}
              onBlockUpdate={handleCanvasBlockUpdate}
              onImageUpload={handleCanvasImageUpload}
            />
          )}
          {blocks.length === 0 && <div style={{ color: "#94a3b8", fontSize: 12 }}>Chưa có UI block.</div>}
        </div>

        <div className="card" style={{ marginTop: 12, padding: 12 }}>
          <h3 style={{ fontSize: 14, marginBottom: 10 }}>Xem trước toàn bộ trang</h3>
          <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
            <LandingPageRenderer
              province={{
                ...selectedProvinceData,
                ...provinceForm,
                name: provinceForm.name || selectedProvinceData?.name || "Province",
                slogan: provinceForm.overview || provinceForm.description || selectedProvinceData?.slogan || "",
                heroImage: configForm.backgroundUrl || selectedProvinceData?.heroImage,
                introImage: provinceForm.imageUrl || configForm.backgroundUrl || selectedProvinceData?.introImage,
                imageUrl: provinceForm.imageUrl || configForm.backgroundUrl || selectedProvinceData?.imageUrl,
                videoUrl: provinceForm.videoUrl || selectedProvinceData?.videoUrl,
                keyFeatures: provinceForm.keyFeatures || selectedProvinceData?.keyFeatures,
                body: provinceForm.body || selectedProvinceData?.body,
                specialties: selectedProvinceData?.specialties || [],
                tourism: selectedProvinceData?.tourism || [],
                culture: selectedProvinceData?.culture || [],
                gallery: selectedProvinceData?.gallery || []
              }}
              blocks={blocks}
              posts={[]}
              products={[]}
              mediaItems={[]}
            />
          </div>
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
          <button className="btn btn-primary" type="button" onClick={handleImportFallbackLanding} style={{ fontSize: 12, padding: "8px 16px" }}>
            Import fallback landing into config
          </button>
          <button className="btn btn-outline" type="button" onClick={() => navigate("/admin/landing")} style={{ fontSize: 12, padding: "8px 16px" }}>Back</button>
        </div>
      </div>
    </AdminLayout>
  );
}
