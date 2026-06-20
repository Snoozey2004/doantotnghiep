import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { userApi } from "../api/userApi";

export default function AdminUserEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({ fullName: "", email: "", role: 3, isApproved: true });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userApi
      .getById(id)
      .then((data) => setForm({
        fullName: data.fullName ?? "",
        email: data.email ?? "",
        role: data.role ?? 3,
        isApproved: Boolean(data.isApproved)
      }))
      .catch(() => setMessage("Không tải được user."));
  }, [id]);

  const handleChange = (event) => {
      const { name, type, checked, value } = event.target;
      setForm((prev) => ({
          ...prev, [name]:
              type === "checkbox" ? checked
              :name === "role" ? Number(value) : value,
      }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const updatedUser = await userApi.update(id, form);
      setMessage("✅ Cập nhật user thành công!");
      setTimeout(() => navigate("/admin/users"), 1500);
    } catch (error) {
      setMessage("❌ Cập nhật user thất bại: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1200, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Cập nhật user</h1>
        {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
        <form className="card" onSubmit={handleSubmit}>
          <input name="fullName" placeholder="Full name" value={form.fullName} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="0">Admin</option>
            <option value="1">Editor</option>
            <option value="2">Seller</option>
            <option value="3">Customer</option>
          </select>
          <div style={{ marginTop: 16, padding: 12, backgroundColor: form.isApproved ? "#dcfce7" : "#fef3c7", borderRadius: 6, borderLeft: `4px solid ${form.isApproved ? "#22c55e" : "#f59e0b"}` }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" name="isApproved" checked={form.isApproved} onChange={handleChange} />
              <span style={{ fontWeight: 500 }}>
                {form.isApproved ? "✓ Tài khoản đã được phê duyệt" : "⚠ Tài khoản đang chờ phê duyệt"}
              </span>
            </label>
          </div>
          <button className="btn btn-primary" type="submit">Lưu thay đổi</button>
        </form>
      </div>
    </AdminLayout>
  );
}
