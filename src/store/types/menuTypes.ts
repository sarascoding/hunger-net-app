import { Menu, MenuItem } from '../../API';

export type MenuData = {
  menuList: Menu[];
  singleMenu: Menu;
  menuItems: MenuItem[];
  loading: boolean;
};
