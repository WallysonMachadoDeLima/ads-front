import type { 
  ICreateUpdateMatrizCurricularDto, 
  IMatrizCurricularDto
} from '~/interfaces';
import { api } from '~/services/config-service';

export const matrizCurricularService = {
  async create(data: ICreateUpdateMatrizCurricularDto): Promise<IMatrizCurricularDto> {
    const response = await api.post('/api/matrizcurricular', data);
    return response.data;
  },

  async findAll(): Promise<IMatrizCurricularDto[]> {
    const response = await api.get('/api/matrizcurricular');
    return response.data;
  },

  async findOneById(id: number): Promise<IMatrizCurricularDto> {
    const response = await api.get(`/api/matrizcurricular/${id}`);
    return response.data;
  },

  async update(id: number, data: ICreateUpdateMatrizCurricularDto): Promise<IMatrizCurricularDto> {
    const response = await api.put(`/api/matrizcurricular/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/matrizcurricular/${id}`);
  }
};
