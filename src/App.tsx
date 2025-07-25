import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { ThemeProvider, useAppTheme } from "./ui/providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "./core/store/store";
import { PostListScreen } from "./features/posts/pages/PostListScreen";
import {
  fetchPosts,
  loadPostsFromStorage,
} from "./features/posts/redux/postsSlice";

const AppContent = () => {
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
