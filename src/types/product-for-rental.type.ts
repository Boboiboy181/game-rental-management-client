export type ProductForRental = {
  game: {
    _id: string;
    productName: string;
    price: number;
  };
  preOrderQuantity: number;
  numberOfRentalDays: number;
  returnDate: string;
  _id: string;
};
