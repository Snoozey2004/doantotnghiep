import React, { useEffect, useState, useMemo } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { orderApi } from "../api/orderApi";

const getOrderStatus = (status) => {
  switch (status) {
    case 0: return { label: "Chờ xử lý", bg: "#fef3c7", color: "#b45309" };
    case 1: return { label: "Đang chuẩn bị", bg: "#e0e7ff", color: "#3730a3" };
    case 2: return { label: "Đang giao", bg: "#dbeafe", color: "#1e40af" };
    case 3: return { label: "Hoàn thành", bg: "#dcfce3", color: "#166534" };
    case 4: return { label: "Đã hủy", bg: "#fee2e2", color: "#991b1b" };
    default: return { label: "Không rõ", bg: "#f3f4f6", color: "#6b7280" };
  }
};

export default function AdminOrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderApi.getAllOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Không thể tải danh sách đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderApi.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert("Lỗi cập nhật trạng thái đơn hàng.");
    }
  };

  const filteredOrders = useMemo(() => {
    if (filterStatus === "all") return orders;
    return orders.filter(o => o.status === parseInt(filterStatus));
  }, [orders, filterStatus]);

  const totalRevenue = useMemo(() => {
    return orders.filter(o => o.status === 3).reduce((sum, o) => sum + o.totalAmount, 0);
  }, [orders]);

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ padding: 24, textAlign: "center" }}>Đang tải danh sách đơn hàng...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Quản lý Đơn hàng & Doanh thu</h1>
          <p>Theo dõi toàn bộ giao dịch trên hệ thống Multi-vendor.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ color: "#64748b", fontSize: 13 }}>Tổng số đơn hàng</div>
          <h2 style={{ marginTop: 8 }}>{orders.length}</h2>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ color: "#64748b", fontSize: 13 }}>Đơn chờ xử lý</div>
          <h2 style={{ marginTop: 8, color: "#b45309" }}>{orders.filter(o => o.status === 0).length}</h2>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ color: "#64748b", fontSize: 13 }}>Đơn hoàn thành</div>
          <h2 style={{ marginTop: 8, color: "#166534" }}>{orders.filter(o => o.status === 3).length}</h2>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ color: "#64748b", fontSize: 13 }}>Tổng doanh thu (Hoàn thành)</div>
          <h2 style={{ marginTop: 8, color: "#0066cc" }}>{totalRevenue.toLocaleString("vi-VN")} đ</h2>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 24, padding: 16 }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "#333", display: "block", marginBottom: 8 }}>
          Lọc theo trạng thái
        </label>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #e2e8f0", width: "100%", maxWidth: "200px" }}
        >
          <option value="all">Tất cả ({orders.length})</option>
          <option value="0">Chờ xử lý ({orders.filter(o => o.status === 0).length})</option>
          <option value="1">Đang chuẩn bị ({orders.filter(o => o.status === 1).length})</option>
          <option value="2">Đang giao ({orders.filter(o => o.status === 2).length})</option>
          <option value="3">Hoàn thành ({orders.filter(o => o.status === 3).length})</option>
          <option value="4">Đã hủy ({orders.filter(o => o.status === 4).length})</option>
        </select>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
          Danh sách đơn hàng ({filteredOrders.length})
        </div>
        
        {filteredOrders.length === 0 ? (
          <div style={{ padding: 24, color: "#64748b", textAlign: "center" }}>Không tìm thấy đơn hàng nào.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Mã đơn</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Ngày đặt</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Khách hàng</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Người bán</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", color: "#64748b", fontWeight: 600 }}>Tổng tiền</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", color: "#64748b", fontWeight: 600 }}>Trạng thái</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", color: "#64748b", fontWeight: 600 }}>Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const statusInfo = getOrderStatus(order.status);
                  return (
                    <tr key={order.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0f172a" }}>
                        #{order.id.split("-")[0].toUpperCase()}
                      </td>
                      <td style={{ padding: "12px 16px", color: "#475569" }}>
                        {new Date(order.orderDate).toLocaleString("vi-VN")}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontWeight: 500, color: "#0f172a" }}>{order.customerName || order.shippingName}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{order.shippingPhone}</div>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#475569" }}>
                        {order.sellerName || "N/A"}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "#b45309" }}>
                        {order.totalAmount.toLocaleString("vi-VN")} đ
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <span style={{
                          display: "inline-block", padding: "4px 8px", borderRadius: "12px",
                          fontSize: "0.75rem", fontWeight: 600,
                          background: statusInfo.bg, color: statusInfo.color
                        }}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, parseInt(e.target.value))}
                          style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.8rem" }}
                        >
                          <option value={0}>Chờ xử lý</option>
                          <option value={1}>Đang chuẩn bị</option>
                          <option value={2}>Đang giao</option>
                          <option value={3}>Hoàn thành</option>
                          <option value={4}>Đã hủy</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
