export type Return = {
  _id: string;
  returnCode: string;
  customer: {
    _id: string;
    customerName: string;
    phoneNumber: string;
  };
  deposit: number;
  paymentState: string;
  rentedGames: [
    {
      game: {
        _id: string;
        productName: string;
        price: number;
      };
      preOrderQuantity: number;
      numberOfRentalDays: number;
      returnDate: Date;
      daysPastDue: number;
      fine: number;
      _id: string;
    },
  ];
  rentalCode: string;
  estimatedPrice: number;
  createdAt: Date;
  updatedAt: Date;
};
