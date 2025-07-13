export interface ICreateUpdateAlunoDto {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  matricula: string;
  idAluno?: number;
}

export interface IAlunoDto {
  idAluno: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  matricula: string;
}

export interface IAlunoFindOneByIdDto {
  lazyLoader: Record<string, unknown>;
  idAluno: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  matricula: string;
}