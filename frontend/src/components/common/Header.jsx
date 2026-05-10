import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function Header() {
  const authState = useMemo(() => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");
    return { token, name, role };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    window.location.reload();
  };

  return (
    <header className="site-header">
      <div className="container header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            Vietnam Identity
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
            <input type="text" placeholder="Tìm nhanh tỉnh thành hoặc nội dung" />
            <button type="submit" className="btn btn-primary btn-sm">
              Tìm kiếm
            </button>
          </form>
          <div className="header-auth">
            {authState.token ? (
              <>
                <span>Hi, {authState.name || "Admin"}</span>
                <button type="button" className="btn btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
