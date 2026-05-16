import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("accessToken"))
  );

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("accessToken")));
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      setIsAuthenticated(false);
      navigate("/");
    }
  };

  return (
    <header className="site-header">
      <div className="container header-content">
        <Link to="/" className="logo">
          Vietnam Identity
        </Link>
        <nav className="header-nav">
        </nav>
        <div className="header-right">
          {isAuthenticated ? (
            <button type="button" className="header-link" onClick={handleLogout}>
              Đăng xuất
            </button>
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
