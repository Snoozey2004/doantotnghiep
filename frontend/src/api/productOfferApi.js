import axiosClient from './axiosClient';

export const productOfferApi = {
    // Admin / User fetching
    getOffersByProduct: async (productId) => {
        const response = await axiosClient.get(`/api/productoffers/product/${productId}`);
        return response.data;
    },

    // Seller fetching
    getOffersBySeller: async (sellerId) => {
        const response = await axiosClient.get(`/api/productoffers/seller/${sellerId}`);
        return response.data;
    },

    getOffer: async (id) => {
        const response = await axiosClient.get(`/api/productoffers/${id}`);
        return response.data;
    },

    // Seller management
    createOffer: async (offerData) => {
        const response = await axiosClient.post('/api/productoffers', offerData);
        return response.data;
    },

    updateOffer: async (id, offerData) => {
        const response = await axiosClient.put(`/api/productoffers/${id}`, offerData);
        return response.data;
    },

    deleteOffer: async (id) => {
        const response = await axiosClient.delete(`/api/productoffers/${id}`);
        return response.data;
    }
};
