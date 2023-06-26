import { createContext, useState } from 'react';
import { Customer } from '../types/customer.type';
type CustomerContextType = {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
};

export const CustomerContext = createContext<CustomerContextType>({
  customers: [],
  setCustomers: () => {},
});

export const CustomerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const value = { customers, setCustomers };
  return (
    <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
  );
};
