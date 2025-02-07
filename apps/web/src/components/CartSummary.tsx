import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CartSummaryProps {
  total: number;
}

const CartSummary = ({ total }: CartSummaryProps) => {
  function handleCheckout() {
    return alert('Order service is not available yet.');
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between items-center mb-4">
          <span>Subtotal</span>
          <span>IDR. {total}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-lg font-semibold">
          <span>Total</span>
          <span>IDR. {total}</span>
        </div>
        <Button className="w-full" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
