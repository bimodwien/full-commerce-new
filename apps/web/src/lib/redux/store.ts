import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user.slice';
import wishlistSlice from './slices/wishlist.slice';
import cartSlice from './slices/cart.slice';

const reducer = combineReducers({
  auth: userSlice,
  wishlist: wishlistSlice,
  cart: cartSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
