import { paths } from '@/routes/paths';

export const DISCIPLINA_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Disciplinas', disabled: true },
];

export const DISCIPLINA_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Disciplinas', disabled: false, href: paths.disciplina.list },
  { title: 'Cadastrar', disabled: true },
];

export const DISCIPLINA_TABLE_HEADERS = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'Código', key: 'codigo' },
  { title: 'Descrição', key: 'descricao' },
  { title: 'Ações', key: 'actions', sortable: false },
];
