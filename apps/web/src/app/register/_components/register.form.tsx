'use client';

import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

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
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href={'/'}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 font-poppins"
        >
          TokoPaBimo
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 font-poppins">
              Create an account
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 font-poppins"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-[#FBFBFB] border border-gray-300 text-gray-900 rounded-lg focus:ring-[#212121] focus:border-[#212121] focus:outline-none block w-full p-2.5"
                  {...formik.getFieldProps('email')}
                />
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 font-poppins"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-[#FBFBFB] border border-gray-300 text-gray-900 rounded-lg focus:ring-[#212121] focus:border-[#212121] focus:outline-none block w-full p-2.5"
                  {...formik.getFieldProps('name')}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 font-poppins"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-[#FBFBFB] border border-gray-300 text-gray-900 rounded-lg focus:ring-[#212121] focus:border-[#212121] focus:outline-none block w-full p-2.5"
                  {...formik.getFieldProps('username')}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 font-poppins"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-[#FBFBFB] border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-[#212121] focus:border-[#212121] focus:outline-none block w-full p-2.5"
                  {...formik.getFieldProps('password')}
                />
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 font-poppins">
                  Role
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="role-user"
                      name="role"
                      value="user"
                      className="w-4 h-4  bg-gray-100 border-gray-300 focus:ring-[#212121] cursor-pointer"
                      style={{ accentColor: '#212121' }}
                      checked={formik.values.role === 'user'}
                      onChange={() => {
                        formik.setFieldValue('role', 'user');
                      }}
                    />
                    <label
                      htmlFor="role-user"
                      className="ml-2 text-sm font-medium text-gray-900 font-poppins"
                    >
                      User
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="role-admin"
                      name="role"
                      value="admin"
                      className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-[#212121] cursor-pointer"
                      style={{ accentColor: '#212121' }}
                      checked={formik.values.role === 'admin'}
                      onChange={() => {
                        formik.setFieldValue('role', 'admin');
                      }}
                    />
                    <label
                      htmlFor="role-admin"
                      className="ml-2 text-sm font-medium text-gray-900 font-poppins"
                    >
                      Admin
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#212121] hover:bg-[#1D1616] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center font-poppins"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 font-poppins">
                Already have an account?{' '}
                <Link
                  href={'/login'}
                  className="font-medium text-[#212121] hover:underline font-poppins"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
