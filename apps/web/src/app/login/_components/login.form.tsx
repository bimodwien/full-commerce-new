'use client';

import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/redux/hooks';
import { userLogin } from '@/lib/redux/middleware/auth.middleware';
import { AxiosError } from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const LoginForm = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const initialValues = {
    username: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(
          userLogin({ username: values.username, password: values.password }),
        );
        toast({
          description: 'Login success',
        });
        window.location.href = '/';
      } catch (error) {
        let errorMessage = 'There was an error logging in. Please try again.';
        if (error instanceof AxiosError) {
          if (error.response) {
            errorMessage = error.response?.data?.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
        }
        alert(errorMessage);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      <Link
        href={'/'}
        className="flex items-center mb-6 text-2xl font-semibold text-[#212121]"
      >
        TokoPaBimo
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                {...formik.getFieldProps('username')}
                className="bg-[#FBFBFB]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                {...formik.getFieldProps('password')}
                className="bg-[#FBFBFB]"
              />
            </div>
            <Button type="submit" className="w-full ">
              Sign In
            </Button>
            <p className="text-sm font-light text-black">
              Don&#39;t have an account?{' '}
              <Link
                href={'/register'}
                className="font-medium text-[#212121] hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
