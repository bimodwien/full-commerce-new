'use client';

import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const RegisterForm = () => {
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
        alert('Register success');
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
        alert(errorMessage);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      <Link
        href={'/'}
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
      >
        TokoPaBimo
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold leading-tight tracking-tight text-gray-900 ">
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                {...formik.getFieldProps('email')}
                className="bg-[#FBFBFB]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="">
                Full Name
              </Label>
              <Input
                type="text"
                id="name"
                {...formik.getFieldProps('name')}
                className="bg-[#FBFBFB]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="">
                User Name
              </Label>
              <Input
                type="text"
                id="username"
                {...formik.getFieldProps('username')}
                className="bg-[#FBFBFB]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                {...formik.getFieldProps('password')}
                className="bg-[#FBFBFB]"
              />
            </div>
            <div className="space-y-2">
              <Label className="">Role</Label>
              <RadioGroup
                onValueChange={(value) => formik.setFieldValue('role', value)}
                defaultValue={formik.values.role}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="role-user" />
                  <Label htmlFor="role-user" className="">
                    User
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="role-admin" />
                  <Label htmlFor="role-admin" className="">
                    Admin
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <p className="text-sm font-light text-gray-500 ">
              Already have an account?{' '}
              <Link
                href={'/login'}
                className="font-medium text-[#212121] hover:underline "
              >
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
