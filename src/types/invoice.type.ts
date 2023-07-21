import { Voucher } from './voucher.type.ts';

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
  voucher: {
    _id: string,
    voucherName: string,
    voucherCode: string,
    voucherValue: number,
  };
  fine: number;
  finalPrice: number;
  return: {
    _id: string;
    returnCode: string;
  };
  createdAt: string;
};
