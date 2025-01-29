'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchCategory, deleteCategory } from '@/helpers/fetchCategory';
import { useDebounce } from 'use-debounce';
import type { TCategory } from '@/models/category.model';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { axiosInstance } from '@/lib/axios';

interface ApiResponse {
  category: {
    data: TCategory[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const CategoryList = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [value] = useDebounce(search, 1000);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response: ApiResponse = await fetchCategory(page, limit, value);
        setCategories(response.category.data);
        setTotalPages(response.category.totalPages);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    getCategories();
  }, [page, limit, value]);

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = async (id: string) => {
    // Handle edit logic here
    const axios = axiosInstance();
    try {
      await axios.get(`/categories/${id}`);
    } catch (error) {
      console.error('Error to edit categories:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      const response = await fetchCategory(page, limit, value);
      setCategories(response.category.data);
      setTotalPages(response.category.totalPages);
      toast({
        description: 'Category deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <main>
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Category List</h2>
        <SearchBar onSearch={handleSearch} />
        <Link href="/dashboard/create-category" passHref>
          <Button>Create New Category</Button>
        </Link>
      </div>
      <Card className="w-full overflow-hidden mb-6">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, n) => (
                <TableRow key={category.id}>
                  <TableCell>{(page - 1) * limit + n + 1}</TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/edit-category/${category.id}`}
                        passHref
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            handleEdit(category.id);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
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
    </main>
  );
};

export default CategoryList;
