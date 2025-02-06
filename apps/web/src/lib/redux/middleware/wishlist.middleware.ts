import { Dispatch } from '@reduxjs/toolkit';
import { axiosInstance } from '@/lib/axios';
import {
  setFavorite,
  addFavorite,
  deleteFavorite,
} from '../slices/wishlist.slice';
import { TWishlist } from '@/models/wishlist.model';

export const fetchFavorite = () => async (dispatch: Dispatch) => {
  try {
    const response = await axiosInstance().get('/wishlists');
    const wishlist: TWishlist[] = response.data.wishlist.data;
    dispatch(setFavorite(wishlist));
  } catch (error) {
    console.log(error);
  }
};

export const addWishlist = (productId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance().post('/wishlists', { productId });
      const wishlistItem = response.data.wishlist as TWishlist;
      dispatch(addFavorite(wishlistItem));
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };
};

export const removeWishlist = (wishlistItemId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await axiosInstance().delete(`/wishlists/${wishlistItemId}`);
      dispatch(deleteFavorite(wishlistItemId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };
};
