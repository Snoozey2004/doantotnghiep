import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { landingConfigApi } from "../api/landingConfigApi";
import { provinceApi } from "../api/provinceApi";

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

export default function AdminLandingDashboard() {
  const [configs, setConfigs] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [message, setMessage] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    provinceApi.getAll().then((provinceList) => {
      setProvinces(provinceList);
      return Promise.all(
        provinceList.map((province) => landingConfigApi.getByProvinceId(province.id).catch(() => null))
      );
    }).then((results) => {
      setConfigs(results.filter(Boolean));
    }).catch(() => setMessage("Không tải được landing configs."));
  }, []);

  const sortedConfigs = useMemo(
    () => [...configs]
      .filter(c => {
        if (regionFilter === "") return true;
        const province = provinces.find(p => p.id === c.provinceId);
        return province?.region === regionFilter;
      })
      .sort((a, b) => (a.provinceId || "").localeCompare(b.provinceId || "")),
    [configs, provinces, regionFilter]
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
          <h1>Landing Config</h1>
          <p>Danh sách cấu hình landing page.</p>
        </div>
        <Link to="/admin/landing/new" className="btn btn-primary">+ Tạo Config</Link>
      </div>
      <div className="card" style={{ marginBottom: 24, padding: 20 }}>
        <strong>Tổng cấu hình:</strong> {sortedConfigs.length}
      </div>
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
          <option value="">Tất cả khu vực ({configs.length})</option>
          {regions.map(region => (
            <option key={region.original} value={region.original}>
              {region.translated} ({configs.filter(c => provinces.find(p => p.id === c.provinceId)?.region === region.original).length})
            </option>
          ))}
        </select>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
          Landing configs {regionFilter && `(${translateRegion(regionFilter)})`} ({sortedConfigs.length})
        </div>
        {sortedConfigs.map((config) => (
          <div
            key={config.id}
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
              <strong>{provinces.find((province) => province.id === config.provinceId)?.name || config.id}</strong>
              <div style={{ color: "#64748b", fontSize: 13 }}>{config.layout}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link to={`/admin/landing/${config.id}/edit`} className="btn btn-outline btn-sm">Edit</Link>
              <Link to={`/province/${provinces.find((province) => province.id === config.provinceId)?.slug || ""}`} className="btn btn-outline btn-sm">View</Link>
              <Link to={`/admin/landing/${config.id}/delete`} className="btn btn-outline btn-sm">Delete</Link>
            </div>
          </div>
        ))}
        {sortedConfigs.length === 0 && (
          <div style={{ padding: 24, color: "#64748b" }}>Chưa có dữ liệu.</div>
        )}
      </div>
    </AdminLayout>
  );
}
