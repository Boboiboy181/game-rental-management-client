import { Rental } from '../types/rental.type';
import api from './axios.config';

export const getRentals = async (): Promise<Rental[]> => {
  const { data }: { data: Rental[] } = await api.get('rental');
  return data;
};

export const delelteRental = async (id: string): Promise<void> => {
  await api.delete(`rental/${id}`);
};
