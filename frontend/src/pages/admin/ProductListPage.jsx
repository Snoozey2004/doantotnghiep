import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { productApi } from "../../api/productApi";
import ProductCreate from "./ProductCreate";

import "../../styles/product.css";
import "../../styles/productAdmin.css";

const ProductListPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Lỗi load products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showCreateModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCreateModal]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá sản phẩm?");
    if (!confirmDelete) return;

    try {
      await productApi.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Lỗi xoá:", error);
    }
  };

  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

      const matchStock =
        stockFilter === "all"
          ? true
          : stockFilter === "inStock"
            ? p.stock > 0
            : p.stock <= 0;

      return matchSearch && matchStock;
    });
  }, [products, search, stockFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  if (loading) {
    return (
      <div className="admin-loading">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="admin-product-page">
      {/* HEADER */}
      <div className="admin-product-header">
        <div>
          <h1>Quản lý sản phẩm</h1>
          <p>Quản lý đặc sản các tỉnh thành</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="admin-btn-primary"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {/* STATS */}
      <div className="admin-stats-grid">
        <div className="admin-stats-card">
          <p>Tổng sản phẩm</p>
          <h2>{products.length}</h2>
        </div>

        <div className="admin-stats-card">
          <p>Tổng tồn kho</p>
          <h2>{totalStock}</h2>
        </div>

        <div className="admin-stats-card">
          <p>Tổng giá trị</p>
          <h2>{totalValue.toLocaleString()}đ</h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="admin-content-layout">
        {/* SIDEBAR FILTER */}
        <div className="admin-filter-panel">
          <h3>Bộ lọc</h3>

          <div className="admin-filter-group">
            <label>Tìm kiếm</label>

            <input
              type="text"
              placeholder="Tên sản phẩm..."
              value={search}
              onChange={(e) => {
                setCurrentPage(1);
                setSearch(e.target.value);
              }}
              className="admin-search-input"
            />
          </div>

          <div className="admin-filter-group">
            <label>Tồn kho</label>

            <select
              className="admin-filter-select"
              value={stockFilter}
              onChange={(e) => {
                setCurrentPage(1);
                setStockFilter(e.target.value);
              }}
            >
              <option value="all">Tất cả</option>
              <option value="inStock">Còn hàng</option>
              <option value="outStock">Hết hàng</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="admin-table-section">
          <div className="admin-table-wrapper">
            <table className="admin-product-table">
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Mô tả</th>
                  <th>Giá</th>
                  <th>Tồn kho</th>
                  <th>Hành động</th>
                </tr>
              </thead>

              <tbody>
                {paginatedProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="admin-table-image"
                      />
                    </td>

                    <td className="admin-table-name">{product.name}</td>

                    <td className="admin-table-description">
                      {product.description}
                    </td>

                    <td className="admin-table-price">
                      {product.price?.toLocaleString()}đ
                    </td>

                    <td>
                      <span className="admin-stock-badge">{product.stock}</span>
                    </td>

                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() =>
                            navigate(`/admin/products/edit/${product.id}`)
                          }
                          className="admin-btn-edit"
                        >
                          Sửa
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="admin-btn-delete"
                        >
                          Xoá
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {paginatedProducts.length === 0 && (
              <div className="admin-empty-state">Không tìm thấy sản phẩm.</div>
            )}
          </div>

          {/* PAGINATION */}
          <div className="admin-pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              ←
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showCreateModal && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="admin-modal-content admin-large-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductCreate
              onClose={() => setShowCreateModal(false)}
              onSuccess={() => {
                setShowCreateModal(false);
                fetchProducts();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
