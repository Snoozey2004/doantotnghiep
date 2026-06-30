import axiosClient from "./axiosClient";

export const orderApi = {
  create: (data) => {
    return axiosClient.post("/orders", data);
  },
  getById: (id) => {
    return axiosClient.get(`/orders/${id}`);
  },
  getMyOrders: (userId) => {
    return axiosClient.get(`/orders/user/${userId}`);
  },
  getAllOrders: () => {
    return axiosClient.get("/orders");
  },
  updateStatus: (id, status) => {
    return axiosClient.patch(`/orders/${id}/status`, { status });
  }
};
