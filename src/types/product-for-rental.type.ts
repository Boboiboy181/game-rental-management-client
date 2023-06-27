export type ProductForRental = {
  game: {
    _id: string;
    productName: string;
  };
  preOrderQuantity: number;
  numberOfRentalDays: number;
  returnDate: string;
  _id: string;
};
