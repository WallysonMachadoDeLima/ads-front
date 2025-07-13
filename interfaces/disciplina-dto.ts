export interface IDisciplinaDto {
  id: number;
  nome: string;
  codigo: string;
  descricao: string;
  objetivos: string;
  conteudo: string;
}

export interface ICreateUpdateDisciplinaDto {
  nome: string;
  codigo: string;
  descricao: string;
  objetivos: string;
  conteudo: string;
}
