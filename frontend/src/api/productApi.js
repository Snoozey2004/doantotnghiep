import axiosClient from "./axiosClient";

export const productApi = {
  getByProvince: (provinceId) =>
    axiosClient.get(`/api/products/province/${provinceId}`).then((res) => res.data),
  create: (payload) => axiosClient.post("/api/products", payload).then((res) => res.data)
};
