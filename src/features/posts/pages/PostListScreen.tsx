import React, { useCallback, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Typography } from "../../../ui/atoms/Typography";
import { styles } from "./styles/PostListScreen-styles";
import { FeedLayout } from "../templates/FeedLayout";
import { usePosts } from "../../../core/hooks/usePosts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../../ui/providers/ThemeProvider";

export const PostListScreen: React.FC = () => {
  const {
    posts,
    loading,
    error,
    fetchAllPosts,
    fetchNextPage,
    refreshing,
    startRefresh,
    stopRefresh,
    hasMore,
    page,
  } = usePosts();
  const { colors } = useAppTheme();

  useEffect(() => {
    if (posts.length === 0) {
      fetchAllPosts();
    }
  }, [posts, fetchAllPosts]);

  const onRefresh = useCallback(async () => {
    startRefresh();
    await fetchAllPosts();
    stopRefresh();
  }, [startRefresh, fetchAllPosts, stopRefresh]);

  const onEndReached = useCallback(() => {
    if (hasMore) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasMore]);

  if (loading && posts.length === 0)
    return <ActivityIndicator style={styles.loader} />;

  if (error) return <Typography variant="title">Error: {error}</Typography>;

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ backgroundColor: colors.background }}
    >
      <FeedLayout
        posts={posts}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        hasMore={hasMore}
      />
    </SafeAreaView>
  );
};
