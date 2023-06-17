import { useContext, useState } from 'react';
import axios from 'axios';
import { PreOrder } from '../types/pre-order.type';
import { CartContext } from '../contexts/cart.context';

type FormFields = {
  customerName: string;
  phoneNumber: string;
  numberOfRentalDays: string;
};

const defaultFormFields: FormFields = {
  customerName: '',
  phoneNumber: '',
  numberOfRentalDays: 'ONE_DAY',
};

const ContactInfo = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { cartItems } = useContext(CartContext);
  const { customerName, phoneNumber, numberOfRentalDays } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const preOrderItems = cartItems.map((cartItem) => {
    return {
      gameID: cartItem._id,
      preOrderQuantity: cartItem.preOrderQuantity,
      numberOfRentalDays: 1,
    };
  });

  const postPreOrder = async (preOrder: PreOrder) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/pre-order',
        preOrder,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preOrder: PreOrder = {
      customerID: '',
      phoneNumber,
      customerName,
      numberOfRentalDays,
      rentedGames: preOrderItems,
    };
    postPreOrder(preOrder);
  };

  return (
    <div className="contact-information basis-[47.5%]">
      <h4 className="text-lg mb-4">Pre-order Information</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* <label htmlFor="fullname" className="text-black/[.5] text-xs">
            Full name
          </label> */}
          <input
            type="text"
            className="w-full rounded-md"
            name="customerName"
            value={customerName}
            placeholder="Full name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          {/* <label htmlFor="phone-number" className="text-black/[.5] text-xs">
            Phone number
          </label> */}
          <input
            type="text"
            className="w-full rounded-md"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="Phone number"
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="rounded-md bg-blue-500 text-white px-6 py-2 transition duration-500 hover:bg-indigo-500 w-full"
          type="submit"
        >
          Confirm order
        </button>
      </form>
    </div>
  );
};

export default ContactInfo;
