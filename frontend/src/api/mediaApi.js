import axiosClient from "./axiosClient";

export const mediaApi = {
  getAll: () => axiosClient.get("/api/mediaitems").then((res) => res.data),
  getByProvince: (provinceId) =>
    axiosClient.get(`/api/mediaitems/province/${provinceId}`).then((res) => res.data),
  getById: (id) => axiosClient.get(`/api/mediaitems/${id}`).then((res) => res.data),
  search: (params) => axiosClient.get("/api/mediaitems/search", { params }).then((res) => res.data),
  create: (payload) => axiosClient.post("/api/mediaitems", payload).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/api/mediaitems/${id}`, payload).then((res) => res.data),
  delete: (id) => axiosClient.delete(`/api/mediaitems/${id}`).then((res) => res.data),
  updateTags: (id, payload) => axiosClient.put(`/api/mediaitems/${id}/tags`, payload).then((res) => res.data),
  updateHighlight: (id, payload) => axiosClient.put(`/api/mediaitems/${id}/highlight`, payload).then((res) => res.data)
};
