import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { landingConfigApi } from "../api/landingConfigApi";
import { uiBlockApi } from "../api/uiBlockApi";
import { provinceApi } from "../api/provinceApi";
import { uploadApi } from "../api/uploadApi";
import LandingPageRenderer from "../components/landing/LandingPageRenderer.jsx";
import provinceData from "../data/provinceData";

const defaultBlock = {
  blockType: "hero",
  title: "Hero",
  contentJson: "{}",
  sortOrder: 1,
  isEnabled: true
};

export default function AdminLandingCreate() {
  const [configForm, setConfigForm] = useState({
    provinceId: "",
    themeColor: "#2563eb",
    fontFamily: "Inter",
    backgroundUrl: "",
    layout: "default"
  });
  const [blockForm, setBlockForm] = useState(defaultBlock);
  const [configId, setConfigId] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [previewBlocks, setPreviewBlocks] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const selectedProvinceData = provinceData.find((province) => province.id === configForm.provinceId || province.slug === configForm.provinceId);

  const previewProvince = {
    ...selectedProvinceData,
    name: provinces.find((p) => p.id === configForm.provinceId)?.name || selectedProvinceData?.name || "Province",
    description: selectedProvinceData?.description || "",
    slogan: selectedProvinceData?.slogan || "",
    heroImage: configForm.backgroundUrl || selectedProvinceData?.heroImage,
    introImage: selectedProvinceData?.introImage || configForm.backgroundUrl,
    imageUrl: selectedProvinceData?.imageUrl || configForm.backgroundUrl,
    videoUrl: selectedProvinceData?.videoUrl || "",
    body: selectedProvinceData?.body || "",
    keyFeatures: selectedProvinceData?.keyFeatures || "",
    specialties: selectedProvinceData?.specialties || [],
    tourism: selectedProvinceData?.tourism || [],
    culture: selectedProvinceData?.culture || [],
    gallery: selectedProvinceData?.gallery || []
  };

  useEffect(() => {
    provinceApi.getAll().then(setProvinces);
  }, []);

  const handleConfigChange = (event) => {
    setConfigForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleUpload = async (event, fieldName) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const mediaType = fieldName === "backgroundUrl" ? "IMG" : "VID";
      const result = await uploadApi.upload(file, "provinces", configForm.provinceId, provinces.find((p) => p.id === configForm.provinceId)?.name, mediaType);
      setConfigForm((prev) => ({ ...prev, [fieldName]: result.url }));
      setMessage("Upload thành công.");
    } catch {
      setMessage("Upload thất bại.");
    } finally {
      event.target.value = "";
    }
  };

  const handleBlockChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setBlockForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleCreateConfig = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const result = await landingConfigApi.create({ ...configForm, blocks: [] });
      setConfigId(result.id);
      setMessage("Đã tạo LandingPageConfig.");
    } catch {
      setMessage("Tạo LandingPageConfig thất bại.");
    }
  };

  const handleImportFallbackLanding = async () => {
    setMessage("");
    try {
      if (!configId) {
        setMessage("Cần có ConfigId trước.");
        return;
      }

      const selectedProvince = provinces.find((province) => province.id === configForm.provinceId);
      const fallbackProvince = provinceData.find((province) => province.id === selectedProvince?.id || province.slug === selectedProvince?.slug);
      if (!fallbackProvince) {
        setMessage("Không tìm thấy dữ liệu fallback của province.");
        return;
      }

      const blocksToCreate = [
        { blockType: "hero", title: fallbackProvince.name, contentJson: JSON.stringify({ title: fallbackProvince.name, subtitle: fallbackProvince.slogan, description: fallbackProvince.description, imageUrl: fallbackProvince.heroImage }), sortOrder: 1, isEnabled: true },
        { blockType: "intro", title: "Giới thiệu", contentJson: JSON.stringify({ title: fallbackProvince.name, subtitle: fallbackProvince.slogan, description: fallbackProvince.description, imageUrl: fallbackProvince.introImage }), sortOrder: 2, isEnabled: true },
        { blockType: "richText", title: "Nội dung", contentJson: JSON.stringify({ html: fallbackProvince.body || "" }), sortOrder: 3, isEnabled: true },
        { blockType: "highlights", title: "Điểm nhấn", contentJson: JSON.stringify({ title: "Điểm nhấn", description: fallbackProvince.description, items: fallbackProvince.keyFeatures ? fallbackProvince.keyFeatures.split(",").map((item) => item.trim()).filter(Boolean) : [] }), sortOrder: 4, isEnabled: true },
        { blockType: "specialties", title: "Đặc sản", contentJson: JSON.stringify({ title: "Đặc sản", items: fallbackProvince.specialties || [] }), sortOrder: 5, isEnabled: true },
        { blockType: "tourism", title: "Du lịch", contentJson: JSON.stringify({ title: "Du lịch", items: fallbackProvince.tourism || [] }), sortOrder: 6, isEnabled: true },
        { blockType: "culture", title: "Văn hóa", contentJson: JSON.stringify({ title: "Văn hóa", items: fallbackProvince.culture || [] }), sortOrder: 7, isEnabled: true },
        { blockType: "gallery", title: "Thư viện ảnh", contentJson: JSON.stringify({ title: "Thư viện ảnh", images: fallbackProvince.gallery || [] }), sortOrder: 8, isEnabled: true },
        { blockType: "cta", title: "CTA", contentJson: "{}", sortOrder: 9, isEnabled: true }
      ];

      const createdBlocks = [];
      for (const block of blocksToCreate) {
        createdBlocks.push(await uiBlockApi.create(configId, block));
      }

      setPreviewBlocks(createdBlocks);
      setMessage("Đã nhập fallback landing page.");
    } catch {
      setMessage("Nhập fallback landing page thất bại.");
    }
  };

  const handleCreateBlock = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      if (!configId) {
        setMessage("Cần có ConfigId trước.");
        return;
      }
      const result = await uiBlockApi.create(configId, blockForm);
      setPreviewBlocks((prev) => [...prev, result]);
      setBlockForm(defaultBlock);
      setMessage("Đã thêm UIBlock.");
    } catch {
      setMessage("Thêm UIBlock thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 900 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Tạo Landing Config</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <form className="card" onSubmit={handleCreateConfig}>
            <h3>Tạo Landing Config</h3>
            <select name="provinceId" value={configForm.provinceId} onChange={handleConfigChange} required>
              <option value="">Chọn Province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
            <input name="themeColor" placeholder="Theme Color" value={configForm.themeColor} onChange={handleConfigChange} />
            <input name="fontFamily" placeholder="Font" value={configForm.fontFamily} onChange={handleConfigChange} />
            <input name="backgroundUrl" placeholder="Background URL" value={configForm.backgroundUrl} onChange={handleConfigChange} />
            <input type="file" accept="image/*" onChange={(event) => handleUpload(event, "backgroundUrl")} />
            {configForm.backgroundUrl && (
              <img
                src={configForm.backgroundUrl}
                alt="Preview"
                style={{ width: "100%", maxHeight: 260, objectFit: "cover" }}
              />
            )}
            <input name="layout" placeholder="Layout" value={configForm.layout} onChange={handleConfigChange} />
            <button className="btn btn-primary" type="submit">Tạo Config</button>
          </form>
          <form className="card" onSubmit={handleCreateBlock}>
            <h3>Thêm UI Block</h3>
            <input value={configId} readOnly placeholder="Config ID" />
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
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                name="isEnabled"
                checked={blockForm.isEnabled}
                onChange={handleBlockChange}
              />
              Enabled
            </label>
            <button className="btn btn-primary" type="submit">Thêm Block</button>
          </form>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h3>Xem trước toàn bộ trang</h3>
          <LandingPageRenderer
            province={previewProvince}
            blocks={previewBlocks}
            posts={[]}
            products={[]}
            mediaItems={[]}
          />
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
