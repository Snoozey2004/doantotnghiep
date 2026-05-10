import axiosClient from "./axiosClient";

export const uiBlockApi = {
  create: (configId, payload) =>
    axiosClient.post(`/api/uiblocks/config/${configId}`, payload).then((res) => res.data)
};
