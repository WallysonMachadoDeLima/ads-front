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
  
  async delete(id: number) {
    return api.delete(`/servidor/${id}`);
  },
};
