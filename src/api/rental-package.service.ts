import api from './axios.config.ts';
import { RentalPackageRegistration } from '../types/rental-package-registration.type.ts';

export const getRegistrationByCustomerID = async (
  customerID: string,
): Promise<RentalPackageRegistration[]> => {
  const { data }: { data: RentalPackageRegistration[] } = await api.get(
    `rental-package/registration-list/${customerID}`,
  );
  return data;
};
