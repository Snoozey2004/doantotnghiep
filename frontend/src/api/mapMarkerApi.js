import axiosClient from "./axiosClient";

export const mapMarkerApi = {
  getAll: () => axiosClient.get("/api/mapmarkers").then((res) => res.data),
  saveAll: (markers) => axiosClient.put("/api/mapmarkers", markers).then((res) => res.data),
};
