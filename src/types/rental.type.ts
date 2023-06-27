export type Rental = {
  _id: string;
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
      };
      preOrderQuantity: number;
      numberOfRentalDays: number;
      returnDate: string;
      _id: string;
    },
  ];
  estimatedPrice: number;
  createdAt: string;
};
