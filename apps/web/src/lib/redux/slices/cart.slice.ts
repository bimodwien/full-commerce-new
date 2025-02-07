import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCart } from '@/models/cart.model';

const initialCart: TCart[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    setCart: (state, action: PayloadAction<TCart[]>) => {
      return action.payload;
    },

    addOrUpdateCartItem: (state, action: PayloadAction<TCart>) => {
      const index = state.findIndex(
        (item) => item.productId === action.payload.productId,
      );
      if (index !== -1) {
        state[index].quantity = action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        state[index].quantity = quantity;
      }
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state = [];
    },
  },
});

export const {
  setCart,
  addOrUpdateCartItem,
  updateQuantity,
  removeCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
