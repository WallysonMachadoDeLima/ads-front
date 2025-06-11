export interface ICorpoDocenteNewEditDto {
    servidorId: number;
    disciplina: number;
}

export interface ICorpoDocenteFindAllDto {
    id: number;
    servidor:
    {
        idServidor: number;
        nome: string;
    }

    disciplina: number;
}

export interface ICorpoDocenteFindOneByIdDto {
    id: number;
    servidor: {
        idServidor: number;
        nome: string;
        cpf: string;
        email: string;
        senha: string;
        tipo: string;
    };
    disciplina?: number;
}