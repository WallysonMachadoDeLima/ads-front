export interface ICreateUpdateMatrizCurricularDto {
  nome: string;
  ano: number;
  disciplinaIds: number[];
  observacao: string; // Campo obrigatório conforme API
}

export interface IMatrizCurricularDto {
  id: number;
  nome: string;
  ano: number;
  observacao: string;
  disciplinas: {
    id: number;
    nome: string;
    codigo: string;
    descricao: string;
    objetivos: string;
    conteudo: string;
  }[];
}

export interface IMatrizCurricularFindAllDto {
  id: number;
  nome: string;
  ano: number;
  observacao: string;
  disciplinas: {
    id: number;
    nome: string;
    codigo: string;
    descricao: string;
    objetivos: string;
    conteudo: string;
  }[];
}

export interface IMatrizCurricularFindOneByIdDto {
  id: number;
  nome: string;
  ano: number;
  observacao: string;
  disciplinas: {
    id: number;
    nome: string;
    codigo: string;
    descricao: string;
    objetivos: string;
    conteudo: string;
  }[];
}
