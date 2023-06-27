import { CustomerForRental } from './customer-for-rental.type';
import { ProductForRental } from './product-for-rental.type';

export type Rental = {
  _id: string;
  customer: CustomerForRental;
  deposit: number;
  returnValue: number;
  returnState: string;
  rentedGames: [ProductForRental];
  estimatedPrice: number;
  createdAt: string;
};
