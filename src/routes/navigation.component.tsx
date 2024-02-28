import React, { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SearchContext } from '../contexts/search.context';
import CartIcon from '../components/cart-icon.component';
import { CartContext } from '../contexts/cart.context';
import CartDropdown from '../components/cart-dropdown.component';
import Input from '../components/input.component';

const Navigation = () => {
  const { searchField, setSearchField } = useContext(SearchContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="h-[5.5rem] w-full flex justify-between px-16 items-center border-solid border-gray-300 border-b text-center">
        <Input
          inputType="search"
          inputName="searchField"
          inputPlaceholder="Search game"
          inputValue={searchField}
          onChangeHandler={handleChange}
        />
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
        <div className="flex justify-center items-center relative">
          <Link to="/auth">
            <button className="rounded-md bg-blue-600 text-white px-6 py-3 hover:bg-indigo-600 flex items-center justify-around w-full">
              Sign In
            </button>
          </Link>
          <CartIcon />
          {isCartOpen && <CartDropdown />}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
