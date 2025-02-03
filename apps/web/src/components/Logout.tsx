'use client';
import React from 'react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { logout } from '@/lib/redux/slices/user.slice';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

const Logout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  function loggingout() {
    dispatch(logout());
    router.push('/login');
  }

  return (
    <Button
      variant="ghost"
      className="text-white bg-[#1a1a1a] hover:text-black hover:bg-white border text-base border-white"
      onClick={() => {
        loggingout();
      }}
    >
      <LogOut className="h-5 w-5 mr-2" />
      <span>Log Out</span>
    </Button>
  );
};

export default Logout;
