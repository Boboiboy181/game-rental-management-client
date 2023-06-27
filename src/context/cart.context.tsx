import { createContext, ReactNode, useState } from 'react';
import { Product } from '../types/product.type';
import { ProductForCart } from '../types/product-cart.type';

type CartContextType = {
  cartItems: ProductForCart[];
  addItemToCart: (
    product: ProductForCart,
    numberOfRentalDays: string,
    priceByDays: number,
  ) => void;
  updateCartItem: (product: ProductForCart, newQuantity: number) => void;
  deleteCartItem: (product: ProductForCart) => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const addCartItem = (
  cartItems: ProductForCart[],
  productToAdd: Product,
  numberOfRentalDays: string,
  priceByDays: number,
): ProductForCart[] => {
  const existingCartItem = cartItems.find(
    (cartItem: Product) => cartItem._id === productToAdd._id,
  );

  if (existingCartItem) {
    if (existingCartItem.numberOfRentalDays === numberOfRentalDays) {
      return cartItems.map((cartItem: ProductForCart) =>
        cartItem._id === productToAdd._id
          ? { ...cartItem, preOrderQuantity: cartItem.preOrderQuantity + 1 }
          : cartItem,
      );
    } else {
      return [
        ...cartItems,
        {
          ...productToAdd,
          preOrderQuantity: 1,
          numberOfRentalDays: numberOfRentalDays,
          priceByDays: priceByDays,
        },
      ];
    }
  }

  return [
    ...cartItems,
    {
      ...productToAdd,
      preOrderQuantity: 1,
      numberOfRentalDays: numberOfRentalDays,
      priceByDays: priceByDays,
    },
  ];
};

const updateCartItemQuantity = (
  cartItems: ProductForCart[],
  productToUpdate: ProductForCart,
  newQuantity: number,
): ProductForCart[] => {
  const existingCartItem = cartItems.find(
    (cartItem: Product) => cartItem._id === productToUpdate._id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem: ProductForCart) =>
      cartItem._id === productToUpdate._id
        ? { ...cartItem, preOrderQuantity: newQuantity }
        : cartItem,
    );
  } else {
    return cartItems;
  }
};

const deleteCartItemFromCart = (
  cartItems: ProductForCart[],
  productToDelete: ProductForCart,
): ProductForCart[] => {
  const existingCartItem = cartItems.find(
    (cartItem: Product) => cartItem._id === productToDelete._id,
  );

  if (existingCartItem) {
    return cartItems.filter(
      (cartItem: ProductForCart) => cartItem._id !== productToDelete._id,
    );
  } else {
    return cartItems;
  }
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItemToCart: () => {},
  updateCartItem: () => {},
  deleteCartItem: () => {},
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ProductForCart[]>(
    [] as ProductForCart[],
  );
  const addItemToCart = (
    productToAdd: Product,
    numberOfRentalDays: string,
    priceByDays: number,
  ) => {
    setCartItems(
      addCartItem(cartItems, productToAdd, numberOfRentalDays, priceByDays),
    );
  };
  const updateCartItem = (
    productToUpdate: ProductForCart,
    newQuantity: number,
  ) => {
    setCartItems(
      updateCartItemQuantity(cartItems, productToUpdate, newQuantity),
    );
  };
  const deleteCartItem = (productToDelete: ProductForCart) => {
    setCartItems(deleteCartItemFromCart(cartItems, productToDelete));
  };

  const values = {
    cartItems,
    addItemToCart,
    updateCartItem,
    deleteCartItem,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
