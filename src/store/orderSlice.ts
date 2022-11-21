import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { OrderData } from './types/orderTypes';
import {
  CreateOrderInput,
  ListOrdersForRestaurantQuery,
  ListRestaurantOrdersByStatusQuery,
  OrderStatus,
  ListOrdersForUserQuery,
  GetOrderQuery
} from '../API';
import OrderService from '../services/OrderService';

const initialState = {
  orderList: [],
  singleOrder: {},
  loading: false
} as OrderData;

export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (orderId: string, { dispatch, rejectWithValue }) => {
    try {
      const response: GetOrderQuery = await OrderService.getOrderById(orderId);
      dispatch(setSingleOrder(response.getOrder));
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);
export const listRestaurantOrdersByStatus = createAsyncThunk(
  'order/listRestaurantOrdersByStatus',
  async ({ restaurantId, orderStatus }: any, { dispatch, rejectWithValue }) => {
    try {
      const response: ListRestaurantOrdersByStatusQuery =
        await OrderService.listRestaurantOrdersByStatus(restaurantId, orderStatus);
      dispatch(setOrderList(response.listRestaurantOrdersByStatus.orders));
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);
export const listOrdersForUser = createAsyncThunk(
  'order/listOrdersForUser',
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      const response: ListOrdersForUserQuery = await OrderService.listOrdersForUser(userId);
      dispatch(setOrderList(response.listOrdersForUser.orders));
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const listOrdersForRestaurant = createAsyncThunk(
  'order/listOrdersForRestaurant',
  async (restaurantId: string, { dispatch, rejectWithValue }) => {
    try {
      const response: ListOrdersForRestaurantQuery = await OrderService.listOrdersForRestaurant(
        restaurantId
      );
      dispatch(setOrderList(response.listOrdersForRestaurant.orders));
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order: CreateOrderInput, { dispatch, rejectWithValue }) => {
    try {
      console.log('order', order);

      const response = await OrderService.createOrder(order);
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async (orderStatus: OrderStatus, { dispatch, rejectWithValue, getState }: any) => {
    try {
      const singleOrder = getState().order.singleOrder;
      const response: any = await OrderService.updateOrder({ ...singleOrder, orderStatus });
      dispatch(setSingleOrder(response.updateOrder));
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderList: (state: any, { payload }: PayloadAction<any>) => {
      state.orderList = payload;
    },
    setSingleOrder: (state: any, { payload }: PayloadAction<any>) => {
      state.singleOrder = payload;
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(listRestaurants.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(listRestaurants.fulfilled, (state) => {
    //   state.loading = false;
    // });
    // builder.addCase(listRestaurants.rejected, (state, { payload }: PayloadAction<any>) => {
    //   state.status = payload.errorMessage;
    //   state.loading = false;
    // });
  }
});
export const { setOrderList, setSingleOrder } = orderSlice.actions;
export default orderSlice.reducer;
