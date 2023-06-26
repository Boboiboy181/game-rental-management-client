export type Return = {
  _id: string;
  customer: string;
  deposit: number;  
  paymentState: string;
  rentedGames: [
    {
      game: string;
      preOrderQuantity: number;
      numberOfRentalDays: number;
      returnDate: Date;
      daysPastDue: number;
      fine: number;
      _id: string;
    }
  ]
  estimatedPrice: number;
  createdAt: Date;
  updatedAt: Date;
}