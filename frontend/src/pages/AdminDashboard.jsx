import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { provinceApi } from "../api/provinceApi";
import analyticsApi from "../api/analyticsApi";

// Region name translation mapping
const regionTranslation = {
  "North": "Miền Bắc",
  "Northeast": "Đông Bắc",
  "Northwest": "Tây Bắc",
  "Red River": "Đồng Bằng Sông Hồng",
  "Central": "Miền Trung",
  "Central Highlands": "Tây Nguyên",
  "Southeast": "Đông Nam",
  "Mekong": "Đồng Bằng Sông Cửu Long",
  "South": "Miền Nam"
};

const translateRegion = (region) => regionTranslation[region] || region;

export default function AdminDashboard() {
  const [provinces, setProvinces] = useState([]);
  const [overview, setOverview] = useState(null);
  const [message, setMessage] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [mediaForm, setMediaForm] = useState({
    provinceId: "",
    mediaType: "image",
    title: "",
    url: "",
    description: "",
    sortOrder: 1,
    isFeatured: false
  });
  const [postForm, setPostForm] = useState({
    provinceId: "",
    title: "",
    content: "",
    category: "",
    imageUrl: "",
    videoUrl: "",
    slug: ""
  });
  const [productForm, setProductForm] = useState({
    provinceId: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: ""
  });

  useEffect(() => {
    provinceApi
      .getAll()
      .then(setProvinces)
      .catch(() => setMessage("Không tải được danh sách province."));

    analyticsApi
      .getOverview()
      .then(setOverview)
      .catch(() => setMessage("Không tải được thống kê tổng quan."));
  }, []);

  const sortedProvinces = useMemo(
    () => [...provinces]
      .filter(p => regionFilter === "" || p.region === regionFilter)
      .sort((a, b) => a.name.localeCompare(b.name)),
    [provinces, regionFilter]
  );

  const regions = useMemo(
    () => [...new Set(provinces.map(p => p.region))].sort().map(region => ({
      original: region,
      translated: translateRegion(region)
    })),
    [provinces]
  );

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Bảng điều khiển nội dung</h1>
          <p>Tổng quan dữ liệu địa phương, bài viết, media và sản phẩm.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link to="/admin/statistics" className="btn btn-primary">
            📊 Thống kê nội dung
          </Link>
          <Link to="/admin/featured" className="btn btn-primary">
            Quản lý nổi bật
          </Link>
          <Link to="/admin/provinces/new" className="btn btn-primary">
            + Tạo tỉnh/thành
          </Link>
        </div>
      </div>
      {overview && (
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ color: "#64748b", fontSize: 13 }}>Tỉnh/thành</div>
            <h2 style={{ marginTop: 8 }}>{overview.provinceCount}</h2>
            <div style={{ color: "#64748b", fontSize: 13 }}>Nổi bật: {overview.highlightedProvinceCount}</div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ color: "#64748b", fontSize: 13 }}>Bài viết</div>
            <h2 style={{ marginTop: 8 }}>{overview.postCount}</h2>
            <div style={{ color: "#64748b", fontSize: 13 }}>Nổi bật: {overview.highlightedPostCount}</div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ color: "#64748b", fontSize: 13 }}>Media</div>
            <h2 style={{ marginTop: 8 }}>{overview.mediaCount}</h2>
            <div style={{ color: "#64748b", fontSize: 13 }}>Nổi bật: {overview.highlightedMediaCount}</div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ color: "#64748b", fontSize: 13 }}>Sản phẩm</div>
            <h2 style={{ marginTop: 8 }}>{overview.productCount}</h2>
            <div style={{ color: "#64748b", fontSize: 13 }}>Page views: {overview.pageViews}</div>
          </div>
        </div>
      )}
      {message && <div className="card" style={{ marginBottom: 24 }}>{message}</div>}

      {/* Region Filter */}
      <div className="card" style={{ marginBottom: 24, padding: 16 }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#333", display: "block", marginBottom: 8 }}>
          Lọc theo khu vực
        </label>
        <select 
          value={regionFilter} 
          onChange={(e) => setRegionFilter(e.target.value)}
          style={{ 
            padding: "8px 12px", 
            borderRadius: "4px", 
            border: "1px solid #e2e8f0",
            width: "100%",
            maxWidth: "300px"
          }}
        >
          <option value="">Tất cả khu vực ({provinces.length})</option>
          {regions.map(region => (
            <option key={region.original} value={region.original}>
              {region.translated} ({provinces.filter(p => p.region === region.original).length})
            </option>
          ))}
        </select>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
          Danh sách tỉnh/thành {regionFilter && `(${translateRegion(regionFilter)})`} ({sortedProvinces.length})
        </div>
        <div style={{ display: "grid", gap: 0 }}>
          {sortedProvinces.map((province) => (
            <div
              key={province.id}
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
                <strong>{province.name}</strong>
                <div style={{ color: "#64748b", fontSize: 13 }}>{translateRegion(province.region)}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link to={`/admin/provinces/${province.id}/edit`} className="btn btn-outline btn-sm">
                  Edit
                </Link>
                <Link to={`/admin/provinces/${province.id}/delete`} className="btn btn-outline btn-sm">
                  Delete
                </Link>
              </div>
            </div>
          ))}
          {sortedProvinces.length === 0 && (
            <div style={{ padding: 24, color: "#64748b" }}>Chưa có dữ liệu.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
