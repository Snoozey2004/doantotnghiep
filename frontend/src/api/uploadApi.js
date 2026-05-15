import axiosClient from "./axiosClient";

export const uploadApi = {
  upload: (file, folder) => {
    const formData = new FormData();
    formData.append("file", file);
    if (folder) {
      formData.append("folder", folder);
    }
    return axiosClient
      .post("/api/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then((res) => res.data);
  }
};
