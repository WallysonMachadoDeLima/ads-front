export interface ICreateUpdateAlunoDto {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  matricula: string;
  dataNascimento: string;
  sexo: string; // API espera string
  periodo: string; // API espera string
  situacao: string; // API espera string
  idAluno?: number;
}

export interface IAlunoDto {
  idAluno: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  matricula: string;
  dataNascimento: string;
  sexo: string; // API retorna string
  periodo: string; // API retorna string
  situacao: string; // API retorna string
}

export interface IAlunoFindOneByIdDto {
  lazyLoader: Record<string, unknown>;
  idAluno: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  matricula: string;
  dataNascimento: string;
  sexo: number;
  periodo: number;
  situacao: number;
}