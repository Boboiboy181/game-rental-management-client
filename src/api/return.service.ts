import { Return } from '../types/return.type.ts';
import api from './axios.config.ts';

export const getReturns = async (): Promise<Return[]> => {
  const { data }: { data: Return[] } = await api.get('return');
  return data;
};

export const deleteReturn = async (_id: string): Promise<void> => {
  await api.delete(`return/${_id}`);
};
