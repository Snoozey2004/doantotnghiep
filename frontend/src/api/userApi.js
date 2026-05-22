import axiosClient from "./axiosClient";

export const userApi = {
  getAll: () => axiosClient.get("/api/users").then((res) => res.data),
  getById: (id) => axiosClient.get(`/api/users/${id}`).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/api/users/${id}`, payload).then((res) => res.data),
  delete: (id) => axiosClient.delete(`/api/users/${id}`).then((res) => res.data),
  updateProfile: (id, payload) => axiosClient.put(`/api/users/${id}/profile`, payload).then((res) => res.data),
  updatePassword: (id, payload) => axiosClient.put(`/api/users/${id}/password`, payload).then((res) => res.data),
  approve: (id) => axiosClient.put(`/api/users/${id}/approval`, { isApproved: true }).then((res) => res.data),
  reject: (id) => axiosClient.put(`/api/users/${id}/approval`, { isApproved: false }).then((res) => res.data)
};
