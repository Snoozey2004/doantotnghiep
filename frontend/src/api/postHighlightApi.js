import axiosClient from "./axiosClient";

export const postHighlightApi = {
  updateHighlight: (postId, highlightData) => {
    return axiosClient.put(`/api/posts/${postId}/highlight`, highlightData).then((res) => res.data);
  }
};
