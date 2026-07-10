import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SellerLayout from '../layouts/SellerLayout';
import { orderApi } from '../api/orderApi';
import { productOfferApi } from '../api/productOfferApi';
import { useAuth } from '../contexts/AuthContext';

export default function SellerDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Chờ kết quả trả về, dùng fallback array rỗng nếu có lỗi
        const ordersData = await orderApi.getSellerOrders().then(res => res.data || res).catch(() => []);
        const offersData = await productOfferApi.getOffersBySeller(user?.id).catch(() => []);

        setOrders(ordersData);
        setOffers(offersData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderApi.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      alert('Đã cập nhật trạng thái!');
    } catch (err) {
      alert('Lỗi cập nhật trạng thái');
    }
  };

  const handleDeleteOffer = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá tin đăng bán này?")) return;
    try {
      await productOfferApi.deleteOffer(id);
      setOffers(offers.filter(o => o.id !== id));
      alert("Đã xoá thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xoá đăng bán.");
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0: return 'Chờ xử lý';
      case 1: return 'Đang xử lý';
      case 2: return 'Đang giao';
      case 3: return 'Hoàn thành';
      case 4: return 'Đã huỷ';
      default: return 'Không rõ';
    }
  };

  if (loading) return <SellerLayout><div style={{ padding: "100px", textAlign: "center" }}>Đang tải...</div></SellerLayout>;

  return (
    <SellerLayout>
      <div className="admin-header">
        <div>
          <h1>Kênh người bán</h1>
          <p>Tổng quan sản phẩm và đơn hàng của bạn.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link to="/seller/products/new" className="btn btn-primary">
            + Thêm sản phẩm
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>
        <div>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600, background: "white", borderRadius: "12px 12px 0 0" }}>
            Cửa hàng của bạn ({offers.length})
          </div>
          <div className="card" style={{ padding: 0, borderRadius: "0 0 12px 12px", borderTop: "none" }}>
            {offers.length === 0 ? <div style={{ padding: 24, color: "#64748b" }}>Chưa có đăng bán nào.</div> : (
              <div style={{ display: "grid", gap: 0 }}>
                {offers.map(o => (
                  <div key={o.id} style={{ display: "flex", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                    <div>
                        <div style={{ fontWeight: 600 }}>Cửa hàng: {o.shopName}</div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Kho: {o.stockQuantity || 0}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                      <strong style={{ color: "#e11d48" }}>{o.price?.toLocaleString()}đ</strong>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link to={`/seller/products/${o.id}/edit`} style={{ fontSize: "0.85rem", color: "#2563eb", textDecoration: "none" }}>Sửa</Link>
                        <button onClick={() => handleDeleteOffer(o.id)} style={{ fontSize: "0.85rem", color: "#e11d48", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Xoá</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600, background: "white", borderRadius: "12px 12px 0 0" }}>
            Đơn hàng mới ({orders.length})
          </div>
          <div className="card" style={{ padding: 0, borderRadius: "0 0 12px 12px", borderTop: "none" }}>
            {orders.length === 0 ? <div style={{ padding: 24, color: "#64748b" }}>Chưa có đơn hàng nào.</div> : (
              <div style={{ display: "grid", gap: 0 }}>
                {orders.map(o => (
                  <div key={o.id} style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <strong>Đơn {o.id.substring(0, 8)}</strong>
                      <span style={{ color: "#e11d48", fontWeight: "bold" }}>{o.totalAmount.toLocaleString()}đ</span>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "8px" }}>
                      Khách: {o.shippingName} - {o.shippingPhone}<br />
                      Đ/c: {o.shippingAddress}
                    </div>
                    <div style={{ fontSize: "0.85rem", marginBottom: "12px" }}>
                      {o.items.map(i => <div key={i.id}>- {i.productName} x {i.quantity}</div>)}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, parseInt(e.target.value))}
                        style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #e2e8f0", fontSize: "0.85rem" }}
                      >
                        <option value={0}>Chờ xử lý</option>
                        <option value={1}>Đang xử lý</option>
                        <option value={2}>Đang giao</option>
                        <option value={3}>Hoàn thành</option>
                        <option value={4}>Đã huỷ</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
