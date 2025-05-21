
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
    BgColor: 'success',
    to: "/servidor",
  },

];

export default sidebarItem;
