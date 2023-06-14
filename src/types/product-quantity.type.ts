import { Product } from './product.type';

export type ProductQuantity = Product & { preOrderQuantity: number };
