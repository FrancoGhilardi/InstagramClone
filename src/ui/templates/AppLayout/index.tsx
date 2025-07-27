import React from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useAppTheme } from "../../providers/ThemeProvider";

type Props = {
  children: React.ReactNode;
};

const LayoutContent: React.FC<Props> = ({ children }) => {
  const { theme, colors } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      {children}
    </View>
  );
};

export const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LayoutContent>{children}</LayoutContent>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
