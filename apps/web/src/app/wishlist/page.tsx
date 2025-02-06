'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchFavorite } from '@/lib/redux/middleware/wishlist.middleware';
import { Header } from '@/components/Header';
import FavoriteList from '@/components/FavoriteList';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchFavorite());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-8">Your Wishlist</h1>
        {favorite.length > 0 ? (
          <FavoriteList favorite={favorite} />
        ) : (
          <p>Your wishlist is empty</p>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
