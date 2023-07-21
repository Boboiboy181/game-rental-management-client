import { ProductForCart } from '../types/product-cart.type';
import { Product } from '../types/product.type.ts';
import api from './axios.config';

type UpdateProductDto = {
  price: number;
  quantity: number;
};

export const getProducts = async (): Promise<ProductForCart[]> => {
  const { data }: { data: ProductForCart[] } = await api.get('/video-game');
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/video-game/${id}`);
};

export const getProduct = async (id: string | undefined): Promise<Product> => {
  const { data }: { data: Product } = await api.get(`/video-game/${id}`);
  return data;
};

export const createProduct = async (product: any): Promise<Product> => {
  const { data }: { data: Product } = await api.post('/video-game', product);
  return data;
};

export const updateProduct = async (
  id: string,
  updateProductDto: UpdateProductDto,
): Promise<Product> => {
  const { data }: { data: Product } = await api.patch(
    `/video-game/${id}`,
    updateProductDto,
  );
  return data;
};
