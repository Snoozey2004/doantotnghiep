import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { userApi } from "../api/userApi";

const ROLE_LABEL = { 0: "Thành viên", 1: "Editor", 2: "Quản trị viên" };
const ROLE_COLOR = { 0: "#6b7280", 1: "#7c3aed", 2: "#b45309" };
const ROLE_BG    = { 0: "#f3f4f6", 1: "#f5f3ff", 2: "#fff7ed" };

function getInitials(name) {
  if (!name) return "U";
  return name.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase();
}

function InputField({ label, icon, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#7c6a58", marginBottom: "6px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", fontSize: "1rem", pointerEvents: "none", opacity: 0.5 }}>
            {icon}
          </span>
        )}
        <input
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: icon ? "10px 14px 10px 40px" : "10px 14px",
            borderRadius: "10px",
            border: `1.5px solid ${focused ? "#b45309" : "#e5e0d8"}`,
            fontSize: "0.93rem", background: focused ? "#fff" : "#faf8f5",
            color: "#1a1a1a", outline: "none",
            transition: "border-color 0.15s, background 0.15s",
            boxShadow: focused ? "0 0 0 3px rgba(180,83,9,0.08)" : "none",
          }}
        />
      </div>
    </div>
  );
}

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ fullName: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [toast, setToast] = useState(null); // { type: "success"|"error", text }
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    setProfile({ fullName: user.fullName ?? "", email: user.email ?? "" });
  }, [user, navigate]);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userApi.updateProfile(user.id, profile);
      showToast("success", "Cập nhật thông tin thành công.");
    } catch {
      showToast("error", "Cập nhật thông tin thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword)
      return showToast("error", "Mật khẩu mới không khớp.");
    if (passwordForm.newPassword.length < 6)
      return showToast("error", "Mật khẩu mới phải có ít nhất 6 ký tự.");
    setLoading(true);
    try {
      await userApi.updatePassword(user.id, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showToast("success", "Cập nhật mật khẩu thành công.");
    } catch {
      showToast("error", "Mật khẩu hiện tại không đúng hoặc cập nhật thất bại.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const role = typeof user.role === "number" ? user.role : parseInt(user.role ?? "0", 10);
  const initials = getInitials(user.fullName);

  return (
    <MainLayout>
      <div style={{ minHeight: "80vh", background: "#f7f3ee", padding: "40px 16px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>

          {/* Toast */}
          {toast && (
            <div style={{
              position: "fixed", top: "24px", right: "24px", zIndex: 9999,
              padding: "14px 20px", borderRadius: "12px", minWidth: "260px",
              background: toast.type === "success" ? "#fff" : "#fff",
              border: `1.5px solid ${toast.type === "success" ? "#86efac" : "#fca5a5"}`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              display: "flex", alignItems: "center", gap: "10px",
              animation: "slideUpFade 0.3s ease",
            }}>
              <span style={{ fontSize: "1.2rem" }}>{toast.type === "success" ? "✅" : "❌"}</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: toast.type === "success" ? "#166534" : "#991b1b" }}>
                {toast.text}
              </span>
            </div>
          )}

          {/* Profile hero */}
          <div style={{
            background: "linear-gradient(135deg, #1c1917 0%, #3d2c1e 60%, #78350f 100%)",
            borderRadius: "20px", padding: "32px", marginBottom: "24px",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 85% 10%, rgba(180,83,9,0.3) 0%, transparent 55%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
              {/* Avatar */}
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "linear-gradient(135deg, #b45309, #d97706)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.8rem", fontWeight: 800, color: "#fff",
                boxShadow: "0 0 0 4px rgba(255,255,255,0.15)",
                flexShrink: 0,
              }}>
                {initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ margin: "0 0 6px", fontSize: "1.5rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                  {user.fullName || "Người dùng"}
                </h1>
                <p style={{ margin: "0 0 10px", fontSize: "0.88rem", color: "rgba(255,255,255,0.55)" }}>
                  {user.email}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", background: ROLE_BG[role] || "#f3f4f6", color: ROLE_COLOR[role] || "#6b7280" }}>
                    {ROLE_LABEL[role] || "Thành viên"}
                  </span>
                  {(role === 1 || role === 2) && (
                    <Link to="/editor" style={{ fontSize: "0.75rem", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}>
                      🎨 Editor Dashboard →
                    </Link>
                  )}
                  {role === 2 && (
                    <Link to="/admin" style={{ fontSize: "0.75rem", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}>
                      ⚙️ Admin Dashboard →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", background: "#fff", border: "1px solid #ede8e0", borderRadius: "12px", padding: "5px", marginBottom: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            {[
              { key: "profile", label: "👤 Thông tin cá nhân" },
              { key: "password", label: "🔒 Đổi mật khẩu" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1, padding: "10px 16px", borderRadius: "9px", border: "none",
                  fontSize: "0.88rem", fontWeight: 600, cursor: "pointer",
                  background: activeTab === tab.key ? "linear-gradient(135deg,#b45309,#92400e)" : "transparent",
                  color: activeTab === tab.key ? "#fff" : "#7c6a58",
                  transition: "all 0.18s",
                  boxShadow: activeTab === tab.key ? "0 2px 8px rgba(180,83,9,0.25)" : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Profile tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSubmit}>
              <div style={{ background: "#fff", border: "1px solid #ede8e0", borderRadius: "16px", padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #f0ebe3" }}>
                  <div style={{ width: "3px", height: "18px", borderRadius: "2px", background: "linear-gradient(to bottom,#b45309,#d97706)" }} />
                  <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a1a" }}>Thông tin cá nhân</h2>
                </div>
                <InputField label="Họ và tên" icon="👤" name="fullName" placeholder="Nhập họ và tên" value={profile.fullName} onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))} required />
                <InputField label="Email" icon="✉️" name="email" type="email" placeholder="Nhập địa chỉ email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} required />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "10px", border: "none",
                    background: loading ? "#d1c4b0" : "linear-gradient(135deg,#b45309,#92400e)",
                    color: "#fff", fontSize: "0.95rem", fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: loading ? "none" : "0 2px 10px rgba(180,83,9,0.3)",
                    transition: "all 0.2s",
                  }}
                >
                  {loading ? "⏳ Đang lưu..." : "💾 Lưu thay đổi"}
                </button>
              </div>
            </form>
          )}

          {/* Password tab */}
          {activeTab === "password" && (
            <form onSubmit={handlePasswordSubmit}>
              <div style={{ background: "#fff", border: "1px solid #ede8e0", borderRadius: "16px", padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #f0ebe3" }}>
                  <div style={{ width: "3px", height: "18px", borderRadius: "2px", background: "linear-gradient(to bottom,#7c3aed,#a78bfa)" }} />
                  <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a1a" }}>Đổi mật khẩu</h2>
                </div>
                <InputField label="Mật khẩu hiện tại" icon="🔑" name="currentPassword" type="password" placeholder="Nhập mật khẩu hiện tại" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))} required />
                <InputField label="Mật khẩu mới" icon="🔒" name="newPassword" type="password" placeholder="Tối thiểu 6 ký tự" value={passwordForm.newPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))} required />
                <InputField label="Xác nhận mật khẩu mới" icon="🔒" name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu mới" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))} required />

                {/* Password match indicator */}
                {passwordForm.newPassword && passwordForm.confirmPassword && (
                  <div style={{ fontSize: "0.8rem", marginTop: "-8px", marginBottom: "16px", color: passwordForm.newPassword === passwordForm.confirmPassword ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                    {passwordForm.newPassword === passwordForm.confirmPassword ? "✓ Mật khẩu khớp" : "✗ Mật khẩu chưa khớp"}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "10px", border: "none",
                    background: loading ? "#d1c4b0" : "linear-gradient(135deg,#7c3aed,#5b21b6)",
                    color: "#fff", fontSize: "0.95rem", fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: loading ? "none" : "0 2px 10px rgba(124,58,237,0.3)",
                    transition: "all 0.2s",
                  }}
                >
                  {loading ? "⏳ Đang cập nhật..." : "🔐 Cập nhật mật khẩu"}
                </button>
              </div>
            </form>
          )}

          {/* Logout */}
          <div style={{ background: "#fff", border: "1px solid #fee2e2", borderRadius: "16px", padding: "20px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#991b1b", marginBottom: "2px" }}>Đăng xuất khỏi tài khoản</div>
              <div style={{ fontSize: "0.78rem", color: "#aaa" }}>Phiên đăng nhập hiện tại sẽ kết thúc</div>
            </div>
            <button
              onClick={() => { logout(); navigate("/"); }}
              style={{
                padding: "9px 24px", borderRadius: "9px", border: "1.5px solid #fca5a5",
                background: "#fff", color: "#dc2626", fontSize: "0.88rem", fontWeight: 700,
                cursor: "pointer", transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#fef2f2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
            >
              Đăng xuất
            </button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
