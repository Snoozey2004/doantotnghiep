import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { authApi } from "../api/authApi";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "3" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const payload = { ...form, role: Number(form.role) };
      await authApi.register(payload);
      navigate("/login");
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <MainLayout>
      <section className="section">
        <div className="container auth-container">
          <div className="auth-card">
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="text"
                name="fullName"
                placeholder="Họ và tên"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <select name="role" value={form.role} onChange={handleChange} required>
                <option value="1">Editor (cần admin duyệt)</option>
                <option value="2">Seller</option>
                <option value="3">Customer</option>
              </select>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={handleChange}
                required
              />
              {error && <span className="auth-error">{error}</span>}
              <button type="submit" className="btn btn-primary">
                Đăng ký
              </button>
            </form>
            <div className="auth-footer">
              <span>Đã có tài khoản?</span>
              <Link to="/login">Đăng nhập</Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
