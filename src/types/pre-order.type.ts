export type PreOrder = {
  customerID: string;
  phoneNumber: string;
  customerName: string;
  rentedGames: {
    gameID: string;
    preOrderQuantity: number;
    numberOfRentalDays: string;
  }[];
};
