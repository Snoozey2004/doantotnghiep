import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { productApi } from "../api/productApi";

import "../styles/product.css";

const ProductDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await productApi.getById(id);

        console.log(data);

        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log("Add to cart", {
      product,
      quantity,
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="product-detail-loading">
          <p>Đang tải sản phẩm...</p>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="product-detail-empty">
          <h2>Không tìm thấy sản phẩm.</h2>

          <button onClick={() => navigate(-1)} className="back-btn">
            Quay lại
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="product-detail-page">
        {/* ======================================== */}
        {/* HERO */}
        {/* ======================================== */}

        <section className="detail-hero">
          <div className="container">
            <motion.div
              className="detail-breadcrumb"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <Link to="/">Trang chủ</Link>

              <span>/</span>

              <Link to="/products">Đặc sản</Link>

              <span>/</span>

              <span>{product.name}</span>
            </motion.div>
          </div>
        </section>

        {/* ======================================== */}
        {/* DETAIL */}
        {/* ======================================== */}

        <section className="product-detail-section">
          <div className="container">
            <div className="product-detail-grid">
              {/* ================= IMAGE ================= */}

              <motion.div
                className="product-gallery"
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <div className="main-image-wrapper">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="main-image"
                  />

                  <div className="product-badge">Đặc sản địa phương</div>
                </div>
              </motion.div>

              {/* ================= INFO ================= */}

              <motion.div
                className="product-info"
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <span className="product-category">
                  {product.categoryName || "Đặc sản"}
                </span>

                <h1>{product.name}</h1>

                <div className="product-meta">
                  <div className="rating">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>

                    <span>(128 đánh giá)</span>
                  </div>

                  <div className="sold">Đã bán 1.2k+</div>
                </div>

                <div className="product-price-box">
                  <h2>{product.price?.toLocaleString()}đ</h2>

                  <span>Miễn phí giao hàng toàn quốc</span>
                </div>

                <p className="product-description">{product.description}</p>

                {/* STOCK */}

                <div className="stock-info">
                  <div className="stock-item">
                    <span>Kho hàng</span>

                    <strong>{product.stock}</strong>
                  </div>

                  <div className="stock-item">
                    <span>Xuất xứ</span>

                    <strong>{product.provinceName || "Việt Nam"}</strong>
                  </div>
                </div>

                {/* QUANTITY */}

                <div className="quantity-wrapper">
                  <span>Số lượng</span>

                  <div className="quantity-box">
                    <button onClick={decreaseQuantity}>-</button>

                    <input type="text" value={quantity} readOnly />

                    <button onClick={increaseQuantity}>+</button>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="detail-actions">
                  <button className="add-cart-btn" onClick={handleAddToCart}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    Thêm vào giỏ
                  </button>

                  <button className="buy-now-btn">Mua ngay</button>
                </div>

                {/* FEATURES */}

                <div className="detail-features">
                  <div className="detail-feature">
                    <i className="fa-solid fa-truck-fast"></i>

                    <span>Giao hàng nhanh</span>
                  </div>

                  <div className="detail-feature">
                    <i className="fa-solid fa-shield"></i>

                    <span>Đảm bảo chất lượng</span>
                  </div>

                  <div className="detail-feature">
                    <i className="fa-solid fa-rotate-left"></i>

                    <span>Đổi trả dễ dàng</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================== */}
        {/* DESCRIPTION */}
        {/* ======================================== */}

        <section className="product-description-section">
          <div className="container">
            <motion.div
              className="description-card"
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <div className="section-title">
                <span className="section-kicker orange">CHI TIẾT SẢN PHẨM</span>

                <h2>Tinh hoa ẩm thực địa phương</h2>
              </div>

              <div className="description-content">
                <p>{product.description}</p>

                <p>
                  Đây là một trong những món đặc sản nổi bật mang đậm nét văn
                  hóa vùng miền Việt Nam, được nhiều du khách yêu thích và lựa
                  chọn làm quà tặng.
                </p>

                <p>
                  Sản phẩm được tuyển chọn kỹ lưỡng nhằm đảm bảo chất lượng,
                  hương vị và trải nghiệm tốt nhất cho khách hàng.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
