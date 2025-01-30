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

interface ProductGridProps {
  products: TProduct[];
}

const ProductGrid = (products: ProductGridProps) => {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.products.map((product) => {
        return (
          <Card
            key={product.id}
            className="flex flex-col group hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          >
            <CardHeader className="relative p-0 overflow-hidden">
              <Image
                src={`http://localhost:8000/api/products/images/${product.id}`}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover w-full h-48 rounded-t-lg transition-transform duration-300 group-hover:scale-105"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 text-primary-foreground hover:text-primary ${
                  favorites[product.id]
                    ? 'bg-white text-gray-500 hover:text-gray-700'
                    : 'bg-primary/50 hover:bg-primary-foreground/90'
                }`}
                aria-label={
                  favorites[product.id]
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart
                  className="h-5 w-5"
                  fill={favorites[product.id] ? 'currentColor' : 'none'}
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
        );
      })}
    </div>
  );
};

export default ProductGrid;
