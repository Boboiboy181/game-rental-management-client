export type CreateReturn = {
  rentalId: string;
  rentedGames: {
    gameID: string;
    preOrderQuantity: number;
  }[];
};
