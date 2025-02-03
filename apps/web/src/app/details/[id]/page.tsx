import React from 'react';
import { Header } from '@/components/Header';
import ProductDetail from '@/components/ProductDetail';

type Props = {};

const Detail = (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 flex justify-center items-center">
        <ProductDetail />
      </main>
    </div>
  );
};

export default Detail;
