import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { mediaApi } from "../api/mediaApi";
import { provinceApi } from "../api/provinceApi";
import { uploadApi } from "../api/uploadApi";

export default function AdminMediaCreate() {
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [files, setFiles] = useState([]);        // uploaded file info: { url, name, isVideo }
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    provinceApi.getAll().then(setProvinces);
  }, []);

  const handleFileSelect = async (event) => {
    const selected = event.target.files;
    if (!selected || selected.length === 0) return;
    if (!provinceId) {
      setMessage("Vui lòng chọn tỉnh/thành trước khi upload.");
      return;
    }
    setUploading(true);
    setMessage("");
    const province = provinces.find((p) => p.id === provinceId);
    const uploaded = [];

    for (const file of selected) {
      try {
        const isVideo = file.type.startsWith("video/");
        const mediaType = isVideo ? "video" : "image";
        const result = await uploadApi.upload(file, "media", provinceId, province?.name || "media", mediaType);
        uploaded.push({ url: result.url, name: result.fileName, isVideo });
      } catch {
        setMessage(`Upload thất bại: ${file.name}`);
      }
    }

    setFiles((prev) => [...prev, ...uploaded]);
    setUploading(false);
    event.target.value = "";
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setMessage("Vui lòng upload ít nhất một file.");
      return;
    }
    setSubmitting(true);
    setMessage("");
    try {
      const urls = files.map((f) => f.url);
      const firstIsVideo = files.some((f) => f.isVideo);
      await mediaApi.create({
        provinceId,
        mediaType: firstIsVideo ? "video" : "image",
        title: title || files[0].name.replace(/\.[^.]+$/, ""),
        url: urls[0],
        urls,
        description,
        tags,
        sortOrder: Number(sortOrder),
        isFeatured,
        isHighlighted
      });
      navigate("/admin/media");
    } catch {
      setMessage("Tạo media thất bại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1400, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Tạo Media Gallery</h1>
        {message && <div className="card" style={{ marginBottom: 16, color: "#C2552D" }}>{message}</div>}

        <form className="card" onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 16 }}>
            {/* Left column — metadata */}
            <div style={{ display: "grid", gap: 12 }}>
              <select value={provinceId} onChange={(e) => setProvinceId(e.target.value)} required
                style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(22,19,14,0.12)" }}>
                <option value="">Chọn tỉnh/thành</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <input value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="Tiêu đề gallery (mặc định: tên file đầu tiên)" style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(22,19,14,0.12)" }} />

              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả" rows={3}
                style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(22,19,14,0.12)", resize: "vertical" }} />

              <input value={tags} onChange={(e) => setTags(e.target.value)}
                placeholder="Tags (phân cách bằng dấu phẩy)" style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(22,19,14,0.12)" }} />

              <input value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
                type="number" placeholder="Thứ tự sắp xếp" style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(22,19,14,0.12)" }} />

              <div style={{ display: "flex", gap: 16 }}>
                <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
                  <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                  ★ Nổi bật
                </label>
                <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
                  <input type="checkbox" checked={isHighlighted} onChange={(e) => setIsHighlighted(e.target.checked)} />
                  ⭐ Highlight
                </label>
              </div>

              <div style={{ marginTop: 8 }}>
                <label style={{ fontWeight: 600, fontSize: "0.875rem", display: "block", marginBottom: 8 }}>
                  Chọn ảnh / video cho gallery này
                </label>
                <input type="file" multiple accept="image/*,video/*" onChange={handleFileSelect}
                  disabled={uploading}
                  style={{ fontSize: "0.9rem" }} />
                <p style={{ fontSize: "0.8rem", color: "#9A9182", marginTop: 4 }}>
                  Tất cả file sẽ thuộc cùng một media item.
                </p>
              </div>
            </div>

            {/* Right column — file previews */}
            <div style={{ display: "grid", gap: 12, alignContent: "start", minWidth: 0, overflow: "hidden" }}>
              <label style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                Gallery preview ({files.length} file{files.length !== 1 ? "s" : ""})
              </label>
              {files.length === 0 ? (
                <div style={{ width: "100%", height: 200, borderRadius: 12, background: "#f0ebe0", display: "flex", alignItems: "center", justifyContent: "center", color: "#9A9182" }}>
                  {uploading ? "Đang upload..." : "Chưa có file nào"}
                </div>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {files.map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", background: "#f6f1e8", borderRadius: 8, padding: 6, minWidth: 0 }}>
                      <div style={{ width: 60, height: 60, borderRadius: 6, overflow: "hidden", flexShrink: 0, background: "#e7dfd0" }}>
                        {f.isVideo ? (
                          <video src={f.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <img src={f.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                      </div>
                      <span style={{ flex: 1, minWidth: 0, fontSize: "0.85rem", color: "#312B22", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
                      <button type="button" onClick={() => removeFile(i)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#C2552D", fontSize: "1.2rem", padding: "0 4px" }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={submitting || files.length === 0}
            style={{ marginTop: 16 }}>
            {submitting ? "Đang lưu..." : `Lưu Gallery (${files.length} file)`}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
