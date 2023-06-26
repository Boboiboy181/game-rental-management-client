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
    <div className="absolute w-[280px] flex flex-col rounded-xl z-[5] top-[90px] right-[20px] bg-white shadow-2xl pb-2">
      {cartItems.length === 0 ? (
        <div className="text-center text-lg font-semibold flex flex-col justify-around items-center">
          <p className="mt-2">Your cart is empty !</p>
          <img
            src="https://static.thenounproject.com/png/1700378-200.png"
            alt=""
            className="w-[200px]"
          />
        </div>
      ) : (
        <div>
          <div className="">
            <CartDropdownList />
          </div>
          <button
            className="rounded-md bg-blue-600 text-white hover:bg-indigo-600 w-[50%] text-center self-center p-2 mt-2"
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
