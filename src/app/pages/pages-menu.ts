import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  
  {
    title: 'Login',
    icon: 'lock-outline',
    link: '/pages/seguridad/login',
    home: true,
  },
  {
    title: 'Autor',
    icon: 'person-outline',
    link: '/pages/autor/listar',
    home: true,
  },
  {
    title: 'Publicacion',
    icon: 'book-outline', 
    link: '/pages/publicacion/listar',
  },
  {
    title: 'Tipo Publicacion',
    icon: 'file-text-outline',
    link: '/pages/tipopublicacion/listar',
  },
  {
    title: 'Autor Publicacion',
    icon: 'people-outline', 
    link: '/pages/autorpublicacion/listar',
  },
];
