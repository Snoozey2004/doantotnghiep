import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("accessToken")));
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const accountRef = useRef(null);

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("accessToken")));
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
    } finally {
      logout();
      setIsAuthenticated(false);
      navigate("/");
    }
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

  const userRole = user ? (typeof user.role === "string" ? parseInt(user.role, 10) : user.role) : null;
  const isAdmin = userRole === 0;
  const isEditor = userRole === 1;
  const isAdminOrEditor = isAdmin || isEditor;
  const displayName = user?.fullName || user?.name || user?.username || user?.email || "Tài khoản";

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const keyword = searchKeyword.trim();
    if (!keyword) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <header className="site-header">
      <div className="container header-content">
        <Link to="/" className="logo">
          Vietnam Identity
        </Link>
        <nav className="header-nav">
          <form onSubmit={handleSearchSubmit} className="header-search">
            <input
              type="search"
              className="header-search-input"
              placeholder="Tìm kiếm..."
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">Tìm</button>
          </form>
        </nav>
        <div className="header-right">
          {isAuthenticated ? (
            <div ref={accountRef} className="account-menu">
              <button
                type="button"
                className="btn btn-outline btn-sm account-trigger"
                onClick={() => setIsAccountOpen((prev) => !prev)}
                aria-expanded={isAccountOpen}
                aria-haspopup="menu"
              >
                {displayName}
              </button>
              <div className={`account-dropdown ${isAccountOpen ? "is-open" : ""}`}>
                <div className="account-dropdown-header">
                  <div className="account-dropdown-label">Đăng nhập với</div>
                  <div className="account-dropdown-name">{displayName}</div>
                </div>
                <Link
                  to="/account"
                  onClick={() => setIsAccountOpen(false)}
                >
                  Tài khoản
                </Link>
                {isAdminOrEditor && (
                  <Link
                    to="/admin"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsAccountOpen(false);
                    handleLogout();
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="header-link">
                Đăng nhập
              </Link>
              <Link to="/register" className="header-cta">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

