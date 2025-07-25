import React from "react";
import { ActivityIndicator } from "react-native";
import { Typography } from "../../../ui/atoms/Typography";
import { styles } from "./styles/PostListScreen-styles";
import { FeedLayout } from "../templates/FeedLayout";
import { usePosts } from "../../../core/hooks/usePosts";

export const PostListScreen: React.FC = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <ActivityIndicator style={styles.loader} />;
  if (error) return <Typography variant="title">Error: {error}</Typography>;

  return <FeedLayout posts={posts} />;
};
