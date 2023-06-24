import { ReactNode, createContext, useState } from 'react';

type OverlayContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type OverlayProviderProps = {
  children: ReactNode;
};

export const OverlayContext = createContext<OverlayContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const value = {
    isOpen,
    setIsOpen,
  };
  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
};
