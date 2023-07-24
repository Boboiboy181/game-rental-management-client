import { PreOrder } from '../types/pre-order/pre-order.type';
import api from './axios.config';

export const getPreOrders = async (): Promise<PreOrder[]> => {
  const { data }: { data: PreOrder[] } = await api.get('pre-order');
  return data;
};

export const deletePreOrder = async (id: string): Promise<void> => {
  await api.delete(`pre-order/${id}`);
};

export const getPreOrder = async (
  id: string | undefined,
): Promise<PreOrder> => {
  const { data }: { data: PreOrder } = await api.get(`pre-order/${id}`);
  return data;
};
