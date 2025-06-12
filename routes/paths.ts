export const paths = {
  dashboard: '/',
  servidor: {
    list: '/servidor',
    new: '/servidor/views/servidor-new',
    edit: (id: string | number) => `/servidor/views/${id}/edit`,
    view: (id: string | number) => `/servidor/views/${id}/viewer`,
  },
  corpoDocente: {
    list: '/corpo-docente',
    new: '/corpo-docente/views/corpo-docente-new',
    edit: (id: string | number) => `/corpo-docente/views/${id}/edit`,
    view: (id: string | number) => `/corpo-docente/views/${id}/viewer`,
  },
  aluno: {
    list: '/aluno',
    new: '/aluno/views/aluno-new',
    edit: (id: string | number) => `/aluno/views/${id}/edit`,
    view: (id: string | number) => `/aluno/views/${id}/viewer`,
  }
};
