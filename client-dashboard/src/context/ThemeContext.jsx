'use client';

import { createContext, useContext } from 'react';

const ThemeContext = createContext({
  isDarkMode: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ isDarkMode: true, setIsDarkMode: () => {}, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
