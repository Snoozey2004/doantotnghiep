import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { mediaApi } from "../api/mediaApi";
import { provinceApi } from "../api/provinceApi";
import { uploadApi } from "../api/uploadApi";

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
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    provinceApi.getAll().then(setProvinces);
  }, []);

  const handleChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessage("");
    try {
      const result = await uploadApi.upload(file, "media", form.provinceId || null, form.title || "media", "IMG");
      setImageUrls((prev) => [...prev, result.url]);
      if (!form.url) {
        setForm((prev) => ({ ...prev, url: result.url }));
      }
      setMessage(`Đã tải: ${result.fileName}`);
    } catch {
      setMessage("Upload thất bại.");
    }
    event.target.value = "";
  };

  const handleUploadMultiple = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    setMessage("");
    let uploaded = [];
    try {
      for (const file of files) {
        const result = await uploadApi.upload(file, "media", form.provinceId || null, form.title || "media", "IMG");
        uploaded.push(result.url);
      }
      setImageUrls((prev) => [...prev, ...uploaded]);
      if (!form.url && uploaded.length > 0) {
        setForm((prev) => ({ ...prev, url: uploaded[0] }));
      }
      setMessage(`Đã tải ${uploaded.length} ảnh.`);
    } catch {
      setMessage("Upload thất bại.");
    }
    event.target.value = "";
  };

  const removeImage = (index) => {
    setImageUrls((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (index === 0 && updated.length > 0) {
        setForm((f) => ({ ...f, url: updated[0] }));
      } else if (updated.length === 0) {
        setForm((f) => ({ ...f, url: "" }));
      }
      return updated;
    });
  };

  const setMainImage = (url) => {
    setForm((prev) => ({ ...prev, url }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await mediaApi.create({
        ...form,
        sortOrder: Number(form.sortOrder),
        imageUrls: JSON.stringify(imageUrls)
      });
      navigate("/admin/media");
    } catch {
      setMessage("Tạo media thất bại.");
    }
  };

  const allImages = imageUrls;

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1400, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Thêm Media</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <form className="card" onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
            <div style={{ display: "grid", gap: 12 }}>
              <select name="provinceId" value={form.provinceId} onChange={handleChange} required>
                <option value="">Chọn Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>{province.name}</option>
                ))}
              </select>
              <input name="title" placeholder="Tiêu đề" value={form.title} onChange={handleChange} />
              <input name="mediaType" placeholder="Media type" value={form.mediaType} onChange={handleChange} />
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

              <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
                <label style={{ fontWeight: 600, marginBottom: 8, display: "block" }}>Ảnh đại diện (chính)</label>
                <input name="url" placeholder="Image URL" value={form.url} onChange={handleChange} />
                <input type="file" accept="image/*" onChange={handleUploadImage} style={{ marginTop: 4 }} />
              </div>

              <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
                <label style={{ fontWeight: 600, marginBottom: 8, display: "block" }}>Thêm nhiều ảnh</label>
                <input type="file" accept="image/*" multiple onChange={handleUploadMultiple} />
              </div>
            </div>

            <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
              {allImages.length > 0 && (
                <div>
                  <label style={{ fontWeight: 600, marginBottom: 8, display: "block" }}>Thư viện ảnh ({allImages.length})</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 8 }}>
                    {allImages.map((imgUrl, idx) => (
                      <div key={idx} style={{ position: "relative" }}>
                        <img
                          src={imgUrl}
                          alt=""
                          onClick={() => setMainImage(imgUrl)}
                          style={{
                            width: "100%",
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 6,
                            cursor: "pointer",
                            border: form.url === imgUrl ? "2px solid #2563eb" : "2px solid transparent"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          style={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                            background: "rgba(0,0,0,0.6)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: 20,
                            height: 20,
                            fontSize: 12,
                            cursor: "pointer",
                            lineHeight: "20px",
                            textAlign: "center"
                          }}
                        >
                          ×
                        </button>
                        {idx === 0 && (
                          <span style={{
                            position: "absolute",
                            bottom: 2,
                            left: 2,
                            background: "#2563eb",
                            color: "#fff",
                            fontSize: 10,
                            padding: "1px 4px",
                            borderRadius: 3
                          }}>Chính</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {form.url && form.mediaType === "video" && (
                <video src={form.url} controls style={{ width: "100%", maxHeight: 260, borderRadius: 8 }} />
              )}
            </div>
          </div>
          <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Lưu Media</button>
        </form>
      </div>
    </AdminLayout>
  );
}
