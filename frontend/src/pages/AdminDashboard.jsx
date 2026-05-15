import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { provinceApi } from "../api/provinceApi";

export default function AdminDashboard() {
  const [provinces, setProvinces] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    provinceApi
      .getAll()
      .then(setProvinces)
      .catch(() => setMessage("Không tải được danh sách province."));
  }, []);

  const sortedProvinces = useMemo(
    () => [...provinces].sort((a, b) => a.name.localeCompare(b.name)),
    [provinces]
  );

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Admin CMS</h1>
          <p>Quản lý danh sách tỉnh thành.</p>
        </div>
        <Link to="/admin/provinces/new" className="btn btn-primary">
          + Tạo Province
        </Link>
      </div>
      {message && <div className="card" style={{ marginBottom: 24 }}>{message}</div>}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
          Danh sách Province
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
                <div style={{ color: "#64748b", fontSize: 13 }}>{province.region}</div>
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
