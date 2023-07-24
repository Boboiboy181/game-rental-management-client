import { Return } from '../types/return/return.type.ts';
import api from './axios.config.ts';
import { CreateReturn } from '../types/return/create-return.type.ts';

export const getReturns = async (): Promise<Return[]> => {
  const { data }: { data: Return[] } = await api.get('return');
  return data;
};

export const deleteReturn = async (_id: string): Promise<void> => {
  await api.delete(`return/${_id}`);
};

export const getReturnByID = async (_id: string): Promise<Return> => {
  const { data }: { data: Return } = await api.get(`return/${_id}`);
  return data;
};

export const createReturn = async (
  createReturn: CreateReturn,
): Promise<Return> => {
  const { data }: { data: Return } = await api.post('return', {
    ...createReturn,
  });
  return data;
};
