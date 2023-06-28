import { Customer } from './customer.type';

export type Rental = {
    _id: string;
    customer: Customer;
    deposit: number;
    returnValue: number;
    returnState: string;
    estimatedPrice: number;
  }