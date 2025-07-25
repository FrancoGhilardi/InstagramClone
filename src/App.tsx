import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { ThemeProvider, useAppTheme } from "./ui/providers/ThemeProvider";
import PostListScreen from "./features/posts/pages/PostListScreen";

const AppContent = () => {
  const { scheme, colors } = useAppTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
      />
      <PostListScreen />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
