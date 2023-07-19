export type RentalPackageRegistration = {
  _id: string;
  rentalPackage: string;
  customer: string;
  registrationDate: Date;
  registrationEndDate: Date;
  numberOfGameRemaining: number;
};
