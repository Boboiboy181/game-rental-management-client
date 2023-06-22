import React, { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SearchContext } from '../contexts/search.context';

const Navigation = () => {
  const { searchField, setSearchField } = useContext(SearchContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  return (
    <Fragment>
      <div className="h-[5.5rem] w-full flex justify-between px-16 items-center border-solid border-gray-300 border-b text-center">
        <div className="input-field">
          <input
            className="px-4"
            type="search"
            placeholder="Search game"
            name="searchField"
            value={searchField}
            onChange={handleChange}
          />
          <label htmlFor="searchfield">Search game</label>
        </div>
        <Link className="" to="/">
          <div className="flex justify-center items-center relative right-9">
            <img
              className="h-12 w-12"
              src="https://vitejs.dev/logo.svg"
              alt="Tailwind CSS Logo"
            />
            <p className="font-cursive text-3xl ml-1">Fanstactic</p>
          </div>
        </Link>
        {/* <nav>
          <ul className="flex">
            <li className="px-4">Our store</li>
            <li className="px-4">Your Information</li>
            <li className="px-4">Sign in</li>
            <li className="px-4">Sign up</li>
          </ul>
        </nav> */}
        <div className="flex justify-center items-center">
          <Link to="/auth">
            <button className="rounded-md bg-blue-600 text-white px-6 py-3 hover:bg-indigo-600 flex items-center justify-around w-full">
              Sign In
            </button>
          </Link>
          <Link to="/checkout">
            <div className="px-4">
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
            </div>
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
