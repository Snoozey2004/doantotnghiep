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

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Media Library</h1>
          <p>Danh sách ảnh/video theo địa phương.</p>
        </div>
        <Link to="/admin/media/new" className="btn btn-primary">+ Thêm Media</Link>
      </div>
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
              gridTemplateColumns: "1fr auto",
              gap: 12,
              padding: "16px 24px",
              borderBottom: "1px solid #e2e8f0",
              alignItems: "center"
            }}
          >
            <div>
              <strong>{item.title || "Untitled"}</strong>
              <div style={{ color: "#64748b", fontSize: 13 }}>{item.mediaType}</div>
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
