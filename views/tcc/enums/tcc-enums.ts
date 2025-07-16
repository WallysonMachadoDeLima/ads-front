import { paths } from '@/routes/paths';

export const TCC_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'TCCs', disabled: true },
];

export const TCC_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'TCCs', disabled: false, href: paths.tcc.list },
  { title: 'Cadastrar', disabled: true },
];

export const TCC_TABLE_HEADERS = [
  { title: 'ID', key: 'id' },
  { title: 'Título Provisório', key: 'tituloProvisorio' },
  { title: 'Aluno', key: 'aluno' },
  { title: 'Orientador', key: 'orientador' },
  { title: 'Período', key: 'periodo' },
  { title: 'Status', key: 'status' },
  { title: 'Ações', key: 'actions', sortable: false },
];

export const TCC_STATUS_OPTIONS = [
  { value: 0, title: 'Em Elaboração' },
  { value: 1, title: 'Aguardando Aprovação' },
  { value: 2, title: 'Aprovado' },
  { value: 3, title: 'Rejeitado' },
  { value: 4, title: 'Em Defesa' },
  { value: 5, title: 'Defendido' },
];

export const getStatusText = (status: number): string => {
  const statusOption = TCC_STATUS_OPTIONS.find(option => option.value === status);
  return statusOption ? statusOption.title : 'Status Desconhecido';
};

export const getStatusColor = (status: number): string => {
  switch (status) {
    case 0: return 'orange'; // Em Elaboração
    case 1: return 'blue'; // Aguardando Aprovação
    case 2: return 'green'; // Aprovado
    case 3: return 'red'; // Rejeitado
    case 4: return 'purple'; // Em Defesa
    case 5: return 'teal'; // Defendido
    default: return 'grey';
  }
};
