import axiosClient from "./axiosClient";

export const uiBlockApi = {
  getByConfig: (configId) => axiosClient.get(`/api/uiblocks/config/${configId}`).then((res) => res.data),
  create: (configId, payload) =>
    axiosClient.post(`/api/uiblocks/config/${configId}`, payload).then((res) => res.data),
  update: (id, payload) => axiosClient.put(`/api/uiblocks/${id}`, payload).then((res) => res.data),
  delete: (id) => axiosClient.delete(`/api/uiblocks/${id}`).then((res) => res.data)
};
