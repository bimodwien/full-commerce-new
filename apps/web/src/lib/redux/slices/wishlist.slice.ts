import { TWishlist } from '@/models/wishlist.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialWishlist: TWishlist[] = [];

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initialWishlist,
  reducers: {
    // untuk menampilkan seluruh data wishlish setelah fetching
    setFavorite: (state, action: PayloadAction<TWishlist[]>) => {
      return action.payload;
    },
    // untuk nambahin satu item wishlist
    addFavorite: (state, action: PayloadAction<TWishlist>) => {
      if (!state.some((item) => item.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    // untuk menghapus satu item wishlist
    deleteFavorite: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    // untuk menghapus seluruh wishlist
    resetWishlist: (state) => {
      return [];
    },
  },
});

export const { setFavorite, addFavorite, deleteFavorite, resetWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
