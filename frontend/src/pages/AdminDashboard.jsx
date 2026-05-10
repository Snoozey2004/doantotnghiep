import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { provinceApi } from "../api/provinceApi";
import { landingConfigApi } from "../api/landingConfigApi";
import { uiBlockApi } from "../api/uiBlockApi";

const defaultBlock = {
  blockType: "hero",
  title: "Hero",
  contentJson: "{}",
  sortOrder: 1,
  isEnabled: true
};

export default function AdminDashboard() {
  const [provinces, setProvinces] = useState([]);
  const [provinceForm, setProvinceForm] = useState({
    name: "",
    description: "",
    region: "",
    imageUrl: "",
    videoUrl: "",
    slug: ""
  });
  const [configForm, setConfigForm] = useState({
    provinceId: "",
    themeColor: "#2563eb",
    fontFamily: "Inter",
    backgroundUrl: "",
    layout: "default"
  });
  const [blockForm, setBlockForm] = useState(defaultBlock);
  const [configId, setConfigId] = useState("");
  const [message, setMessage] = useState("");

  const loadProvinces = async () => {
    const data = await provinceApi.getAll();
    setProvinces(data);
  };

  useEffect(() => {
    loadProvinces();
  }, []);

  const handleProvinceChange = (event) => {
    setProvinceForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleConfigChange = (event) => {
    setConfigForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleBlockChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setBlockForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleCreateProvince = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await provinceApi.create(provinceForm);
      await loadProvinces();
      setProvinceForm({ name: "", description: "", region: "", imageUrl: "", videoUrl: "", slug: "" });
      setMessage("Đã tạo Province thành công.");
    } catch {
      setMessage("Tạo Province thất bại.");
    }
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

  const handleCreateBlock = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      if (!configId) {
        setMessage("Cần có ConfigId trước.");
        return;
      }
      await uiBlockApi.create(configId, blockForm);
      setBlockForm(defaultBlock);
      setMessage("Đã thêm UIBlock.");
    } catch {
      setMessage("Thêm UIBlock thất bại (cần role Admin/Editor).");
    }
  };

  return (
    <MainLayout>
      <section className="section">
        <div className="container">
          <h1 style={{ fontSize: "2rem", marginBottom: 8 }}>Admin CMS</h1>
          <p style={{ color: "#64748b", marginBottom: 24 }}>
            Tạo tỉnh thành, cấu hình landing page và UI blocks.
          </p>
          {message && <div className="card" style={{ marginBottom: 24 }}>{message}</div>}

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <form className="card" onSubmit={handleCreateProvince}>
              <h3>Tạo Province</h3>
              <input name="name" placeholder="Tên" value={provinceForm.name} onChange={handleProvinceChange} required />
              <input name="slug" placeholder="Slug" value={provinceForm.slug} onChange={handleProvinceChange} required />
              <input name="region" placeholder="Khu vực" value={provinceForm.region} onChange={handleProvinceChange} />
              <input name="imageUrl" placeholder="Image URL" value={provinceForm.imageUrl} onChange={handleProvinceChange} />
              <input name="videoUrl" placeholder="Video URL" value={provinceForm.videoUrl} onChange={handleProvinceChange} />
              <textarea
                name="description"
                placeholder="Mô tả"
                value={provinceForm.description}
                onChange={handleProvinceChange}
                rows={3}
              />
              <button className="btn btn-primary" type="submit">Tạo Province</button>
            </form>

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
              <input name="layout" placeholder="Layout" value={configForm.layout} onChange={handleConfigChange} />
              <button className="btn btn-primary" type="submit">Tạo Config</button>
              {configId && <p style={{ marginTop: 8, color: "#64748b" }}>ConfigId: {configId}</p>}
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
        </div>
      </section>
    </MainLayout>
  );
}
