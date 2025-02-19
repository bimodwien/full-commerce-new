import { Dispatch } from '@reduxjs/toolkit';
import { axiosInstance } from '@/lib/axios';
import { login } from '../slices/user.slice';
import { TUser } from '@/models/user.model';
import { deleteCookie, getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

export const userLogin = ({ username, password }: TUser) => {
  return async (dispatch: Dispatch) => {
    try {
      await axiosInstance().post(
        '/users/login',
        { username, password },
        { withCredentials: true },
      );
      const access_token = getCookie('access_token') || '';
      if (typeof access_token === 'string') {
        const decoded = jwtDecode<{ user: TUser }>(access_token);
        if (!decoded.user) {
          return;
        }
        const userData = decoded.user;
        dispatch(login(userData));
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      deleteCookie('access_token');
      deleteCookie('refresh_token');
      throw error;
    }
  };
};

export const keepLogin = () => async (dispatch: Dispatch) => {
  try {
    const token = getCookie('access_token') || '';
    if (typeof token === 'string' && token) {
      const decode = jwtDecode<{ user: TUser }>(token);
      dispatch(login(decode?.user));
    }
  } catch (error) {
    console.log(error);
    deleteCookie('access_token');
  }
};
