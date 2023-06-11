import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navigation = () => {
  return (
    <Fragment>
      <div className="h-20 w-full flex justify-between px-14 items-center border-solid border-gray-300 border-b text-center">
        <input
          className="rounded-md border-2  bg-white px-2 py-1 focus:outline-none focus:border-indigo-500"
          type="search"
          placeholder="Search game"
        />
        <Link className="" to="/">
          <div className="flex justify-center items-center relative left-[-40px]">
            <img
              className="h-12 w-12"
              src="https://tailwindui.com/img/logos/mark.svg"
              alt="Tailwind CSS Logo"
            />
            <p className="text-blue-700 font-cursive text-2xl ml-1">
              Fanstactic
            </p>
          </div>
        </Link>
        <Link className="" to="/checkout">
          <button className="rounded-md bg-blue-600 text-white px-6 py-2 hover:bg-indigo-600 flex items-center justify-around w-full">
            Checkout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </Link>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
