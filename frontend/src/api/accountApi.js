import axiosClient from "./axiosClient";

export const accountApi = {
  getMe: () => axiosClient.get("/api/account/me").then((res) => res.data),
  updateProfile: (payload) => axiosClient.put("/api/account/profile", payload).then((res) => res.data),
  updatePassword: (payload) => axiosClient.put("/api/account/password", payload).then((res) => res.data)
};
