'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { fetchProduct } from '@/helpers/fetchProduct';
import { TProduct } from '@/models/product.model';
import { useDebounce } from 'use-debounce';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import ProductGrid from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

interface ApiResponse {
  products: {
    data: TProduct[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

type DecodedToken = {
  user: {
    role: string;
  };
};

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('access_token');
    if (token && typeof token === 'string') {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.user?.role === 'admin') {
          router.replace('/dashboard');
        } else if (sessionStorage.getItem('justLoggedIn') === 'true') {
          sessionStorage.removeItem('justLoggedIn');
          window.location.reload();
        }
      } catch (error) {
        console.error('Gagal decode token: ', error);
      }
    }
  }, [router]);

  const [products, setProducts] = useState<TProduct[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [value] = useDebounce(search, 1000);
  const [totalPages, setTotalPages] = useState(1);

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
  }, [page, limit, value]);

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 min-h-screen">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-semibold pb-5">Product List</h2>
          <SearchBar onSearch={handleSearch} />
        </div>
        <ProductGrid products={products} timestamp={timestamp} />
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
