import { MouseEventHandler } from 'react';
import { Product } from '../types/product.type.ts';

type ProductCardProps = {
  product: Product;
  onClickHandler: (productId: string) => MouseEventHandler<HTMLDivElement>;
};

const ProductCard = ({ product, onClickHandler }: ProductCardProps) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const formattedPrice = formatter.format(product.price);
  return (
    <div
      key={product._id}
      className="w-1/5 min-h-[400px] mb-3 text-center cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-xl hover:rounded-md"
      onClick={onClickHandler(product._id)}
    >
      <div className="image-container w-[220px] h-[300px] overflow-hidden rounded-md m-auto shadow-2xl">
        <img src={`${product.imageUrl}`} alt="" className="" />
      </div>
      <div className="mt-3 mb-4 text-center">
        <h3>{product.productName}</h3>
        <p className="text-red-500">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
