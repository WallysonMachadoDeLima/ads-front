export interface ICreateUpdateServidorDto {
  nome: string;
  cpf: string;
  email: string;
  senha?: string;
  tipo: number; // Mudando para number
  idServidor?: number;
}

export interface IServidorDto {
  idServidor: number;
  nome: string;
  cpf: string;
  email: string;
  tipo: number; // Mudando para number
}