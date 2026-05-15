import axiosClient from "./axiosClient";

export const userApi = {
  getAll: () => axiosClient.get("/api/users").then((res) => res.data),
  getById: (id) => axiosClient.get(`/api/users/${id}`).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/api/users/${id}`, payload).then((res) => res.data)
};
