import { Dispatch } from '@reduxjs/toolkit';
import { axiosInstance } from '@/lib/axios';
import {
  setCart,
  addOrUpdateCartItem,
  updateQuantity,
  removeCartItem,
} from '../slices/cart.slice';
import { TCart } from '@/models/cart.model';

export const fetchCart = () => async (dispatch: Dispatch) => {
  try {
    const response = await axiosInstance().get('/carts');
    const cartData = response.data.carts.data as TCart[];
    dispatch(setCart(cartData));
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

export const addToCart = (productId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axiosInstance().post('/carts', {
      productId,
    });
    const cartItem = response.data.cart as TCart;
    dispatch(addOrUpdateCartItem(cartItem));
  } catch (error) {
    console.error('Error adding to Cart: ', error);
  }
};

export const updateCart =
  (id: string, quantity: number) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance().patch(`/carts/${id}`, {
        quantity,
      });
      const updateCartItem = response.data.cart as TCart;
      dispatch(
        updateQuantity({
          id: updateCartItem.id,
          quantity: updateCartItem.quantity,
        }),
      );
    } catch (error) {
      console.error('Error Updating cart quantity: ', error);
    }
  };

export const deleteCartItem = (id: string) => async (dispatch: Dispatch) => {
  try {
    await axiosInstance().delete(`/carts/${id}`);
    dispatch(removeCartItem(id));
  } catch (error) {
    console.error('Error removing item from cart: ', error);
  }
};
