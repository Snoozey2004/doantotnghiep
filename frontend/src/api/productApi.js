import axiosClient from "./axiosClient";

export const productApi = {
  getAll: () => axiosClient.get("/api/products").then((res) => res.data),

  getById: (id) =>
    axiosClient.get(`/api/products/${id}`).then((res) => res.data),

  getByProvinceSlug: (slug) =>
    axiosClient
      .get(`/api/products/province/slug/${slug}`)
      .then((res) => res.data),

  create: (data) =>
    axiosClient.post("/api/products", data).then((res) => res.data),

  update: (id, data) =>
    axiosClient.put(`/api/products/${id}`, data).then((res) => res.data),

  delete: (id) => axiosClient.delete(`/api/products/${id}`),

  importProducts: (formData) =>
    axiosClient.post("/api/products/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
