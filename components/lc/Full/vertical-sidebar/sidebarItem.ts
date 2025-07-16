import { paths } from "~/routes/paths";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  BgColor?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Starterkit' },
  {
    title: "Sample Page",
    icon: 'screencast-2-linear',
    BgColor: 'primary',
    to: "/",
  },

  { header: 'Others' },
  {
    title: 'Servidor',
    icon: 'square-academic-cap-line-duotone',
    BgColor: 'primary',
    to: paths.servidor.list,
  },
  {
    title: 'Corpo Docente',
    icon: 'notebook-outline',
    BgColor: 'primary',
    to: paths.corpoDocente.list,
  },
  {
    title: 'Aluno',
    icon: 'user-bold',
    BgColor: 'primary',
    to: paths.aluno.list,
  },
  {
    title: 'Disciplina',
    icon: 'book-outline',
    BgColor: 'primary',
    to: paths.disciplina.list,
  },
  {
    title: 'Matriz Curricular',
    icon: 'widget-6-outline',
    BgColor: 'primary',
    to: paths.matrizCurricular.list,
  },
  {
    title: 'TCC',
    icon: 'document-text-outline',
    BgColor: 'primary',
    to: paths.tcc.list,
  },
  {
    title: 'Documento',
    icon: 'file-text-outline',
    BgColor: 'primary',
    to: paths.documento.list,
  },
];

export default sidebarItem;
