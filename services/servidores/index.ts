import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api-ads.ahfwml.live',
});

export const ServidorService = {
  async listar() {
    const response = await api.get('/servidor');
    return response.data;
  },

  async cadastrar(payload: any) {
    return api.post('/servidor', payload);
  },
};
