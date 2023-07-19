export type CreateRental = {
  preOrderID?: string;
  customerID?: string;
  phoneNumber?: string;
  customerName?: string;
  rentedGames?: {
    gameID: string;
    preOrderQuantity: number;
    numberOfRentalDays: string;
  }[];
  deposit?: number;
};
