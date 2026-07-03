import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const NAV_ITEMS = [
  {
    path: "/editor",
    icon: "🎨",
    label: "Thiết kế Landing Page",
    desc: "Màu sắc, font chữ, thứ tự section",
  },
  {
    path: "/editor/content",
    icon: "✏️",
    label: "Nội dung Landing Page",
    desc: "Sửa chữ từng section theo tỉnh",
  },
  {
    path: "/editor/analytics",
    icon: "📊",
    label: "Thống kê tương tác",
    desc: "Lượt xem, click ẩm thực theo tỉnh",
  },
  {
    path: "/editor/map",
    icon: "🗺️",
    label: "Vị trí bản đồ",
    desc: "Chỉnh vị trí 34 tỉnh trên bản đồ",
  },
];

export default function EditorLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <MainLayout>
      <section className="section">
        <div className="container" style={{
          display: "grid",
          gridTemplateColumns: "290px minmax(0,1fr)",
          gap: "24px",
          alignItems: "start",
        }}>

          {/* ── Sidebar ── */}
          <aside style={{
            position: "sticky",
            top: "96px",
            alignSelf: "start",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(15,23,42,0.10), 0 1px 3px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
          }}>

            {/* Brand header */}
            <div style={{
              background: "linear-gradient(135deg, #1c1917 0%, #292524 60%, #44403c 100%)",
              padding: "22px 20px 20px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 90% 10%, rgba(180,83,9,0.22) 0%, transparent 55%)",
                pointerEvents: "none",
              }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "rgba(180,83,9,0.2)", border: "1px solid rgba(180,83,9,0.35)",
                  borderRadius: "20px", padding: "3px 10px", marginBottom: "12px",
                }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#f59e0b" }} />
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#fbbf24", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Editor
                  </span>
                </div>
                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                  Editor Workspace
                </div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: "5px", lineHeight: 1.4 }}>
                  Quản lý giao diện &amp; phân tích
                </div>
              </div>
            </div>

            {/* Nav items */}
            <div style={{ background: "#fff", padding: "10px 10px 6px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {NAV_ITEMS.map((item) => {
                const exact   = item.path === "/editor";
                const isActive = exact
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "11px 13px",
                      borderRadius: "12px",
                      textDecoration: "none",
                      background: isActive ? "#fff7ed" : "transparent",
                      borderLeft: isActive ? "3px solid #b45309" : "3px solid transparent",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#faf8f5"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                  >
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                      background: isActive
                        ? "linear-gradient(135deg,#b45309,#d97706)"
                        : "linear-gradient(135deg,#f5f0ea,#ede8e0)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1rem",
                      boxShadow: isActive ? "0 4px 12px rgba(180,83,9,0.30)" : "none",
                      transition: "all 0.15s",
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{
                        fontSize: "0.84rem", fontWeight: 700, lineHeight: 1.2,
                        color: isActive ? "#b45309" : "#1a1a1a",
                        marginBottom: "2px",
                      }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: isActive ? "#d97706" : "#aaa", lineHeight: 1.3 }}>
                        {item.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Divider + logout */}
            <div style={{ background: "#fff", padding: "6px 10px 12px" }}>
              <div style={{ height: "1px", background: "#f0ebe3", marginBottom: "8px" }} />
              <button
                onClick={() => setShowConfirm(true)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: "12px",
                  padding: "10px 13px", borderRadius: "12px", border: "none",
                  background: "transparent", cursor: "pointer", textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#fff1f2"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                  background: "linear-gradient(135deg,#fff1f2,#ffe4e6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem",
                }}>
                  🚪
                </div>
                <div>
                  <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "#e11d48", lineHeight: 1.2 }}>
                    Đăng xuất
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#fda4af", lineHeight: 1.3 }}>
                    Thoát khỏi workspace
                  </div>
                </div>
              </button>
            </div>

          </aside>

          {/* ── Main content ── */}
          <div style={{ minWidth: 0 }}>
            {children}
          </div>

        </div>
      </section>
      {/* ── Logout confirm modal ── */}
      {showConfirm && (
        <div
          onClick={() => setShowConfirm(false)}
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
            {/* Icon */}
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
              Bạn có chắc muốn thoát khỏi Editor Workspace không?
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowConfirm(false)}
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
                onClick={handleLogout}
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
    </MainLayout>
  );
}
