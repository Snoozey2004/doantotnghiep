import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Header() {
  const authState = useMemo(() => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");
    return { token, name, role };
  }, []);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef(null);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="site-header">
      <div className="container header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            Vietnam Local Identity
          </Link>
          <nav className="header-nav">
            <Link to="/">Trang chủ</Link>
            <Link to="/">Tỉnh/Thành phố</Link>
            <Link to="/">Nội dung</Link>
            <Link to="/">Media</Link>
            {(authState.role === "Admin" || authState.role === "Editor") && <Link to="/admin">Dashboard</Link>}
          </nav>
        </div>
        <div className="header-right">
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <input type="text" placeholder="Tìm tỉnh thành, nội dung..." />
            <button type="submit" className="btn btn-primary btn-sm">
              Tìm kiếm
            </button>
          </form>
          <div className="header-auth">
            {authState.token ? (
              <div className="account-menu" ref={accountRef}>
                <button
                  type="button"
                  className="btn btn-sm account-trigger"
                  onClick={() => setIsAccountOpen((prev) => !prev)}
                >
                  Hi, {authState.name || "Admin"}
                </button>
                <div className={`account-dropdown ${isAccountOpen ? "is-open" : ""}`}>
                  <Link to="/account">Tài khoản</Link>
                  {(authState.role === "0" || authState.role === "3") && (
                    <Link to="/admin">Dashboard</Link>
                  )}
                  {authState.role === "0" && (
                    <Link to="/admin/users">Users</Link>
                  )}
                  {(authState.role === "0" || authState.role === "3") && (
                    <Link to="/admin/posts">Posts</Link>
                  )}
                  {(authState.role === "0" || authState.role === "3") && (
                    <Link to="/admin/media">Media</Link>
                  )}
                  {(authState.role === "0" || authState.role === "3") && (
                    <Link to="/admin/landing">Landing Config</Link>
                  )}
                  <button type="button" onClick={handleLogout}>Logout</button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">Đăng nhập</Link>
                <Link to="/register">Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
