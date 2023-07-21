import { Customer } from '../types/customer.type';
import api from './axios.config';

type CreateCustomerDto = {
  customerName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export const getCustomers = async (): Promise<Customer[]> => {
  const { data }: { data: Customer[] } = await api.get('/customer');
  return data;
};

export const getCustomer = async (id: string): Promise<Customer> => {
  const { data }: { data: Customer } = await api.get(`/customer/${id}`);
  return data;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  await api.delete(`/customer/${id}`);
};

export const createCustomer = async (
  createCustomerDto: CreateCustomerDto,
): Promise<Customer> => {
  const { data }: { data: Customer } = await api.post(
    '/customer',
    createCustomerDto,
  );
  return data;
};

export const updateCustomer = async (
  id: string,
  updateCustomerDto: CreateCustomerDto,
): Promise<Customer> => {
  const { data }: { data: Customer } = await api.patch(
    `/customer/${id}`,
    updateCustomerDto,
  );
  return data;
};
