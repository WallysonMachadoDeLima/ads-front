import { paths } from '@/routes/paths';

export const CORPO_DOCENTE_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Corpo Docente', disabled: true },
];

export const CORPO_DOCENTE_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Corpo Docente', disabled: false, href: paths.corpoDocente.list },
  { title: 'Cadastrar', disabled: true },
];

export const CORPO_DOCENTE_TABLE_HEADERS = [
  { title: 'ID', key: 'id' },
  { title: 'Docente', key: 'servidor.nome' },
  { title: 'Disciplina', key: 'disciplina.nome' },
  { title: 'Código', key: 'disciplina.codigo' },
  { title: 'Ações', key: 'actions', sortable: false },
];


