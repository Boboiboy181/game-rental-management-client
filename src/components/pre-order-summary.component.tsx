import PreOrderList from './pre-order-list.component';

const OrderSummary = () => {
  return (
    <div className="pre-order-summary basis-[47.5%]">
      <h4 className="text-xl mb-4">Order Summary</h4>
      <div className="bg-white border rounded-md overflow-hidden">
        <PreOrderList />
        <div className="price p-6 border-b">
          <div className="flex items-center justify-between">
            <p className="text-black/[.7] text-sm">Subtotal</p>
            <p>600.00 VND</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-black/[.7] text-sm">Number of rental days</p>
            <p>7</p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-6 border-t">
            <p className="text-xl">Total</p>
            <p>420.000 VND</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
