import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RestaurantData } from './types/restaurantTypes';
import { ListRestaurantsQuery, Restaurant } from '../API';
import RestaurantService from '../services/RestaurantService';

const initialState = {
  restaurantList: null,
  restaurant: {},
  loading: false,
  status: ''
} as RestaurantData;

export const listRestaurants = createAsyncThunk(
  'restaurant/listRestaurants',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { listRestaurants }: ListRestaurantsQuery = await RestaurantService.listRestaurants();

      dispatch(setRestaurantList(listRestaurants.restaurants));
      return listRestaurants;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const deleteRestaurant = createAsyncThunk(
  'restaurant/deleteRestaurant',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await RestaurantService.deleteRestaurant(id);
      dispatch(listRestaurants());
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const getRestaurantById = createAsyncThunk(
  'restaurant/getRestaurantById',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await RestaurantService.getRestaurantById(id);
      dispatch(setRestaurant(response));
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const createRestaurant = createAsyncThunk(
  'restaurant/createRestaurant',
  async (name: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await RestaurantService.createRestaurant({ name: name });
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurantList: (state: any, { payload }: PayloadAction<ListRestaurantsQuery>) => {
      state.restaurantList = payload;
    },
    setRestaurant: (state: any, { payload }: PayloadAction<any>) => {
      state.restaurant = payload.getRestaurant;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(listRestaurants.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listRestaurants.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(listRestaurants.rejected, (state, { payload }: PayloadAction<any>) => {
      state.status = payload.errorMessage;
      state.loading = false;
    });
  }
});
export const { setRestaurantList, setRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
