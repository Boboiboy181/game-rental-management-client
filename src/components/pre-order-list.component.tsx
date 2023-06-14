import { useContext } from 'react';
import PreOrderItem from './pre-order-item.component';
import { CartContext } from '../contexts/cart.context';
import { ProductQuantity } from '../types/product-quantity.type';

const PreOrderList = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <ul className="product-list">
      {cartItems.map((cartItem: ProductQuantity) => {
        return <PreOrderItem key={cartItem._id} cartItem={cartItem} />;
      })}
    </ul>
  );
};

export default PreOrderList;
