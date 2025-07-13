import { paths } from '@/routes/paths';

export const ALUNO_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Alunos', disabled: true },
];

export const ALUNO_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Alunos', disabled: false, href: paths.aluno.list },
  { title: 'Cadastrar', disabled: true },
];

export const ALUNO_TABLE_HEADERS = [
  { title: 'ID', key: 'idAluno' },
  { title: 'Nome', key: 'nome' },
  { title: 'Matrícula', key: 'matricula' },
  { title: 'CPF', key: 'cpf' },
  { title: 'Telefone', key: 'telefone' },
  { title: 'Ações', key: 'actions', sortable: false },
];


