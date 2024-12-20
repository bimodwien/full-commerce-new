import { Category, Wishlist, Cart } from '@prisma/client';

export type TProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  productImage: Buffer;
  category: Category;
  wishlist: Wishlist;
  cart: Cart;
};
