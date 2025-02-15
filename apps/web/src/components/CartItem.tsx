import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus } from 'lucide-react';
import { TCart } from '@/models/cart.model';
import Image from 'next/image';
import { useAppDispatch } from '@/lib/redux/hooks';
import {
  updateCart,
  deleteCartItem,
} from '@/lib/redux/middleware/cart.middleware';
import { updateQuantity } from '@/lib/redux/slices/cart.slice';
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
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface CartItemsProp {
  item: TCart;
}

const CartItem = ({ item }: CartItemsProp) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
      dispatch(updateCart(item.id, newQuantity));
    }
  };

  const handleInscrease = () => {
    if (item.quantity < item.Product.stock) {
      const newQuantity = item.quantity + 1;
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
      dispatch(updateCart(item.id, newQuantity));
    }
  };

  const handleDelete = () => {
    dispatch(deleteCartItem(item.id));
    toast({
      title: 'Product Removed',
      description: 'Product removed from cart',
      duration: 2000,
    });
  };

  return (
    <Link href={`/details/${item.Product.id}`}>
      <Card className="mb-4 group hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <CardContent className="p-4 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center transition-transform duration-300">
            <div className="flex items-center mb-4 sm:mb-0">
              <Image
                src={`http://localhost:8000/api/products/images/${item.Product?.id}?timestamp=${Date.now()}`}
                alt={item.Product.name || 'Photo'}
                width={100}
                height={100}
                className="rounded-md mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.Product.name}</h2>
                <p className="text-gray-600">IDR. {item.Product.price}</p>
                <p className="text-sm text-gray-500">
                  Stock: {item.Product.stock}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:ml-auto sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDecrease();
                  }}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="text"
                  value={item.quantity}
                  className="w-10 text-center"
                  min={1}
                  max={item.Product.stock}
                  readOnly
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    handleInscrease();
                  }}
                  disabled={item.quantity >= item.Product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    Remove
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will remove the product
                      from the cart.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete;
                      }}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CartItem;
