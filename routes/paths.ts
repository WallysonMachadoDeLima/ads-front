export const PATHS = {
  dashboard: '/',
  servidor:{
    root: '/servidor',
    new: '/servidor/views/servidor-new',
    edit: (id: string | number) => `/servidor/views/${id}/edit`,
    view: (id: string | number) => `/servidor/views/${id}/viewer`,
  }
};
