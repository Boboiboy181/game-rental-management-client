export type PreOrder = {
  customerID: string;
  phoneNumber: string;
  customerName: string;
  numberOfRentalDays: string;
  rentedGames: {
    gameID: string;
    preOrderQuantity: number;
  }[];
};
