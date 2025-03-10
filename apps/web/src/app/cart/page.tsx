'use client';
import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchCart } from '@/lib/redux/middleware/cart.middleware';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { ChevronLeft } from 'lucide-react';

function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = cartItems.reduce((sum, item) => {
    const price = item.Product ? item.Product.price : 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 min-h-screen">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-8">Cart</h1>
          <Link
            href={'/'}
            className=" text-lg font-medium mb-8 flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.length > 0 ? (
              cartItems.map((item) => <CartItem key={item.id} item={item} />)
            ) : (
              <div className="flex flex-col gap-5">
                <p className="font-semibold text-xl">Your cart is empty</p>
                <Link href="/">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <CartSummary total={total} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
