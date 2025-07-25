import { TextStyle } from "react-native";
import { fontScale } from "../utils/responsive";
import { Colors } from "./colors";

export const TypographyStyles: Record<string, TextStyle> = {
  title: {
    fontSize: fontScale(16),
    fontWeight: "bold",
    color: Colors.dark.primary,
  },
  subtitle: {
    fontSize: fontScale(14),
    fontWeight: "600",
    color: Colors.dark.secondary,
  },
  body: {
    fontSize: fontScale(12),
    fontWeight: "400",
    color: Colors.dark.primary,
  },
};
