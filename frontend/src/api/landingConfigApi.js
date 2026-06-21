import axiosClient from "./axiosClient";

export const landingConfigApi = {
  getById: (id) => axiosClient.get(`/api/landingpageconfigs/${id}`).then((res) => res.data),
  getByProvinceId: (provinceId) =>
    axiosClient.get(`/api/landingpageconfigs/province/${provinceId}`).then((res) => res.data),
  getByProvinceSlug: (slug) =>
    axiosClient.get(`/api/landingpageconfigs/province/slug/${slug}`).then((res) => res.data),
  getBackgrounds: () => axiosClient.get("/api/landingpageconfigs/backgrounds").then((res) => res.data),
  create: (payload) => axiosClient.post("/api/landingpageconfigs", payload).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/api/landingpageconfigs/${id}`, payload).then((res) => res.data),
  delete: (id) => axiosClient.delete(`/api/landingpageconfigs/${id}`).then((res) => res.data)
};
