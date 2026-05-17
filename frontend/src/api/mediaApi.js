import axiosClient from "./axiosClient";

export const mediaApi = {
  getByProvince: (provinceId) =>
    axiosClient.get(`/api/mediaitems/province/${provinceId}`).then((res) => res.data),
  create: (payload) => axiosClient.post("/api/mediaitems", payload).then((res) => res.data)
};
