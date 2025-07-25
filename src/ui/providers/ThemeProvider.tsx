import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../core/constants/colors";

type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: ThemeType;
  colors: typeof Colors.dark;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  colors: Colors.dark,
  toggleTheme: () => {},
});

const THEME_KEY = "APP_THEME";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  // Cargar el tema guardado en AsyncStorage al iniciar la app
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);

  // Guardar tema cuando cambia
  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  const value = useMemo(
    () => ({
      theme,
      colors: theme === "dark" ? Colors.dark : Colors.light,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
