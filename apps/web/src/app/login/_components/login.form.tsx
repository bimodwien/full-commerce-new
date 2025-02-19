'use client';

import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/redux/hooks';
import { userLogin } from '@/lib/redux/middleware/auth.middleware';
import { AxiosError } from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AtSign, Lock, ArrowRight } from 'lucide-react';
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
      if (Object.keys(formik.errors).length > 0) {
        return;
      }
      try {
        await dispatch(
          userLogin({ username: values.username, password: values.password }),
        );
        toast({
          title: 'Login Success',
          description: `Welcome to TokoPaBimo, ${values.username}!`,
          variant: 'default',
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 10);
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

  function handleForgotPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    return alert('Feature not implemented yet');
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-full mx-auto overflow-hidden">
        <div className="md:w-1/2 relative hidden md:block">
          <Image
            src="/new-york.jpg"
            alt="New York City skyline at night"
            layout="fill"
            objectFit="cover"
            priority
            className="object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white text-sm opacity-80">TokoPaBimo, 2025</p>
          </div>
        </div>
        <div className="md:w-1/2 bg-white p-8 flex flex-col justify-center min-h-screen">
          <div className="max-w-md w-full mx-auto space-y-8">
            <Link href={'/'}>
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  TokoPaBimo
                </h1>
                <p className="text-sm text-gray-600">
                  Sign in to your account to continue
                </p>
              </div>
            </Link>
            <Card className="border-none shadow-none">
              <CardContent className="px-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit(e);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="text-sm font-medium text-gray-700"
                    >
                      Username
                    </Label>
                    <div className="relative">
                      <AtSign
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="text"
                        id="username"
                        {...formik.getFieldProps('username')}
                        className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </Label>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-sm text-gray-600 hover:text-black transition-colors hover:cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="password"
                        id="password"
                        {...formik.getFieldProps('password')}
                        className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    Sign In
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don&#39;t have an account?{' '}
                    <Link
                      href={'/register'}
                      className="font-medium text-gray-700 hover:text-black"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
