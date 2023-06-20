import { useContext } from 'react';
import PreOrderList from './pre-order-list.component';
import { CartContext } from '../contexts/cart.context';

const OrderSummary = () => {
  const { cartItems } = useContext(CartContext);
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div className="pre-order-summary basis-[47.5%]">
      <h4 className="text-xl mb-4">Order Summary</h4>
      <div className="bg-white border rounded-md overflow-hidden">
        <PreOrderList />
        <div className="price p-6 border-b">
          {cartItems.map((cartItem) => {
            return (
              <div className="flex items-center justify-between mb-2">
                <p className="text-black/[.7] text-sm">
                  {cartItem.productName}
                </p>
                <p className="text-red-500">
                  {formatter.format(
                    cartItem.priceByDays * cartItem.preOrderQuantity,
                  )}
                </p>
              </div>
            );
          })}
          <div className="flex items-center justify-between mt-4 pt-6 border-t">
            <p className="text-xl">Total</p>
            <p className="text-xl text-red-600 font-medium">
              {formatter.format(
                cartItems.reduce((acc, curr) => {
                  return acc + curr.priceByDays * curr.preOrderQuantity;
                }, 0),
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
