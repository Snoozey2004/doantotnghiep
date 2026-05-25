import axiosClient from './axiosClient';

const searchApi = {
  search: async (params) => {
    const response = await axiosClient.get('/api/search', { params });
    return response.data;
  },

  getSuggestions: async (keyword) => {
    const response = await axiosClient.get('/api/search/suggestions', {
      params: { keyword }
    });
    return response.data;
  },

  getRelatedContent: async (provinceId, theme = null) => {
    const params = theme ? { theme } : {};
    const response = await axiosClient.get(`/api/search/related/${provinceId}`, { params });
    return response.data;
  }
};

export default searchApi;
