import axiosClient from "./axiosClient";

export const richContentApi = {
  uploadImage: (file, folder = "rich-content") => {
    const formData = new FormData();
    formData.append("File", file);
    formData.append("Folder", folder);

    return axiosClient
      .post("/api/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then((res) => res.data);
  }
};
