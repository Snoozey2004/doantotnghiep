import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { orderApi } from '../api/orderApi';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeOrders, setActiveOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (user) {
      loadActiveOrders();
    }
  }, [user]);

  const loadActiveOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await orderApi.getMyOrders();
      const orders = res.data || [];
      setActiveOrders(orders.filter(o => o.status === 0 || o.status === 1 || o.status === 2));
    } catch {
      // ignore
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) return;
    try {
      await orderApi.updateOrderStatus(orderId, 4); // 4 = Cancelled
      loadActiveOrders();
    } catch (err) {
      alert("Không thể hủy đơn hàng. Vui lòng thử lại.");
    }
  };

  const getOrderStatus = (status) => {
    switch (status) {
      case 0: return { label: "Chờ xử lý", bg: "#fef3c7", color: "#b45309" };
      case 1: return { label: "Đang chuẩn bị", bg: "#e0e7ff", color: "#3730a3" };
      case 2: return { label: "Đang giao", bg: "#dbeafe", color: "#1e40af" };
      default: return { label: "Không rõ", bg: "#f3f4f6", color: "#6b7280" };
    }
  };

  return (
    <MainLayout>
      <div style={{ maxWidth: "1200px", margin: "120px auto 40px", padding: "0 20px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "30px", fontWeight: "bold" }}>Giỏ hàng của bạn</h1>

        {cartItems.length === 0 && activeOrders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#fafafa", borderRadius: "16px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🛒</div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Giỏ hàng trống</h2>
            <p style={{ color: "#666", marginBottom: "30px" }}>Bạn chưa có sản phẩm nào trong giỏ hàng và không có đơn hàng nào đang xử lý.</p>
            <Link to="/" style={{ padding: "12px 24px", background: "#e11d48", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>
              Khám phá đặc sản
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
            {cartItems.length > 0 && (
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

            {activeOrders.length > 0 && (
              <div>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", fontWeight: "bold" }}>Đơn hàng đang xử lý</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {activeOrders.map(order => {
                    const statusInfo = getOrderStatus(order.status);
                    return (
                      <div key={order.id} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", background: "white" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px dashed #e5e7eb" }}>
                          <div>
                            <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "4px" }}>
                              Mã đơn: <strong style={{ color: "#111827" }}>#{order.id.split("-")[0].toUpperCase()}</strong>
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                              {new Date(order.orderDate).toLocaleString("vi-VN")}
                            </div>
                          </div>
                          <span style={{ 
                            fontSize: "0.75rem", fontWeight: 700, padding: "6px 12px", borderRadius: "20px",
                            background: statusInfo.bg, color: statusInfo.color
                          }}>
                            {statusInfo.label}
                          </span>
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                          {order.items?.map((item) => (
                            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                              <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                                <span style={{ fontWeight: 600, color: "#4b5563" }}>{item.quantity}x</span>
                                <span style={{ color: "#1f2937" }}>{item.productName}</span>
                              </div>
                              <strong style={{ color: "#1f2937" }}>{(item.unitPrice * item.quantity).toLocaleString("vi-VN")} đ</strong>
                            </div>
                          ))}
                        </div>
                        
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
                          <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#4b5563" }}>Tổng tiền:</span>
                          <strong style={{ fontSize: "1.2rem", color: "#b45309" }}>{order.totalAmount.toLocaleString("vi-VN")} đ</strong>
                        </div>
                        {(order.status === 0 || order.status === 1) && (
                          <div style={{ marginTop: "16px", textAlign: "right" }}>
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              style={{ padding: "8px 16px", background: "#fff", border: "1.5px solid #ef4444", color: "#ef4444", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem", transition: "all 0.2s" }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "#fef2f2"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
                            >
                              Hủy đơn hàng
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
