import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { userApi } from "../api/userApi";

const roleNames = {
  0: "Admin",
  1: "Editor",
  2: "Seller",
  3: "Customer"
};

export default function AdminUsersDashboard() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [filters, setFilters] = useState({ role: "", approved: "" });

  useEffect(() => {
    userApi
      .getAll()
      .then(setUsers)
      .catch(() => setMessage("Không tải được danh sách user."));
  }, []);

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (filters.role !== "") {
      result = result.filter(u => u.role === Number(filters.role));
    }

    if (filters.approved !== "") {
      result = result.filter(u => u.isApproved === (filters.approved === "true"));
    }

    return result.sort((a, b) => a.fullName.localeCompare(b.fullName));
  }, [users, filters]);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa người dùng này?")) return;
    try {
      await userApi.delete(id);
      setUsers(users.filter(u => u.id !== id));
      setMessage("Xóa người dùng thành công.");
    } catch {
      setMessage("Xóa người dùng thất bại.");
    }
  };

  const stats = {
    total: users.length,
    approved: users.filter(u => u.isApproved).length,
    pending: users.filter(u => !u.isApproved).length,
    admins: users.filter(u => u.role === 0).length,
    editors: users.filter(u => u.role === 1).length
  };

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Quản lý Users</h1>
          <p>Danh sách người dùng và phân quyền.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Tổng người dùng</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: 8 }}>{stats.total}</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Đã phê duyệt</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: 8, color: "#22c55e" }}>{stats.approved}</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Chờ phê duyệt</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: 8, color: "#f59e0b" }}>{stats.pending}</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Admin/Editor</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: 8 }}>{stats.admins + stats.editors}</div>
        </div>
      </div>

      {message && <div className="card" style={{ marginBottom: 24 }}>{message}</div>}

      {/* Filters */}
      <div className="card" style={{ marginBottom: 24, padding: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="">Tất cả roles</option>
          <option value="0">Admin</option>
          <option value="1">Editor</option>
          <option value="2">Seller</option>
          <option value="3">Customer</option>
        </select>
        <select name="approved" value={filters.approved} onChange={handleFilterChange}>
          <option value="">Tất cả trạng thái</option>
          <option value="true">Đã phê duyệt</option>
          <option value="false">Chờ phê duyệt</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
          Danh sách user ({filteredUsers.length})
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Tên</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Email</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600 }}>Role</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600 }}>Trạng thái</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600 }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 500 }}>{user.fullName}</td>
                  <td style={{ padding: "12px 16px", color: "#64748b", fontSize: "0.875rem" }}>{user.email}</td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: user.role <= 1 ? "#dbeafe" : "#f3e8ff",
                      color: user.role <= 1 ? "#0369a1" : "#6b21a8",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 500
                    }}>
                      {roleNames[user.role]}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: user.isApproved ? "#dcfce7" : "#fef3c7",
                      color: user.isApproved ? "#166534" : "#92400e",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 500
                    }}>
                      {user.isApproved ? "Đã phê duyệt" : "Chờ phê duyệt"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <Link to={`/admin/users/${user.id}/edit`} className="btn btn-outline btn-sm" style={{ marginRight: 8 }}>
                      Sửa
                    </Link>
                    <button 
                      className="btn btn-outline btn-sm" 
                      style={{ borderColor: "#ef4444", color: "#ef4444" }}
                      onClick={() => handleDelete(user.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div style={{ padding: 24, color: "#64748b", textAlign: "center" }}>Không có dữ liệu.</div>
        )}
      </div>
    </AdminLayout>
  );
}
