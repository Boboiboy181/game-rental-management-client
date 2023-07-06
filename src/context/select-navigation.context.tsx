import { createContext } from 'react';

export const SelectNavigationContext = createContext({
  selectedNavigation: '',
  setSelectedNavigation: (selectedNavigation: string) => {},
});
