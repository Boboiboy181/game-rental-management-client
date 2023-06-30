import { PreOrder } from '../types/pre-order.type';
import api from './axios.config';

export const getPreOrder = async (): Promise<PreOrder[]> => {
  const { data }: { data: PreOrder[] } = await api.get('pre-order');
  return data;
};

export const deletePreOrder = async (id: string): Promise<void> => {
  await api.delete(`pre-order/${id}`);
};
