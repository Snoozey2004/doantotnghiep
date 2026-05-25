import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { userApi } from "../api/userApi";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ fullName: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setProfile({ fullName: user.fullName ?? "", email: user.email ?? "" });
  }, [user, navigate]);

  const handleProfileChange = (event) => {
    setProfile((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handlePasswordChange = (event) => {
    setPasswordForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await userApi.updateProfile(user.id, profile);
      setMessage("Cập nhật thông tin thành công.");
    } catch {
      setMessage("Cập nhật thông tin thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage("Mật khẩu mới không khớp.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    setLoading(true);
    try {
      await userApi.updatePassword(user.id, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setMessage("Cập nhật mật khẩu thành công.");
    } catch {
      setMessage("Mật khẩu hiện tại không đúng hoặc cập nhật thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      <section className="section">
        <div className="container" style={{ maxWidth: 640 }}>
          <h1 style={{ fontSize: "2rem", marginBottom: 8 }}>Tài khoản</h1>
          {message && (
            <div
              className="card"
              style={{
                marginBottom: 16,
                padding: 16,
                backgroundColor: message.includes("thất bại") ? "#fee2e2" : "#dcfce7",
                color: message.includes("thất bại") ? "#991b1b" : "#166534"
              }}
            >
              {message}
            </div>
          )}
          <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
            <form className="card" onSubmit={handleProfileSubmit}>
              <h3>Cập nhật thông tin</h3>
              <input
                name="fullName"
                placeholder="Họ tên"
                value={profile.fullName}
                onChange={handleProfileChange}
                required
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
                required
              />
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </form>
            <form className="card" onSubmit={handlePasswordSubmit}>
              <h3>Đổi mật khẩu</h3>
              <input
                name="currentPassword"
                type="password"
                placeholder="Mật khẩu hiện tại"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
              />
              <input
                name="newPassword"
                type="password"
                placeholder="Mật khẩu mới"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
              </button>
            </form>
            <div className="card">
              <h3>Đăng xuất</h3>
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
