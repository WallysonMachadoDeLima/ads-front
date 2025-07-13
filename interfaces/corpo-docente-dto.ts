export interface ICorpoDocenteNewEditDto {
    servidorId: number;
    disciplinaId: number;
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
}