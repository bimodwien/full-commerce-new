'use client';

import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AtSign, User, Lock, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const initialValues = {
    username: '',
    email: '',
    name: '',
    password: '',
    role: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Username is required'),
      email: Yup.string().required('Email is required'),
      name: Yup.string().required('Name is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance().post('/users/register', values);
        toast({
          description: 'Registration success',
        });
        router.push('/login');
      } catch (error) {
        let errorMessage = 'There was an error registering. Please try again.';
        if (error instanceof AxiosError) {
          if (error.response) {
            errorMessage = error.response?.data?.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
        }
        toast({
          description: errorMessage,
        });
      }
    },
  });

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col md:flex-row w-full mx-auto overflow-hidden">
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
            <p className="text-white text-sm opacity-80">TokoPakBimo, 2025</p>
          </div>
        </div>
        <div className="md:w-1/2 bg-white p-8 flex flex-col justify-center min-h-screen">
          <div className="max-w-md w-full mx-auto space-y-8">
            <Link href={'/'}>
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  TokoPakBimo
                </h1>
                <p className="text-sm text-gray-600">
                  Create your account to get started
                </p>
              </div>
            </Link>
            <Card className="border-none shadow-none">
              <CardContent className="px-0">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <AtSign
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="email"
                        id="email"
                        {...formik.getFieldProps('email')}
                        className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="text"
                        id="name"
                        {...formik.getFieldProps('name')}
                        className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="text-sm font-medium text-gray-700"
                    >
                      Username
                    </Label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="text"
                        id="username"
                        {...formik.getFieldProps('username')}
                        className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Choose a username"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </Label>
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
                        placeholder="Create a password"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Role
                    </Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        formik.setFieldValue('role', value)
                      }
                      defaultValue={formik.values.role}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="user" id="role-user" />
                        <Label htmlFor="role-user">User</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin" id="role-admin" />
                        <Label htmlFor="role-admin">Admin</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    Sign Up
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="font-medium text-gray-700 hover:text-black"
                    >
                      Sign In
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

export default RegisterForm;
