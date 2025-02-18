'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logout from './Logout';
import { LogOut } from 'lucide-react';
import { useAppSelector } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export function Header() {
  const user = useAppSelector((state) => state.auth);
  const wishlist = useAppSelector((state) => state.wishlist);
  const cart = useAppSelector((state) => state.cart);
  const isLoggedIn = Boolean(user.id);
  const { toast } = useToast();
  const router = useRouter();

  const handleClickFavorite = (e: React.MouseEvent) => {
    if (!user.id) {
      toast({
        title: 'Login Required',
        description: 'Please login to see the favorites',
        duration: 2000,
      });
      router.push('/login');
    }
  };

  const handleClickCart = (e: React.MouseEvent) => {
    if (!user.id) {
      toast({
        title: 'Login Required',
        description: 'Please login to see the cart',
        duration: 2000,
      });
      router.push('/login');
    }
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-[#1a1a1a] text-white border-b border-[#2a2a2a]">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl font-bold">TokoPaBimo</span>
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href={`/wishlist`}>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Wishlist"
              className="text-white hover:text-black hover:bg-white relative"
              onClick={handleClickFavorite}
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Button>
          </Link>
          <Link href={`/cart`}>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="text-white hover:text-black hover:bg-white relative"
              onClick={handleClickCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              <span className="hidden md:inline-block text-sm pl-2 capitalize">
                Hi, {user.name?.split(' ')[0]}
              </span>
              <Logout className="hidden sm:flex" />
              <Logout
                compact
                showText={false}
                className="flex sm:hidden sm:border-none"
              />
            </>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-white bg-[#1a1a1a] hover:text-black hover:bg-white border border-white"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Log In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
