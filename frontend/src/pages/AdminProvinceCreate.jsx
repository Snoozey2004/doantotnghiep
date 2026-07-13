import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { provinceApi } from "../api/provinceApi";
import { uploadApi } from "../api/uploadApi";

const emptyProvince = {
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

export default function AdminProvinceCreate() {
  const [form, setForm] = useState(emptyProvince);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleUpload = async (event, fieldName) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setMessage("");
    try {
      const mediaType = fieldName === "imageUrl" ? "IMG" : "VID";
      const result = await uploadApi.upload(file, "provinces", null, form.name, mediaType);
      setForm((prev) => ({ ...prev, [fieldName]: result.url }));
      setMessage(`Upload thành công: ${result.fileName}`);
    } catch {
      setMessage("Upload thất bại.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await provinceApi.create(form);
      navigate("/admin");
    } catch {
      setMessage("Tạo province thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1400, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Tạo Province</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <form className="card" onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 16 }}>
            <div style={{ display: "grid", gap: 12 }}>
              <input name="name" placeholder="Tên" value={form.name} onChange={handleChange} required />
              <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} required />
              <input name="region" placeholder="Khu vực" value={form.region} onChange={handleChange} />
              <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
              <input type="file" accept="image/*" onChange={(event) => handleUpload(event, "imageUrl")} />
              <input name="videoUrl" placeholder="Video URL" value={form.videoUrl} onChange={handleChange} />
              <input type="file" accept="video/*" onChange={(event) => handleUpload(event, "videoUrl")} />
              <input name="tags" placeholder="Tags (phân tách bằng dấu phẩy) — dùng cho tìm kiếm" value={form.tags} onChange={handleChange} />
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
            </div>
            <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
              {form.imageUrl && (
                <img src={form.imageUrl} alt="Preview" style={{ width: "100%", maxHeight: 260, objectFit: "cover" }} />
              )}
              {form.videoUrl && (
                <video src={form.videoUrl} controls style={{ width: "100%", maxHeight: 260 }} />
              )}
            </div>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
            ℹ️ Chỉ cần thông tin định danh (tên, slug, khu vực), hình/video, tags và nổi bật. Nội dung trang tỉnh công khai do dữ liệu dựng sẵn + trình <strong>Sửa nội dung</strong> của editor quản lý.
          </p>
          <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Lưu Province</button>
        </form>
      </div>
    </AdminLayout>
  );
}
