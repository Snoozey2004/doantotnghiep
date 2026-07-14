import { Link, useLocation } from "react-router-dom";
import MainLayout from "./MainLayout.jsx";

const navItems = [
  { label: "Tổng quan", path: "/seller" },
  { label: "Đăng sản phẩm", path: "/seller/products/new" }
];

export default function SellerLayout({ children }) {
  const location = useLocation();

  return (
    <MainLayout>
      <section className="section">
        <div className="container admin-layout">
          <aside className="admin-sidebar">
            <div className="admin-brand">
              <h2>Seller Workspace</h2>
              <p>Quản lý kênh bán hàng</p>
            </div>
            {navItems.map((item) => {
              let isActive;
              if (item.path === "/seller") {
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
