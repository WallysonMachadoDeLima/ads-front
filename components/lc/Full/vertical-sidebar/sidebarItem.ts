
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
    title: 'Menu Level',
    icon: 'double-alt-arrow-down-bold-duotone',
    BgColor: 'secondary',
    to: '#',
    children: [
      {
        title: 'Level 1',
        to: '/auth/404'
      },
      {
        title: 'Level 1',
        to: '/auth/404',
        children: [
          {
            title: 'Level 2',
  
            to: '/auth/404'
          },
          {
            title: 'Level 2',
  
            to: '/auth/404',
            children: [
              {
                title: 'Level 3',
      
                to: '/auth/404'
              },
              {
                title: 'Level 3',
      
                to: '/auth/404'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Disabled',
    icon: 'forbidden-circle-line-duotone',
    BgColor: 'success',
    disabled: true,
    to: '/auth/404'
  },
  {
    title: 'Sub Caption',
    BgColor: 'warning',
    icon: 'square-academic-cap-line-duotone',
    subCaption: 'This is the subtitle',
    to: '/auth/404'
  },
  {
    title: 'Chip',
    icon: 'archive-check-line-duotone',
    chip: '9',
    BgColor: 'error',
    chipColor: 'error',
    chipBgColor: 'error',
    chipVariant: 'flat',
    to: '/auth/404'
  },
  {
    title: 'Outlined',
    icon: 'smile-circle-line-duotone',
    chip: 'outline',
    chipColor: 'indigo',
    chipVariant: 'outlined',
    BgColor: 'indigo',
    to: '/auth/404'
  },
  {
    title: 'External Link',
    icon: 'link-bold-duotone',
    BgColor: 'info',
    to: '/auth/404',
    type: 'external'
  }

];

export default sidebarItem;
