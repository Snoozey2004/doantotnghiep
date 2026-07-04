import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { provinceApi } from "../api/provinceApi";
import analyticsApi from "../api/analyticsApi";
import { landingConfigApi } from "../api/landingConfigApi";

const regionTranslation = {
  North: "Miền Bắc",
  Northeast: "Đông Bắc",
  Northwest: "Tây Bắc",
  "Red River": "Đồng Bằng Sông Hồng",
  Central: "Miền Trung",
  "Central Highlands": "Tây Nguyên",
  Southeast: "Đông Nam",
  Mekong: "Đồng Bằng Sông Cửu Long",
  South: "Miền Nam",
};
const translateRegion = (region) => regionTranslation[region] || region || "—";

export default function AdminDashboard() {
  const [provinces, setProvinces] = useState([]);
  const [overview, setOverview] = useState(null);
  const [interactions, setInteractions] = useState({});
  const [configuredSlugs, setConfiguredSlugs] = useState(new Set());
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    provinceApi.getAll().then(setProvinces).catch(() => setMessage("Không tải được danh sách tỉnh."));
    analyticsApi.getOverview().then(setOverview).catch(() => {});
    analyticsApi.getProvinceInteractions()
      .then((rows) => {
        const map = {};
        (rows || []).forEach((r) => { map[r.provinceId] = r; });
        setInteractions(map);
      })
      .catch(() => {});
    landingConfigApi.getBackgrounds()
      .then((list) => setConfiguredSlugs(new Set((list || []).map((x) => x.slug))))
      .catch(() => {});
  }, []);

  const regions = useMemo(
    () => [...new Set(provinces.map((p) => p.region).filter(Boolean))].sort()
      .map((r) => ({ original: r, translated: translateRegion(r) })),
    [provinces]
  );

  const filtered = useMemo(() => {
    const kw = search.trim().toLowerCase();
    return [...provinces]
      .filter((p) => regionFilter === "" || p.region === regionFilter)
      .filter((p) => !kw || p.name.toLowerCase().includes(kw))
      .sort((a, b) => {
        if (!!a.isHighlighted !== !!b.isHighlighted) return a.isHighlighted ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  }, [provinces, regionFilter, search]);

  const toggleFeatured = async (p) => {
    setTogglingId(p.id);
    try {
      await provinceApi.updateHighlight(p.id, {
        isHighlighted: !p.isHighlighted,
        highlightOrder: p.isHighlighted ? 0 : (p.highlightOrder || 999),
      });
      setProvinces((prev) => prev.map((x) => (x.id === p.id ? { ...x, isHighlighted: !x.isHighlighted } : x)));
    } catch {
      setMessage("Đổi trạng thái nổi bật thất bại.");
      setTimeout(() => setMessage(""), 4000);
    } finally {
      setTogglingId(null);
    }
  };

  const overviewCards = overview ? [
    { label: "Tỉnh/thành", value: overview.provinceCount, sub: `Nổi bật: ${overview.highlightedProvinceCount}` },
    { label: "Bài viết", value: overview.postCount, sub: `Nổi bật: ${overview.highlightedPostCount}` },
    { label: "Media", value: overview.mediaCount, sub: `Nổi bật: ${overview.highlightedMediaCount}` },
    { label: "Sản phẩm", value: overview.productCount, sub: `Lượt xem trang: ${overview.pageViews}` },
  ] : [];

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Quản lý tỉnh thành</h1>
          <p>Điều phối từng tỉnh: nổi bật, tương tác, cấu hình landing và nội dung.</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link to="/admin/statistics" className="btn btn-primary">📊 Thống kê</Link>
          <Link to="/admin/featured" className="btn btn-primary">⭐ Quản lý nổi bật</Link>
          <Link to="/admin/provinces/new" className="btn btn-primary">+ Tạo tỉnh/thành</Link>
        </div>
      </div>

      {overviewCards.length > 0 && (
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
          {overviewCards.map((c) => (
            <div key={c.label} className="card" style={{ padding: 18 }}>
              <div style={{ color: "#64748b", fontSize: 13 }}>{c.label}</div>
              <h2 style={{ margin: "6px 0 2px" }}>{c.value}</h2>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      )}

      {message && <div className="card" style={{ marginBottom: 16, color: "#dc2626" }}>{message}</div>}

      {/* Toolbar */}
      <div className="card" style={{ marginBottom: 16, padding: 14, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Tìm tỉnh…"
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", flex: "1 1 220px", minWidth: 0 }}
        />
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0" }}
        >
          <option value="">Tất cả khu vực ({provinces.length})</option>
          {regions.map((r) => (
            <option key={r.original} value={r.original}>
              {r.translated} ({provinces.filter((p) => p.region === r.original).length})
            </option>
          ))}
        </select>
        <span style={{ color: "#94a3b8", fontSize: 13 }}>{filtered.length} tỉnh</span>
      </div>

      {/* Province hub grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
        {filtered.map((p) => {
          const it = interactions[p.id] || {};
          const configured = configuredSlugs.has(p.slug);
          return (
            <div key={p.id} className="card" style={{ padding: 16, display: "grid", gap: 12 }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <strong style={{ fontSize: "1.05rem" }}>{p.name}</strong>
                    {p.isHighlighted && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#b45309", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 20, padding: "1px 8px" }}>★ Nổi bật</span>
                    )}
                  </div>
                  <div style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>{translateRegion(p.region)}</div>
                </div>
                {configured && (
                  <span title="Đã có cấu hình landing" style={{ fontSize: 11, fontWeight: 600, color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap" }}>⚙ Đã cấu hình</span>
                )}
              </div>

              {/* Metrics */}
              <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#475569", flexWrap: "wrap" }}>
                <span title="Lượt xem trang">👁 <strong>{it.pageViews ?? 0}</strong> xem</span>
                <span title="Click đặc sản">🍜 <strong>{it.specialtyClicks ?? 0}</strong></span>
                <span title="Click làng nghề">🧵 <strong>{it.craftClicks ?? 0}</strong></span>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <button
                  onClick={() => toggleFeatured(p)}
                  disabled={togglingId === p.id}
                  className="btn btn-sm"
                  style={{
                    border: "1px solid " + (p.isHighlighted ? "#d97706" : "#e2e8f0"),
                    background: p.isHighlighted ? "#fff7ed" : "#fff",
                    color: p.isHighlighted ? "#b45309" : "#475569",
                    fontWeight: 600,
                  }}
                >
                  {togglingId === p.id ? "…" : p.isHighlighted ? "★ Bỏ nổi bật" : "☆ Nổi bật"}
                </button>
                <Link to="/admin/landing" className="btn btn-outline btn-sm" title="Cấu hình landing">🎨 Landing</Link>
                <a href={`/province/${p.slug}`} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">👁 Xem</a>
                <Link to={`/admin/provinces/${p.id}/edit`} className="btn btn-outline btn-sm">✎ Sửa</Link>
                <Link to={`/admin/provinces/${p.id}/delete`} className="btn btn-outline btn-sm" style={{ color: "#dc2626" }}>🗑</Link>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="card" style={{ padding: 24, color: "#64748b" }}>Không có tỉnh nào khớp bộ lọc.</div>
        )}
      </div>
    </AdminLayout>
  );
}
