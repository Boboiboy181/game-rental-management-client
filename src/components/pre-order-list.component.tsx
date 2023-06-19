import { useContext } from 'react';
import PreOrderItem from './pre-order-item.component';
import { CartContext } from '../contexts/cart.context';
import { ProductForOrder } from '../types/product-order.type';

const PreOrderList = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <ul className="product-list">
      {cartItems.map((cartItem: ProductForOrder) => {
        return <PreOrderItem key={cartItem._id} cartItem={cartItem} />;
      })}
    </ul>
  );
};

export default PreOrderList;
