import React from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
      display: "flex", justifyContent: "flex-end"
    }}>
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)"
        }}
      />
      
      {/* Drawer */}
      <div style={{
        position: "relative", width: "400px", maxWidth: "100%", background: "#fff",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column",
        animation: "slideInRight 0.3s forwards"
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px", borderBottom: "1px solid #eee",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#1a1a1a" }}>Giỏ hàng của bạn</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{
              background: "transparent", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#666"
            }}
          >&times;</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", color: "#666", marginTop: "40px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🛒</div>
              Giỏ hàng đang trống.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: "flex", gap: "16px", borderBottom: "1px solid #f0f0f0", paddingBottom: "16px" }}>
                  <img src={item.imageUrl || "https://via.placeholder.com/80"} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontWeight: 600, color: "#333", marginBottom: "4px" }}>{item.name}</div>
                      <div style={{ color: "#e11d48", fontWeight: 700 }}>{item.price?.toLocaleString()}đ</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "4px" }}>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ border: "none", background: "#f9f9f9", padding: "4px 10px", cursor: "pointer" }}
                        >-</button>
                        <span style={{ padding: "0 12px", fontSize: "0.9rem" }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ border: "none", background: "#f9f9f9", padding: "4px 10px", cursor: "pointer" }}
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ border: "none", background: "transparent", color: "#999", fontSize: "0.85rem", cursor: "pointer", textDecoration: "underline" }}
                      >Xóa</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: "24px", borderTop: "1px solid #eee", background: "#fafafa" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "1.1rem", fontWeight: 700 }}>
              <span>Tổng cộng:</span>
              <span style={{ color: "#e11d48" }}>{cartTotal.toLocaleString()}đ</span>
            </div>
            <button 
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
              }}
              style={{
                width: "100%", padding: "14px", borderRadius: "8px", border: "none",
                background: "linear-gradient(135deg,#e11d48,#be123c)", color: "#fff",
                fontSize: "1rem", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(225,29,72,0.2)"
              }}
            >
              Tiến hành thanh toán
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
