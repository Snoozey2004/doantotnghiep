import axiosClient from "./axiosClient";

export const mediaApi = {
  getByProvince: (provinceId) =>
    axiosClient.get(`/api/mediaitems/province/${provinceId}`).then((res) => res.data)
};
