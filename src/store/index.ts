import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import restaurantReducer from './restaurantSlice';
import menuReducer from './menuSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    restaurant: restaurantReducer,
    menu: menuReducer,
    order: orderReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
