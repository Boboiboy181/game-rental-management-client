import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/cart.context';
import { useContext } from 'react';
import CartDropdownList from './cart-dropdown-list.component';

const CartDropdown = () => {
  const navigate = useNavigate();
  const { setIsCartOpen, cartItems } = useContext(CartContext);

  const handleCheckoutBtn = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div
      className="absolute w-[250px] flex flex-col rounded-md z-[5] top-[90px] right-[20px]
     bg-white shadow-2xl p-2 pb-4 border-blue-600 border"
    >
      {cartItems.length === 0 ? (
        <div className="text-center text-lg font-semibold flex flex-col justify-around items-center">
          <p className="mt-2">Your cart is empty !</p>
          <img src="/empty-card.png" alt="" className="w-[200px]" />
        </div>
      ) : (
        <div>
          <div className="">
            <CartDropdownList />
          </div>
          <button
            className="rounded-md text-blue-600 border-blue-600 border hover:bg-blue-600 hover:text-white
             w-[90%] text-center self-center p-2 mt-2"
            onClick={handleCheckoutBtn}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
