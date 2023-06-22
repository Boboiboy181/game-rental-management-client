export type PreOrder = {
  customerID: string;
  email: string;
  phoneNumber: string;
  customerName: string;
  rentedGames: {
    gameID: string;
    preOrderQuantity: number;
    numberOfRentalDays: string;
  }[];
};
