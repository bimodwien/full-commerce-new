'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Sidebar } from '@/components/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { axiosInstance } from '@/lib/axios';

function CreateCategory() {
  const router = useRouter();
  const { toast } = useToast();
  const initialValues = {
    name: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Category name is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance().post('/categories', values);
        toast({
          description: 'Category created successfully',
        });
        router.push('/dashboard/category');
      } catch (error) {
        console.error('Error creating category:', error);
      }
    },
  });

  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden w-full">
          <Sidebar />
          <div className="flex-1 overflow-y-auto w-full">
            <header className="flex items-center h-16 px-4 border-b bg-white">
              <SidebarTrigger className="lg:hidden" />
              <h1 className="text-2xl font-bold ml-4">Categories</h1>
            </header>
            <main className="p-6">
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle>Create New Category</CardTitle>
                  <CardDescription>
                    Add a new category to your product catalog.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={formik.handleSubmit}>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Enter category name"
                          {...formik.getFieldProps('name')}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => router.push('/dashboard/category')}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Create Category</Button>
                  </CardFooter>
                </form>
              </Card>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default CreateCategory;
