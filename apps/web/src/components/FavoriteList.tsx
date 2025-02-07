'use client';
import React from 'react';
import { TWishlist } from '@/models/wishlist.model';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { removeWishlist } from '@/lib/redux/middleware/wishlist.middleware';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { TProduct } from '@/models/product.model';
import { addToCart } from '@/lib/redux/middleware/cart.middleware';

interface FavoriteListProps {
  favorite: TWishlist[];
}

const FavoriteList = ({ favorite }: FavoriteListProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const handleDeleteWishlist = (wishlistItemId: string) => {
    dispatch(removeWishlist(wishlistItemId));
    toast({
      title: 'Product Removed',
      description: 'Product removed from favorites',
      duration: 2000,
    });
  };

  const handleAddToCart = (product: TProduct) => {
    if (product !== null) {
      dispatch(addToCart(product.id));
      toast({
        title: 'Product Added',
        description: 'Product added to cart',
        duration: 2000,
      });
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {favorite
        .filter((item) => item.Product !== undefined)
        .map((product) => (
          <Card key={product.id} className="flex flex-col">
            <Link href={`/details/${product.Product?.id}`}>
              <CardHeader className="relative p-0">
                <Image
                  src={`http://localhost:8000/api/products/images/${product.Product?.id}?timestamp=${Date.now()}`}
                  alt={product.Product?.name || 'Product Image'}
                  width={400}
                  height={400}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
              </CardHeader>
            </Link>
            <CardContent className="flex-grow p-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">
                  {product.Product?.name}
                </CardTitle>
                <Badge variant="secondary">
                  {product.Product?.Category.name}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                {product.Product?.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">
                  IDR. {product.Product?.price}
                </p>
                <p className="text-sm text-muted-foreground">
                  Stock: {product.Product?.stock}
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between">
              <Button onClick={() => handleAddToCart(product.Product!)}>
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDeleteWishlist(product.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default FavoriteList;
