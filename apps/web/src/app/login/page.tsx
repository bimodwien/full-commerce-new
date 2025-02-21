'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './_components/login.form';

type DecodedToken = {
  user: {
    role: string;
  };
};

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('access_token');
    if (token && typeof token === 'string') {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const role = decoded.user?.role;
        // Redirect berdasarkan role
        if (role === 'admin') {
          router.replace('/dashboard');
        } else if (role === 'user') {
          router.replace('/');
        }
      } catch (error) {
        console.error('Gagal decode token:', error);
      }
    }
  }, [router]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
