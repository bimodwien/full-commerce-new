'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchFavorite } from '@/lib/redux/middleware/wishlist.middleware';
import { Header } from '@/components/Header';
import FavoriteList from '@/components/FavoriteList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { ChevronLeft } from 'lucide-react';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchFavorite());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 min-h-screen">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-8">Your Wishlist</h1>
          <Link
            href={'/'}
            className=" text-lg font-medium mb-8 flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        {favorite.length > 0 ? (
          <FavoriteList favorite={favorite} />
        ) : (
          <div className="flex flex-col gap-5">
            <p className="font-semibold text-xl">Your wishlist is empty</p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
