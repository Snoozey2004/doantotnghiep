import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { mediaApi } from "../api/mediaApi";
import { provinceApi } from "../api/provinceApi";

export default function AdminMediaDashboard() {
  const [mediaItems, setMediaItems] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [provinceFilter, setProvinceFilter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    provinceApi.getAll().then(setProvinces);
    mediaApi
      .search({})
      .then(setMediaItems)
      .catch(() => setMessage("Không tải được danh sách media."));
  }, []);

  const provinceMap = useMemo(
    () => Object.fromEntries(provinces.map((p) => [p.id, p.name])),
    [provinces]
  );

  const filtered = useMemo(() => {
    let items = [...mediaItems];
    if (provinceFilter) {
      items = items.filter((m) => m.provinceId === provinceFilter);
    }
    return items.sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
  }, [mediaItems, provinceFilter]);

  const typeBreakdown = useMemo(() => {
    const breakdown = {};
    filtered.forEach((item) => {
      const type = item.mediaType || "Unknown";
      breakdown[type] = (breakdown[type] || 0) + 1;
    });
    return breakdown;
  }, [filtered]);

  const featuredCount = useMemo(() => filtered.filter((m) => m.isHighlighted).length, [filtered]);

  // Resolve all URLs for a media item (Urls array + fallback to single Url)
  const getUrls = (item) => {
    if (Array.isArray(item.urls) && item.urls.length > 0) return item.urls;
    if (item.url) return [item.url];
    return [];
  };

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Media Library</h1>
          <p>Thư viện ảnh và video theo tỉnh/thành.</p>
        </div>
        <Link to="/admin/media/new" className="btn btn-primary">+ Thêm Media</Link>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
        <div className="card" style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#1F3A2E" }}>{filtered.length}</div>
          <div style={{ color: "#6E665A", fontSize: 13, marginTop: 4 }}>Tổng gallery</div>
        </div>
        <div className="card" style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#C2552D" }}>{featuredCount}</div>
          <div style={{ color: "#6E665A", fontSize: 13, marginTop: 4 }}>Gallery nổi bật</div>
        </div>
        {Object.entries(typeBreakdown).map(([type, count]) => (
          <div key={type} className="card" style={{ padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: "#1C3D52" }}>{count}</div>
            <div style={{ color: "#6E665A", fontSize: 13, marginTop: 4 }}>{type === "image" ? "🖼 Hình ảnh" : "🎬 Video"}</div>
          </div>
        ))}
      </div>

      {/* Province Filter */}
      <div className="card" style={{ marginBottom: 24, padding: "12px 16px", display: "flex", gap: 12, alignItems: "center" }}>
        <label style={{ fontWeight: 600, whiteSpace: "nowrap" }}>Lọc theo tỉnh:</label>
        <select
          value={provinceFilter}
          onChange={(e) => setProvinceFilter(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(22,19,14,0.12)", flex: 1, maxWidth: 300 }}
        >
          <option value="">Tất cả tỉnh/thành</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {message && <div className="card" style={{ marginBottom: 24 }}>{message}</div>}

      {/* Visual Gallery Grid */}
      {filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map((item) => {
            const urls = getUrls(item);
            const coverUrl = urls[0];
            const extraCount = urls.length - 1;
            const isVideo = item.mediaType === "video";
            return (
              <div key={item.id} className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                {/* Thumbnail */}
                <div style={{ position: "relative", width: "100%", height: 180, background: "#f0ebe0", overflow: "hidden" }}>
                  {coverUrl ? (
                    isVideo ? (
                      <video src={coverUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <img src={coverUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9A9182" }}>📁</div>
                  )}
                  <span style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.5)", color: "#fff", padding: "2px 10px", borderRadius: 999, fontSize: 12 }}>
                    {isVideo ? "🎬 Video" : "🖼 Ảnh"}
                  </span>
                  {item.isHighlighted && <span style={{ position: "absolute", top: 8, right: 8, fontSize: 20 }}>⭐</span>}
                  {item.isFeatured && (
                    <span style={{ position: "absolute", bottom: 8, left: 8, background: "#C2552D", color: "#fff", padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>NỔI BẬT</span>
                  )}
                  {extraCount > 0 && (
                    <span style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.6)", color: "#fff", padding: "2px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                      +{extraCount} file
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "12px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  <strong style={{ fontSize: "0.95rem", color: "#16130E", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.title || "(không tiêu đề)"}
                  </strong>
                  {item.provinceId && (
                    <span style={{ fontSize: "0.8rem", color: "#6E665A" }}>
                      📍 {provinceMap[item.provinceId] || "Unknown"}
                    </span>
                  )}
                  {item.description && (
                    <span style={{ fontSize: "0.8rem", color: "#9A9182", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.description}
                    </span>
                  )}
                  <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 8 }}>
                    <Link to={`/media/${item.id}`} className="btn btn-outline btn-sm" style={{ flex: 1, textAlign: "center" }}>Xem</Link>
                    <Link to={`/admin/media/${item.id}/edit`} className="btn btn-outline btn-sm" style={{ flex: 1, textAlign: "center" }}>Sửa</Link>
                    <Link to={`/admin/media/${item.id}/delete`} className="btn btn-outline btn-sm" style={{ flex: 1, textAlign: "center" }}>Xoá</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card" style={{ padding: 40, textAlign: "center", color: "#9A9182" }}>
          {provinceFilter ? "Chưa có gallery nào cho tỉnh này." : "Chưa có dữ liệu."}
        </div>
      )}
    </AdminLayout>
  );
}
