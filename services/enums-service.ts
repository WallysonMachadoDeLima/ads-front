import { api } from './config-service';

export interface IEnumItem {
  name: string;
  value: number;
  description: string;
}

export interface IEnumsResponse {
  ServidorTipo: IEnumItem[];
  TccStatus: IEnumItem[];
}

export const EnumsService = {
  async getAll(): Promise<IEnumsResponse> {
    const response = await api.get('/enums');
    return response.data;
  },

  async getServidorTipos(): Promise<IEnumItem[]> {
    const response = await api.get('/enums');
    return response.data.ServidorTipo;
  },

  async getTccStatus(): Promise<IEnumItem[]> {
    const response = await api.get('/enums');
    return response.data.TccStatus;
  },
};
