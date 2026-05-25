import axiosClient from "./axiosClient";

export const mediaHighlightApi = {
  updateHighlight: (mediaId, highlightData) => {
    return axiosClient.put(`/api/mediaItems/${mediaId}/highlight`, highlightData).then((res) => res.data);
  }
};
