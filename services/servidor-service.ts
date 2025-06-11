import { api } from './config-service';

export const ServidorService = {

  async create(payload: any) {
    return api.post('/servidor', payload);
  },

  async findAll() {
    const response = await api.get('/servidor');
    return response.data;
  },

  async findOneById(id: number) {
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
