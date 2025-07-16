import { api } from './config-service';

export interface IEnumItem {
  name: string;
  value: number;
  description: string;
}

export interface IEnumsResponse {
  ServidorTipo: IEnumItem[];
  TccStatus: IEnumItem[];
  TipoContrato: IEnumItem[];
  Sexo: IEnumItem[];
  Situacao: IEnumItem[];
  Turno: IEnumItem[];
  Periodo: IEnumItem[];
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

  async getTipoContrato(): Promise<IEnumItem[]> {
    const response = await api.get('/enums');
    return response.data.TipoContrato;
  },

  async getSexo(): Promise<IEnumItem[]> {
    const response = await api.get('/enums');
    return response.data.Sexo;
  },

  async getSituacao(): Promise<IEnumItem[]> {
    const response = await api.get('/enums');
    return response.data.Situacao;
  },

  async getTurno(): Promise<IEnumItem[]> {
    const response = await api.get('/enums');
    return response.data.Turno;
  },

  async getPeriodo(): Promise<IEnumItem[]> {
    const response = await api.get('/enums');
    return response.data.Periodo;
  },
};
