import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import RichTextEditor from "../components/RichTextEditor.jsx";
import RichTextDisplay from "../components/RichTextDisplay.jsx";
import { postApi } from "../api/postApi";
import { provinceApi } from "../api/provinceApi";
import { uploadApi } from "../api/uploadApi";
import PostVersionHistory from "../components/PostVersionHistory.jsx";

const emptyPost = {
  provinceId: "",
  title: "",
  description: "",
  body: "",
  contentEn: "",
  category: "",
  imageUrl: "",
  videoUrl: "",
  tags: "",
  isHighlighted: false,
  highlightOrder: 0,
  slug: "",
  revisionNumber: 0
};

const contentCategories = ["history", "culture", "tourism", "cuisine", "festival"];

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AdminPostEdit() {
  const { id } = useParams();
  const [form, setForm] = useState(emptyPost);
  const [provinces, setProvinces] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    provinceApi.getAll().then(setProvinces);
    postApi
      .getById(id)
      .then((data) => setForm({
        provinceId: data.provinceId ?? "",
        title: data.title ?? "",
        description: data.description ?? "",
        body: data.body ?? "",
        contentEn: data.contentEn ?? "",
        category: data.category ?? "",
        imageUrl: data.imageUrl ?? "",
        videoUrl: data.videoUrl ?? "",
        tags: data.tags ?? "",
        isHighlighted: Boolean(data.isHighlighted),
        highlightOrder: data.highlightOrder ?? 0,
        slug: data.slug ?? "",
        revisionNumber: data.revisionNumber ?? 0
      }))
      .catch(() => setMessage("Không tải được bài viết."));
  }, [id]);

  const handleChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => {
      const nextForm = { ...prev, [event.target.name]: value };
      if (event.target.name === "title") {
        nextForm.slug = slugify(value);
      }
      return nextForm;
    });
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
      // For posts, we use "posts" folder but don't have province info, so pass empty
      const result = await uploadApi.upload(file, "posts", null, form.title || "post", mediaType);
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
      await postApi.update(id, form);
      navigate("/admin/posts");
    } catch {
      setMessage("Cập nhật bài viết thất bại.");
    }
  };

  const selectedProvince = provinces.find((p) => p.id === form.provinceId);
  const categoryLabel = {
    history: "Lịch sử",
    culture: "Văn hóa",
    tourism: "Du lịch",
    cuisine: "Ẩm thực",
    festival: "Lễ hội"
  }[form.category?.toLowerCase()] || form.category;

  const tagList = form.tags
    ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1400, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Cập nhật bài viết</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <form className="card" onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
            {/* Left: Form Fields */}
            <div style={{ display: "grid", gap: 12 }}>
              <select name="provinceId" value={form.provinceId} onChange={handleChange} required>
                <option value="">Chọn Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              <input name="title" placeholder="Tiêu đề" value={form.title} onChange={handleChange} required />
              <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} />
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Chọn chủ đề</option>
                {contentCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
                <label style={{ fontWeight: 600, marginBottom: 8, display: "block" }}>Ảnh đại diện</label>
                <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
                <input type="file" accept="image/*" onChange={(event) => handleUpload(event, "imageUrl")} />
                {form.imageUrl && (
                  <img src={form.imageUrl} alt="Preview" style={{ width: "100%", maxHeight: 180, objectFit: "cover", marginTop: 8, borderRadius: 4 }} />
                )}
              </div>

              <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
                <label style={{ fontWeight: 600, marginBottom: 8, display: "block" }}>Video</label>
                <input name="videoUrl" placeholder="Video URL" value={form.videoUrl} onChange={handleChange} />
                <input type="file" accept="video/*" onChange={(event) => handleUpload(event, "videoUrl")} />
                {form.videoUrl && (
                  <video src={form.videoUrl} controls style={{ width: "100%", maxHeight: 180, marginTop: 8, borderRadius: 4 }} />
                )}
              </div>

              <textarea name="description" placeholder="Mô tả ngắn (VI)" value={form.description} onChange={handleChange} rows={3} />
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
            </div>

            {/* Right: Rich Text Editor */}
            <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
              <label style={{ fontWeight: 600 }}>Nội dung chi tiết (Rich Text)</label>
              <RichTextEditor
                value={form.body}
                onChange={handleBodyChange}
                maxLength={50000}
                placeholder="Nhập nội dung chi tiết với định dạng..."
              />
            </div>
          </div>

          {/* Preview Section */}
          <div style={{ marginTop: 24, borderTop: "1px solid #e2e8f0", paddingTop: 20 }}>
            <h2 style={{ fontSize: "1.3rem", marginBottom: 16 }}>Xem trước bài viết</h2>
            <div className="post-detail-page" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
              {/* Header Image */}
              {form.imageUrl && (
                <div className="post-header-image">
                  <img src={form.imageUrl} alt={form.title} />
                </div>
              )}

              {/* Main Content */}
              <div className="post-detail-container">
                <article className="post-detail-content">
                  <header className="post-header">
                    <h1>{form.title || "Tiêu đề bài viết"}</h1>
                    <div className="post-meta">
                      {selectedProvince && (
                        <span className="meta-item">
                          <strong>Địa phương:</strong>
                          <span>{selectedProvince.name}</span>
                        </span>
                      )}
                      {form.category && (
                        <span className="meta-item">
                          <strong>Chủ đề:</strong>
                          <span>{categoryLabel}</span>
                        </span>
                      )}
                    </div>
                    {tagList.length > 0 && (
                      <div className="post-tags">
                        {tagList.map((tag, idx) => (
                          <span key={idx} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </header>

                  {/* Video Embed */}
                  {form.videoUrl && (
                    <div className="post-video-section">
                      <h2>Video</h2>
                      <div className="video-container">
                        <iframe
                          title={form.title}
                          src={form.videoUrl}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}

                  {/* Rich Body Content */}
                  {form.body && (
                    <div className="post-body-section">
                      <RichTextDisplay html={form.body} />
                    </div>
                  )}

                  {/* Fallback Content */}
                  {!form.body && form.description && (
                    <div className="post-content-section">
                      <p>{form.description}</p>
                    </div>
                  )}

                  {/* English Content */}
                  {form.contentEn && (
                    <details className="post-english-content">
                      <summary>English Version</summary>
                      <div className="english-text">
                        <p>{form.contentEn}</p>
                      </div>
                    </details>
                  )}
                </article>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Lưu thay đổi</button>
        </form>

        <details style={{ marginTop: 24, borderTop: "1px solid #e2e8f0", paddingTop: 20 }}>
          <summary style={{ fontSize: "1.1rem", fontWeight: 600, cursor: "pointer", marginBottom: 12 }}>
            Lịch sử chỉnh sửa ({form.revisionNumber || 0} bản)
          </summary>
          <PostVersionHistory postId={id} />
        </details>
      </div>
    </AdminLayout>
  );
}
