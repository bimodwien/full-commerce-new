import { TCategory } from './category.model';

export type TProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  updatedAt: string;
  productImage?: string;
  Category?: TCategory;
};
