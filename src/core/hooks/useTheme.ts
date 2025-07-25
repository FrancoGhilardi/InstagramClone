import { useColorScheme } from "react-native";
import { Colors } from "../constants/colors";

export const useTheme = () => {
  const scheme = useColorScheme();
  const themeColors = scheme === "dark" ? Colors.dark : Colors.light;
  return { colors: themeColors, scheme };
};
