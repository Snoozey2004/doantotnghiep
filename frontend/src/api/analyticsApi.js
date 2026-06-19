import axiosClient from './axiosClient';

export const analyticsApi = {
  getOverview: () => axiosClient.get('/api/analytics/overview').then((res) => res.data),
  getSummary: (params) => axiosClient.get('/api/analytics/summary', { params }).then((res) => res.data),
  track: (payload) => axiosClient.post('/api/analytics/track', payload).then((res) => res.data),
  contentStats: (params) => axiosClient.get('/api/analytics/content-stats', { params }).then((res) => res.data),
  getProvinceInteractions: () => axiosClient.get('/api/analytics/province-interactions').then((res) => res.data),
};

export default analyticsApi;
