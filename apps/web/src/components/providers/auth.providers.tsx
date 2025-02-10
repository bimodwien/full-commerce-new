'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { keepLogin } from '@/lib/redux/middleware/auth.middleware';
import { fetchCart } from '@/lib/redux/middleware/cart.middleware';
import { fetchFavorite } from '@/lib/redux/middleware/wishlist.middleware';

type Props = { children: React.ReactNode };

const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(keepLogin());
  }, [dispatch]);

  useEffect(() => {
    if (role === 'user') {
      dispatch(fetchCart());
      dispatch(fetchFavorite());
    }
  }, [dispatch, role]);

  return <>{children}</>;
};

export default AuthProvider;
