import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api-ads.ahfwml.live',
});

export const ServidorService = {
  async index() {
    const response = await api.get('/corpo-docente');
    return response.data;
  },

  async create(payload: any) {
    return api.post('/corpo-docente', payload);
  },

  async show(id: number) {
    const response = await api.get(`/corpo-docente/${id}`);
    return response.data;
  },

  async update(id: number, payload: any) {
    return api.put(`/corpo-docente/${id}`, payload);
  },
  
  async delete(id: number) {
    return api.delete(`/corpo-docente/${id}`);
  },
};
