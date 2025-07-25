import React from "react";
import { View, Switch } from "react-native";
import { Typography } from "../../../ui/atoms/Typography";
import { useAppTheme } from "../../../ui/providers/ThemeProvider";
import { styles } from "./styles/SettingsScreen-styles";

export const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme, colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Typography
        variant="title"
        style={{ color: colors.primary, marginBottom: 20 }}
      >
        Ajustes
      </Typography>

      <View style={styles.row}>
        <Typography
          variant="body"
          style={{ color: colors.primary, marginRight: 10 }}
        >
          Modo oscuro
        </Typography>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          trackColor={{ false: "#ccc", true: colors.accent }}
          thumbColor={theme === "dark" ? colors.primary : "#f4f3f4"}
        />
      </View>
    </View>
  );
};
