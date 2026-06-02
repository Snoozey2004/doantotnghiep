import { useEffect, useState } from "react";
import { postApi } from "../api/postApi";
import RichTextDisplay from "./RichTextDisplay";

export default function PostVersionHistory({ postId }) {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;
    setLoading(true);
    postApi
      .getVersions(postId)
      .then((data) => {
        setVersions(data);
        setSelectedVersion(null);
      })
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <div style={{ padding: 12, color: "#64748b" }}>Đang tải lịch sử...</div>;

  if (versions.length === 0) {
    return (
      <div style={{ padding: 12, color: "#64748b" }}>
        Chưa có lịch sử chỉnh sửa.
      </div>
    );
  }

  const tagList = selectedVersion?.tags
    ? selectedVersion.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const categoryLabel = {
    history: "Lịch sử",
    culture: "Văn hóa",
    tourism: "Du lịch",
    cuisine: "Ẩm thực",
    festival: "Lễ hội"
  }[selectedVersion?.category?.toLowerCase()] || selectedVersion?.category;

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {versions
          .slice()
          .reverse()
          .map((v) => (
            <button
              key={v.revisionNumber}
              type="button"
              className={selectedVersion?.revisionNumber === v.revisionNumber ? "btn btn-primary" : "btn btn-outline"}
              style={{ fontSize: "0.8rem", padding: "4px 10px" }}
              onClick={() => setSelectedVersion(v)}
            >
              v{v.revisionNumber}
              <br />
              <small>{new Date(v.snapshotAt).toLocaleDateString("vi-VN")}</small>
            </button>
          ))}
      </div>

      {selectedVersion && (
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: 16,
            fontSize: "0.9rem"
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <div><strong>Tiêu đề:</strong> {selectedVersion.title}</div>
            <div><strong>Chủ đề:</strong> {categoryLabel || "—"}</div>
            <div><strong>Slug:</strong> {selectedVersion.slug}</div>
            <div><strong>Ghi chú:</strong> {selectedVersion.isHighlighted ? "⭐ Nổi bật" : "—"}</div>
          </div>

          {selectedVersion.imageUrl && (
            <img
              src={selectedVersion.imageUrl}
              alt=""
              style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 6, marginBottom: 12 }}
            />
          )}

          {selectedVersion.description && (
            <div style={{ marginBottom: 8 }}>
              <strong>Mô tả:</strong>
              <p style={{ color: "#475569", margin: "4px 0" }}>{selectedVersion.description}</p>
            </div>
          )}

          {selectedVersion.body && (
            <div style={{ marginBottom: 8 }}>
              <strong>Nội dung:</strong>
              <RichTextDisplay html={selectedVersion.body} />
            </div>
          )}

          {tagList.length > 0 && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {tagList.map((tag, idx) => (
                <span key={idx} className="tag" style={{ fontSize: "0.75rem" }}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
