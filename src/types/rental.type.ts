import { Customer } from './customer.type';
import { Product } from "./product.type";

export type Rental = {
    _id: string;
    customer: string;
    deposit: number;
    returnValue: number;
    returnState: string;
    estimatedPrice: number;
  }