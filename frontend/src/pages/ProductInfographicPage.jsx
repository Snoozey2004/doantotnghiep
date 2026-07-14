import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import BlockRenderer from '../infographic/renderers/BlockRenderer';
import { productInfographicApi } from '../infographic/services/productInfographicApi';
import { productApi } from '../api/productApi';
import { landingConfigApi } from '../api/landingConfigApi';
import { productOfferApi } from '../api/productOfferApi';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ProductInfographicPage.css';

export default function ProductInfographicPage() {
  const { provinceSlug, productSlug } = useParams();
  const navigate = useNavigate();
  const [infographic, setInfographic] = useState(null);
  const [product, setProduct] = useState(null);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const role = user ? (typeof user.role === 'number' ? user.role : parseInt(user.role ?? "0", 10)) : null;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch both infographic and product data
        const [infoRes, productRes, configRes] = await Promise.all([
          productInfographicApi.getByProductSlug(productSlug).catch(() => null),
          productApi.getBySlug(productSlug).catch(() => null),
          landingConfigApi.getByProvinceSlug(provinceSlug).catch(() => null)
        ]);
        
        if (infoRes && infoRes.data) {
          setInfographic(infoRes.data);
        }
        if (productRes) {
          try {
            const offersRes = await productOfferApi.getOffersByProduct(productRes.id);
            productRes.offers = offersRes || [];
          } catch (e) {
            productRes.offers = [];
          }
          setProduct(productRes);
          document.title = `${productRes.name || 'Đặc sản'} - Tinh hoa ẩm thực`;
        }
        if (configRes) {
          setConfig(configRes);
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productSlug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Đã copy link trang web!');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenShopModal = () => {
    setIsShopModalOpen(true);
  };

  const handleBuyNow = (offer) => {
    // Navigate directly to checkout with offer details
    navigate('/checkout', { state: { buyNowOffer: offer, product: product } });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="infographic-loading-container">
          <div className="spinner"></div>
          <h2>Đang tải tinh hoa ẩm thực...</h2>
        </div>
      </MainLayout>
    );
  }

  if (!infographic || !infographic.blocks || infographic.blocks.length === 0) {
    return (
      <MainLayout>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="infographic-empty-container"
        >
          <div className="empty-content">
            <div className="empty-icon">🍽️</div>
            <h2>Nội dung đang được cập nhật</h2>
            <p>Thông tin chi tiết về đặc sản <strong>{product?.name || 'này'}</strong> đang trong quá trình biên soạn. Vui lòng quay lại sau nhé!</p>
            <button className="btn-back" onClick={() => navigate(-1)}>Quay lại trang trước</button>
          </div>
        </motion.div>
      </MainLayout>
    );
  }

  // Sắp xếp blocks theo SortOrder
  const sortedBlocks = [...infographic.blocks].sort((a, b) => a.sortOrder - b.sortOrder);
  
  const fontFamily = config?.fontFamily || "";

  return (
    <MainLayout>
      {/* Sticky Product Header */}
      <div className="product-sticky-header">
        <div className="sticky-header-content">
          <div className="sticky-title">
            <span className="back-link" onClick={() => navigate(-1)}>← Quay lại</span>
            <span className="product-name">{product?.name || 'Đặc sản'}</span>
          </div>
          {(!product?.type || product?.type === 1) && role !== 0 && role !== 2 && (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button className="btn-buy-header" onClick={handleOpenShopModal}>
                🛒 Đặt mua từ các cửa hàng
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reading Progress Bar */}
      <motion.div className="reading-progress-bar" style={{ scaleX }} />

      {/* Floating Action Buttons */}
      <div className="infographic-fab-container">
        {/* Button Mua Ngay moved to header */}
        <button className="fab-btn" onClick={handleShare} title="Chia sẻ">
          🔗
        </button>
        <button className="fab-btn" onClick={handleScrollToTop} title="Lên đầu trang">
          ⬆️
        </button>
      </div>

      <motion.div 
        className="product-infographic-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={fontFamily ? { fontFamily, "--province-heading-font": fontFamily } : {}}
      >
        {sortedBlocks.map(block => {
          if (block.isVisible === false) return null;
          
          let parsedData = {};
          try {
            parsedData = block.dataJson ? JSON.parse(block.dataJson) : {};
          } catch (e) {}

          return (
            <BlockRenderer 
              key={block.id} 
              block={{ ...block, data: parsedData }} 
            />
          );
        })}
      </motion.div>

      {/* Shop Modal */}
      {isShopModalOpen && (
        <div className="shop-modal-overlay" onClick={() => setIsShopModalOpen(false)}>
          <div className="shop-modal-content" onClick={e => e.stopPropagation()}>
            <div className="shop-modal-header">
              <h3>Đặt mua {product?.name}</h3>
              <button className="shop-modal-close" onClick={() => setIsShopModalOpen(false)}>×</button>
            </div>
            <div className="shop-modal-body" data-lenis-prevent>
              {(!product?.offers?.length && !product?.shops?.length) ? (
                <div className="shop-empty">
                  <p>Hiện chưa có thông tin cửa hàng nào cho sản phẩm này.</p>
                </div>
              ) : (
                <ul className="shop-list">
                  {/* Internal Sellers */}
                  {product?.offers?.map((offer) => (
                    <li key={offer.id} className="shop-item" style={{ padding: "15px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div className="shop-info-wrapper">
                        <div className="shop-avatar-placeholder">🏪</div>
                        <div className="shop-info" style={{ marginLeft: "15px" }}>
                          <strong style={{ fontSize: "1.1rem" }}>{offer.shopName}</strong>
                          <div style={{ color: "#666", fontSize: "0.9rem", marginTop: "4px" }}>{offer.shopAddress}</div>
                          {offer.businessHours && (
                            <div style={{ color: "#475569", fontSize: "0.85rem", marginTop: "2px" }}>🕒 Giờ mở cửa: {offer.businessHours}</div>
                          )}
                          <div style={{ marginTop: "4px", display: "flex", gap: "8px", alignItems: "center" }}>
                            {offer.isOpen ? (
                              <span style={{ fontSize: "0.75rem", padding: "2px 6px", background: "#dcfce7", color: "#166534", borderRadius: "4px", fontWeight: "bold" }}>Mở cửa</span>
                            ) : (
                              <span style={{ fontSize: "0.75rem", padding: "2px 6px", background: "#fee2e2", color: "#991b1b", borderRadius: "4px", fontWeight: "bold" }}>Đóng cửa</span>
                            )}
                            <div style={{ color: "#e11d48", fontWeight: "bold" }}>Giá: {offer.price?.toLocaleString()}đ</div>
                          </div>
                          <div style={{ color: "#888", fontSize: "0.85rem", marginTop: "4px" }}>Tồn kho: {offer.stockQuantity}</div>
                        </div>
                      </div>
                      <button 
                        className="btn-buy-header" 
                        style={{ padding: "8px 16px", background: (!offer.isOpen || offer.stockQuantity <= 0) ? "#cbd5e1" : "#e11d48", color: "white", border: "none", borderRadius: "6px", cursor: (!offer.isOpen || offer.stockQuantity <= 0) ? "not-allowed" : "pointer", fontWeight: "bold" }}
                        onClick={() => handleBuyNow(offer)}
                        disabled={!offer.isOpen || offer.stockQuantity <= 0}
                      >
                        {!offer.isOpen ? "Đóng cửa" : offer.stockQuantity > 0 ? "Mua ngay" : "Hết hàng"}
                      </button>
                    </li>
                  ))}

                  {/* External Shops (Seed Data) */}
                  {product?.shops?.map((shop) => (
                    <li key={shop.id || shop.shopUrl} className="shop-item external-shop" style={{ padding: "15px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div className="shop-info-wrapper" style={{ display: "flex", alignItems: "center" }}>
                        {shop.imageUrl ? (
                          <img src={shop.imageUrl} alt={shop.shopName} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                        ) : (
                          <div className="shop-avatar-placeholder" style={{ background: "#f1f5f9", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🌐</div>
                        )}
                        <div className="shop-info" style={{ marginLeft: "15px" }}>
                          <strong style={{ fontSize: "1.1rem" }}>{shop.shopName}</strong>
                          <div style={{ color: "#0284c7", fontSize: "0.85rem", marginTop: "4px", fontWeight: "600" }}>{shop.platform}</div>
                        </div>
                      </div>
                      <a 
                        href={shop.shopUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-buy-header" 
                        style={{ padding: "8px 16px", background: "#f8fafc", border: "1.5px solid #0284c7", color: "#0284c7", borderRadius: "6px", textDecoration: "none", fontWeight: "bold", transition: "all 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#e0f2fe"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; }}
                      >
                        Đến cửa hàng ↗
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
