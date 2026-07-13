import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function AdminProvinceEdit() {
  const { id } = useParams();
  const [form, setForm] = useState(emptyProvince);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    provinceApi
      .getById(id)
      .then((data) => setForm({
        name: data.name ?? "",
        description: data.description ?? "",
        overview: data.overview ?? "",
        keyFeatures: data.keyFeatures ?? "",
        region: data.region ?? "",
        imageUrl: data.imageUrl ?? "",
        videoUrl: data.videoUrl ?? "",
        introduction: data.introduction ?? "",
        introductionEn: data.introductionEn ?? "",
        body: data.body ?? "",
        tags: data.tags ?? "",
        isHighlighted: Boolean(data.isHighlighted),
        highlightOrder: data.highlightOrder ?? 0,
        slug: data.slug ?? ""
      }))
      .catch(() => setMessage("Không tải được province."));
  }, [id]);

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
      const result = await uploadApi.upload(file, "provinces", id, form.name, mediaType);
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
      await provinceApi.update(id, form);
      navigate("/admin");
    } catch {
      setMessage("Cập nhật province thất bại.");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1400, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Cập nhật Province</h1>
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
            ℹ️ Các trường mô tả / nội dung chi tiết đã được ẩn: nội dung trang tỉnh công khai lấy từ dữ liệu dựng sẵn và trình <strong>Sửa nội dung</strong> của editor (/editor/content), không dùng các trường này. Ở đây chỉ quản lý thông tin định danh, hình/video, nổi bật và tags tìm kiếm. (Giá trị cũ vẫn được giữ nguyên khi lưu.)
          </p>
          <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Lưu thay đổi</button>
        </form>
      </div>
    </AdminLayout>
  );
}
