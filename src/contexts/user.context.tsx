import { ReactNode, createContext, useState } from 'react';

type UserContext = {
  user: string;
  setUser: (user: '') => void;
};

type SearchProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContext>({
  user: '',
  setUser: () => {},
});

export const UserProvider = ({ children }: SearchProviderProps) => {
  const [user, setUser] = useState<string>('');

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
