import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { authApi } from "../api/authApi";

const ROLE_OPTIONS = [
  { value: "1", label: "Editor", hint: "Cần admin duyệt" },
  { value: "2", label: "Seller", hint: "Bán đặc sản" },
  { value: "3", label: "Customer", hint: "Khách tham quan" },
];

// Dropdown tùy biến cho vai trò — thay <select> native để đồng bộ tông editorial.
function RoleDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current = ROLE_OPTIONS.find((o) => o.value === value) || ROLE_OPTIONS[2];

  return (
    <div className="auth-select-wrap" ref={ref}>
      <button
        type="button"
        className={`auth-select-trigger${open ? " is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="auth-select-current">
          <strong>{current.label}</strong>
          <span>{current.hint}</span>
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="auth-select-panel" role="listbox">
          {ROLE_OPTIONS.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`auth-select-option${o.value === value ? " is-selected" : ""}`}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              <span className="auth-select-option__text">
                <strong>{o.label}</strong>
                <span>{o.hint}</span>
              </span>
              {o.value === value && <span className="auth-select-check" aria-hidden="true">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "3" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const payload = { ...form, role: Number(form.role) };
      await authApi.register(payload);
      const selectedRole = form.role === "1" ? "Editor" : form.role === "2" ? "Seller" : "Customer";
      setSuccess(`✅ Đăng ký thành công! ${form.role === "1" ? "Tài khoản của bạn đang chờ Admin phê duyệt." : ""}`);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("❌ Đăng ký thất bại. Vui lòng thử lại.");
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
                <RoleDropdown
                  value={form.role}
                  onChange={(v) => setForm((prev) => ({ ...prev, role: v }))}
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
                {success && <span style={{ color: "#22c55e", fontSize: "0.875rem", display: "block", marginBottom: 12 }}>{success}</span>}
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
