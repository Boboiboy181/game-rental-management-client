import { createContext, ReactNode, useState } from 'react';

type NavigationKeyContextType = {
  navigationKey: string;
  setNavigationKey: (key: string) => void;
};

export const NavigationKeyContexts = createContext<NavigationKeyContextType>({
  navigationKey: '',
  setNavigationKey: () => {},
});

export const NavigationKeyProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [navigationKey, setNavigationKey] = useState<string>('');

  const value = { navigationKey, setNavigationKey };

  return (
    <NavigationKeyContexts.Provider value={value}>
      {children}
    </NavigationKeyContexts.Provider>
  );
};
