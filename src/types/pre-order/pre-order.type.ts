import { Customer } from '../customer/customer.type';
import { Product } from '../product/product.type';

export type PreOrder = {
  preOrderCode: string;
  _id: string;
  customer: Customer;
  rentedGames: [
    {
      game: Product;
      preOrderQuantity: number;
      numberOfRentalDays: number;
      returnDate: Date;
      _id: string;
    },
  ];
  estimatedPrice: number;
  createdAt: Date;
};
