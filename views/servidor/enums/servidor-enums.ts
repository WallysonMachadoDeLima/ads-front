import { paths } from '@/routes/paths';

export const SERVIDOR_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Servidores', disabled: true },
];

export const SERVIDOR_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Servidores', disabled: false, href: paths.servidor.list },
  { title: 'Cadastrar', disabled: true },
];

export const SERVIDOR_TABLE_HEADERS = [
  { title: 'ID', key: 'idServidor' },
  { title: 'Nome', key: 'nome' },
  { title: 'CPF', key: 'cpf' },
  { title: 'Email', key: 'email' },
  { title: 'Tipo', key: 'tipo' },
  { title: 'Ações', key: 'actions', sortable: false },
];
