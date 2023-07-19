import React, { createContext, useState } from 'react';
import { Voucher } from '../types/voucher.type.ts';

type VoucherContextType = {
  voucher: Voucher;
  setVoucher: (key: Voucher) => void;
};

export const VoucherContext = createContext<VoucherContextType>({
  voucher: {} as Voucher,
  setVoucher: () => {},
});

export const VoucherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [voucher, setVoucher] = useState<Voucher>({} as Voucher);

  const value = { voucher, setVoucher };

  return (
    <VoucherContext.Provider value={value}>{children}</VoucherContext.Provider>
  );
};
