import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const accountRef = useRef(null);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
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

  // Get user role as number
  const userRole = user ? (typeof user.role === 'string' ? parseInt(user.role) : user.role) : null;
  const isAdmin = userRole === 0;
  const isEditor = userRole === 1;
  const isAdminOrEditor = isAdmin || isEditor;

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
            {isAdminOrEditor && <Link to="/admin">Dashboard</Link>}
          </nav>
        </div>
        <div className="header-right">
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Tìm tỉnh thành, nội dung..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Tìm kiếm
            </button>
          </form>
          <div className="header-auth">
            {user ? (
              <div className="account-menu" ref={accountRef}>
                <button
                  type="button"
                  className="btn btn-sm account-trigger"
                  onClick={() => setIsAccountOpen((prev) => !prev)}
                >
                  Hi, {user.fullName || "User"}
                </button>
                <div className={`account-dropdown ${isAccountOpen ? "is-open" : ""}`}>
                  <Link to="/account">Tài khoản</Link>
                  {isAdminOrEditor && (
                    <Link to="/admin">Dashboard</Link>
                  )}
                  {isAdmin && (
                    <Link to="/admin/users">Users</Link>
                  )}
                  {isAdminOrEditor && (
                    <Link to="/admin/posts">Posts</Link>
                  )}
                  {isAdminOrEditor && (
                    <Link to="/admin/media">Media</Link>
                  )}
                  {isAdminOrEditor && (
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

