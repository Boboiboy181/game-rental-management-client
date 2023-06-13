import { MouseEventHandler } from 'react';
import ProductCard from './product-card.component';
import { Product } from '../types/product.type.ts';

type ProductListProps = {
  products: Product[];
  onClickHandler: (productId: string) => MouseEventHandler<HTMLDivElement>;
};

const ProductList = ({ products, onClickHandler }: ProductListProps) => {
  return (
    <div className="flex flex-wrap text-center items-center p-10">
      {products.map((product: Product) => {
        return (
          <ProductCard
            key={product._id}
            product={product}
            onClickHandler={onClickHandler}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
