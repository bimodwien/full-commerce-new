'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logout from './Logout';
import { LogOut } from 'lucide-react';
import { useAppSelector } from '@/lib/redux/hooks';

export function Header() {
  const user = useAppSelector((state) => state.auth);
  const isLoggedIn = Boolean(user.id);

  return (
    <header className="sticky top-0 z-10 w-full bg-[#1a1a1a] text-white border-b border-[#2a2a2a]">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">TokoPaBimo</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            className="text-white hover:text-black hover:bg-white"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cart"
            className="text-white hover:text-black hover:bg-white"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          {isLoggedIn ? (
            <>
              <span className="hidden md:inline-block text-sm pl-2">
                Hi, {user.name}
              </span>
              <Logout />
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
