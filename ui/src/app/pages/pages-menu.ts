import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Projects',
    icon: 'grid-outline',
    link: '/pages/project',
    home: false,
  },
  {
    title: 'Issues',
    icon: 'cube-outline',
    link: '/pages/issue',
    home: false,
  },
];
