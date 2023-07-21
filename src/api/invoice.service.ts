import { CreateInvoice } from '../types/create-invoice.type.ts';
import { Invoice } from '../types/invoice.type.ts';
import api from './axios.config.ts';

export const createInvoice = async (
  invoice: CreateInvoice,
): Promise<Invoice> => {
  const { data }: { data: Invoice } = await api.post('invoice', { ...invoice });
  return data;
};

export const getInvoices = async (): Promise<Invoice[]> => {
  const { data }: { data: Invoice[] } = await api.get('invoice');
  return data;
};

export const deleteInvoice = async (id: string): Promise<void> => {
  await api.delete(`invoice/${id}`);
};
