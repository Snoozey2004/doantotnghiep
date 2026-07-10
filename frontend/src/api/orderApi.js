import axiosClient from "./axiosClient";

export const orderApi = {
  createOrder(data) {
    return axiosClient.post("/api/orders", data);
  },
  getMyOrders() {
    return axiosClient.get("/api/orders/my-orders");
  },
  getSellerOrders() {
    return axiosClient.get("/api/orders/seller");
  },
  updateOrderStatus(id, status) {
    return axiosClient.put(`/api/orders/${id}/status`, { status });
  }
};
