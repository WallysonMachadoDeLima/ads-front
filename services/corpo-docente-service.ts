
import type { ICorpoDocenteFindAllDto, ICorpoDocenteFindOneByIdDto, ICorpoDocenteNewEditDto } from '~/interfaces';
import { api } from './config-service';


export const CorpoDocenteService = {

  async create(payload: ICorpoDocenteNewEditDto): Promise<void> {
    return api.post('/corpo-doscente', payload);
  },

  async findAll(): Promise<ICorpoDocenteFindAllDto[]> {
    const response = await api.get('/corpo-doscente');
    return response.data;
  },


  async findOneById(id: number): Promise<ICorpoDocenteFindOneByIdDto> {
    const response = await api.get(`/corpo-doscente/${id}`);
    return response.data;
  },

  async update(id: number, payload: ICorpoDocenteNewEditDto): Promise<void> {
    return api.put(`/corpo-doscente/${id}`, payload);
  },

  async delete(id: number): Promise<void> {
    return api.delete(`/corpo-doscente/${id}`);
  },
};
