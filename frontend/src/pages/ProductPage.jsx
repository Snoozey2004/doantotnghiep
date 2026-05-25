import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";
import { productApi } from "../api/productApi";
import ProductCard from "../components/ProductCard";

import { provinceNameMap } from "../data/provinceNameMap";
import provinces from "../data/provinceData";

import "../styles/product.css";

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [provinceName, setProvinceName] = useState("");
  const [loading, setLoading] = useState(true);

  const province = provinces.find((item) => item.slug === slug);

  const heroImage = province?.heroImage;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await productApi.getByProvinceSlug(slug);

        setProducts(data);

        setProvinceName(provinceNameMap[slug] || slug);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="product-loading">
          <p>Đang tải sản phẩm...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="product-page">
        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section
          className="product-hero"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(0,0,0,0.58),
                rgba(0,0,0,0.55)
              ),
              url(${heroImage})
            `,
          }}
        >
          <div className="product-hero-overlay"></div>

          <div className="container">
            <motion.div
              className="product-hero-content"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              {/* BREADCRUMB */}

              <div className="product-breadcrumb">
                <Link to="/">Trang chủ</Link>

                <span>/</span>

                <span>Đặc sản địa phương</span>
              </div>

              {/* KICKER */}

              <div className="hero-kicker-wrapper">
                <span className="hero-line"></span>

                <span className="section-kicker">ĐẶC SẢN ĐỊA PHƯƠNG</span>
              </div>

              {/* TITLE */}

              <h1>
                Khám phá đặc sản
                <br />
                {provinceName}
              </h1>

              {/* DESCRIPTION */}

              <p>
                Những hương vị đặc trưng mang đậm bản sắc văn hóa và tinh thần
                của từng vùng đất Việt Nam.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================================================= */}
        {/* PRODUCTS */}
        {/* ================================================= */}

        <section className="product-section">
          <div className="container">
            {/* HEADER */}

            <div className="product-section-top">
              <div className="section-heading">
                <span className="section-kicker orange">
                  DANH SÁCH SẢN PHẨM
                </span>

                <h2>Tinh hoa ẩm thực {provinceName}</h2>

                <p>
                  Khám phá các món đặc sản nổi bật được yêu thích tại địa
                  phương.
                </p>
              </div>

              {/* ACTIONS */}

              <div className="product-actions">
                <select className="product-select">
                  <option>Mới nhất</option>
                  <option>Giá tăng dần</option>
                  <option>Giá giảm dần</option>
                  <option>Bán chạy</option>
                </select>

                <button className="filter-btn">
                  <i className="fa-solid fa-sliders"></i>

                  <span>Lọc sản phẩm</span>
                </button>
              </div>
            </div>

            {/* EMPTY */}

            {products.length === 0 ? (
              <div className="empty-products">Chưa có sản phẩm.</div>
            ) : (
              <>
                {/* GRID */}

                <div className="products-layout">
                  {/* SIDEBAR */}

                  <aside className="products-sidebar">
                    <div className="sidebar-card">
                      <h3>Danh mục</h3>

                      <ul className="sidebar-menu">
                        <li className="active">Tất cả sản phẩm</li>

                        <li>Đặc sản khô</li>

                        <li>Bánh truyền thống</li>

                        <li>Đồ thủ công</li>

                        <li>Gia vị địa phương</li>

                        <li>Đồ uống</li>
                      </ul>
                    </div>

                    <div className="sidebar-card">
                      <h3>Khoảng giá</h3>

                      <ul className="sidebar-menu">
                        <li>Dưới 100.000đ</li>

                        <li>100k - 300k</li>

                        <li>300k - 500k</li>

                        <li>Trên 500k</li>
                      </ul>
                    </div>
                  </aside>

                  {/* PRODUCTS */}

                  <div className="products-content">
                    <div className="products-grid">
                      {products.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{
                            opacity: 0,
                            y: 25,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.45,
                            delay: index * 0.04,
                          }}
                        >
                          <ProductCard
                            product={product}
                            onClick={() => handleProductClick(product.id)}
                          />

                          {/* DETAIL BUTTON */}

                          <button
                            className="view-detail-btn"
                            onClick={() => handleProductClick(product.id)}
                          >
                            Xem chi tiết
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* PAGINATION */}

                <div className="product-pagination">
                  <button>
                    <i className="fa-solid fa-angle-left"></i>
                  </button>

                  <button className="active">1</button>

                  <button>2</button>

                  <button>3</button>

                  <span>...</span>

                  <button>6</button>

                  <button>
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ================================================= */}
        {/* FEATURES */}
        {/* ================================================= */}

        <section className="product-features">
          <div className="container">
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-shield"></i>
                </div>

                <div>
                  <h4>Sản phẩm chất lượng</h4>

                  <p>Cam kết đặc sản chính gốc địa phương</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-truck"></i>
                </div>

                <div>
                  <h4>Giao hàng nhanh chóng</h4>

                  <p>Giao hàng toàn quốc nhanh - an toàn</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-headset"></i>
                </div>

                <div>
                  <h4>Hỗ trợ 24/7</h4>

                  <p>Tư vấn và hỗ trợ khách hàng tận tâm</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-box-open"></i>
                </div>

                <div>
                  <h4>Đổi trả dễ dàng</h4>

                  <p>Đổi trả trong 7 ngày nếu có vấn đề</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ProductPage;
