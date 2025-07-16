import { paths } from '@/routes/paths';

export const DOCUMENTO_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Documentos', disabled: true },
];

export const DOCUMENTO_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Documentos', disabled: false, href: paths.documento.list },
  { title: 'Cadastrar', disabled: true },
];

export const DOCUMENTO_TABLE_HEADERS = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'Descrição', key: 'descricao' },
  { title: 'URL', key: 'url' },
  { title: 'Ações', key: 'actions', sortable: false },
];
