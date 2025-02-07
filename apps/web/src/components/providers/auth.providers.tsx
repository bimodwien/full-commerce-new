'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { keepLogin } from '@/lib/redux/middleware/auth.middleware';
import { fetchCart } from '@/lib/redux/middleware/cart.middleware';
import { fetchFavorite } from '@/lib/redux/middleware/wishlist.middleware';

type Props = { children: React.ReactNode };

const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(keepLogin());
    dispatch(fetchCart());
    dispatch(fetchFavorite());
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
