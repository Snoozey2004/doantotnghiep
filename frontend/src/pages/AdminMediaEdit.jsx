import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function AdminMediaEdit() {
  const { id } = useParams();
  const [form, setForm] = useState(emptyMedia);
  const [provinces, setProvinces] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    provinceApi.getAll().then(setProvinces);
    mediaApi
      .getById(id)
      .then((data) => setForm({
        provinceId: data.provinceId ?? "",
        mediaType: data.mediaType ?? "image",
        title: data.title ?? "",
        url: data.url ?? "",
        description: data.description ?? "",
        tags: data.tags ?? "",
        sortOrder: data.sortOrder ?? 0,
        isFeatured: Boolean(data.isFeatured),
        isHighlighted: Boolean(data.isHighlighted)
      }))
      .catch(() => setMessage("Không tải được media."));
  }, [id]);

  const handleChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await mediaApi.update(id, { ...form, sortOrder: Number(form.sortOrder) });
      navigate("/admin/media");
    } catch {
      setMessage("Cập nhật media thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 820 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Cập nhật Media</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <form className="card" onSubmit={handleSubmit}>
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
          <button className="btn btn-primary" type="submit">Lưu thay đổi</button>
        </form>
      </div>
    </AdminLayout>
  );
}
