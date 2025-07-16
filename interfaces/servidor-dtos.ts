export interface ICreateUpdateServidorDto {
  nome: string;
  cpf: string;
  email: string;
  senha?: string;
  tipo: number;
  dataNascimento: string; // formato YYYY-MM-DD
  sexo: number; // enum de sexo
  situacao: number; // enum de situação
  idServidor?: number;
}

export interface IServidorDto {
  idServidor: number;
  nome: string;
  cpf: string;
  email: string;
  tipo: number;
  dataNascimento: string;
  sexo: string; // API retorna string
  situacao: string; // API retorna string
}