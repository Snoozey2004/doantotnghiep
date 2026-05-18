import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { mediaApi } from "../api/mediaApi";
import { provinceApi } from "../api/provinceApi";

const emptyMedia = {
  provinceId: "",
  mediaType: "image",
  title: "",
  url: "",
  description: "",
  tags: "",
  sortOrder: 0,
  isFeatured: false,
  isHighlighted: false
};

export default function AdminMediaCreate() {
  const [form, setForm] = useState(emptyMedia);
  const [provinces, setProvinces] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    provinceApi.getAll().then(setProvinces);
  }, []);

  const handleChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await mediaApi.create({ ...form, sortOrder: Number(form.sortOrder) });
      navigate("/admin/media");
    } catch {
      setMessage("Tạo media thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 820 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Thêm Media</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <form className="card" onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 16 }}>
            <div style={{ display: "grid", gap: 12 }}>
              <select name="provinceId" value={form.provinceId} onChange={handleChange} required>
                <option value="">Chọn Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>{province.name}</option>
                ))}
              </select>
              <input name="mediaType" placeholder="Media type" value={form.mediaType} onChange={handleChange} />
              <input name="title" placeholder="Tiêu đề" value={form.title} onChange={handleChange} />
              <input name="url" placeholder="URL" value={form.url} onChange={handleChange} />
              <textarea name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} rows={3} />
              <input name="tags" placeholder="Tags (comma)" value={form.tags} onChange={handleChange} />
              <input name="sortOrder" type="number" placeholder="Sort order" value={form.sortOrder} onChange={handleChange} />
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
                Featured
              </label>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" name="isHighlighted" checked={form.isHighlighted} onChange={handleChange} />
                Highlight
              </label>
            </div>
            <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
              {form.url && form.mediaType === "image" && (
                <img src={form.url} alt="Preview" style={{ width: "100%", maxHeight: 260, objectFit: "cover" }} />
              )}
              {form.url && form.mediaType === "video" && (
                <video src={form.url} controls style={{ width: "100%", maxHeight: 260 }} />
              )}
            </div>
          </div>
          <button className="btn btn-primary" type="submit">Lưu Media</button>
        </form>
      </div>
    </AdminLayout>
  );
}
