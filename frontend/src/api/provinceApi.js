import axiosClient from "./axiosClient";

export const provinceApi = {
  getAll: () => axiosClient.get("/api/provinces").then((res) => res.data),
  getBySlug: (slug) => axiosClient.get(`/api/provinces/slug/${slug}`).then((res) => res.data),
  create: (payload) => axiosClient.post("/api/provinces", payload).then((res) => res.data)
};
