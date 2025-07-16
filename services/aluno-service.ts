import { api } from './config-service';
import type { ICreateUpdateAlunoDto, IAlunoDto } from '~/interfaces';

export const AlunoService = {

  async create(payload: ICreateUpdateAlunoDto): Promise<IAlunoDto> {
    const response = await api.post('/api/aluno', payload);
    return response.data;
  },

  async findAll(): Promise<IAlunoDto[]> {
    const response = await api.get('/api/aluno');
    return response.data;
  },

  async findOneById(id: number): Promise<IAlunoDto> {
    const response = await api.get(`/api/aluno/${id}`);
    return response.data;
  },

  async update(id: number, payload: ICreateUpdateAlunoDto): Promise<IAlunoDto> {
    const response = await api.put(`/api/aluno/${id}`, payload);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/aluno/${id}`);
  },
};
