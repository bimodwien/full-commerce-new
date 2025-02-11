'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '@/lib/axios';
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

function EditCategory() {
  const router = useRouter();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({ name: '' });
  const { toast } = useToast();

  useEffect(() => {
    async function categoryDetails() {
      try {
        const response = await axiosInstance().get(`/categories/${id}`);
        const categoryData = response.data.category;
        setInitialValues({
          name: categoryData.name,
        });
      } catch (error) {
        console.log(error);
      }
    }
    categoryDetails();
  }, [id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Category name is required'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance().put(`/categories/${id}`, values);
        toast({
          description: 'Category updated successfully',
        });
        router.push('/dashboard/category');
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden w-full">
          <Sidebar />
          <div className="flex-1 overflow-y-auto w-full">
            <header className="flex items-center h-16 px-2 border-b bg-white">
              <SidebarTrigger className="lg:hidden" />
              <h1 className="text-2xl font-bold ml-4">Categories</h1>
            </header>
            <main className="p-6">
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle>Edit Category</CardTitle>
                  <CardDescription>
                    Update the details of your category.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={formik.handleSubmit}>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Category Name</Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter category name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => router.push('/dashboard/category')}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Update Category</Button>
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

export default EditCategory;
