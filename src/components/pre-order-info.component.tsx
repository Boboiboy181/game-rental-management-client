import { useContext, useState } from 'react';
import { PreOrder } from '../types/pre-order.type';
import { CartContext } from '../contexts/cart.context';
import { toast, ToastContainer } from 'react-toastify';
import api from '../api/axios.config';

type FormFields = {
  email: string;
  customerName: string;
  phoneNumber: string;
};

const defaultFormFields: FormFields = {
  email: '',
  customerName: '',
  phoneNumber: '',
};

const ContactInfo = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { cartItems } = useContext(CartContext);
  const { email, customerName, phoneNumber } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const preOrderItems = cartItems.map((cartItem) => {
    return {
      gameID: cartItem._id,
      preOrderQuantity: cartItem.preOrderQuantity,
      numberOfRentalDays: cartItem.numberOfRentalDays,
    };
  });

  const postPreOrder = async (preOrder: PreOrder) => {
    try {
      const response = await api.post('/pre-order', preOrder);
      console.log(response);
      toast.success('Pre-order created successfully 🥳', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error('Failed to create a pre-order 😞', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 8000,
        theme: 'colored',
        pauseOnHover: true,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preOrder: PreOrder = {
      customerID: '',
      email,
      phoneNumber,
      customerName,
      rentedGames: preOrderItems,
    };
    postPreOrder(preOrder);
    setFormFields(defaultFormFields);
  };

  return (
    <div className="contact-information basis-[47.5%]">
      <h4 className="text-lg mb-4">Pre-order Information</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 input-field">
          <input
            type="email"
            className="w-full rounded-md"
            name="email"
            value={email}
            placeholder="Email address"
            onChange={handleChange}
            required
          />
          <label htmlFor="fullname">Email address</label>
        </div>
        <div className="mb-4 input-field">
          <input
            type="text"
            className="w-full rounded-md"
            name="customerName"
            value={customerName}
            placeholder="Full name"
            onChange={handleChange}
            required
          />
          <label htmlFor="fullname">Full name</label>
        </div>
        <div className="mb-4 input-field">
          <input
            type="tel"
            className="w-full rounded-md"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="Phone number"
            onChange={handleChange}
            required
          />
          <label htmlFor="phone-number">Phone number</label>
        </div>
        <button
          className="rounded-md bg-blue-500 text-white px-6 py-2 transition duration-500 hover:bg-indigo-500 w-full"
          type="submit"
        >
          Confirm order
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ContactInfo;
