import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { ThemeProvider, useAppTheme } from "./ui/providers/ThemeProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "./core/store/store";
import {
  fetchPosts,
  loadPostsFromStorage,
} from "./features/posts/redux/postsSlice";
import { AppNavigator } from "./navigation/AppNavigator";

const AppContent: React.FC = () => {
  const { scheme, colors } = useAppTheme();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadPostsFromStorage()).then((result: any) => {
      if (result.payload.length === 0) {
        dispatch(fetchPosts());
      }
    });
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
      />
      <AppNavigator />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
