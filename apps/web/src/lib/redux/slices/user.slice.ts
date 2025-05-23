import { TUser } from '@/models/user.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';

const initialUser = {
  id: '',
  name: '',
  username: '',
  email: '',
  role: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'auth',
  initialState: initialUser as TUser,
  reducers: {
    login: (state, action: PayloadAction<TUser>) => {
      return {
        ...state,
        id: action.payload.id || 'NO_ID',
        name: action.payload.name || 'NO_NAME',
        username: action.payload.username || 'NO_USERNAME',
        email: action.payload.email || 'NO_EMAIL',
        role: action.payload.role || 'NO_ROLE',
        password: action.payload.password || 'NO_PASSWORD',
      };
    },

    logout: (state) => {
      deleteCookie('access_token');
      deleteCookie('refresh_token');
      state.id = '';
      state.name = '';
      state.username = '';
      state.email = '';
      state.password = '';
      state.role = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
