'use client';
import React from 'react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { logout } from '@/lib/redux/slices/user.slice';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { resetCart } from '@/lib/redux/slices/cart.slice';
import { resetWishlist } from '@/lib/redux/slices/wishlist.slice';
import { useRouter } from 'next/navigation';

const Logout = ({
  showText = true,
  compact = false,
  className = '',
}: {
  showText?: boolean;
  compact?: boolean;
  className?: string;
}) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const timeout = 1000;

  async function loggingout() {
    dispatch(resetWishlist());
    dispatch(resetCart());

    await new Promise((resolve) => setTimeout(resolve, 150));
    dispatch(logout());

    toast({
      title: 'Logout success!',
      description: 'You have logged out successfully',
      duration: 800,
    });

    setTimeout(() => {
      window.location.href = '/login';
    }, timeout);
  }

  return (
    <Button
      variant="ghost"
      className={`text-white bg-[#1a1a1a] hover:text-black hover:bg-white sm:border text-base border-white  ${className}`}
      onClick={loggingout}
    >
      <LogOut className="h-2 w-2" />
      {!compact && showText && <span>Log Out</span>}
    </Button>
  );
};

export default Logout;
