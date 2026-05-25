import axiosClient from "./axiosClient";

export const provinceApi = {
  getAll: () => axiosClient.get("/api/provinces").then((res) => res.data),
  getById: (id) => axiosClient.get(`/api/provinces/${id}`).then((res) => res.data),
  getBySlug: (slug) => axiosClient.get(`/api/provinces/slug/${slug}`).then((res) => res.data),
  search: (params) => axiosClient.get("/api/provinces/search", { params }).then((res) => res.data),
  getStats: (id) => axiosClient.get(`/api/provinces/${id}/stats`).then((res) => res.data),
  getRelated: (id) => axiosClient.get(`/api/provinces/${id}/related`).then((res) => res.data),
  create: (payload) => axiosClient.post("/api/provinces", payload).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/api/provinces/${id}`, payload).then((res) => res.data),
  delete: (id) => axiosClient.delete(`/api/provinces/${id}`).then((res) => res.data),
  updateTags: (id, payload) => axiosClient.put(`/api/provinces/${id}/tags`, payload).then((res) => res.data),
  updateHighlight: (id, payload) => axiosClient.put(`/api/provinces/${id}/highlight`, payload).then((res) => res.data)
};
