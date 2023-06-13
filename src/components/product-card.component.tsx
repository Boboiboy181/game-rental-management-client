import { MouseEventHandler } from 'react';

type Product = {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
  manufacturer: string;
  genre: string;
  releaseDate: string;
  language: string;
  system: string;
  description: string;
  imageUrl: string;
};

type ProductCardProps = {
  product: Product;
  onClickHandler: (productId: string) => MouseEventHandler<HTMLDivElement>;
};

const ProductCard = ({ product, onClickHandler }: ProductCardProps) => {
  return (
    <div
      key={product._id}
      className="w-1/5 text-center cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-xl hover:rounded-md"
      onClick={onClickHandler(product._id)}
    >
      <div className="image-container w-[220px] h-[300px] overflow-hidden rounded-md m-auto">
        <img src={`${product.imageUrl}`} alt="" className="" />
      </div>
      <div className="mt-3 mb-4">
        <h3>{product.productName}</h3>
        <p>{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
