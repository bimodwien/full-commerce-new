'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { fetchProduct, deleteProduct } from '@/helpers/fetchProduct';
import { useDebounce } from 'use-debounce';
import type { TProduct } from '@/models/product.model';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { Pencil, Trash2 } from 'lucide-react';
import { axiosInstance } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface ApiResponse {
  products: {
    data: TProduct[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function ProductList() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [value] = useDebounce(search, 1000);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const refresh = searchParams.get('refresh');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response: ApiResponse = await fetchProduct(page, limit, value);
        setProducts(response.products.data);
        setTotalPages(response.products.totalPages);
        setTimestamp(Date.now());
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, [page, limit, value, refresh]);

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = async (id: string) => {
    const axios = axiosInstance();
    try {
      await axios.get(`/products/${id}`);
    } catch (error) {
      console.error('Error to edit products:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      const response = await fetchProduct(page, limit, value);
      setProducts(response.products.data);
      setTotalPages(response.products.totalPages);
      toast({
        description: 'Product deleted successfully',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Product List</h2>
        <SearchBar onSearch={handleSearch} />
        <Link href="/dashboard/create-product" passHref>
          <Button>Create New Product</Button>
        </Link>
      </div>

      <Card className="w-full overflow-hidden mb-6">
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden sm:table-cell">Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={`http://localhost:8000/api/products/images/${product.id}?t=${timestamp}`}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-semibold">
                    {product.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.description}
                  </TableCell>
                  <TableCell>
                    {product.Category?.name ? product.Category.name : '-'}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(product.price)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.stock}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/edit-product/${product.id}`}
                        passHref
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(product.id)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the product.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(product.id)}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
