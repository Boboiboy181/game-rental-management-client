import { createContext, useState } from 'react';

type UserContextType = {
  user: string;
  setUser: (username: string) => void;
};

export const UserContext = createContext<UserContextType>({
  user: '',
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string>('');
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
