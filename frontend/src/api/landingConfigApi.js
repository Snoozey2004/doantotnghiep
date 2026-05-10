import axiosClient from "./axiosClient";

export const landingConfigApi = {
  getByProvinceSlug: (slug) =>
    axiosClient.get(`/api/landingpageconfigs/province/slug/${slug}`).then((res) => res.data),
  create: (payload) => axiosClient.post("/api/landingpageconfigs", payload).then((res) => res.data)
};
