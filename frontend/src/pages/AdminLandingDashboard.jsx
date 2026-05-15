import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { landingConfigApi } from "../api/landingConfigApi";
import { provinceApi } from "../api/provinceApi";

export default function AdminLandingDashboard() {
  const [configs, setConfigs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    provinceApi.getAll().then(async (provinces) => {
      const results = await Promise.all(
        provinces.map((province) => landingConfigApi.getByProvinceId(province.id).catch(() => null))
      );
      setConfigs(results.filter(Boolean));
    }).catch(() => setMessage("Không tải được landing configs."));
  }, []);

  const sortedConfigs = useMemo(
    () => [...configs].sort((a, b) => (a.provinceId || "").localeCompare(b.provinceId || "")),
    [configs]
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
      {message && <div className="card" style={{ marginBottom: 24 }}>{message}</div>}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
          Landing configs
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
              <strong>{config.id}</strong>
              <div style={{ color: "#64748b", fontSize: 13 }}>{config.layout}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link to={`/admin/landing/${config.id}/edit`} className="btn btn-outline btn-sm">Edit</Link>
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
