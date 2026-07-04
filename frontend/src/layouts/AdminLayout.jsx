import { Link, useLocation } from "react-router-dom";
import MainLayout from "./MainLayout.jsx";

const navItems = [
  { label: "Provinces", path: "/admin" },
  { label: "Quản lý nổi bật", path: "/admin/featured" },
  { label: "Quản lý bài viết", path: "/admin/posts" },
  { label: "Quản lý đặc sản", path: "/admin/products" },
  { label: "Media Library", path: "/admin/media" },
  { label: "Thiết kế Landing", path: "/admin/landing" },
  { label: "Nội dung Landing", path: "/admin/landing/content" },
  { label: "Users", path: "/admin/users" }
];

export default function AdminLayout({ children }) {
  const location = useLocation();

  return (
    <MainLayout>
      <section className="section">
        <div className="container admin-layout">
          <aside className="admin-sidebar">
            <div className="admin-brand">
              <h2>Admin Workspace</h2>
              <p>Quản trị nội dung địa phương</p>
            </div>
            {navItems.map((item) => {
              let isActive;
              if (item.path === "/admin" || item.path === "/admin/landing") {
                // "/admin" và "/admin/landing" chỉ active khi khớp CHÍNH XÁC
                // (để /admin/landing/content không làm sáng cả "Thiết kế Landing")
                isActive = location.pathname === item.path;
              } else {
                isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
              }
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
          </aside>
          <div className="admin-content">{children}</div>
        </div>
      </section>
    </MainLayout>
  );
}
