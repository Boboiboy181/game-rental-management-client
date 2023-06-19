import { Product } from './product.type';

export type ProductForOrder = Product & {
  preOrderQuantity: number;
  numberOfRentalDays: string;
};
