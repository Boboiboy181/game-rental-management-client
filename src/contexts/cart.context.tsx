import { ReactNode, createContext, useState } from 'react';
import { Product } from '../types/product.type';

type CartContextType = {
  cartItems: ProductForOrder[];
  addItemToCart: (product: ProductForOrder, numberOfRentalDays: string) => void;
  updateCartItem: (product: ProductForOrder, newQuantity: number) => void;
};

type CartProviderProps = {
  children: ReactNode;
};

type ProductForOrder = Product & {
  preOrderQuantity: number;
  numberOfRentalDays: string;
};

const addCartItem = (
  cartItems: ProductForOrder[],
  productToAdd: Product,
  numberOfRentalDays: string,
): ProductForOrder[] => {
  const existingCartItem = cartItems.find(
    (cartItem: Product) => cartItem._id === productToAdd._id,
  );

  if (existingCartItem) {
    if (existingCartItem.numberOfRentalDays === numberOfRentalDays) {
      return cartItems.map((cartItem: ProductForOrder) =>
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
    },
  ];
};

const updateCartItemQuantity = (
  cartItems: ProductForOrder[],
  productToUpdate: ProductForOrder,
  newQuantity: number,
) => {
  const existingCartItem = cartItems.find(
    (cartItem: Product) => cartItem._id === productToUpdate._id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem: ProductForOrder) =>
      cartItem._id === productToUpdate._id
        ? { ...cartItem, preOrderQuantity: newQuantity }
        : cartItem,
    );
  } else {
    return cartItems;
  }
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItemToCart: () => {},
  updateCartItem: () => {},
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ProductForOrder[]>(
    [] as ProductForOrder[],
  );
  const addItemToCart = (productToAdd: Product, numberOfRentalDays: string) => {
    setCartItems(addCartItem(cartItems, productToAdd, numberOfRentalDays));
  };
  const updateCartItem = (
    productToUpdate: ProductForOrder,
    newQuantity: number,
  ) => {
    setCartItems(
      updateCartItemQuantity(cartItems, productToUpdate, newQuantity),
    );
  };

  const values = { cartItems, addItemToCart, updateCartItem };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
