import { ReactNode, createContext, useState } from 'react';
import { Product } from '../types/product.type';

type CartContextType = {
  cartItems: ProductWithPreOrderQuantity[];
  addItemToCart: (product: ProductWithPreOrderQuantity) => void;
};

type CartProviderProps = {
  children: ReactNode;
};

type ProductWithPreOrderQuantity = Product & { preOrderQuantity: number };

const addCartItem = (
  cartItems: ProductWithPreOrderQuantity[],
  productToAdd: Product,
): ProductWithPreOrderQuantity[] => {
  const existingCartItem = cartItems.find(
    (cartItem: Product) => cartItem._id === productToAdd._id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem: ProductWithPreOrderQuantity) =>
      cartItem._id === productToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }

  return [...cartItems, { ...productToAdd, preOrderQuantity: 1 }];
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ProductWithPreOrderQuantity[]>([]);
  const addItemToCart = (productToAdd: Product) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const values = { cartItems, addItemToCart };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
