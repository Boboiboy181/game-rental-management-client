import { Product } from './product.type';

export type ProductForCart = Product & {
  preOrderQuantity: number;
  numberOfRentalDays: string;
  priceByDays: number;
};
