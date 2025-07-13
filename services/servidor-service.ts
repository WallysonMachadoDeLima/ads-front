import { api } from './config-service';
import type { ICreateUpdateServidorDto, IServidorDto } from '~/interfaces';

export const ServidorService = {

  async create(payload: ICreateUpdateServidorDto): Promise<IServidorDto> {
    const response = await api.post('/servidor', payload);
    return response.data;
  },

  async findAll(): Promise<IServidorDto[]> {
    const response = await api.get('/servidor');
    return response.data;
  },

  async findOneById(id: number): Promise<IServidorDto> {
    const response = await api.get(`/servidor/${id}`);
    return response.data;
  },

  async update(id: number, payload: ICreateUpdateServidorDto): Promise<IServidorDto> {
    const response = await api.put(`/servidor/${id}`, payload);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/servidor/${id}`);
  },
};
