export type RegisterRentalPackage = {
    _id: string;
    rentalPackage: string;
    customer: {
      _id: string;
      customerName: string;
    };
    registrationDate: string;
    registrationEndDate: string;
    numberOfGameRemaining: number;
  };
  