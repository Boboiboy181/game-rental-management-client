import { useContext } from 'react';
import ContactInfo from '../components/pre-order-info.component';
import OrderSummary from '../components/pre-order-summary.component';
import { CartContext } from '../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBackToShop = () => navigate('/');

  return cartItems.length === 0 ? (
    <div className="h-screen w-screen flex justify-center pt-16 px-14 pb-24 flex-wrap items-center flex-col">
      <p className="text-5xl tracking-wide font-cursive text-center">
        Your cart is empty
      </p>
      <p className="text-xl text-center mt-6">
        Add something to make me happy!! 😁😘
      </p>
      <button
        className="rounded-md bg-blue-600 text-white px-6 py-2 hover:bg-indigo-600 flex items-center justify-around mt-4"
        onClick={handleBackToShop}
      >
        Back to Shop
      </button>
    </div>
  ) : (
    <div className="h-full flex justify-between pt-16 px-14 pb-24 flex-wrap">
      <ContactInfo />
      <OrderSummary />
    </div>
  );
};

export default Checkout;
