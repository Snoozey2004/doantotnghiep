import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import RichTextEditor from "../components/RichTextEditor.jsx";
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

  const handleBodyChange = (html) => {
    setForm((prev) => ({ ...prev, body: html }));
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
      <div style={{ maxWidth: 820 }}>
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
              <input name="overview" placeholder="Tổng quan" value={form.overview} onChange={handleChange} />
              <input name="keyFeatures" placeholder="Điểm nhấn" value={form.keyFeatures} onChange={handleChange} />
              <textarea name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} rows={3} />
              <textarea name="introduction" placeholder="Giới thiệu (VI)" value={form.introduction} onChange={handleChange} rows={3} />
              <textarea name="introductionEn" placeholder="Introduction (EN)" value={form.introductionEn} onChange={handleChange} rows={3} />
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
          <div style={{ marginTop: 16 }}>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Nội dung chi tiết (Rich Text)</label>
            <RichTextEditor
              value={form.body}
              onChange={handleBodyChange}
              maxLength={50000}
              placeholder="Nhập nội dung chi tiết với định dạng..."
            />
          </div>
          <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Lưu Province</button>
        </form>
      </div>
    </AdminLayout>
  );
}
