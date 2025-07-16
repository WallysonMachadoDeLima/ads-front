export interface IDocumentoDto {
  id: number;
  nome: string;
  descricao: string;
  url: string;
}

export interface ICreateUpdateDocumentoDto {
  nome: string;
  descricao: string;
  url: string;
}
