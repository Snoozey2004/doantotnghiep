import axiosClient from "./axiosClient";

export const postApi = {
  getByProvince: (provinceId) =>
    axiosClient.get(`/api/posts/province/${provinceId}`).then((res) => res.data)
};
