import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { accountApi } from "../api/accountApi";

export default function AccountPage() {
  const [profile, setProfile] = useState({ fullName: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    accountApi
      .getMe()
      .then((data) => setProfile({ fullName: data.fullName ?? "", email: data.email ?? "" }))
      .catch(() => setMessage("Không tải được thông tin tài khoản."));
  }, []);

  const handleProfileChange = (event) => {
    setProfile((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handlePasswordChange = (event) => {
    setPasswordForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const updated = await accountApi.updateProfile(profile);
      setProfile({ fullName: updated.fullName ?? "", email: updated.email ?? "" });
      setMessage("Cập nhật thông tin thành công.");
      localStorage.setItem("userName", updated.fullName ?? "");
    } catch {
      setMessage("Cập nhật thông tin thất bại.");
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await accountApi.updatePassword(passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setMessage("Đổi mật khẩu thành công.");
    } catch {
      setMessage("Đổi mật khẩu thất bại.");
    }
  };

  return (
    <MainLayout>
      <section className="section">
        <div className="container" style={{ maxWidth: 640 }}>
          <h1 style={{ fontSize: "2rem", marginBottom: 8 }}>Tài khoản</h1>
          {message && <div className="card" style={{ marginBottom: 16 }}>{message}</div>}
          <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
            <form className="card" onSubmit={handleProfileSubmit}>
              <h3>Cập nhật thông tin</h3>
              <input name="fullName" placeholder="Họ tên" value={profile.fullName} onChange={handleProfileChange} />
              <input name="email" placeholder="Email" value={profile.email} onChange={handleProfileChange} />
              <button className="btn btn-primary" type="submit">Lưu thay đổi</button>
            </form>
            <form className="card" onSubmit={handlePasswordSubmit}>
              <h3>Đổi mật khẩu</h3>
              <input
                name="currentPassword"
                type="password"
                placeholder="Mật khẩu hiện tại"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
              />
              <input
                name="newPassword"
                type="password"
                placeholder="Mật khẩu mới"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
              />
              <button className="btn btn-primary" type="submit">Đổi mật khẩu</button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
