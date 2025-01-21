import { TProduct } from '@/models/product.model';
import { axiosInstance } from '@/lib/axios';

interface ApiResponse {
  products: {
    data: TProduct[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function fetchProduct(
  page: number,
  limit: number,
  name: string,
): Promise<ApiResponse> {
  const axios = axiosInstance();
  const { data } = await axios.get<ApiResponse>('/products', {
    params: { page, limit, name },
  });
  return data;
}
