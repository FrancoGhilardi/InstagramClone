import React, { ReactNode, createContext, useContext } from "react";
import { useTheme } from "../../core/hooks/useTheme";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
