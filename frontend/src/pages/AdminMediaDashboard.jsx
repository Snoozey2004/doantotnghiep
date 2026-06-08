import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { mediaApi } from "../api/mediaApi";

export default function AdminMediaDashboard() {
  const [mediaItems, setMediaItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    mediaApi
      .search({})
      .then(setMediaItems)
      .catch(() => setMessage("Không tải được danh sách media."));
  }, []);

  const sortedMedia = useMemo(
    () => [...mediaItems].sort((a, b) => (a.title || "").localeCompare(b.title || "")),
    [mediaItems]
  );

  const typeBreakdown = useMemo(() => {
    const breakdown = {};
    sortedMedia.forEach(item => {
      const type = item.mediaType || "Unknown";
      breakdown[type] = (breakdown[type] || 0) + 1;
    });
    return breakdown;
  }, [sortedMedia]);

  const featuredCount = useMemo(() => sortedMedia.filter(m => m.isHighlighted).length, [sortedMedia]);

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Media Library</h1>
          <p>Danh sách ảnh/video theo địa phương.</p>
        </div>
        <Link to="/admin/media/new" className="btn btn-primary">+ Thêm Media</Link>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
        <div className="card" style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#00a86b" }}>{sortedMedia.length}</div>
          <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>Tổng media</div>
        </div>
        <div className="card" style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#ffa500" }}>{featuredCount}</div>
          <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>Media nổi bật</div>
        </div>
      </div>

      {/* Type Breakdown */}
      {Object.keys(typeBreakdown).length > 0 && (
        <div className="card" style={{ marginBottom: 24, padding: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 12 }}>Media theo loại</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
            {Object.entries(typeBreakdown).map(([type, count]) => (
              <div key={type} style={{ padding: 8, backgroundColor: "#f0f4f8", borderRadius: 4, textAlign: "center" }}>
                <div style={{ fontWeight: 600 }}>{count}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{type}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {message && <div className="card" style={{ marginBottom: 24 }}>{message}</div>}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
          Danh sách media
        </div>
        {sortedMedia.map((item) => (
          <div
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr auto",
              gap: 12,
              padding: "12px 24px",
              borderBottom: "1px solid #e2e8f0",
              alignItems: "center"
            }}
          >
            <div style={{ width: 50, height: 50, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
              {item.mediaType === "image" && item.url ? (
                <img src={item.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : item.url ? (
                <div style={{ width: "100%", height: "100%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎬</div>
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#e2e8f0" }} />
              )}
            </div>
            <div>
              <strong>{item.title || "Untitled"}</strong>
              <div style={{ color: "#64748b", fontSize: 13 }}>
                {item.mediaType}
                <span style={{ marginLeft: 8 }}>📷 {(() => { try { const urls = JSON.parse(item.imageUrls || "[]"); return Array.isArray(urls) ? urls.length : 0; } catch { return 0; } })()}</span>
                {item.isHighlighted && <span style={{ marginLeft: 8, color: "#ffa500" }}>⭐ Nổi bật</span>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link to={`/admin/media/${item.id}/edit`} className="btn btn-outline btn-sm">Edit</Link>
              <Link to={`/admin/media/${item.id}/delete`} className="btn btn-outline btn-sm">Delete</Link>
            </div>
          </div>
        ))}
        {sortedMedia.length === 0 && (
          <div style={{ padding: 24, color: "#64748b" }}>Chưa có dữ liệu.</div>
        )}
      </div>
    </AdminLayout>
  );
}
