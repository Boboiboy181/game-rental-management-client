import { RegisterRentalPackage } from '../types/rental-package/register-rental-package.type.ts';
import { RentalPackageRegistration } from '../types/rental-package-registration.type.ts';
import { RentalPackage } from '../types/rental-package.type.ts';
import { UpdateRentalPackageDto } from '../types/update-rental-package.type.ts';
import api from './axios.config.ts';

export const getRegistrationByCustomerID = async (
  customerID: string,
): Promise<RegisterRentalPackage[]> => {
  const { data }: { data: RegisterRentalPackage[] } = await api.get(
    `rental-package/registration-list/${customerID}`,
  );
  return data;
};

export const getRentalPackageByID = async (
  rentalPackageID: string | undefined,
): Promise<RentalPackage> => {
  const { data }: { data: RentalPackage } = await api.get(
    `rental-package/${rentalPackageID}`,
  );
  return data;
};

export const getRentalPackages = async (): Promise<RentalPackage[]> => {
  const { data }: { data: RentalPackage[] } = await api.get('rental-package');
  return data;
};

export const updateRentalPackage = async (
  rentalPackageID: string,
  updateRentalPackage: UpdateRentalPackageDto,
): Promise<RentalPackage> => {
  const { data }: { data: RentalPackage } = await api.patch(
    `rental-package/${rentalPackageID}`,
    { ...updateRentalPackage },
  );
  return data;
};

export const deleteRentalPackage = async (
  rentalPackageID: string,
): Promise<void> => {
  await api.delete(`rental-package/${rentalPackageID}`);
};

export const getRegisterList = async (
  packageName: string,
): Promise<RegisterRentalPackage[]> => {
  const { data }: { data: RegisterRentalPackage[] } = await api.get(
    `rental-package/registration-list?packageName=${packageName}`,
  );
  return data;
};

export const registerRentalPackage = async (
  rentalPackageRegistration: RentalPackageRegistration,
): Promise<RentalPackageRegistration> => {
  const { data }: { data: RentalPackageRegistration } = await api.post(
    'rental-package/register',
    { ...rentalPackageRegistration },
  );
  return data;
};

export const deleteRegister = async (registerID: string): Promise<void> => {
  await api.delete(`rental-package/registration-list/${registerID}`);
};
