import { TProduct } from '@/models/product.model';
import { axiosInstance, axiosPublicInstance } from '@/lib/axios';

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
  const axios = axiosPublicInstance();
  const { data } = await axios.get<ApiResponse>('/products', {
    params: { page, limit, name },
  });
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const axios = axiosInstance();
  try {
    await axios.delete(`/products/${id}`);
  } catch (error) {
    console.error(error);
  }
}
