import { API, graphqlOperation } from 'aws-amplify';
import {
  CreateMenuInput,
  UpdateMenuInput,
  DeleteMenuInput,
  CreateMenuItemInput,
  //   UpdateMenuItemInput,
  DeleteMenuItemInput,
  Menu,
  MenuItem,
  ListMenuItemsForMenuQuery,
  ListMenusForRestaurantQuery
} from '../API';
import {
  createMenu,
  //   updateMenu,
  deleteMenu,
  createMenuItem,
  //   updateMenuItem,
  deleteMenuItem
} from '../graphql/mutations';
import {
  listMenusForRestaurant,
  listMenuItemsForMenu,
  getMenuPerRestaurant
} from '../graphql/queries';

class MenuService {
  async getMenuById(id: string, restaurantId: string): Promise<Menu> {
    try {
      const response: { data: Menu } = (await API.graphql(
        graphqlOperation(getMenuPerRestaurant, {
          id,
          restaurantId
        })
      )) as { data: Menu };
      return response.data;
    } catch (error) {
      console.log('Error executing getMenuById', error);
      throw error;
    }
  }
  async listMenusForRestaurant(restaurantId: string): Promise<ListMenusForRestaurantQuery> {
    try {
      const response: { data: ListMenusForRestaurantQuery } = (await API.graphql(
        graphqlOperation(listMenusForRestaurant, {
          restaurantId,
          num: 10
        })
      )) as {
        data: ListMenusForRestaurantQuery;
      };

      return response.data;
    } catch (error) {
      console.log('Error executing listMenusForRestaurant', error);
      throw error;
    }
  }
  async listMenuItemsForMenu(menuId: string): Promise<ListMenuItemsForMenuQuery> {
    try {
      const response: { data: ListMenuItemsForMenuQuery } = (await API.graphql(
        graphqlOperation(listMenuItemsForMenu, {
          menuId: menuId,
          num: 10
        })
      )) as {
        data: ListMenuItemsForMenuQuery;
      };
      return response.data;
    } catch (error) {
      console.log('Error executing ListMenuItemsForMenuQuery', error);
      throw error;
    }
  }
  async createMenu(menu): Promise<Menu> {
    try {
      const response: { data: Menu } = (await API.graphql(
        graphqlOperation(createMenu, {
          input: {
            ...menu,
            publishDate: new Date().toISOString()
          }
        })
      )) as { data: Menu };
      return response.data;
    } catch (error) {
      console.log('Error executing createMenu', error);
      throw error;
    }
  }
  async deleteMenu({ id, restaurantId }: DeleteMenuInput): Promise<Menu> {
    try {
      console.log('DeleteMenuInput', id);

      const response: { data: Menu } = (await API.graphql(
        graphqlOperation(deleteMenu, {
          input: {
            id: id,
            restaurantId
          }
        })
      )) as { data: Menu };
      return response.data;
    } catch (error) {
      console.log('Error executing deleteMenu', error);
      throw error;
    }
  }
  async createMenuItem(menuItem: CreateMenuItemInput): Promise<MenuItem> {
    try {
      const response: { data: MenuItem } = (await API.graphql(
        graphqlOperation(createMenuItem, {
          input: {
            ...menuItem
          }
        })
      )) as { data: MenuItem };
      return response.data;
    } catch (error) {
      console.log('Error executing createMenuItem', error);
      throw error;
    }
  }
  async deleteMenuItem(menuItem: DeleteMenuItemInput): Promise<MenuItem> {
    try {
      console.log('DeleteMenuItemInput,', menuItem);

      const response: { data: MenuItem } = (await API.graphql(
        graphqlOperation(deleteMenuItem, {
          input: {
            ...menuItem
          }
        })
      )) as { data: MenuItem };
      return response.data;
    } catch (error) {
      console.log('Error executing deleteMenuItem', error);
      throw error;
    }
  }
}
export default new MenuService();
