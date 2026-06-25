import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { productApi } from "../api/productApi";
import { provinceApi } from "../api/provinceApi";

export default function AdminProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProvinceId, setFilterProvinceId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [provinceSearchTerm, setProvinceSearchTerm] = useState("");

  const selectedProvinceName = filterProvinceId ? provinces.find(p => p.id === filterProvinceId)?.name : "";
  const filteredProvincesList = provinces.filter(p => {
    if (provinceSearchTerm === selectedProvinceName && selectedProvinceName) return true;
    return p.name.toLowerCase().includes(provinceSearchTerm.toLowerCase());
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, provincesData] = await Promise.all([
        productApi.getAll(),
        provinceApi.getAll()
      ]);
      setProducts(productsData);
      setProvinces(provincesData.sort((a, b) => a.name.localeCompare(b.name, "vi")));
    } catch (err) {
      console.error(err);
      setError("Không thể tải dữ liệu đặc sản hoặc địa phương");
    } finally {
      setLoading(false);
    }
  };

  // Lọc sản phẩm
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.slug?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = filterProvinceId === "" || p.provinceId === filterProvinceId;
    return matchesSearch && matchesProvince;
  });

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1>Quản lý Đặc sản (Products)</h1>
        <Link to="/admin/products/new" className="btn btn-primary">
          + Thêm Đặc sản
        </Link>
      </div>

      <div className="card" style={{ marginBottom: 20, display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ fontWeight: 600, fontSize: "0.9rem" }}>Tìm kiếm đặc sản</label>
          <input 
            type="text" 
            placeholder="Nhập tên hoặc slug..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
          <label style={{ fontWeight: 600, fontSize: "0.9rem" }}>Lọc theo địa phương</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input 
              value={provinceSearchTerm}
              onChange={e => {
                setProvinceSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onClick={() => setIsDropdownOpen(true)}
              placeholder="Tất cả địa phương"
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", width: "100%", boxSizing: "border-box" }}
            />
            {filterProvinceId && (
              <button
                onClick={() => {
                  setFilterProvinceId("");
                  setProvinceSearchTerm("");
                }}
                style={{
                  position: "absolute",
                  right: "8px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: "#999"
                }}
                title="Xóa bộ lọc"
              >
                &times;
              </button>
            )}
          </div>
          {isDropdownOpen && (
            <>
              <div 
                style={{ position: "fixed", inset: 0, zIndex: 999 }} 
                onClick={() => setIsDropdownOpen(false)} 
              />
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: 4,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 1000,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8
              }}>
                <div 
                  onClick={() => {
                    setFilterProvinceId("");
                    setProvinceSearchTerm("");
                    setIsDropdownOpen(false);
                  }}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderRadius: 4,
                    backgroundColor: filterProvinceId === "" ? "#f0f8ff" : "transparent",
                    color: filterProvinceId === "" ? "#0066cc" : "#333",
                    fontWeight: filterProvinceId === "" ? 600 : 400,
                    fontSize: "0.9rem",
                    gridColumn: "1 / -1"
                  }}
                  onMouseEnter={(e) => {
                    if (filterProvinceId !== "") e.currentTarget.style.backgroundColor = "#f9f9f9";
                  }}
                  onMouseLeave={(e) => {
                    if (filterProvinceId !== "") e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  -- Tất cả địa phương --
                </div>
                {filteredProvincesList.length === 0 ? (
                  <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#666" }}>Không tìm thấy địa phương nào.</div>
                ) : (
                  filteredProvincesList.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        setFilterProvinceId(p.id);
                        setProvinceSearchTerm(p.name);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        padding: "8px",
                        cursor: "pointer",
                        borderRadius: 4,
                        backgroundColor: filterProvinceId === p.id ? "#f0f8ff" : "transparent",
                        color: filterProvinceId === p.id ? "#0066cc" : "#333",
                        fontWeight: filterProvinceId === p.id ? 600 : 400,
                        fontSize: "0.9rem"
                      }}
                      onMouseEnter={(e) => {
                        if (filterProvinceId !== p.id) e.currentTarget.style.backgroundColor = "#f9f9f9";
                      }}
                      onMouseLeave={(e) => {
                        if (filterProvinceId !== p.id) e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {p.name}
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {error && <div className="card" style={{ marginBottom: 16, color: "red" }}>{error}</div>}

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
                <th style={{ padding: "12px 8px" }}>Hình ảnh</th>
                <th style={{ padding: "12px 8px" }}>Tên đặc sản</th>
                <th style={{ padding: "12px 8px" }}>Giá</th>
                <th style={{ padding: "12px 8px" }}>Nổi bật</th>
                <th style={{ padding: "12px 8px" }}>Trạng thái</th>
                <th style={{ padding: "12px 8px", width: "220px" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px" }}>
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }} />
                    ) : (
                      <div style={{ width: 50, height: 50, backgroundColor: "#eee", borderRadius: 4 }}></div>
                    )}
                  </td>
                  <td style={{ padding: "8px" }}>
                    <strong>{p.name}</strong><br/>
                    <small style={{ color: "#666" }}>{p.slug}</small>
                  </td>
                  <td style={{ padding: "8px" }}>
                    {p.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price) : "Chưa cập nhật"}
                  </td>
                  <td style={{ padding: "8px" }}>
                    {p.isFeatured ? "⭐ Có" : "Không"}
                  </td>
                  <td style={{ padding: "8px" }}>
                    {p.isPublished ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>Đã xuất bản</span>
                    ) : (
                      <span style={{ color: "orange" }}>Bản nháp</span>
                    )}
                  </td>
                  <td style={{ padding: "8px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link to={`/admin/products/${p.id}/edit`} className="btn btn-outline" style={{ padding: "4px 8px", fontSize: "0.85rem" }}>Sửa</Link>
                      <Link to={`/province/${provinces.find(prov => prov.id === p.provinceId)?.slug || "unknown"}/dac-san/${p.slug}/edit`} className="btn btn-outline" style={{ padding: "4px 8px", fontSize: "0.85rem", borderColor: "#1890ff", color: "#1890ff" }} title="Thiết kế Infographic">Sửa trang</Link>
                      <Link to={`/admin/products/${p.id}/delete`} className="btn btn-outline" style={{ padding: "4px 8px", fontSize: "0.85rem", color: "red", borderColor: "red" }}>Xóa</Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>Không tìm thấy đặc sản nào phù hợp</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
