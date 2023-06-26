import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';
import CartDropdownItem from './cart-dropdown-item.component';

const CartDropdownList = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div>
      {cartItems.map((cartItem) => {
        return <CartDropdownItem key={cartItem._id} cartItem={cartItem} />;
      })}
    </div>
  );
};

export default CartDropdownList;
