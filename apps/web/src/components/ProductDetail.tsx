'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import { TProduct } from '@/models/product.model';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  addWishlist,
  removeWishlist,
} from '@/lib/redux/middleware/wishlist.middleware';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/lib/redux/middleware/cart.middleware';

const ProductDetail = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist);
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [product, setProduct] = useState<TProduct | null>(null);
  const [timestamp, setTimestamp] = useState(Date.now());
  const { id } = useParams();
  const [localFavorites, setLocalFavorites] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchDetailProduct() {
      try {
        const response = await axiosInstance().get(`/products/${id}`);
        const productData: TProduct = response.data.product;
        setProduct(productData);
        setTimestamp(Date.now());
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetailProduct();
  }, [id]);

  const isFavorited = (): boolean => {
    if (localFavorites !== null) {
      return localFavorites;
    }
    return wishlist.some((item) => item.Product && item.Product.id === id);
  };

  const toggleFavorite = () => {
    if (!product) return;
    if (!user.id) {
      toast({
        title: 'Login Required',
        description: 'You must be logged in to add products to favorites',
        duration: 2000,
      });
      router.push('/login');
      return;
    }
    const currentFavorite = isFavorited();
    const newFavorited = !currentFavorite;

    setLocalFavorites(newFavorited);

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
        toast({
          title: 'Product Not Found',
          description: 'Product not found in favorites',
          duration: 2000,
        });
      }
    }
  };

  const handleAddToCart = () => {
    if (!user.id) {
      toast({
        title: 'Login Required',
        description: 'Please login to add to cart',
        duration: 2000,
      });
      router.push('/login');
      return;
    }
    if (product !== null) {
      dispatch(addToCart(product.id));
    }
    toast({
      title: 'Product Added',
      description: 'Product added to cart',
      duration: 2000,
    });
  };

  return (
    <div className="max-w-7xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="md:flex md:items-center p-2">
        <div className="md:w-1/2">
          <div className="relative w-full aspect-square">
            <Image
              src={`http://localhost:8000/api/products/images/${product?.id}?t=${timestamp}`}
              alt={product?.name || 'Product image'}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="p-8 md:w-1/2">
          <div className="flex flex-col items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product?.name}
            </h1>
            <Badge variant="secondary" className="text-lg py-1 px-3">
              {product?.Category?.name || 'Unknown'}
            </Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-6">
            IDR. {product?.price}
          </p>
          <p className="text-lg text-gray-600 mb-6">{product?.description}</p>
          <p className="text-lg text-gray-500 mb-8">Stock: {product?.stock}</p>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <Button
              className="flex-grow text-lg py-4"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className={`flex items-center justify-center text-lg py-4 ${
                isFavorited() ? 'bg-red-100 text-red-600 border-red-600' : ''
              }`}
              onClick={toggleFavorite}
            >
              <Heart
                className={`h-6 w-6 mr-2 ${isFavorited() ? 'fill-current' : ''}`}
              />
              {isFavorited() ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
