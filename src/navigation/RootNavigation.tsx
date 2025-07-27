import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../core/store/store";
import {
  fetchPosts,
  loadPostsFromStorage,
} from "../features/posts/redux/postsSlice";
import { AppNavigator } from "./AppNavigator";
import { useAppTheme } from "../ui/providers/ThemeProvider";
import { hydrateAppState } from "../core/utils/hydrateAppState";
import { styles } from "./styles.ts/RootNavigation-styles";

export const RootNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useAppTheme();

  useEffect(() => {
    const init = async () => {
      await hydrateAppState(dispatch);

      const result = await dispatch(loadPostsFromStorage());
      if (result.payload?.length === 0) {
        await dispatch(fetchPosts());
      }

      setIsLoading(false);
    };

    init();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View
        style={[styles.splashContainer, { backgroundColor: colors.background }]}
      >
        <ActivityIndicator size="large" color={colors.primary || "#007bff"} />
      </View>
    );
  }

  return <AppNavigator />;
};
