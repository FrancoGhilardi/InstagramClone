import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider, useAppTheme } from "./ui/providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./core/store/store";
import { PostListScreen } from "./features/posts/pages/PostListScreen";

const AppContent = () => {
  const { scheme, colors } = useAppTheme();
  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <StatusBar
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
      />
      <PostListScreen />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}
