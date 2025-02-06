import { TProduct } from './product.model';

export type TWishlist = {
  id: string;
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  Product?: TProduct;
};
