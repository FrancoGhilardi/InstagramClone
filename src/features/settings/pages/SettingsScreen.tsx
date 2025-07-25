import React from "react";
import { Typography } from "../../../ui/atoms/Typography";
import { useAppTheme } from "../../../ui/providers/ThemeProvider";
import { styles } from "./styles/SettingsScreen-styles";
import { SafeAreaView } from "react-native-safe-area-context";

export const SettingsScreen: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Typography variant="title">Ajustes</Typography>
      <Typography variant="body">
        Aquí irán las opciones de configuración.
      </Typography>
    </SafeAreaView>
  );
};
