import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { landingConfigApi } from "../api/landingConfigApi";
import { uiBlockApi } from "../api/uiBlockApi";
import { provinceApi } from "../api/provinceApi";

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
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    provinceApi.getAll().then(setProvinces);
  }, []);

  const handleConfigChange = (event) => {
    setConfigForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
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
        <div style={{ marginTop: 16 }}>
          <button className="btn btn-outline" type="button" onClick={() => navigate("/admin/landing")}>Back</button>
        </div>
      </div>
    </AdminLayout>
  );
}
