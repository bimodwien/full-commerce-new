import { TProduct } from './product.model';

export type TCart = {
  id: string;
  quantity: number;
  productId: string;
  userId: string;
  Product: TProduct;
};
