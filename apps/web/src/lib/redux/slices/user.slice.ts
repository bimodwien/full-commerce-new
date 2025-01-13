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
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.password = action.payload.password;
      return state;
    },
    logout: (state) => {
      deleteCookie('access_token');
      deleteCookie('refresh_token');
      state.id = initialUser.id;
      state.name = initialUser.name;
      state.username = initialUser.username;
      state.email = initialUser.email;
      state.role = initialUser.role;
      state.password = initialUser.password;
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
