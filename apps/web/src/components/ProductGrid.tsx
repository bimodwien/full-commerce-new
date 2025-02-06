'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TProduct } from '@/models/product.model';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  addWishlist,
  removeWishlist,
} from '@/lib/redux/middleware/wishlist.middleware';
import { useToast } from '@/hooks/use-toast';

interface ProductGridProps {
  products: TProduct[];
  timestamp: number;
}

const ProductGrid = ({ products, timestamp }: ProductGridProps) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist);
  const [localFavorites, setLocalFavorites] = useState<{
    [key: string]: boolean;
  }>({});

  const isFavorited = (productId: string): boolean => {
    if (localFavorites[productId] !== undefined) {
      return localFavorites[productId];
    }
    return wishlist.some(
      (item) => item.Product && item.Product.id === productId,
    );
  };

  const handleToggleFavorite = (product: TProduct) => {
    const favorited = isFavorited(product.id);
    const newFavorited = !favorited;

    setLocalFavorites((prev) => ({
      ...prev,
      [product.id]: newFavorited,
    }));
    if (newFavorited) {
      dispatch(addWishlist(product.id));
      toast({
        title: 'Product Added',
        description: 'Product added to favorites',
        duration: 2000,
      });
    } else {
      const wishlistItem = wishlist.find(
        (item) =>
          item.productId === product.id ||
          (item.Product && item.Product.id === product.id),
      );
      if (wishlistItem) {
        dispatch(removeWishlist(wishlistItem.id));
        toast({
          title: 'Product Removed',
          description: 'Product removed from favorites',
          duration: 2000,
        });
      } else {
        console.log('No wishlist item found for removal.');
      }
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const favorited = isFavorited(product.id);
        return (
          <Link href={`/details/${product.id}`} key={product.id}>
            <Card className="flex flex-col h-full group hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
              <CardHeader className="relative p-0 overflow-hidden">
                <Image
                  src={`http://localhost:8000/api/products/images/${product.id}?timestamp=${timestamp}`}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-48 rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-2 right-2 text-primary-foreground hover:text-primary ${
                    favorited
                      ? 'bg-red-100 text-red-600 hover:text-red-500'
                      : 'bg-primary/50 hover:bg-primary-foreground/90'
                  }`}
                  aria-label={
                    favorited ? 'Remove from favorites' : 'Add to favorites'
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleFavorite(product);
                  }}
                >
                  <Heart
                    className="h-5 w-5"
                    fill={favorited ? 'currentColor' : 'none'}
                  />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="secondary" className="line-clamp-1">
                    {product.Category.name}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">IDR. {product.price}</p>
                  <p className="text-sm text-muted-foreground">
                    Stock: {product.stock}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
