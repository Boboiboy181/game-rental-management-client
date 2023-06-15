import { useContext, useState } from 'react';
import { RentalDaysEnum } from '../enums/rental-days.enum';
import axios from 'axios';
import { PreOrder } from '../types/pre-order.type';
import { CartContext } from '../contexts/cart.context';

type FormFields = {
  customerName: string;
  phoneNumber: string;
  numberOfRentalDays: RentalDaysEnum;
};

const defaultFormFields: FormFields = {
  customerName: '',
  phoneNumber: '',
  numberOfRentalDays: RentalDaysEnum.ONE_DAY,
};

const ContactInfo = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { cartItems } = useContext(CartContext);
  const { customerName, phoneNumber, numberOfRentalDays } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  console.log(numberOfRentalDays);

  const preOrderItems = cartItems.map((cartItem) => {
    return {
      gameID: cartItem._id,
      preOrderQuantity: cartItem.preOrderQuantity,
    };
  });

  const postPreOrder = async (preOrder: PreOrder) =>
    await axios.post('http://localhost:3000/pre-order', preOrder);

  const handleSubmit = () => {
    const preOrder: PreOrder = {
      customerID: '',
      phoneNumber,
      customerName,
      numberOfRentalDays: RentalDaysEnum[numberOfRentalDays],
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
        <fieldset className="flex justify-between items-center">
          <legend className="mb-3">Please select your day of rental:</legend>
          <div>
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              name="numberOfRentalDays"
              id="one-day"
              value={RentalDaysEnum.ONE_DAY}
              onChange={handleChange}
            />
            <label
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="one-day"
            >
              1 day
            </label>
          </div>
          <div>
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              name="numberOfRentalDays"
              id="three-day"
              value={RentalDaysEnum.THREE_DAYS}
              onChange={handleChange}
            />
            <label
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="three-day"
            >
              3 days
            </label>
          </div>
          <div>
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              name="numberOfRentalDays"
              id="seven-days"
              value={RentalDaysEnum.SEVEN_DAYS}
              onChange={handleChange}
            />
            <label
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="seven-days"
            >
              7 days
            </label>
          </div>
          <div>
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              name="numberOfRentalDays"
              id="fourteen-days"
              value={RentalDaysEnum.FOURTEEN_DAYS}
              onChange={handleChange}
            />
            <label
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="fourteen-days"
            >
              14 days
            </label>
          </div>
          <div>
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              name="numberOfRentalDays"
              id="thirty-days"
              value={RentalDaysEnum.THIRTY_DAYS}
              onChange={handleChange}
            />
            <label
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="thirty-days"
            >
              30 days
            </label>
          </div>
          <div>
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              name="numberOfRentalDays"
              id="sixty-days"
              value={RentalDaysEnum.SIXTY_DAYS}
              onChange={handleChange}
            />
            <label
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="sixty-days"
            >
              60 days
            </label>
          </div>
        </fieldset>
        <button
          className="rounded-md bg-blue-500 text-white px-6 py-2 transition duration-500 hover:bg-indigo-500 w-full mt-5"
          type="submit"
        >
          Confirm order
        </button>
      </form>
    </div>
  );
};

export default ContactInfo;
