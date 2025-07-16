export const paths = {
  dashboard: '/',
  servidor: {
    list: '/servidor',
    new: '/servidor/new/',
    edit: (id: string | number) => `/servidor/${id}/edit`,
    view: (id: string | number) => `/servidor/${id}/viewer`,
  },
  corpoDocente: {
    list: '/corpo-docente',
    new: '/corpo-docente/new/',
    edit: (id: string | number) => `/corpo-docente/${id}/edit`,
    view: (id: string | number) => `/corpo-docente/${id}/viewer`,
  },
  aluno: {
    list: '/aluno',
    new: '/aluno/new/',
    edit: (id: string | number) => `/aluno/${id}/edit`,
    view: (id: string | number) => `/aluno/${id}/viewer`,
  },
  disciplina: {
    list: '/disciplina',
    new: '/disciplina/new/',
    edit: (id: string | number) => `/disciplina/${id}/edit`,
    view: (id: string | number) => `/disciplina/${id}/viewer`,
  },
  matrizCurricular: {
    list: '/matriz-curricular',
    new: '/matriz-curricular/new/',
    edit: (id: string | number) => `/matriz-curricular/${id}/edit`,
    view: (id: string | number) => `/matriz-curricular/${id}/viewer`,
  },
  tcc: {
    list: '/tcc',
    new: '/tcc/new/',
    edit: (id: string | number) => `/tcc/${id}/edit`,
    view: (id: string | number) => `/tcc/${id}/viewer`,
  },
  documento: {
    list: '/documento',
    new: '/documento/new/',
    edit: (id: string | number) => `/documento/${id}/edit`,
    view: (id: string | number) => `/documento/${id}/viewer`,
  }
};
