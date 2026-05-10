import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { authApi } from "../api/authApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const result = await authApi.login(form);
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("userRole", result.role);
      localStorage.setItem("userName", result.fullName);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <MainLayout>
      <section className="section">
        <div className="container auth-container">
          <div className="auth-card">
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
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
                Đăng nhập
              </button>
            </form>
            <div className="auth-footer">
              <span>Chưa có tài khoản?</span>
              <Link to="/register">Đăng ký</Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
