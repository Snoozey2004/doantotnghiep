import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { landingConfigApi } from "../api/landingConfigApi";
import { uiBlockApi } from "../api/uiBlockApi";
import { provinceApi } from "../api/provinceApi";
import { uploadApi } from "../api/uploadApi";
import RichTextEditor from "../components/RichTextEditor.jsx";
import LandingPageRenderer from "../components/landing/LandingPageRenderer.jsx";
import provinceData from "../data/provinceData";

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

  return (
    <AdminLayout>
      <div style={{ maxWidth: 900 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Cập nhật Landing Config</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <form className="card" onSubmit={handleUpdateConfig}>
            <h3>Cập nhật Config</h3>
            <input name="themeColor" placeholder="Theme Color" value={configForm.themeColor} onChange={handleConfigChange} />
            <input name="fontFamily" placeholder="Font" value={configForm.fontFamily} onChange={handleConfigChange} />
            <input name="backgroundUrl" placeholder="Background URL" value={configForm.backgroundUrl} onChange={handleConfigChange} />
            <input type="file" accept="image/*" onChange={handleConfigImageUpload} />
            {configForm.backgroundUrl && (
              <img
                src={configForm.backgroundUrl}
                alt="Preview"
                style={{ width: "100%", maxHeight: 260, objectFit: "cover" }}
              />
            )}
            <input name="layout" placeholder="Layout" value={configForm.layout} onChange={handleConfigChange} />
            <button className="btn btn-primary" type="submit">Lưu Config</button>
          </form>
          <form className="card" onSubmit={handleSaveBlock}>
            <h3>Thêm UI Block</h3>
            <input name="blockType" placeholder="Block Type" value={blockForm.blockType} onChange={handleBlockChange} />
            <input name="title" placeholder="Tiêu đề" value={blockForm.title} onChange={handleBlockChange} />
            <input name="sortOrder" type="number" value={blockForm.sortOrder} onChange={handleBlockChange} />
            <textarea
              name="contentJson"
              placeholder="Content JSON"
              value={blockForm.contentJson}
              onChange={handleBlockChange}
              rows={3}
            />
            {blockImageUrl && (
              <div>
                <img
                  src={blockImageUrl}
                  alt="Block preview"
                  style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 12 }}
                />
                {blockImages.length > 1 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                    <button className="btn btn-outline btn-sm" type="button" onClick={handleSelectPreviousBlockImage}>
                      Ảnh trước
                    </button>
                    <span style={{ fontSize: 12, color: "#64748b" }}>
                      {selectedBlockImageIndex + 1}/{blockImages.length}
                    </span>
                    <button className="btn btn-outline btn-sm" type="button" onClick={handleSelectNextBlockImage}>
                      Ảnh sau
                    </button>
                  </div>
                )}
              </div>
            )}
            {(blockForm.blockType === "hero" || blockForm.blockType === "intro" || blockForm.blockType === "media" || blockForm.blockType === "gallery" || blockImageUrl) && (
              <input type="file" accept="image/*" onChange={handleBlockImageUpload} />
            )}
            {blockImageUrl && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <label className="btn btn-outline btn-sm" style={{ cursor: "pointer" }}>
                  Thay ảnh hiện tại
                  <input type="file" accept="image/*" onChange={handleReplaceBlockImageUpload} style={{ display: "none" }} />
                </label>
                <button className="btn btn-outline btn-sm" type="button" onClick={handleDeleteSelectedBlockImage}>
                  Xoá ảnh hiện tại
                </button>
              </div>
            )}
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                name="isEnabled"
                checked={blockForm.isEnabled}
                onChange={handleBlockChange}
              />
              Enabled
            </label>
            <button className="btn btn-primary" type="submit">{editingBlockId ? "Lưu Block" : "Thêm Block"}</button>
          </form>
        </div>
        <div className="card" style={{ marginTop: 16 }}>
          <h3>Danh sách UI Blocks</h3>
          {blocks.map((block) => (
            <div key={block.id} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, marginBottom: 10, alignItems: "center" }}>
              <div>
                <div><strong>{block.blockType}</strong> - {block.title}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>Sort: {block.sortOrder} · {block.isEnabled ? "Enabled" : "Disabled"}</div>
              </div>
              <button className="btn btn-outline btn-sm" type="button" onClick={() => handleEditBlock(block)}>
                Sửa
              </button>
              <button className="btn btn-outline btn-sm" type="button" onClick={() => handleDeleteBlock(block.id)}>
                Xoá
              </button>
            </div>
          ))}
          {blocks.length === 0 && <div style={{ color: "#64748b" }}>Chưa có UI block.</div>}
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h3>Xem trước toàn bộ trang</h3>
          <div style={{ border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden" }}>
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
        <div style={{ marginTop: 16 }}>
          <button className="btn btn-primary" type="button" onClick={handleImportFallbackLanding}>
            Import fallback landing into config
          </button>
        </div>
        <div style={{ marginTop: 16 }}>
          <button className="btn btn-outline" type="button" onClick={() => navigate("/admin/landing")}>Back</button>
        </div>
      </div>
    </AdminLayout>
  );
}
