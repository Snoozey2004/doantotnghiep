import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import BlockRenderer from '../infographic/renderers/BlockRenderer';
import { productInfographicApi } from '../infographic/services/productInfographicApi';
import { productApi } from '../api/productApi';
import { landingConfigApi } from '../api/landingConfigApi';
import { motion, useScroll, useSpring } from 'framer-motion';
import '../styles/ProductInfographicPage.css';

export default function ProductInfographicPage() {
  const { provinceSlug, productSlug } = useParams();
  const navigate = useNavigate();
  const [infographic, setInfographic] = useState(null);
  const [product, setProduct] = useState(null);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
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

  const handleBuy = () => {
    alert(`Chức năng đặt hàng cho ${product?.name || 'đặc sản này'} đang được hoàn thiện!`);
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
          {(!product?.type || product?.type === 1) && (
            <button className="btn-buy-header" onClick={() => setIsShopModalOpen(true)}>
              🛒 Đặt hàng ngay
            </button>
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
            <div className="shop-modal-body">
              {(!product?.shops || product.shops.length === 0) ? (
                <div className="shop-empty">
                  <p>Hiện chưa có cửa hàng nào liên kết bán sản phẩm này.</p>
                </div>
              ) : (
                <ul className="shop-list">
                  {product.shops.map((shop, idx) => (
                    <li key={idx} className="shop-item">
                      <div className="shop-info-wrapper">
                        {shop.imageUrl ? (
                          <img src={shop.imageUrl} alt={shop.shopName} className="shop-avatar" />
                        ) : (
                          <div className="shop-avatar-placeholder">🏪</div>
                        )}
                        <div className="shop-info">
                          <strong>{shop.shopName}</strong>
                          <span className="shop-platform">{shop.platform}</span>
                        </div>
                      </div>
                      <a href={shop.shopUrl} target="_blank" rel="noopener noreferrer" className="btn-shop-link">
                        Đến cửa hàng
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
