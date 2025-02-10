'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '@/lib/axios';
import { fetchCategory } from '@/helpers/fetchCategory';
import { TCategory } from '@/models/category.model';
import { useToast } from '@/hooks/use-toast';
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
import { TProduct } from '@/models/product.model';

const EditProduct = () => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { id } = params;

  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',
  });
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef<HTMLInputElement>(null);
  const formikRef = useRef<any>(null);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Product name is required'),
      description: Yup.string().required('Product description is required'),
      price: Yup.number().required('Product price is required'),
      stock: Yup.number().required('Product stock is required'),
      categoryId: Yup.string().required('Product category is required'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', String(values.price));
        formData.append('stock', String(values.stock));
        formData.append('categoryId', values.categoryId);
        if (imageRef.current?.files && imageRef.current.files[0]) {
          formData.append('productImage', imageRef.current.files[0]);
        }

        await axiosInstance().patch(`/products/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast({ description: 'Product updated successfully' });
        router.push('/dashboard?refresh=true');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          axiosInstance().get(`/products/${id}`),
          fetchCategory(1, 10, ''),
        ]);
        const productData = productResponse.data.product as TProduct;
        setInitialValues({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          stock: productData.stock,
          categoryId: productData.Category?.id || '',
        });
        setCategories(categoryResponse.category.data);
        setImagePreview(
          `http://localhost:8000/api/products/images/${productData.id}?timestamp=${Date.now()}`,
        );

        formikRef.current?.setFieldValue(
          'categoryId',
          productData.Category?.id,
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  function handleImage() {
    if (imageRef.current?.files && imageRef.current.files[0]) {
      const file = imageRef.current.files[0];
      setImagePreview(URL.createObjectURL(file));
      formik.setFieldValue('productImage', file);
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
                <CardTitle>Edit Product</CardTitle>
                <CardDescription>
                  Update the details of your product.
                </CardDescription>
              </CardHeader>
              <form onSubmit={formik.handleSubmit}>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
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
                            <SelectValue
                              placeholder={
                                categories.length === 0
                                  ? 'Loading categories...'
                                  : 'Select a category'
                              }
                            />
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
                          ref={imageRef}
                          onChange={() => handleImage()}
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
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/dashboard');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Update Product</Button>
                </CardFooter>
              </form>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EditProduct;
