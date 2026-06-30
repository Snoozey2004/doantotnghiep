import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import BlockRenderer from '../infographic/renderers/BlockRenderer';
import { productInfographicApi } from '../infographic/services/productInfographicApi';
import { productApi } from '../api/productApi';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import '../styles/ProductInfographicPage.css';

export default function ProductInfographicPage() {
  const { provinceSlug, productSlug } = useParams();
  const navigate = useNavigate();
  const [infographic, setInfographic] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
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
        const [infoRes, productRes] = await Promise.all([
          productInfographicApi.getByProductSlug(productSlug).catch(() => null),
          productApi.getBySlug(productSlug).catch(() => null)
        ]);
        
        if (infoRes && infoRes.data) {
          setInfographic(infoRes.data);
        }
        if (productRes) {
          setProduct(productRes);
          document.title = `${productRes.name || 'Đặc sản'} - Tinh hoa ẩm thực`;
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
            <button className="btn-buy-header" onClick={() => {
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                slug: product.slug,
                provinceId: product.provinceId
              }, 1);
            }}>
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
    </MainLayout>
  );
}
