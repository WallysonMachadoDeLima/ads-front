import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api-ads.ahfwml.live',
});

export const ServidorService = {
  async index() {
    const response = await api.get('/servidor');
    return response.data;
  },

  async creat(payload: any) {
    return api.post('/servidor', payload);
  },

  async show(id: number) {
    const response = await api.get(`/servidor/${id}`);
    return response.data;
  },

  async update(id: number, payload: any) {
    return api.put(`/servidor/${id}`, payload);
  },
  
  async delete(id: number) {
    return api.delete(`/servidor/${id}`);
  },
};
