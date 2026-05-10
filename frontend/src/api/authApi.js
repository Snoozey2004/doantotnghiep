import axiosClient from "./axiosClient";

export const authApi = {
  login: (payload) => axiosClient.post("/api/auth/login", payload).then((res) => res.data),
  register: (payload) => axiosClient.post("/api/auth/register", payload).then((res) => res.data)
};
