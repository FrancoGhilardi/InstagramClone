import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Typography } from "../../../ui/atoms/Typography";
import { styles } from "./styles/PostListScreen-styles";
import { FeedLayout } from "../templates/FeedLayout";
import { usePosts } from "../../../core/hooks/usePosts";
import { SafeAreaView } from "react-native-safe-area-context";

export const PostListScreen: React.FC = () => {
  const { posts, loading, error, fetchAllPosts } = usePosts();

  useEffect(() => {
    if (posts.length === 0) {
      fetchAllPosts();
    }
  }, [posts, fetchAllPosts]);

  if (loading) return <ActivityIndicator style={styles.loader} />;
  if (error) return <Typography variant="title">Error: {error}</Typography>;

  return (
    <SafeAreaView>
      <FeedLayout posts={posts} />
    </SafeAreaView>
  );
};
