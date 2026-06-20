import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:7288"
});

export const productInfographicApi = {
  getByProductId: (productId) => api.get(`/api/product-infographics/product/${productId}`),
  getByProductSlug: (slug) => api.get(`/api/product-infographics/product-slug/${slug}`),
  create: (data) => api.post('/api/product-infographics', data),
  update: (id, data) => api.put(`/api/product-infographics/${id}`, data),
  publish: (id, isPublished) => api.put(`/api/product-infographics/${id}/publish`, { isPublished })
};
