export const caculatePrice = (price: number, numberOfRentalDays: number) => {
  if (numberOfRentalDays === 1) {
    return price;
  }
  if (numberOfRentalDays === 3) {
    return ((price * 3 * 0.89));
  }
  if (numberOfRentalDays === 7) {
    return ((price * 7 * 0.87));
  }
  if (numberOfRentalDays === 14) {
    return ((price * 14 * 0.85));
  }
  if (numberOfRentalDays === 30) {
    return ((price * 30 * 0.83));
  }
  if (numberOfRentalDays === 60) {
    return ((price * 60 * 0.8));
  }
  return 0;
};
