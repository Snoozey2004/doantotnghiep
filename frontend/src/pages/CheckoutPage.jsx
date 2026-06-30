import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { orderApi } from "../api/orderApi";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: user?.fullName || user?.name || "",
    phoneNumber: "",
    shippingAddress: "",
    notes: "",
    paymentMethod: "COD"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <MainLayout>
        <div style={{ padding: "60px 20px", textAlign: "center", minHeight: "60vh" }}>
          <h2>Giỏ hàng của bạn đang trống</h2>
          <button onClick={() => navigate("/")} className="btn btn-primary" style={{ marginTop: "20px" }}>
            Tiếp tục mua sắm
          </button>
        </div>
      </MainLayout>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Bạn cần đăng nhập để đặt hàng!");
      navigate("/login?redirect=/checkout");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        userId: user.id || user.nameid,
        customerName: form.customerName,
        phoneNumber: form.phoneNumber,
        shippingAddress: form.shippingAddress,
        notes: form.notes,
        paymentMethod: form.paymentMethod,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };
      const response = await orderApi.create(payload);
      setOrderId(response.id);
      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <MainLayout>
        <div style={{ maxWidth: "600px", margin: "60px auto", padding: "40px 20px", textAlign: "center", background: "#fff", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🎉</div>
          <h2 style={{ color: "#1a1a1a", marginBottom: "16px" }}>Đặt hàng thành công!</h2>
          <p style={{ color: "#666", marginBottom: "24px", lineHeight: 1.6 }}>
            Cảm ơn bạn đã đặt hàng. Đơn hàng <strong>#{orderId?.substring(0,8)}</strong> của bạn đang chờ xử lý.
          </p>
          
          {form.paymentMethod === "Transfer" && (
            <div style={{ padding: "24px", background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: "12px", marginBottom: "32px", display: "inline-block" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "#334155" }}>Quét mã VietQR để thanh toán</h3>
              {/* Fake bank data for VietQR. In real life you use actual bank credentials */}
              <img 
                src={`https://img.vietqr.io/image/970436-0123456789-compact2.png?amount=${cartTotal}&addInfo=Thanh toan don hang ${orderId?.substring(0,8)}`} 
                alt="VietQR Code" 
                style={{ width: "250px", height: "250px", objectFit: "contain", background: "#fff", padding: "10px", borderRadius: "8px" }}
              />
              <p style={{ marginTop: "16px", fontSize: "0.9rem", color: "#64748b" }}>
                Số tiền: <strong style={{ color: "#e11d48" }}>{cartTotal.toLocaleString()}đ</strong><br/>
                Nội dung: <strong>Thanh toan don hang {orderId?.substring(0,8)}</strong>
              </p>
            </div>
          )}

          <div>
            <button onClick={() => navigate("/account")} className="btn btn-outline" style={{ marginRight: "12px" }}>
              Xem đơn hàng
            </button>
            <button onClick={() => navigate("/")} className="btn btn-primary">
              Về trang chủ
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "32px" }}>Thanh toán</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "40px", alignItems: "start" }}>
          
          <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #eee" }}>Thông tin giao hàng</h2>
            
            <div style={{ display: "grid", gap: "20px" }}>
              <div style={{ display: "grid", gap: "8px" }}>
                <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>Họ tên người nhận (*)</label>
                <input required name="customerName" value={form.customerName} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} placeholder="VD: Nguyễn Văn A" />
              </div>

              <div style={{ display: "grid", gap: "8px" }}>
                <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>Số điện thoại (*)</label>
                <input required type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} placeholder="VD: 0901234567" />
              </div>

              <div style={{ display: "grid", gap: "8px" }}>
                <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>Địa chỉ giao hàng (*)</label>
                <textarea required name="shippingAddress" value={form.shippingAddress} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", minHeight: "80px", resize: "vertical" }} placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố" />
              </div>

              <div style={{ display: "grid", gap: "8px" }}>
                <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>Ghi chú đơn hàng (Tùy chọn)</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", minHeight: "80px", resize: "vertical" }} placeholder="Ghi chú thêm về việc giao hàng..." />
              </div>
            </div>

            <h2 style={{ fontSize: "1.25rem", marginBottom: "20px", marginTop: "40px", paddingBottom: "16px", borderBottom: "1px solid #eee" }}>Phương thức thanh toán</h2>
            <div style={{ display: "grid", gap: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px", cursor: "pointer", background: form.paymentMethod === "COD" ? "#f8fafc" : "#fff" }}>
                <input type="radio" name="paymentMethod" value="COD" checked={form.paymentMethod === "COD"} onChange={handleChange} style={{ width: "20px", height: "20px" }} />
                <span style={{ fontWeight: 500 }}>Thanh toán khi nhận hàng (COD)</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px", cursor: "pointer", background: form.paymentMethod === "Transfer" ? "#f8fafc" : "#fff" }}>
                <input type="radio" name="paymentMethod" value="Transfer" checked={form.paymentMethod === "Transfer"} onChange={handleChange} style={{ width: "20px", height: "20px" }} />
                <span style={{ fontWeight: 500 }}>Chuyển khoản qua mã VietQR</span>
              </label>
            </div>

            <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "16px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg,#e11d48,#be123c)", color: "#fff", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(225,29,72,0.25)", marginTop: "40px" }}>
              {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt hàng"}
            </button>
          </form>

          {/* Order Summary */}
          <div style={{ background: "#f8fafc", padding: "32px", borderRadius: "12px", position: "sticky", top: "100px" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "24px" }}>Tóm tắt đơn hàng</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "24px", marginBottom: "24px" }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ position: "relative" }}>
                      <img src={item.imageUrl} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e2e8f0" }} />
                      <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "#64748b", color: "#fff", fontSize: "0.75rem", padding: "2px 6px", borderRadius: "10px" }}>{item.quantity}</span>
                    </div>
                    <span style={{ fontWeight: 500, alignSelf: "center", maxWidth: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: 600, alignSelf: "center" }}>{(item.price * item.quantity).toLocaleString()}đ</span>
                </div>
              ))}
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "#64748b" }}>
              <span>Tạm tính:</span>
              <span>{cartTotal.toLocaleString()}đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", color: "#64748b" }}>
              <span>Phí vận chuyển:</span>
              <span>Miễn phí</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.25rem", fontWeight: 700, color: "#1e293b", paddingTop: "24px", borderTop: "1px solid #e2e8f0" }}>
              <span>Tổng cộng:</span>
              <span style={{ color: "#e11d48" }}>{cartTotal.toLocaleString()}đ</span>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
