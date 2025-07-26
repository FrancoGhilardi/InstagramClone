import React from "react";
import { View, Switch } from "react-native";
import { Typography } from "../../../ui/atoms/Typography";
import { useAppTheme } from "../../../ui/providers/ThemeProvider";
import { styles } from "./styles/SettingsScreen-styles";
import { SafeAreaView } from "react-native-safe-area-context";

export const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme, colors } = useAppTheme();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
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
    </SafeAreaView>
  );
};
