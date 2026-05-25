import axiosClient from "./axiosClient";

export const provinceHighlightApi = {
  updateHighlight: (provinceId, highlightData) => {
    return axiosClient.put(`/api/provinces/${provinceId}/highlight`, highlightData).then((res) => res.data);
  }
};
