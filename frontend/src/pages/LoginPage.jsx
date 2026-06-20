import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { authApi } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Check if redirected due to session expiration
  useEffect(() => {
    const reason = searchParams.get("reason");
    if (reason === "session_expired") {
      setError("Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.");
    }
  }, [searchParams]);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const result = await authApi.login(form);

      // Check if user is approved
      if (result.role === 1 && !result.isApproved) {
        setError("❌ Tài khoản của bạn đang chờ Admin phê duyệt. Vui lòng kiểm tra email để cập nhật.");
        return;
      }

      const roleValue = Number(result.role);
      const normalizedRole = Number.isFinite(roleValue) ? roleValue : 3;

      localStorage.setItem("accessToken", result.accessToken);
      login({
        id: result.userId,
        fullName: result.fullName,
        email: result.email,
        role: normalizedRole
      }, result.expiresAt);

      const target = normalizedRole === 0 ? "/admin" : normalizedRole === 1 ? "/editor" : "/";
      navigate(target, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "❌ Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <MainLayout>
      <section className="auth-page auth-bg">
        <div className="container auth-container">
          <div className="auth-grid">
            <div className="auth-hero">
              <span className="auth-kicker">Vietnam Identity</span>
              <h1>Đăng nhập để tiếp tục hành trình khám phá Việt Nam</h1>
              <p>
                Truy cập không gian văn hóa, đặc sản và bản đồ tương tác với trải nghiệm
                đồng nhất cùng homepage.
              </p>
              <div className="auth-highlights">
                <div>
                  <strong>34</strong>
                  <span>Tỉnh thành</span>
                </div>
                <div>
                  <strong>100+</strong>
                  <span>Đặc sản</span>
                </div>
                <div>
                  <strong>Interactive</strong>
                  <span>Bản đồ Việt Nam</span>
                </div>
              </div>
            </div>
            <div className="auth-card auth-card--glass">
              <div className="auth-card-header">
                <span className="auth-card-kicker">Chào mừng trở lại</span>
                <h2>Đăng nhập</h2>
                <p>Vào tài khoản để lưu sở thích và tiếp tục khám phá.</p>
              </div>
              <form onSubmit={handleSubmit} className="auth-form">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
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
                  Đăng nhập
                </button>
              </form>
              <div className="auth-footer">
                <span>Chưa có tài khoản?</span>
                <Link to="/register">Đăng ký</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
