export interface ICreateUpdateTccDto {
  alunoId: number;
  tituloProvisorio: string;
  resumo: string;
  areaTematica: string;
  orientadorId: number;
  coorientadorId?: number;
  arquivoProposta?: string;
  periodo: string;
  dataPrevistaDefesa: string;
  status: number;
  observacoes?: string;
}

export interface ITccDto {
  id: number;
  alunoId: number;
  tituloProvisorio: string;
  resumo: string;
  areaTematica: string;
  orientadorId: number;
  coorientadorId?: number;
  arquivoProposta?: string;
  periodo: string;
  dataPrevistaDefesa: string;
  status: number;
  dataSubmissao: string;
  dataAprovacao?: string;
  observacoes?: string;
  // Relacionamentos opcionais para exibição
  aluno?: {
    id: number;
    nome: string;
    email: string;
  };
  orientador?: {
    id: number;
    nome: string;
    email: string;
  };
  coorientador?: {
    id: number;
    nome: string;
    email: string;
  };
}
