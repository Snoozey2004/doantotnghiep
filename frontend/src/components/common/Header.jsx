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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const accountRef = useRef(null);

  const isHome = location.pathname === "/";
  // Trang tỉnh (/province/:slug) cũng có hero ảnh full-bleed → dùng chung hiệu ứng
  // navbar trong suốt như trang chủ. KHÔNG áp cho route con (đặc sản, sản phẩm…).
  const isProvinceLanding = /^\/province\/[^/]+$/.test(location.pathname);
  const overlayHero = isHome || isProvinceLanding;
  // Navbar trong suốt khi ở đỉnh trang có hero tối, đặc lại khi cuộn
  const transparent = overlayHero && !scrolled;

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("accessToken")));
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Check if we are on a Product Infographic page
  const matchInfographic = location.pathname.match(/^\/province\/([^/]+)\/dac-san\/([^/]+)$/);
  const isInfographicPage = !!matchInfographic;
  const provinceSlug = isInfographicPage ? matchInfographic[1] : null;
  const productSlug = isInfographicPage ? matchInfographic[2] : null;

  return (
    <>
      {!overlayHero && <div className="vx-nav-pad" aria-hidden="true" />}
      <header className={`vx-nav ${transparent ? "is-transparent" : "is-solid"}`}>
        <div className="vx-nav__inner">
          <Link to="/" className="vx-nav__logo">
            Vietnam Identity
          </Link>

          <div className="vx-nav__spacer" />

          <form onSubmit={handleSearchSubmit} className="vx-search" role="search">
            <svg className="vx-search__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              className="vx-search__input"
              placeholder="Tìm kiếm…"
              aria-label="Tìm kiếm"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
            />
          </form>

          <div className="vx-nav__links">
            {isAuthenticated ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {isAdminOrEditor && isInfographicPage && (
                  <Link
                    to={`/province/${provinceSlug}/dac-san/${productSlug}/edit`}
                    className="btn btn-sm"
                    style={{ backgroundColor: "#1890ff", color: "#fff", border: "none" }}
                    title="Chỉnh sửa Infographic này"
                  >
                    🎨 Sửa trang
                  </Link>
                )}
                <div ref={accountRef} className="account-menu">
                  <button
                    type="button"
                    className="vx-nav__account"
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
                    <Link to="/account" onClick={() => setIsAccountOpen(false)}>
                      Tài khoản
                    </Link>
                    {isAdminOrEditor && (
                      <Link to="/editor" onClick={() => setIsAccountOpen(false)}>
                        Editor Dashboard
                      </Link>
                    )}
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsAccountOpen(false)}>
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setIsAccountOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="vx-nav__link">
                  Đăng nhập
                </Link>
                <Link to="/register" className="vx-nav__link vx-nav__link--cta">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {showLogoutConfirm && (
        <div
          onClick={() => setShowLogoutConfirm(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: "20px", padding: "32px 28px 24px",
              width: "320px", boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
              textAlign: "center",
            }}
          >
            <div style={{
              width: "56px", height: "56px", borderRadius: "16px", margin: "0 auto 16px",
              background: "linear-gradient(135deg,#fff1f2,#ffe4e6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.6rem",
            }}>
              🚪
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1a1a1a", marginBottom: "8px" }}>
              Đăng xuất?
            </div>
            <div style={{ fontSize: "0.85rem", color: "#78716c", lineHeight: 1.6, marginBottom: "24px" }}>
              Bạn có chắc muốn đăng xuất khỏi tài khoản không?
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1, padding: "10px", borderRadius: "10px",
                  border: "1.5px solid #e5e0d8", background: "#faf8f5",
                  fontSize: "0.88rem", fontWeight: 600, color: "#57534e",
                  cursor: "pointer", transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f0ebe3"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#faf8f5"; }}
              >
                Huỷ
              </button>
              <button
                onClick={() => { setShowLogoutConfirm(false); handleLogout(); }}
                style={{
                  flex: 1, padding: "10px", borderRadius: "10px",
                  border: "none", background: "linear-gradient(135deg,#e11d48,#be123c)",
                  fontSize: "0.88rem", fontWeight: 700, color: "#fff",
                  cursor: "pointer", boxShadow: "0 4px 12px rgba(225,29,72,0.30)",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

