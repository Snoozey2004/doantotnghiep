import { Link, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const navItems = [
  { label: "🎨 Chỉnh sửa thiết kế giao diện Landing Page", path: "/editor" },
];

export default function EditorLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <MainLayout>
      <section className="section">
        <div className="container admin-layout">
          <aside className="admin-sidebar">
            <div className="admin-brand">
              <h2>Editor Workspace</h2>
              <p>Chỉnh sửa thiết kế giao diện Landing Page</p>
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`btn admin-nav ${isActive ? "btn-primary" : "btn-outline"}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              className="btn btn-outline admin-nav"
              style={{ marginTop: "auto", color: "#b45309" }}
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </aside>
          <div className="admin-content">{children}</div>
        </div>
      </section>
    </MainLayout>
  );
}
