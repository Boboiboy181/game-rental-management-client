export type Rental = {
  _id: string;
  rentalCode: string;
  customer: {
    _id: string;
    customerName: string;
    phoneNumber: string;
  };
  deposit: number;
  returnValue: number;
  returnState: string;
  rentedGames: [
    {
      game: {
        _id: string;
        productName: string;
        price: number;
      };
      preOrderQuantity: number;
      numberOfRentalDays: number;
      returnDate: string;
      _id: string;
    },
  ];
  returnIDs: string[];
  estimatedPrice: number;
  createdAt: string;
};
