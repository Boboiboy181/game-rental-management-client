import { ReactNode, createContext, useState } from 'react';

type SearchContextType = {
  searchField: string;
  setSearchField: (searchField: string) => void;
};

type SearchProviderProps = {
  children: ReactNode;
};

export const SearchContext = createContext<SearchContextType>({
  searchField: '',
  setSearchField: () => {},
});

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchField, setSearchField] = useState<string>('');

  const value = { searchField, setSearchField };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
