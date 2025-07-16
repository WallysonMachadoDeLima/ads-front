export interface ICorpoDocenteNewEditDto {
    servidorId: number;
    disciplinaId: number;
    turno: string; // string para API
    cargaHorariaSemanal: string; // ex: "20h", "40h"
    tipoContrato: number; // enum de tipo contrato
    observacoes: string;
    situacao: string; // string para API
}

export interface ICorpoDocenteFindAllDto {
    id: number;
    disciplinaId: number;
    disciplina: {
        id: number;
        nome: string;
        codigo: string;
        descricao: string;
        objetivos: string;
        conteudo: string;
    };
    servidorId: number;
    servidor: {
        id: number;
        nome: string;
        cpf: string;
        email: string;
        senha: string;
        tipo: number;
    };
    turno: string; // API retorna string
    cargaHorariaSemanal: string;
    tipoContrato: number;
    observacoes: string;
    situacao: string; // API retorna string
}

export interface ICorpoDocenteFindOneByIdDto {
    id: number;
    disciplinaId: number;
    disciplina: {
        id: number;
        nome: string;
        codigo: string;
        descricao: string;
        objetivos: string;
        conteudo: string;
    };
    servidorId: number;
    servidor: {
        id: number;
        nome: string;
        cpf: string;
        email: string;
        senha: string;
        tipo: number;
    };
    turno: string; // API retorna string
    cargaHorariaSemanal: string;
    tipoContrato: number;
    observacoes: string;
    situacao: string; // API retorna string
}