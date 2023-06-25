type PreOrder = {
  _id: string;
  customer: Customer;
  rentedGames: [
    {
      game: string;
      preOrderQuantity: number;
      numberOfRentalDays: Date;
      _id: string;
    },
  ];
  estimatedPrice: number;
};
