import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Fragment>
      <div className="h-20 flex justify-around items-center border-solid border-gray-300 border-b">
        <input
          className="rounded-md border-2  bg-white px-2 py-1 focus:outline-none focus:border-indigo-500"
          type="search"
          placeholder="Search game"
        />
        <Link className="" to="/">
          <img
            className="h-12 w-12"
            src="https://tailwindui.com/img/logos/mark.svg?color=black"
            alt="Tailwind CSS Logo"
          />
        </Link>
        <Link className="" to="/checkout">
          <button className="rounded-md bg-blue-500 text-white h-9 w-24 hover:bg-red-500">
            Checkout
          </button>
        </Link>
      </div>
    </Fragment>
  );
};

export default Navigation;
