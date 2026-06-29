import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { orderApi } from "../api/orderApi";

export default function AdminOrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderApi.getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderApi.updateStatus(orderId, parseInt(newStatus));
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Cập nhật trạng thái thất bại.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 0: return <span style={{ background: "#fef08a", color: "#854d0e", padding: "4px 8px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 600 }}>Chờ xử lý</span>;
      case 1: return <span style={{ background: "#bfdbfe", color: "#1e3a8a", padding: "4px 8px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 600 }}>Đang xử lý</span>;
      case 2: return <span style={{ background: "#fed7aa", color: "#9a3412", padding: "4px 8px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 600 }}>Đang giao</span>;
      case 3: return <span style={{ background: "#bbf7d0", color: "#166534", padding: "4px 8px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 600 }}>Đã giao hàng</span>;
      case 4: return <span style={{ background: "#fecaca", color: "#991b1b", padding: "4px 8px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 600 }}>Đã hủy</span>;
      default: return null;
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: "2rem" }}>Quản lý Đơn hàng</h1>
        <button onClick={fetchOrders} className="btn btn-outline btn-sm">🔄 Làm mới</button>
      </div>

      {error && <div className="card" style={{ marginBottom: 16, color: "#e11d48" }}>{error}</div>}

      <div className="card" style={{ padding: 0, overflowX: "auto" }}>
        {loading ? (
          <div style={{ padding: 24, textAlign: "center", color: "#666" }}>Đang tải...</div>
        ) : orders.length === 0 ? (
          <div style={{ padding: 24, textAlign: "center", color: "#666" }}>Chưa có đơn hàng nào.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead style={{ background: "#f8f9fa", borderBottom: "2px solid #eee" }}>
              <tr>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Mã ĐH</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Ngày đặt</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Khách hàng</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Tổng tiền</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Trạng thái</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Thanh toán</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {orders.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => (
                <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: "0.9rem" }}>#{order.id.substring(0,8)}</td>
                  <td style={{ padding: "12px 16px" }}>{new Date(order.createdAt).toLocaleString()}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                    <div style={{ fontSize: "0.85rem", color: "#666" }}>{order.phoneNumber}</div>
                  </td>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "#e11d48" }}>{order.totalAmount.toLocaleString()}đ</td>
                  <td style={{ padding: "12px 16px" }}>{getStatusBadge(order.status)}</td>
                  <td style={{ padding: "12px 16px", fontSize: "0.9rem" }}>{order.paymentMethod === 'Transfer' ? 'Chuyển khoản' : 'COD'}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "0.85rem" }}
                    >
                      <option value={0}>Chờ xử lý</option>
                      <option value={1}>Đang xử lý</option>
                      <option value={2}>Đang giao</option>
                      <option value={3}>Đã giao hàng</option>
                      <option value={4}>Đã hủy</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
