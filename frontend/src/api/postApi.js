import axiosClient from "./axiosClient";

export const postApi = {
  getByProvince: (provinceId) =>
    axiosClient.get(`/api/posts/province/${provinceId}`).then((res) => res.data),
  getById: (id) => axiosClient.get(`/api/posts/${id}`).then((res) => res.data),
  search: (params) => axiosClient.get("/api/posts/search", { params }).then((res) => res.data),
  create: (payload) => axiosClient.post("/api/posts", payload).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/api/posts/${id}`, payload).then((res) => res.data),
  delete: (id) => axiosClient.delete(`/api/posts/${id}`).then((res) => res.data),
  updateTags: (id, payload) => axiosClient.put(`/api/posts/${id}/tags`, payload).then((res) => res.data),
  updateHighlight: (id, payload) => axiosClient.put(`/api/posts/${id}/highlight`, payload).then((res) => res.data)
};
