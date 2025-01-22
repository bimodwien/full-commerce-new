import { TCategory } from '@/models/category.model';
import { axiosInstance } from '@/lib/axios';

interface ApiResponse {
  category: {
    data: TCategory[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function fetchCategory(
  page: number,
  limit: number,
  name: string,
): Promise<ApiResponse> {
  const axios = axiosInstance();
  const { data } = await axios.get<ApiResponse>('/categories', {
    params: { page, limit, name },
  });
  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  const axios = axiosInstance();
  try {
    await axios.delete(`/categories/${id}`);
  } catch (error) {
    console.error(error);
  }
}
