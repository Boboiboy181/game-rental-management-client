import { Customer } from './customer.type';
import { Product } from "./product.type";

export type PreOrder = {
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
