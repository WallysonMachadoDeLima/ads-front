import { paths } from '@/routes/paths';

export const MATRIZ_CURRICULAR_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Matrizes Curriculares', disabled: true },
];

export const MATRIZ_CURRICULAR_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Matrizes Curriculares', disabled: false, href: paths.matrizCurricular.list },
  { title: 'Cadastrar', disabled: true },
];

export const MATRIZ_CURRICULAR_TABLE_HEADERS = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'Ano', key: 'ano' },
  { title: 'Disciplinas', key: 'disciplinas' },
  { title: 'Ações', key: 'actions', sortable: false },
];
