import { api } from './config-service';
import type { IDisciplinaDto, ICreateUpdateDisciplinaDto } from '~/interfaces';

export const disciplinaService = {
  async create(payload: ICreateUpdateDisciplinaDto): Promise<IDisciplinaDto> {
    const response = await api.post('/disciplina', payload);
    return response.data;
  },

  async findAll(): Promise<IDisciplinaDto[]> {
    const response = await api.get('/disciplina');
    return response.data;
  },

  async getById(id: number): Promise<IDisciplinaDto> {
    const response = await api.get(`/disciplina/${id}`);
    return response.data;
  },

  async update(id: number, payload: ICreateUpdateDisciplinaDto): Promise<IDisciplinaDto> {
    const response = await api.put(`/disciplina/${id}`, payload);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/disciplina/${id}`);
  }
};
