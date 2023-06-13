import ContactInfo from '../../components/pre-order-info.component';
import OrderSummary from '../../components/pre-order-summary.component';

const Checkout = () => {
  return (
    <div className="h-full flex justify-between pt-16 px-14 pb-24 flex-wrap">
      <ContactInfo />
      <OrderSummary />
    </div>
  );
};

export default Checkout;
