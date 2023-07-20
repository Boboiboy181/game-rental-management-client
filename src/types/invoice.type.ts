export type Invoice = {
  _id: string;
  invoiceID: string;
  customer: {
    _id: string;
    customerName: string;
    phoneNumber: string;
  };
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
  voucher: string[];
  fine: number;
  finalPrice: number;
  return: {
    _id: string;
    returnCode: string;
  };
  createdAt: string;
};
