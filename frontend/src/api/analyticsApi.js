import axiosClient from "./axiosClient";

export const analyticsApi = {
  track: (payload) => axiosClient.post("/api/analytics/track", payload).then((res) => res.data)
};
