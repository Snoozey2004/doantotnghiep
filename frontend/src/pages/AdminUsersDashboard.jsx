import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { userApi } from "../api/userApi";

export default function AdminUsersDashboard() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    userApi
      .getAll()
      .then(setUsers)
      .catch(() => setMessage("Không tải được danh sách user."));
  }, []);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.fullName.localeCompare(b.fullName)),
    [users]
  );

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Quản lý Users</h1>
          <p>Danh sách người dùng và phân quyền.</p>
        </div>
      </div>
      {message && <div className="card" style={{ marginBottom: 24 }}>{message}</div>}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
          Danh sách user
        </div>
        {sortedUsers.map((user) => (
          <div
            key={user.id}
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
              <strong>{user.fullName}</strong>
              <div style={{ color: "#64748b", fontSize: 13 }}>{user.email}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link to={`/admin/users/${user.id}/edit`} className="btn btn-outline btn-sm">Edit</Link>
            </div>
          </div>
        ))}
        {sortedUsers.length === 0 && (
          <div style={{ padding: 24, color: "#64748b" }}>Chưa có dữ liệu.</div>
        )}
      </div>
    </AdminLayout>
  );
}
