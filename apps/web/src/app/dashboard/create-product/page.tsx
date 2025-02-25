'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { TCategory } from '@/models/category.model';
import { TProduct } from '@/models/product.model';
import { fetchCategory } from '@/helpers/fetchCategory';
import Image from 'next/image';
import { Sidebar } from '@/components/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

function CreateProduct() {
  const initialValues = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',
  };
  const imageRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchCategory(1, 0, '');
        setCategories(response.category.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    })();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Product name is required'),
      description: Yup.string().required('Product description is required'),
      price: Yup.number().required('Product price is required'),
      stock: Yup.number().required('Product stock is required'),
      categoryId: Yup.string().required('Product category is required'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance().post<TProduct>(
          '/products',
          values,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        toast({
          description: 'Product created successfully',
          duration: 1000,
        });
        router.push('/dashboard');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('AXIOS ERROR:', error.response?.status);
          console.log('AXIOS DATA:', error.response?.data);
        } else {
          console.error('UNKNOWN ERROR:', error);
        }
      }
    },
  });

  function handleImage() {
    if (imageRef.current?.files && imageRef.current.files[0]) {
      const file = imageRef.current.files[0];
      setImagePreview(URL.createObjectURL(file));
      formik.setFieldValue('productImage', file);
      console.log('file selected: ', file);
      console.log('image product: ', URL.createObjectURL(file));
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <Sidebar />
        <div className="flex-1 overflow-y-auto w-full">
          <header className="flex items-center h-16 px-2 border-b bg-white">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-bold ml-4">Dashboard</h1>
          </header>
          <main className="p-6">
            <Card className="max-w-5xl">
              <CardHeader>
                <CardTitle>Create New Product</CardTitle>
                <CardDescription>
                  Add a new product to your catalog.
                </CardDescription>
              </CardHeader>
              <form onSubmit={formik.handleSubmit}>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                          id="productName"
                          placeholder="Enter product name"
                          {...formik.getFieldProps('name')}
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Enter product description"
                          {...formik.getFieldProps('description')}
                          required
                          className="h-32"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="Enter price"
                          {...formik.getFieldProps('price')}
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          type="number"
                          placeholder="Enter stock quantity"
                          {...formik.getFieldProps('stock')}
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formik.values.categoryId}
                          onValueChange={(val) =>
                            formik.setFieldValue('categoryId', val)
                          }
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="image">Product Image</Label>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={() => handleImage()}
                          ref={imageRef}
                          className="cursor-pointer"
                        />
                        {imagePreview && (
                          <div className="mt-2">
                            <Image
                              src={imagePreview || '/placeholder.svg'}
                              alt="Product preview"
                              width={200}
                              height={200}
                              className="rounded-md object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Product</Button>
                </CardFooter>
              </form>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default CreateProduct;
