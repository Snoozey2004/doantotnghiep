import axiosClient from "./axiosClient";

export const uploadApi = {
  upload: (file, folder, provinceId, provinceName, mediaType) => {
    const formData = new FormData();
    formData.append("file", file);
    if (folder) {
      formData.append("folder", folder);
    }
    if (provinceId) {
      formData.append("provinceId", provinceId);
    }
    if (provinceName) {
      formData.append("provinceName", provinceName);
    }
    if (mediaType) {
      formData.append("mediaType", mediaType);
    }
    return axiosClient
      .post("/api/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then((res) => res.data);
  }
};
