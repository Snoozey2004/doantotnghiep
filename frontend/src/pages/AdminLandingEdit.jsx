import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { landingConfigApi } from "../api/landingConfigApi";
import { uiBlockApi } from "../api/uiBlockApi";

export default function AdminLandingEdit() {
  const { id } = useParams();
  const [configForm, setConfigForm] = useState({
    provinceId: "",
    themeColor: "#2563eb",
    fontFamily: "Inter",
    backgroundUrl: "",
    layout: "default"
  });
  const [blocks, setBlocks] = useState([]);
  const [blockForm, setBlockForm] = useState({
    blockType: "",
    title: "",
    contentJson: "{}",
    sortOrder: 1,
    isEnabled: true
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

  const handleConfigChange = (event) => {
    setConfigForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
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

  const handleCreateBlock = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const block = await uiBlockApi.create(id, blockForm);
      setBlocks((prev) => [...prev, block]);
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
            <input name="layout" placeholder="Layout" value={configForm.layout} onChange={handleConfigChange} />
            <button className="btn btn-primary" type="submit">Lưu Config</button>
          </form>
          <form className="card" onSubmit={handleCreateBlock}>
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
          <h3>Danh sách UI Blocks</h3>
          {blocks.map((block) => (
            <div key={block.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div>{block.blockType} - {block.title}</div>
              <button className="btn btn-outline btn-sm" type="button" onClick={() => handleDeleteBlock(block.id)}>
                Xoá
              </button>
            </div>
          ))}
          {blocks.length === 0 && <div style={{ color: "#64748b" }}>Chưa có UI block.</div>}
        </div>
        <div style={{ marginTop: 16 }}>
          <button className="btn btn-outline" type="button" onClick={() => navigate("/admin/landing")}>Back</button>
        </div>
      </div>
    </AdminLayout>
  );
}
