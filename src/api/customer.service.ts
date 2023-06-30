import { Customer } from '../types/customer.type';
import api from './axios.config';

export const getCustomers = async (): Promise<Customer[]> => {
  const { data }: { data: Customer[] } = await api.get('/customer');
  return data;
};
