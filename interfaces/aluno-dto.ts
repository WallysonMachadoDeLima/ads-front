export interface IAlunoFindOneByIdDto {
  aluno: {
    id: number;
    nome: string;
    cpf: string;
    email: string;
  };
  disciplina: string;
}