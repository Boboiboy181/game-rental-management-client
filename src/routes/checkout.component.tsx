import { useContext } from 'react';
import ContactInfo from '../components/pre-order-info.component';
import OrderSummary from '../components/pre-order-summary.component';
import { CartContext } from '../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../contexts/loading.context';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const { isLoading } = useContext(LoadingContext);
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
    <div className="px-14 pb-24">
      <p
        className="cursor-pointer pt-10 text-sm text-black/[.6] hover:text-blue-600 underline-hover italic"
        onClick={handleBackToShop}
      >
        Back to shop
      </p>
      <div className="pt-5 h-full flex justify-between flex-wrap md:flex-wrap">
        {/*{!user && <ContactInfo />}*/}
        <ContactInfo />
        <OrderSummary />
      </div>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-70 flex items-center justify-center text-black">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Checkout;
