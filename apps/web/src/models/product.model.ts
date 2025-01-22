import { TCategory } from './category.model';

export type TProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  productImage: string;
  Category: TCategory;
};
