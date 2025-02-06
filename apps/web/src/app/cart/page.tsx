'use client';
import React from 'react';
import { Header } from '@/components/Header';

function Cart() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-8">Cart</h1>
        <p>Your cart is empty</p>
      </main>
    </div>
  );
}

export default Cart;
