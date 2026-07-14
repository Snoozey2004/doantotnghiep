import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../contexts/CartContext';
import { orderApi } from '../api/orderApi';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const buyNowOffer = location.state?.buyNowOffer;
    const buyNowProduct = location.state?.product;
    const isBuyNow = !!buyNowOffer;
    const [buyNowQuantity, setBuyNowQuantity] = useState(1);
    
    const checkoutItems = isBuyNow
        ? [{ product: buyNowProduct, offer: buyNowOffer, quantity: buyNowQuantity }]
        : cartItems;
    const checkoutTotal = isBuyNow
        ? (buyNowOffer?.price || 0) * buyNowQuantity
        : cartTotal;
    const [formData, setFormData] = useState({
        shippingName: user?.fullName || '',
        shippingPhone: '',
        shippingAddress: '',
        notes: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const finalNotes = paymentMethod === 'qr'
                ? `[Thanh toán QR] ${formData.notes}`
                : `[Thanh toán COD] ${formData.notes}`;
            const payload = {
                items: checkoutItems.map(item => ({
                    productOfferId: item.offer.id,
                    quantity: item.quantity
                })),
                ...formData,
                notes: finalNotes
            };

            await orderApi.createOrder(payload);
            if (!isBuyNow) clearCart();
            alert('Đặt hàng thành công!');
            navigate('/');
        } catch (err) {
            alert('Lỗi khi đặt hàng: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };
    if (checkoutItems.length === 0) {
        return (
            <MainLayout>
                <div style={{ textAlign: "center", padding: "120px 20px" }}>Giỏ hàng trống</div>
            </MainLayout>
        );
    }
    return (
        <MainLayout>
            <div style={{ maxWidth: "1200px", margin: "120px auto 40px", padding: "0 20px" }}>
                <h1 style={{ fontSize: "2.5rem", marginBottom: "30px", fontWeight: "bold" }}>Thanh toán</h1>

                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "40px" }}>
                    <div>
                        <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Thông tin giao hàng</h2>

                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Họ và tên</label>
                                <input required type="text" name="shippingName" value={formData.shippingName} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Số điện thoại</label>
                                <input required type="text" name="shippingPhone" value={formData.shippingPhone} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Địa chỉ giao hàng</label>
                                <input required type="text" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Ghi chú đơn hàng (Tùy chọn)</label>
                                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}></textarea>
                            </div>
                            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", marginTop: "40px" }}>Phương thức thanh toán</h2>
                            <div
                                onClick={() => setPaymentMethod('cod')}
                                style={{ padding: "20px", border: paymentMethod === 'cod' ? "2px solid #e11d48" : "1px solid #ddd", borderRadius: "8px", background: paymentMethod === 'cod' ? "#fff1f2" : "#fff", fontWeight: "500", cursor: "pointer", marginBottom: "15px" }}
                            >
                                <input type="radio" checked={paymentMethod === 'cod'} readOnly style={{ marginRight: "10px" }} />
                                Thanh toán khi nhận hàng (COD)
                            </div>
                            <div
                                onClick={() => setPaymentMethod('qr')}
                                style={{ padding: "20px", border: paymentMethod === 'qr' ? "2px solid #e11d48" : "1px solid #ddd", borderRadius: "8px", background: paymentMethod === 'qr' ? "#fff1f2" : "#fff", fontWeight: "500", cursor: "pointer" }}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input type="radio" checked={paymentMethod === 'qr'} readOnly style={{ marginRight: "10px" }} />
                                    Thanh toán qua mã QR (Chuyển khoản VietQR)
                                </div>

                                {paymentMethod === 'qr' && (
                                    <div style={{ marginTop: "20px", textAlign: "center", padding: "15px", background: "white", borderRadius: "8px", border: "1px dashed #e11d48" }}>
                                        <p style={{ marginBottom: "15px", color: "#666" }}>Vui lòng quét mã QR bên dưới bằng ứng dụng ngân hàng hoặc Momo của bạn để thanh toán.</p>
                                        <img
                                            src={`https://img.vietqr.io/image/970436-0123456789-compact.png?amount=${checkoutTotal}&addInfo=Thanh toan don hang&accountName=NGUYEN VAN A`}
                                            alt="VietQR"
                                            style={{ maxWidth: "250px", width: "100%", borderRadius: "8px" }}
                                        />
                                        <div style={{ marginTop: "15px", textAlign: "left", display: "inline-block" }}>
                                            <div><strong>Ngân hàng:</strong> Vietcombank</div>
                                            <div><strong>Số tài khoản:</strong> 0123456789</div>
                                            <div><strong>Chủ tài khoản:</strong> NGUYEN VAN A</div>
                                            <div><strong>Số tiền:</strong> <span style={{ color: "#e11d48", fontWeight: "bold" }}>{checkoutTotal.toLocaleString()}đ</span></div>
                                            <div><strong>Nội dung:</strong> Thanh toan don hang</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                    <div>
                        <div style={{ background: "white", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "sticky", top: "100px" }}>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>Đơn hàng của bạn</h3>
                            <div style={{ borderBottom: "1px solid #eee", paddingBottom: "20px", marginBottom: "20px" }}>
                                {checkoutItems.map(item => (
                                    <div key={item.offer.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                            <span>{item.product.name} ({item.offer.shopName})</span>
                                            {isBuyNow ? (
                                                <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "6px", overflow: "hidden", width: "fit-content" }}>
                                                    <button type="button" onClick={() => setBuyNowQuantity(q => Math.max(1, q - 1))} style={{ padding: "4px 12px", background: "#f8fafc", border: "none", borderRight: "1px solid #ddd", cursor: "pointer", fontWeight: "bold" }}>-</button>
                                                    <span style={{ padding: "4px 16px", fontSize: "0.95rem", fontWeight: "500", background: "white" }}>{item.quantity}</span>
                                                    <button type="button" onClick={() => setBuyNowQuantity(q => Math.min(item.offer.stockQuantity || 99, q + 1))} style={{ padding: "4px 12px", background: "#f8fafc", border: "none", borderLeft: "1px solid #ddd", cursor: "pointer", fontWeight: "bold" }}>+</button>
                                                </div>
                                            ) : (
                                                <strong style={{ color: "#475569" }}>Số lượng: {item.quantity}</strong>
                                            )}
                                        </div>
                                        <span style={{ fontWeight: "600", fontSize: "1.1rem" }}>{(item.offer.price * item.quantity).toLocaleString()}đ</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", fontSize: "1.3rem", fontWeight: "bold", color: "#e11d48" }}>
                                <span>Tổng cộng:</span>
                                <span>{checkoutTotal.toLocaleString()}đ</span>
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                style={{ width: "100%", padding: "16px", background: loading ? "#ccc" : "#e11d48", color: "white", borderRadius: "8px", border: "none", fontSize: "1.1rem", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer" }}
                            >
                                {loading ? 'Đang xử lý...' : 'Đặt hàng'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}