import { ProductForCart } from "../types/product-cart.type";
import api from "./axios.config";

export const getProducts = async (): Promise<ProductForCart[]> => {
  const { data }: { data: ProductForCart[] } = await api.get('/video-game');
  return data;
};
