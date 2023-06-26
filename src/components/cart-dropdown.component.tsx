import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/cart.context';
import { useContext, useEffect, useRef } from 'react';

const CartDropdown = () => {
  const navigate = useNavigate();
  const { setIsCartOpen } = useContext(CartContext);

  const handleCheckoutBtn = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="absolute w-[240px] h-[340px] flex flex-col rounded-md z-[5] top-[90px] right-[40px] bg-white shadow-2xl">
      <div className=""></div>
      <button
        className="rounded-md bg-blue-600 text-white px-6 py-3 hover:bg-indigo-600 flex items-center justify-around w-full"
        onClick={handleCheckoutBtn}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartDropdown;
