import { api } from './config-service';
import type { ICreateUpdateAlunoDto, IAlunoDto } from '~/interfaces';

export const AlunoService = {

  async create(payload: ICreateUpdateAlunoDto): Promise<IAlunoDto> {
    const response = await api.post('/aluno', payload);
    return response.data;
  },

  async findAll(): Promise<IAlunoDto[]> {
    const response = await api.get('/aluno');
    return response.data;
  },

  async findOneById(id: number): Promise<IAlunoDto> {
    const response = await api.get(`/aluno/${id}`);
    return response.data;
  },

  async update(id: number, payload: ICreateUpdateAlunoDto): Promise<IAlunoDto> {
    const response = await api.put(`/aluno/${id}`, payload);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/aluno/${id}`);
  },
};
