import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div style={{ maxWidth: "1200px", margin: "120px auto 40px", padding: "0 20px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "30px", fontWeight: "bold" }}>Giỏ hàng của bạn</h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#fafafa", borderRadius: "16px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🛒</div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Giỏ hàng trống</h2>
            <p style={{ color: "#666", marginBottom: "30px" }}>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
            <Link to="/" style={{ padding: "12px 24px", background: "#e11d48", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>
              Khám phá đặc sản
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "40px" }}>
            <div>
              <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                {cartItems.map(item => (
                  <div key={item.offer.id} style={{ display: "flex", gap: "20px", padding: "20px 0", borderBottom: "1px solid #eee" }}>
                    <img src={item.product.imageUrl} alt={item.product.name} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "10px" }}>{item.product.name}</h3>
                      <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Cửa hàng: {item.offer.shopName}</div>
                      <div style={{ color: "#e11d48", fontWeight: "bold", marginBottom: "15px" }}>{item.offer.price?.toLocaleString()}đ</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button onClick={() => updateQuantity(item.offer.id, item.quantity - 1)} style={{ width: "30px", height: "30px", border: "1px solid #ddd", background: "white", borderRadius: "4px" }}>-</button>
                        <span style={{ width: "30px", textAlign: "center" }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.offer.id, item.quantity + 1)} style={{ width: "30px", height: "30px", border: "1px solid #ddd", background: "white", borderRadius: "4px" }}>+</button>
                        <button onClick={() => removeFromCart(item.offer.id)} style={{ marginLeft: "auto", color: "red", background: "none", border: "none", cursor: "pointer" }}>Xoá</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "white", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "sticky", top: "100px" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>Tổng đơn hàng</h3>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "1.1rem" }}>
                  <span>Tạm tính:</span>
                  <span style={{ fontWeight: "bold" }}>{cartTotal.toLocaleString()}đ</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", fontSize: "1.1rem" }}>
                  <span>Phí vận chuyển:</span>
                  <span>Chưa tính</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", fontSize: "1.3rem", fontWeight: "bold", color: "#e11d48" }}>
                  <span>Tổng cộng:</span>
                  <span>{cartTotal.toLocaleString()}đ</span>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  style={{ width: "100%", padding: "16px", background: "#e11d48", color: "white", borderRadius: "8px", border: "none", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer" }}
                >
                  Thanh toán ngay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
