import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { authApi } from "../api/authApi";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "3" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      <section className="auth-page auth-bg">
        <div className="container auth-container">
          <div className="auth-grid auth-grid--reverse">
            <div className="auth-hero">
              <span className="auth-kicker">Vietnam Identity</span>
              <h1>Tạo tài khoản để lưu hành trình văn hóa và đặc sản yêu thích</h1>
              <p>
                Một hồ sơ duy nhất giúp bạn theo dõi các tỉnh thành, nội dung nổi bật và
                trải nghiệm tương tác xuyên suốt.
              </p>
              <div className="auth-highlights">
                <div>
                  <strong>1</strong>
                  <span>Tài khoản riêng</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>Vai trò sử dụng</span>
                </div>
                <div>
                  <strong>Secure</strong>
                  <span>Đăng ký nhanh gọn</span>
                </div>
              </div>
            </div>
            <div className="auth-card auth-card--glass">
              <div className="auth-card-header">
                <span className="auth-card-kicker">Bắt đầu ngay</span>
                <h2>Đăng ký</h2>
                <p>Tạo tài khoản mới chỉ trong vài bước.</p>
              </div>
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
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mật khẩu"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
                {error && <span className="auth-error">{error}</span>}
                <button type="submit" className="btn btn-primary auth-submit">
                  Đăng ký
                </button>
              </form>
              <div className="auth-footer">
                <span>Đã có tài khoản?</span>
                <Link to="/login">Đăng nhập</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
