import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { postApi } from "../api/postApi";
import { provinceApi } from "../api/provinceApi";

const emptyPost = {
  provinceId: "",
  title: "",
  content: "",
  contentEn: "",
  category: "",
  imageUrl: "",
  videoUrl: "",
  tags: "",
  isHighlighted: false,
  highlightOrder: 0,
  slug: ""
};

const contentCategories = ["history", "culture", "tourism", "cuisine", "festival"];

export default function AdminPostCreate() {
  const [form, setForm] = useState(emptyPost);
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
      await postApi.create(form);
      navigate("/admin/posts");
    } catch {
      setMessage("Tạo bài viết thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 820 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Tạo bài viết</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <form className="card" onSubmit={handleSubmit}>
          <select name="provinceId" value={form.provinceId} onChange={handleChange} required>
            <option value="">Chọn Province</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
          <input name="title" placeholder="Tiêu đề" value={form.title} onChange={handleChange} required />
          <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} required />
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Chọn chủ đề</option>
            {contentCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
          <input name="videoUrl" placeholder="Video URL" value={form.videoUrl} onChange={handleChange} />
          <textarea name="content" placeholder="Nội dung (VI)" value={form.content} onChange={handleChange} rows={3} />
          <textarea name="contentEn" placeholder="Content (EN)" value={form.contentEn} onChange={handleChange} rows={3} />
          <input name="tags" placeholder="Tags (comma)" value={form.tags} onChange={handleChange} />
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" name="isHighlighted" checked={form.isHighlighted} onChange={handleChange} />
            Highlight
          </label>
          <input
            name="highlightOrder"
            type="number"
            placeholder="Highlight order"
            value={form.highlightOrder}
            onChange={handleChange}
          />
          <button className="btn btn-primary" type="submit">Lưu bài viết</button>
        </form>
      </div>
    </AdminLayout>
  );
}
