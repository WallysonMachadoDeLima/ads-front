import type { 
  ICreateUpdateTccDto, 
  ITccDto
} from '~/interfaces';
import { api } from '~/services/config-service';

const baseURL = '/api/tcc';

export const tccService = {
  async create(data: ICreateUpdateTccDto): Promise<ITccDto> {
    const response = await api.post<ITccDto>(baseURL, data);
    return response.data;
  },

  async findAll(): Promise<ITccDto[]> {
    const response = await api.get<ITccDto[]>(baseURL);
    return response.data;
  },

  async findOneById(id: number): Promise<ITccDto> {
    const response = await api.get<ITccDto>(`${baseURL}/${id}`);
    return response.data;
  },

  async update(id: number, data: ICreateUpdateTccDto): Promise<ITccDto> {
    const response = await api.put<ITccDto>(`${baseURL}/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${baseURL}/${id}`);
  }
};
