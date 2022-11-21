import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MenuData } from './types/menuTypes';
import {
  CreateMenuItemInput,
  ListMenuItemsForMenuQuery,
  ListMenusForRestaurantQuery
} from '../API';
import MenuService from '../services/MenuService';

const initialState = {
  menuList: [],
  menuItems: [],
  singleMenu: {},
  loading: false
} as MenuData;

export const listMenusForRestaurant = createAsyncThunk(
  'menu/listMenusForRestaurant',
  async (restaurantId: string, { dispatch, rejectWithValue }) => {
    try {
      const response: ListMenusForRestaurantQuery = await MenuService.listMenusForRestaurant(
        restaurantId
      );
      dispatch(setMenuList(response.listMenusForRestaurant.menus));
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const listMenuItemsForMenu = createAsyncThunk(
  'menu/listMenuItemsForMenu',
  async (menuId: string, { dispatch, rejectWithValue }) => {
    try {
      const response: ListMenuItemsForMenuQuery = await MenuService.listMenuItemsForMenu(menuId);
      dispatch(setMenuItems(response.listMenuItemsForMenu.menuItems));
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const deleteMenu = createAsyncThunk(
  'menu/deleteMenu',
  async ({ id, restaurantId }: any, { dispatch, rejectWithValue, getState }: any) => {
    try {
      const response = await MenuService.deleteMenu({ id, restaurantId });
      const menuItems = getState().menu.menuItems;
      menuItems.forEach((element) => {
        dispatch(deleteMenuItem({ menuId: id, id: element.id }));
      });
      dispatch(listMenusForRestaurant(restaurantId));
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const createMenu = createAsyncThunk(
  'menu/createMenu',
  async ({ title, restaurantId, menuStatus }: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await MenuService.createMenu({ title, restaurantId, menuStatus });
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menu/deleteMenuItem',
  async ({ menuId, id }: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await MenuService.deleteMenuItem({ menuId, id });
      dispatch(listMenuItemsForMenu(menuId));
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const getMenuById = createAsyncThunk(
  'menu/getMenuById',
  async ({ id, restaurantId }: any, { dispatch, rejectWithValue }) => {
    try {
      const response: any = await MenuService.getMenuById(id, restaurantId);

      return response.getMenuPerRestaurant;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const createMenuItem = createAsyncThunk(
  'menu/createMenu',
  async (menuItem: CreateMenuItemInput, { dispatch, rejectWithValue }) => {
    try {
      const response = await MenuService.createMenuItem(menuItem);
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuList: (state: any, { payload }: PayloadAction<any>) => {
      state.menuList = payload;
    },
    setMenuItems: (state: any, { payload }: PayloadAction<any>) => {
      state.menuItems = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMenuById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMenuById.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.singleMenu = payload;
    });
  }
});
export const { setMenuList, setMenuItems } = menuSlice.actions;
export default menuSlice.reducer;
