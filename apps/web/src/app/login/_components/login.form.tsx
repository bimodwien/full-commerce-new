'use client';

import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/redux/hooks';
import { userLogin } from '@/lib/redux/middleware/auth.middleware';
import { AxiosError } from 'axios';

const LoginForm = () => {
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
        alert('Login success');
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
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href={'/'}
          className="flex items-center mb-6 text-2xl font-semibold text-[#212121] font-poppins"
        >
          TokoPaBimo
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl font-poppins">
              Sign in to your account
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 font-poppins"
                >
                  Username
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
                  className="bg-[#FBFBFB] border border-gray-300 text-gray-900 rounded-lg focus:ring-[#212121] focus:border-[#212121] focus:outline-none block w-full p-2.5"
                  {...formik.getFieldProps('password')}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#212121] hover:bg-[#1D1616] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center font-poppins"
              >
                Sign In
              </button>
              <p className="text-sm font-light text-black font-poppins">
                Don&#39;t have an account?{' '}
                <Link
                  href={'/register'}
                  className="font-medium text-[#212121] hover:underline font-poppins"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
